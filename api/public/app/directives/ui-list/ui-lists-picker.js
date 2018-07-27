'use strict';
/**
 * List picker CONTROL
 *
 * Elemento:
 * <ui-list-picker>
 *
 * Atributos:
 *   ng-model = (Required) Arreglo de EmailIDs
 *   minlength = Minima cantidad de lists se puede elegir. Le agrega el validador minlength al controlador de ngModel
 *   maxlength = Máxima cantidad de lists permitidos. Le agrega el validador maxlength al controlador de ngModel y además un límite de selección
 *   selected-maillists = Referencia al arreglo con los objetos maillist seleccionados
 *
 */

angular.module('uiListPicker', [])
        .directive('uiListPicker', uiListPicker);
    
uiListPicker.$inject = ['uiListPickerService', '$templateCache', '$q'];
function uiListPicker(uiListPickerService, $templateCache, $q) {
    return {
        restrict: 'E',
        require : '?ngModel',
        templateUrl : 'app/directives/ui-list/ui-list-picker.html',
        scope : {
            'minlength' : '=?minlength',
            'maxlength' : '=?maxlength',
            'selectedLists' : '=?'
        },
        link: function(scope, element, attr, ngModel) {
            console.log(ngModel);
            var PILL_VIEW_LIMIT = 3;    //Límite a mostrar de listas

            scope.uiListPickerService = uiListPickerService;
            scope.selectedLists = [];
            scope.showLimit = PILL_VIEW_LIMIT;
            scope.loading = false;

            /**
             * Abro la ventana de popup
             */
            scope.open = function(e){
                uiListPickerService.open(e.target, ngModel, scope);
            };

            /**
             * Link para mostrar más list
             */
            scope.showMore = function(){
                scope.showLimit += 10;
            };

            /**
             * Link acceso rápido para quitar list
             */
            scope.removeList = function(ListId){

                ListId = parseInt(ListId, 10);

                var viewValueArr = angular.copy(ngModel.$viewValue);
                var index = viewValueArr.indexOf(ListId);

                if (index !== -1) {
                    viewValueArr.splice(index, 1);
                    ngModel.$setViewValue(viewValueArr);

                    /*if (scope.$parent.campaign) {
                        scope.$parent.campaign.listsInvalid = scope.selectedLists.length == 1;
                    }*/
                }
            };

            /**
             * Miro los cambios de modelo
             */
            scope.$watch(function(){
                return ngModel.$viewValue;
            }, function(viewValue){

                if (_.isArray(viewValue)) {

                    // Fetch list list if needed
                    if (viewValue.length) {
                        scope.loading = true;
                    }

                    //When promise is ok
                    $q.when(uiListPickerService.completeDataList)
                        .then(function(result){
                            uiListPickerService.completeDataList.Data = result;
                            _populateLists();
                    })
                    ['finally'](function(){
                        scope.loading = false;
                    });
                }

            }, true);

            /**
             * Evento de actualización de lists
             */
            scope.$on('ListsUpdated', function(){
                scope.loading = true;
                uiListPickerService.completeDataList.get();
                
                console.log(uiListPickerService.completeDataList);
                
                $q.when(uiListPickerService.completeDataList)
                    .then(function(result){
                        uiListPickerService.completeDataList.Data = result;
                        _populateLists();
                    })
                    ['finally'](function(){
                        scope.loading = false;
                    });
            });


            /**
             * Validadores
             */
            ngModel.$validators.minlength = function(){
                if (scope.minlength) {
                    return ngModel.$viewValue.length >= scope.minlength;
                }
                return true;
            };

            ngModel.$validators.maxlength = function(){
                if (scope.maxlength) {
                    return ngModel.$viewValue.length <= scope.maxlength;
                }
                return true;
            };

            ngModel.$asyncValidators.completeDataList = function(){
                return $q.when(uiListPickerService.completeDataList);
            };

            /**
             * Popular list data desde el viewValue del ngModel
             */
            var _populateLists = function(){

                scope.selectedLists = [];                
                _.forEach(ngModel.$viewValue, function(ListId){
                    _.forEach(uiListPickerService.completeDataList.Data, function(ListReference){
                        if (parseInt(ListReference.id, 10) === ListId) {
                            scope.selectedLists.push(ListReference);
                        }
                    });
                });
            };
        }
    };
}

(function(){

    'use strict';

    /**
     * picker service
     * Base constructor
     */
    function pickerServiceBase($compile, $q, $rootScope){

        var self = this;

        self.completeDataList  = {};
        //self.listHttpQuery = {};            // Todo: Quitar esto cuando termine de migrar la variable.
        self.currentModel = {};             //Clicked ui-...-picker ngModel reference
        self.openerScope = {};              //Clicked ui-...-picker scope reference
        self.openerElement = false;         //Clicked ui-...-picker button element reference

        self.initialized = false;           //Has been initialized?
        self.opened = false;                //Is opened?
        self.availableList = [];            //Left list
        self.availableListFiltered = [];    //Left list ngRepeat
        self.selectedList = [];             //Right list
        self.maxReached = false;            //Max number of items reached

        self.popupWindowElementTag = '';    //Element to represent popup window. Should be a directive and it will be compiled into the layout.



        /**
         * Open popup window
         */
        self.open = function(clickedElement, clickedModel, clickedScope){
            
            //Opener element
            self.openerElement = clickedElement;
            self.currentModel = clickedModel;
            self.openerScope = clickedScope;

            self.opened = true;

            //Initialization
            if (!self.initialized) {
                _init();
            }

            //Fetch list            
            $q.when(self.completeDataList).then(function(result){
                    self.completeDataList.Data = result.plain();
                     _focusInput();
                    _fillLists();
            });    
                        
        };

        /**
         * Focus search input automatically
         */
        var _focusInput = function(){
            setTimeout(function(){
                $(self.popupWindowElementTag + ' .ui-search-input').focus();
            }, 50);
        };

        /**
         * Fill "available" and "selected" arrays, based on currentModel viewValue.
         */
        var _fillLists = function(){

            self.availableList = [];
            self.selectedList = [];

            if (_.isArray(self.currentModel.$viewValue)) {
                var completeList = angular.copy(self.completeDataList.Data);
                _.forEach(completeList, function(item){
                    var id = parseInt(item.id, 10);
                    if (self.currentModel.$viewValue.indexOf(id) !== -1) {
                        self.selectedList.push(item);
                    } else {
                        self.availableList.push(item);
                    }
                });
            } else {
                self.availableList = angular.copy(self.completeDataList.Data);
            }

            completeList = null;
        };

        /**
         * Add item
         */
        self.add = function(item) { 

            if (!self.maxReached) {
                self.selectedList.unshift(item);
                var i = self.availableList.indexOf(item);
                self.availableList.splice(i, 1);
            }

            if (self.openerScope.maxlength && self.selectedList.length >= self.openerScope.maxlength) {
                self.maxReached = true;
            }
        };



        /**
         * Remove item
         */
        self.remove = function(item){
            self.availableList.push(item);
            var i = self.selectedList.indexOf(item);
            self.selectedList.splice(i, 1);

            if (self.openerScope.maxlength && self.selectedList.length < self.openerScope.maxlength) {
                self.maxReached = false;
            }
        };

        /**
         * Add all items
         */
        self.addAll = function(){
            _.forEach(self.availableListFiltered, function(item){
                self.add(item);
            });
        };

        /**
         * Remove all items
         */
        self.removeAll = function(){
            _.forEach(self.selectedList, function(item){
                self.availableList.push(item);
            });
            self.selectedList = [];
            self.maxReached = false;
        };

        /**
         * Closes window
         */
        self.close = function(){

            if (self.openerElement && self.openerElement.focus) {
                setTimeout(function(){
                    self.openerElement.focus();
                }, 50);
            }

            /*if (self.openerScope.$parent.campaign) {
                self.openerScope.$parent.campaign.listsInvalid = self.selectedList.length == 0;
            }*/

            self.opened = false;
        };

        /**
         * Apply new model and close
         */
        self.save = function(){
            var newModel = $.map(self.selectedList, function(item){
                return parseInt(item.id, 10);
            });

            self.currentModel.$setViewValue(newModel);
            self.close();
        };

        /**
         * Initialization, runs once.
         */
        var _init = function(){
            var scope = angular.element('#main').scope();
            angular.element('#main').append($compile('<' + self.popupWindowElementTag + ' />')(scope));
            self.initialized = true;
        };

    };



    /**
     * Mail list picker service
     */
    angular.module('uiListPicker')
            .factory('uiListPickerService', uiListPickerService);
    
    uiListPickerService.$inject =['$compile', '$q', '$rootScope', 'listService']; 
    
    function uiListPickerService($compile, $q, $rootScope, listService) {

        var self = new pickerServiceBase($compile, $q, $rootScope);
        
        self.completeDataList  =    listService.get();        
        self.popupWindowElementTag = 'ui-list-picker-window';

        return self;
    };

})();