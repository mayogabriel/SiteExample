(function () {
    'use strict';

    angular.module('contactModule').run(function (Restangular, $filter) {
        //================================================
        // Restangular init
        //================================================ 
        Restangular.extendModel('contacts/customFields', customFieldRestangularModel);
        
        function customFieldRestangularModel(model) {
            
            model.FieldTypeItems = function () {
                return  [
                            {value: 'text_field', text: 'Campo de texto'},
                            {value: 'hidden_field', text: 'Campo oculto'},
                            {value: 'check_box', text: 'Listado con selección múltiple'},
                            {value: 'radio_button', text: 'Listado con selección única'},
                        ];
            };
            
            model.GetLabelFieldType = function () {
                // return an array with only types objects
                var LabelFieldType = $filter('filter')(model.FieldTypeItems(), { value: model.field_type });
                return LabelFieldType[0].text;
            };
            
            model.ValidationItems = function () {
                return  [
                            {value: 'do_not_apply', text: 'Desactivar'},
                            {value: 'numeric_only', text: 'Aceptar solo dígitos (sin espacios)'},
                            {value: 'alpha_only', text: 'Aceptar solo letras y espacios'},
                            {value: 'alpha_numeric_only', text: 'Aceptar solo letras, números y espacios'},
                            {value: 'email_format_check', text: 'Aceptar solo direcciones de Email'},
                            {value: 'custom', text: 'Custom'}
                        ];
            };
            
            /*model.init = function () {
                _.extend(model, {
                    id: null,
                    name: '',
                    field_type: null,
                    validation: 'do_not_apply',
                    validation_custom_regex: '',
                    default_value: '',
                    items_is_multiple_select: false
                });
            };*/
            
            // data event ===================================================
            /*if (!model.id) {
                model.init();
            }*/
            return model;
        }

    });
})();
