'use strict';
/**
 * Maillist picker WINDOW
 * Element that represent the maillist picker popup window
 *
 * Attributes:
 *   ui-maillist-picker-window = (Restricted) Created and compiled at uiListPickerService when needed.
 *
 */

angular.module('uiListPicker')
        .directive('uiListPickerWindow',uiListPickerWindow);
        
        uiListPickerWindow.$inject = ['uiListPickerService', '$templateCache', '$timeout', '$rootScope'];
        
function uiListPickerWindow(uiListPickerService, $templateCache, $timeout, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/ui-list/ui-list-picker-window.html',
        scope : true,
        link: function(scope, element, attr) {
            scope.uiListPickerService = uiListPickerService;
            scope.searchValue = '';
            scope.highlightIndex = -1;


            //Keys handler
            var _keyUp = function(e){
                if (uiListPickerService.opened) {
                    /*switch(e.keyCode) {
                        case 27: //Esc
                            uiListPickerService.save();
                            scope.$apply();
                            break;
                    }*/
                    if (element.find('ui-search-input input').is(':focus')) {
                        switch(e.keyCode) {
                            case 38: //Up
                                scope.highlight(-1);
                                scope.$apply();
                                break;
                            case 40: //Down
                                scope.highlight(1);
                                scope.$apply();
                                break;
                            case 13: //Enter
                                var addItem = uiListPickerService.availableListFiltered[scope.highlightIndex];
                                if (angular.isObject(addItem)) {
                                    uiListPickerService.add(addItem);
                                    scope.$apply();
                                }
                        }
                    } else {
                        scope.highlightIndex = -1;
                        scope.$apply();
                    }
                }
            };
            $rootScope.$on('keyup', _keyUp);

            /**
             * Fake focus for available list
             */
            scope.highlight = function(offset){
                var length = uiListPickerService.availableListFiltered.length;
                scope.highlightIndex += offset;

                if (scope.highlightIndex < 0) {
                    scope.highlightIndex = 0;
                } else if (scope.highlightIndex >= length) {
                    scope.highlightIndex = length - 1;
                }

                //Adjust list scrollTop @todo
            };
        }
    };
};
