(function () {
    'use strict';

    angular.module('contactModule').controller('customFieldFormController', customFieldFormController);
    
    function customFieldFormController($scope, $state, $stateParams, $q, $translate, customFieldService, messageService ) {
        var vm = this;
        
        
        //==========================================
        // Init Vars
        //==========================================
        vm.customField      =   customFieldService.init();
        vm.FieldTypeItems   =   vm.customField.FieldTypeItems();
        vm.ValidationItems  =   vm.customField.ValidationItems();
             
        // Events
        vm.fieldTypeTouched = true;
        vm.showValidationField = true;
        vm.showList = false;
        
        //==========================================
        // Load Entity
        //==========================================
        if(!_.isUndefined($stateParams.CustomFieldID)) {        
            if (/^[0-9]*$/.test($stateParams.CustomFieldID)) {
                customFieldService.find($stateParams.CustomFieldID, {cache: false}).then( function (result) {
                    vm.customField =  loadCustomField(result);
                }, function () {
                    messageService.success('Hubo un error al recuperar el campo personalizado.');
                    $state.go('main.contacts.customfield-list');
                });
            }
        }      
        
        //==========================================
        // Lists Item
        //==========================================
        vm.ListValuesItems = {
            valueError: false,
            textError: false,
            addValue: function () {
                vm.ListValuesItems.ValuesItems.push({ text: '', value: '', defaultValue: false });
            },
            removeValue: function (item) {
                var i = vm.ListValuesItems.ValuesItems.indexOf(item);
                vm.ListValuesItems.ValuesItems.splice(i, 1);
            },
            getTotal : function () {
                var total = 0;
                _.each(vm.ListValuesItems.ValuesItems, function (item, index) {
                    if (!_.isEmpty(item.value)) { total++; }
                });
                return total;
            },
            setRadioValue: function (itemIndex) {
                _.each(vm.ListValuesItems.ValuesItems, function (item, index) {
                    if (itemIndex !== index) { item.defaultValue = false }
                });
            },            
            ValuesItems: []
        };
        
        //==========================================
        // Fields reset
        //==========================================
        
        function resetFieldsByType() {
            vm.customField.validation = 'do_not_apply';
            vm.customField.validation_custom_regex = null;
            vm.customField.default_value = null;
        }
        
        //==========================================
        // Prepare Data To Submit 
        //==========================================
        var transformData = function transformData() {

            var formData = angular.copy(vm.customField);
            
            formData.value = [];
            // load custom field items values
            if  (formData.field_type === 'drop_list' 
                    || formData.field_type === 'list'
                    || formData.field_type === 'check_box'
                    || formData.field_type === 'radio_button'
                ) {

                _.each(vm.ListValuesItems.ValuesItems, function (item, index) {
                    if (!_.isEmpty(item.value)) {
                        formData.value.push(item);
                    }
                });
                
                // Seteo la validacion por defecto si no es necesaria
                formData.validation = 'do_not_apply';
                formData.validation_custom_regex = null;
                
            } else {
                formData.value.push({text: '', value: formData.default_value});
                if(formData.validation !== 'custom') {
                    formData.validation_custom_regex = null;
                }
            }
            
            delete formData.default_value;                        
            return formData;
        };
        
        //==========================================
        // load entity Custom Field 
        //==========================================
        function loadCustomField(customField) {
            
            if (customField.field_type === 'drop_list' 
                    || customField.field_type === 'list'
                    || customField.field_type === 'check_box'
                    || customField.field_type === 'radio_button') {
                
                _.each(customField.value, function (item, index) {
                    vm.ListValuesItems.ValuesItems.push(item);
                });
                
                vm.showValidationField = false;
                vm.showList = true;
                
            } else {
                customField.default_value   =   _.pluck(customField.value,'value');
            }
            
            return customField;
        }
        
        //==========================================
        // Events 
        //==========================================
        vm.FieldTypeDropdown = function () {
            vm.fieldTypeTouched = true;    
            
            //mostrar lista de opciones
            if (vm.customField.field_type === 'drop_list' 
                    || vm.customField.field_type === 'list'
                    || vm.customField.field_type === 'check_box'
                    || vm.customField.field_type === 'radio_button') {
                
                vm.showList = true;
                vm.showValidationField = false;
                
                vm.ListValuesItems.ValuesItems = [{text: '', value: '', defaultValue: false}];
                
                resetFieldsByType();
                
            } else {
                vm.showList = false;
                vm.showValidationField = true;
            }
        };
        
        //==========================================
        // save
        //==========================================
        var save = function () {
            var prepareToSend = transformData();
            var deferred = $q.defer();
            if (!prepareToSend.id) {
                customFieldService.store(prepareToSend).then(function (result) {
                    deferred.resolve(result);
                }, function (result) {
                    deferred.reject(result);
                });
            } else {
                 customFieldService.update(prepareToSend.id, prepareToSend).then(function (result) {
                    deferred.resolve(result);
                }, function (result) {
                    deferred.reject(result);
                });
            }

            return deferred.promise;
        };
        
        vm.isSaveAndExit = false;
        vm.saveLoading = false;
        vm.save = function () {
            vm.saveLoading = true;
            save().then(function (result) {
                vm.saveLoading = false;
                messageService.success($translate.instant('customField.update_success_msg' ));
                $state.go('main.contacts.customfield-list');
            }, function (result) {
                vm.saveLoading = false;
                messageService.formError(result);
            });
        };
    };
    
})();
