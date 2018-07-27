'use strict';
(function () {
    'use strict';

    angular
        .module('global.service')
        .service('formPreviewService', formPreviewService);

    formPreviewService.$inject = ['$q', 'styleModelService', 'customFieldService', 'subscriptionFormService'];

    function formPreviewService( $q, styleModelService, customFieldService, subscriptionFormService ) {

        var self = this;
        
        // --------------------------------
        // Vars
        // --------------------------------
        var styleModel  = styleModelService.getStyleModel();
        var fieldToEdit = null;
        var formFields = [];
        var availableItems = [];
        var formConfig = {
            id: '',
            lists_ids: [],
            custom_fields_ids: [],
            //confirmSubscriptionEmailID: '',
            name: 'Nuevo formulario',
            //subsCallbackOK: '',
            //subsCallbackFail: '',
            //confCallbackOK: '',
            //confCallbackFail: '',
            //notificationEmailAddress: '',
            //showPoweredBy: 0,
            //subscribeDobleOptIN: false
        };

        /*var emailConfig = {
            fromID: 1,
            replyToID: 1,
            name: 'Nuevo formulario',
            subject: 'Confirmación de suscripción',
            content: '',
            contentAlternate: '',
            autoContentAlternate: 1,
            workspaceType: 'designer',
            historyLabel: 'defaultMessage'
        };*/

       /*var confirmationEmailSendModel = {
            Header: {
                Text: 'Enviar',
                Image: '',
                Appearance: {
                    BackgroundColor: '#FFF',
                    Align: 'center',
                    Font: 'Tahoma',
                    FontWeight: 300,
                    Color: '#000',
                    ImageWidth: '',
                    ImageHeight: ''
                }
            },
            Body: {
                Appearance: {
                    BackgroundColor: '#FFF'
                }
            },
            BodyText: {
                Text: 'Recibimos tu solicitud de suscripción a nuestra lista de correo. Por favor confirma tu suscripción',
                Appearance: {
                    BackgroundColor: '#FFF',
                    Align: 'center',
                    Font: 'Tahoma',
                    FontWeight: 300,
                    Color: '#000',
                    ContrastColor: '#000'
                }
            },
            BodyLink: {
                Text: 'Si, deseo suscribirme',
                Appearance: {
                    Color: '#383838',
                    BackgroundColor: '#FFF'
                }
            }
        };*/

        // --------------------------------
        // Method Globals
        // --------------------------------
        self.setFieldToEdit = function (field) {
            fieldToEdit = field;
        };
        self.getFieldToEdit = function () {
            return fieldToEdit;
        };

        self.getViewModel = function () {
            return  styleModel;
        };
        

        var fixedFormItems = [
            {
                field_type: "custom_text",
                CustomTextPreset: '',
                Text: 'Texto de Ejemplo',
                ShowInList: false,
                AddToForm: false,
                CanRepeat: true,
                EditClass: 'form-custom-text'
            },
            {
                field_type: "custom_text",
                CustomTextPreset: 'Title',
                Text: 'Suscríbete al Newsletter',
                ShowInList: false,
                AddToForm: true,
                CanRepeat: false,
                EditClass: 'form-custom-text'
            },
            {
                field_type: "custom_text",
                CustomTextPreset: 'Description',
                Text: 'Suscríbete para recibir novedades, ofertas especiales, noticias tecnológicas e invitaciones a nuestros exclusivos eventos.',
                ShowInList: false,
                AddToForm: true,
                CanRepeat: false,
                EditClass: 'form-custom-text'
            },
            {
                field_type: "email",
                Title: "Email",
                CustomLabel: '',
                ShowInList: false,
                AddToForm: true,
                Label: 'Email',
                CanRepeat: false,
                EditClass: 'form-fields',
                Required: true

            },
            {
                field_type: "button",
                Title: "Enviar",
                CustomLabel: '',
                ShowInList: false,
                AddToForm: true,
                CanRepeat: false,
                Label: 'Enviar',
                EditClass: 'form-button'
            },
            {
                field_type: "PoweredBy",
                Title: "Powered by:",
                ImageUrl: '/assets/list/logo-es.jpg',
                CustomLabel: '',
                ShowInList: false,
                AddToForm: false,
                CanRepeat: false,
                Label: 'Enviar',
                EditClass: ''
            }
        ];


        var dataModel = {
            formConfig: angular.copy(formConfig),
            //emailConfig: angular.copy(emailConfig),
            formFields: angular.copy(formFields),
            availableItems: angular.copy(availableItems),
            style: angular.copy(styleModel)
        };

        self.resetModel = function () {
            self.formInitialized = false;
            self.emailInitialized = false;
            dataModel.formConfig = angular.copy(formConfig);
            //dataModel.emailConfig = angular.copy(emailConfig);
            dataModel.formFields = angular.copy(formFields);
            dataModel.availableItems = angular.copy(availableItems);
            dataModel.style = angular.copy(styleModel);
        };


        self.formInitialized = false;
        self.getFormPreviewData = function (formID) {

            return $q(function (resolve, reject) {
                if (self.formInitialized) {
                    resolve(dataModel);
                } else {
                    if (formID === 'new') {
                       initializeFormComponents(dataModel, []);
                    } else {
                         subscriptionFormService.find(formID, {cache: false}).then(function (FormEditData) {
                            //self.resetModel();
                            generateModelFromData(FormEditData,  dataModel);

                            /*if (angular.isDefined(maillistService.formEdit.Data.email)) {
                                confirmationEmailModelFetched = maillistService.formEdit.Data.email;
                                generateEmailModelFromData(confirmationEmailModelFetched.design_data);
                            }*/

                            resolve(dataModel);
                        }, function (error) {
                            reject(error);
                        });
                    }

//                    confirmationEmailModelSend = angular.copy(confirmationEmailModel);Restangular.one('me', '').withHttpConfig(httpConfig).get(param)
                    self.formInitialized = true;
                    resolve(dataModel);
                }
            });
        };




        var initializeFormComponents = function (dataModel, formFieldsFetched) {

            var customFieldsList;

            customFieldService.get().then(function (result) {

                customFieldsList = result;
                
                $.each(customFieldsList, function (i, customfield) {
                    customfield.used = false;
                    customfield.ShowInList = true;
                    customfield.EditClass = 'form-fields';
                    customfield.Label = customfield.name;
                    customfield.Required = false;
                    
                    switch(customfield.field_type) {
                        case 'radio_button':
                            customfield.RenderType = "radio";
                            customfield.RenderLikeRadio = true;
                            break;
                        case 'drop_list':
                        case 'check_box':
                            customfield.RenderType = "drop";
                            customfield.RenderLikeRadio = false;
                            break;
                        case 'text_field':
                            customfield.RenderType = "input";
                            customfield.RenderLikeTextarea = false;
                            break;
                        case 'text_area':
                            customfield.RenderType = "textarea";
                            customfield.field_type = 'text_field';
                            customfield.RenderLikeTextarea = true;
                            break;
                    }

                    dataModel.availableItems.push(customfield);

                    $.each(formFieldsFetched, function (i, formItem) {
                        console.log(formItem);
                        if (formItem.id === customfield.id) {
                            //formItem.Values = {Option: getFieldCaptions(customfield.value)};
                            formItem.field_type = customfield.field_type;
                            formItem.Title = customfield.name;
                            formItem.used = true;
                            customfield.used = true;
                        }
                    });
                });


                if (formFieldsFetched.length > 0) {

                    var fixedItem = fixedFormItems[0];
                    fixedItem.style = dataModel.style.setCustomTextProperties(null, fixedItem.CustomTextPreset, true);
                    fixedItem.used = false;
                    dataModel.availableItems.push(fixedItem);


                    $.each(formFieldsFetched, function (i, formItem) {
                        if (angular.isDefined(formItem.field_type) && formItem.field_type === 'custom_text') {
                            formItem.EditClass = 'form-custom-text';
                            formItem.style = {};
                            formItem.style.css = {};
                            formItem.style.fontColorSelected = formItem.Appearance.Color;
                            formItem.style.fontSelected = dataModel.style.getFontObject(formItem.Appearance.Font, dataModel.style.fontList);
                            formItem.style.fontSizeSelected = formItem.Appearance.FontSize;
                            formItem.style.fontStyleSelected = formItem.Appearance.FontStyle;
                            formItem.style.fontWeightSelected = dataModel.style.getFontObject(formItem.Appearance.FontWeight, dataModel.style.fontWeightList);
                            formItem.style.textAlignSelected = formItem.Appearance.TextAlign;
                            formItem.style.textDecorationSelected = formItem.Appearance.TextDecoration;
                            formItem.style = dataModel.style.setCustomTextProperties(formItem, '', false);

                        } else if (angular.isDefined(formItem.field_type) && formItem.field_type === 'button') {
                            formItem.EditClass = 'form-button';
                            dataModel.style.button.containerAligment = formItem.Appearance.Align;
                            dataModel.style.button.backgroundColorSelected = formItem.Appearance.BackgroundColor;
                            dataModel.style.button.borderColorSelected = formItem.Appearance.BorderColor;
                            dataModel.style.button.borderRadiusSelected = formItem.Appearance.BorderRadius;
                            dataModel.style.button.borderWidthSelected = formItem.Appearance.BorderWidth;
                            dataModel.style.button.fontColorSelected = formItem.Appearance.Color;
                            dataModel.style.button.fontSelected = dataModel.style.getFontObject(formItem.Appearance.Font, dataModel.style.fontList);
                            dataModel.style.button.fontSizeSelected = formItem.Appearance.FontSize;
                            dataModel.style.button.fontStyleSelected = formItem.Appearance.FontStyle;
                            dataModel.style.button.fontWeightSelected = dataModel.style.getFontObject(formItem.Appearance.FontWeight, dataModel.style.fontWeightList);
                            dataModel.style.button.heightSelected = formItem.Appearance.Height;
                            dataModel.style.button.widthSelected = formItem.Appearance.Width;
                            dataModel.style.button.textDecorationSelected = formItem.Appearance.TextDecoration;
                        } else {
                            formItem.EditClass = 'form-fields';
                        }
                        if (angular.isDefined(formItem.id)) {
                            if (dataModel.formConfig.custom_fields_ids_required.indexOf(parseInt(formItem.id)) > -1) {
                                formItem.Required = true;
                            }
                        }

                        delete formItem.Appearance;
                        dataModel.formFields.push(formItem);
                    });


                    if (dataModel.formFields.indexOf(fixedFormItems[fixedFormItems.length - 1 ]) === -1) {
                        dataModel.formFields.push(fixedFormItems[fixedFormItems.length - 1 ]);
                    }



                } else {
                    $.each(fixedFormItems, function (i, fixedItem) {

                        fixedItem.used = true;
                        fixedItem.ShowInList = false;
                        if (fixedItem.field_type === "custom_text") {
                            fixedItem.style = dataModel.style.setCustomTextProperties(null, fixedItem.CustomTextPreset, true);
                            fixedItem.used = false;
                        }

                        dataModel.availableItems.push(fixedItem);
                        if (fixedItem.AddToForm) {
                            dataModel.formFields.push(fixedItem);
                        }
                    });
                }

            });

        };

        var getFieldCaptions = function (field) {
            if (!angular.isDefined(field.OptionLabels)) {
                return field.Values.Option;
            }
            var values = [];

            $.each(field.OptionLabels, function (i, optionLabel) {
                var value = {
                    Name: optionLabel.name,
                    Selected: optionLabel.defaultValue,
                    Value: optionLabel.value
                };
                values.push(value);
            });
            return values;
        };

        self.getFieldRenderType = function (field) {

            var renderType;
            if (angular.isDefined(field.RenderLikeRadio)) {
                if (field.RenderLikeRadio) {
                    renderType = 'radio';
                } else {
                    renderType = 'drop';
                }
            }
            if (angular.isDefined(field.RenderLikeTextarea)) {
                if (field.RenderLikeTextarea) {
                    renderType = 'textarea';
                } else {
                    renderType = 'input';
                }
            }

            return renderType;
        };

        //get for send form
        self.getForm = function () {

            

                var design_data = prepareStyleDataToSend(dataModel);

                /*var emailConfigSend = {
                    //ConfirmationDesignData: generateEmailSendData(),
                    subscribeDobleOptIN: dataModel.formConfig.subscribeDobleOptIN ? 1 : 0,
                    confirmationSubject: dataModel.emailConfig.subject,
                    fromID: dataModel.emailConfig.fromID,
                    replyToID: dataModel.emailConfig.replyToID
                };
                if (!dataModel.formConfig.subscribeDobleOptIN) {
                    delete emailConfigSend.fromID;
                    delete emailConfigSend.replyToID;
                }*/

                /*if (!dataModel.formConfig.personalizeConfirmationUrl) {
                    dataModel.formConfig.confCallbackOK = '';
                    dataModel.formConfig.confCallbackFail = '';
                }
                if (!dataModel.formConfig.personalizeResultUrl) {
                    dataModel.formConfig.subsCallbackOK = '';
                    dataModel.formConfig.subsCallbackFail = '';
                }
                if (!dataModel.formConfig.notifySuscription) {
                    dataModel.formConfig.notificationEmailAddress = '';
                }*/

                //var formDatatoSend = angular.extend(dataModel.formConfig, {design_data: designData}, emailConfigSend);
                var formDatatoSend = angular.extend(dataModel.formConfig, { design_data : design_data });

                var custom_fields_ids = [];
                var custom_fields_ids_required = [];
                $.each(formDatatoSend.design_data.FormFields, function (i, formField) {
                    if (angular.isDefined(formField.id)) {
                        custom_fields_ids.push(formField.id);

                        if (angular.isDefined(formField.Required) && formField.Required) {
                            custom_fields_ids_required.push(formField.id);
                        }
                    }
                });

                formDatatoSend.custom_fields_ids = custom_fields_ids;
                formDatatoSend.custom_fields_ids_required = custom_fields_ids_required;
                
                // elimino las variables que no necesito
                
                if (!formDatatoSend.id) {
                    delete formDatatoSend.id;
                }
                
                /*if (formDatatoSend.customFieldsIds.length < 1) {
                    delete formDatatoSend.customFieldsIds;
                }

                if (formDatatoSend.customFieldsRequired.length < 1) {
                    delete formDatatoSend.customFieldsRequired;
                }*/

                delete formDatatoSend.BackgroundColor;
                delete formDatatoSend.CustomCSS;
                delete formDatatoSend.Font;
                delete formDatatoSend.FontColor;
                delete formDatatoSend.FontSize;
                delete formDatatoSend.LabelEmailAddress;
                delete formDatatoSend.LabelSubmit;
                delete formDatatoSend.Width;

                /*maillistService.formEditSave.fetch({data: formDatatoSend})
                        .then(function (data) {
                            resolve(data);
                        }, function (error) {
                            reject(error);
                        });*/
                
                return formDatatoSend;


                

        };

        var generateModelFromData = function (dataModelFetched) {

            var formFetched = dataModelFetched.form;
            setModelConfigData(dataModel, dataModelFetched);
            initializeFormComponents(dataModel, formFetched.design_data.FormFields);

            dataModel.style.container.borderColorSelected = formFetched.design_data.GeneralStyles.Container.BorderColor;
            dataModel.style.container.backgroundColorSelected = formFetched.design_data.GeneralStyles.Container.BackgroundColor;
            dataModel.style.container.borderWidthSelected = formFetched.design_data.GeneralStyles.Container.BorderWidth;
            dataModel.style.container.borderRadiusSelected = formFetched.design_data.GeneralStyles.Container.BorderRadius;

            dataModel.style.input.borderRadiusSelected = formFetched.design_data.GeneralStyles.Input.BorderRadius;
            dataModel.style.input.backgroundColorSelected = formFetched.design_data.GeneralStyles.Input.BackgroundColor;
            dataModel.style.input.borderWidthSelected = formFetched.design_data.GeneralStyles.Input.BorderWidth;
            dataModel.style.input.borderColorSelected = formFetched.design_data.GeneralStyles.Input.BorderColor;
            dataModel.style.input.fontColorSelected = formFetched.design_data.GeneralStyles.Input.TextColor;
            dataModel.style.label.fontColorSelected = formFetched.design_data.GeneralStyles.Input.LabelColor;
            dataModel.style.radioCheckbox.fontColorSelected = formFetched.design_data.GeneralStyles.Input.OptionColor;
            dataModel.style.input.fontSelected = dataModel.style.getFontObject(formFetched.design_data.GeneralStyles.Input.Font, dataModel.style.fontList);
            dataModel.style.input.fontSizeSelected = formFetched.design_data.GeneralStyles.Input.FontSize;
            dataModel.style.input.fontStyleSelected = formFetched.design_data.GeneralStyles.Input.FontStyle;
            dataModel.style.input.fontWeightSelected = dataModel.style.getFontObject(formFetched.design_data.GeneralStyles.Input.FontWeight, dataModel.style.fontWeightList);
            dataModel.style.input.heightSelected = formFetched.design_data.GeneralStyles.Input.Height;
            dataModel.style.input.textAlignSelected = formFetched.design_data.GeneralStyles.Input.TextAlign;

            return dataModel;
        };


        var setModelConfigData = function (dataModel, dataModelFetched) {

            var formFetched = dataModelFetched.form;
            //var emailFetched = dataModelFetched.email;
            dataModel.formConfig.id = formFetched.id;
            dataModel.formConfig.lists_ids = formFetched.lists_ids;
            dataModel.formConfig.custom_fields_ids = formFetched.custom_fields_ids;
            dataModel.formConfig.custom_fields_ids_required = formFetched.custom_fields_ids_required;
            //dataModel.formConfig.confirmSubscriptionEmailID = '';
            dataModel.formConfig.name = formFetched.name;
            //dataModel.formConfig.subsCallbackOK = formFetched.SubsCallbackOK;
            //dataModel.formConfig.subsCallbackFail = formFetched.SubsCallbackFail;
            //dataModel.formConfig.confCallbackOK = formFetched.ConfCallbackOK;
            //dataModel.formConfig.confCallbackFail = formFetched.ConfCallbackFail;
            //dataModel.formConfig.notificationEmailAddress = formFetched.NotificationEmailAddress;
            //dataModel.formConfig.ShowPoweredBy = formFetched.ShowPoweredBy;
            //dataModel.formConfig.subscribeDobleOptIN = !!formFetched.SubscribeDobleOptIN;

            /*if (dataModel.formConfig.SubscribeDobleOptIN) {
                dataModel.emailConfig.subject = emailFetched.Subject;
                dataModel.emailConfig.replyToID = parseInt(emailFetched.ReplyToID);
                dataModel.emailConfig.fromID = parseInt(emailFetched.FromID);
                dataModel.emailConfig.returnPathEmail = parseInt(emailFetched.ReturnPathEmail);
            }*/

            return dataModel;
        };


        var prepareStyleDataToSend = function (data) {

            var styleModelToSend = angular.copy(data.style);


            var modelToSend = {
                FormFields: [],
                GeneralStyles: {
                    Container: {
                        BackgroundColor: styleModelToSend.container.backgroundColorSelected,
                        BorderWidth: styleModelToSend.container.borderWidthSelected,
                        BorderColor: styleModelToSend.container.borderColorSelected,
                        BorderRadius: styleModelToSend.container.borderRadiusSelected,
                        Height: styleModelToSend.container.heightSelected,
                        Width: styleModelToSend.container.widthSelected
                    },
                    Input: {
                        BackgroundColor: styleModelToSend.input.backgroundColorSelected,
                        BorderWidth: styleModelToSend.input.borderWidthSelected,
                        BorderColor: styleModelToSend.input.borderColorSelected,
                        BorderRadius: styleModelToSend.input.borderRadiusSelected,
                        TextColor: styleModelToSend.input.fontColorSelected,
                        LabelColor: styleModelToSend.label.fontColorSelected,
                        OptionColor: styleModelToSend.radioCheckbox.fontColorSelected,
                        Font: styleModelToSend.input.fontSelected.value,
                        FontSize: styleModelToSend.input.fontSizeSelected,
                        FontStyle: styleModelToSend.input.fontStyleSelected,
                        FontWeight: styleModelToSend.input.fontWeightSelected.value,
                        Height: styleModelToSend.input.heightSelected,
                        Width: styleModelToSend.input.widthSelected,
                        TextAlign: styleModelToSend.input.textAlignSelected,
                        TextDecoration: styleModelToSend.input.textDecorationSelected
                    }
                }
            };

            $.each(angular.copy(data.formFields), function (i, formItem) {

                var formItemAux = angular.copy(formItem);
                if (formItem.field_type === 'custom_text') {

                    formItemAux.Appearance = {
                        Color: formItemAux.style.fontColorSelected,
                        Font: formItemAux.style.fontSelected.value,
                        FontSize: formItemAux.style.fontSizeSelected,
                        FontStyle: formItemAux.style.fontStyleSelected,
                        FontWeight: formItemAux.style.fontWeightSelected.value,
                        TextAlign: formItemAux.style.textAlignSelected,
                        TextDecoration: formItemAux.style.textDecorationSelected
                    };
                    delete formItemAux.style;

                }
                if (formItem.field_type === 'button') {
                    formItemAux.Appearance = {
                        Font: styleModelToSend.button.fontSelected.value,
                        FontWeight: styleModelToSend.button.fontWeightSelected.value,
                        FontStyle: styleModelToSend.button.fontStyleSelected,
                        FontSize: styleModelToSend.button.fontSizeSelected,
                        Color: styleModelToSend.button.fontColorSelected,
                        TextDecoration: styleModelToSend.button.textDecorationSelected,
                        Width: styleModelToSend.button.widthSelected,
                        Height: styleModelToSend.button.heightSelected,
                        BackgroundColor: styleModelToSend.button.backgroundColorSelected,
                        BorderColor: styleModelToSend.button.borderColorSelected,
                        BorderRadius: styleModelToSend.button.borderRadiusSelected,
                        BorderWidth: styleModelToSend.button.borderWidthSelected,
                        Align: styleModelToSend.button.containerAligment
                    };
                }

                if (formItemAux.field_type === 'radio_button' || formItemAux.field_type === 'list' || formItemAux.field_type === 'drop_list' || formItemAux.field_type === 'check_box') {
                    
                    console.log(formItemAux);
                    formItemAux.OptionLabels = formItemAux.value;

                   /* $.each(formItemAux.OptionLabels, function (i, label) {
                        label.Caption = label.value;
                        //delete label.value;
                    });

                    delete formItemAux.Values;*/
                }

                if (angular.isDefined(formItem.CustomFieldID)) {
                    delete formItemAux.field_type;
                }

                if (angular.isDefined(formItem.RenderType)) {
                    formItemAux.RenderType = formItem.RenderType;
                }

                if (angular.isDefined(formItemAux.RenderLikeRadio)) {
                    delete formItemAux.RenderLikeRadio;
                }
                if (angular.isDefined(formItemAux.RenderLikeTextarea)) {
                    delete formItemAux.RenderLikeTextarea;
                }

                delete formItemAux.ShowInList;
                delete formItemAux.CustomTextPreset;
                delete formItemAux.CustomLabel;
                delete formItemAux.Title;
                delete formItemAux.IsMultipleSelect;
                delete formItemAux.Validation;
                delete formItemAux.ValidationCustomRegExp;
                delete formItemAux.Values;
                delete formItemAux.RelAdministratorID;
                delete formItemAux.AddToForm;
                delete formItemAux.CanRepeat;
                delete formItemAux.EditClass;
                delete formItemAux.used;
                delete formItemAux.showToolbar;
                delete formItemAux.showBorder;
                modelToSend.FormFields.push(formItemAux);
            });
            return modelToSend;
        };

    }

})();