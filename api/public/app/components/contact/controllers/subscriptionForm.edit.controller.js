(function () {
    'use strict';

    angular.module('contactModule').controller('subscriptionFormEditController', subscriptionFormEditController);
    
    function subscriptionFormEditController(subscriptionFormService, formPreviewService, messageService, $scope,$rootScope, $state, $stateParams, $q, $translate, $location) {
        var vm = this;
        $scope.loadingForm = true;
        $scope.enableCustomfieldEditFrame = false;

        // FORM ID
        $scope.formID   = angular.isDefined($stateParams.FormID) ? parseInt($stateParams.FormID) : 'new';
        
        function loadFormData() {
            $scope.loadingForm = true;
            $scope.formPreviewDataPromise = formPreviewService.getFormPreviewData($scope.formID);
            $scope.formPreviewDataPromise.then(function (formPreviewData) {    
                $scope.style = formPreviewData.style;
                $scope.form = formPreviewData.formConfig;
                //$scope.email = formPreviewData.emailConfig;
                $scope.formFields = formPreviewData.formFields;
                $scope.availableItems = formPreviewData.availableItems;

                /*$scope.form.personalizeConfirmationUrl = false;
                $scope.form.personalizeResultUrl = false;
                $scope.form.notifySuscription = false;

                $scope.$watch('form.ConfCallbackOK', function (val) {
                    if (val) {
                        $scope.form.personalizeConfirmationUrl = true;
                    }
                });
                $scope.$watch('form.SubsCallbackOK', function (val) {
                    if (val) {
                        $scope.form.personalizeResultUrl = true;
                    }
                });
                $scope.$watch('form.NotificationEmailAddress', function (val) {
                    if (val) {
                        $scope.form.notifySuscription = true;
                    }
                });*/
               $scope.loadingForm = false; 
            }, function (error) {
                messageService.error(error);
                $location.url('/contacts/forms');
            });
        };
        
        


        /*initial load */
        loadFormData();
        
        // Event $stateChangeStart : init Aplication
        $scope.$on('$stateChangeStart', function (e, next, current) {
            if (next.subView === 'edit' && $scope.formActions.discardChanges) {
                $scope.formActions.discardChanges = false;
                loadFormData();
            }
        });
        
        
        $scope.$on('$stateChangeSuccess', function (e, next, current) {
            console.log('$stateChangeSuccess');
            $scope.loadingForm = false;
        });
        
        //$scope.confirmationEmail = formPreviewService.getConfirmationEmailModel($scope.formID);
        $scope.formEditConfirmationTabs = {
            headerText: true
        };
        // 
        $scope.hideLoading = function () {
            $scope.loadingForm = false;
        };
        
        // Event Save
        function getSaveFormPromise(dataForm) {
            var promises;
            
            if(angular.isDefined(dataForm.id)) {
                promises = subscriptionFormService.update(dataForm.id, dataForm);
            } else {
                promises = subscriptionFormService.store(dataForm);
            }
            return promises;
        }
        // Action Forms
        $scope.formActions = {
            discardChanges: true,
            saveInnerChanges: function () {
                $scope.formActions.discardChanges = false;
                $scope.enableCustomfieldEditFrame = false;
                $location.url('/contacts/form/edit/' + $scope.formID);
            },
            goBack: function () {
                formPreviewService.resetModel();
                $scope.formActions.discardChanges = true;
                $location.url('/contacts/form/edit/' + $scope.formID);
            },
            saveFormData: function () {
                var dataForm = formPreviewService.getForm();  
                var saveFormPromise = getSaveFormPromise(dataForm);                
                
                saveFormPromise.then(function (result) {
                    messageService.success('Formulario guardado correctamente!');
                    $location.url('/contacts/forms');
                }, function (error) {
                    messageService.error(error);
                    /*if(error.data.code === "errorMsg_formValidations")  {
                        $.each(error.data.data, function(i, error){
                            if(error.length){
                                $scope.main.formSuscribe[i].$setValidity('url',false);
                            }
                        });
                        messageService.error('Tienes errores en alguno de los campos. Por favor verifícalos.');
                        return false;
                    }
                    messageService.error('Ocurrió un error al guardar el Formulario. Intente nuevamente o contacte a soporte');*/

                });
            }
        };
        
        //Integración
        if ($scope.formID) {
            //$scope.facebookLink = "https://apps.facebook.com/envialosimple/?FormID=" + $scope.formID + "&AdminID=" + ADMINISTRATOR.AdministratorID;
           // $scope.qrLink = $location.protocol() + "://" + $location.host() + '/form/qr/format/json?moduleSize=16&FormID=' + $scope.formID;
            //$scope.formSnippet = '<script type="text/javascript" src="' + $location.protocol() + "://" + $location.host() + '/form/renderwidget/format/widget/AdministratorID/' + ADMINISTRATOR.AdministratorID + '/FormID/' + $scope.formID +  '/Lang/' + ENVIRONMENT.lang + '"></script>';
            $scope.formSnippet = '<script type="text/javascript" src="http://localhost:3000/form/renderwidget/format/html/AdministratorID/ADMIN_ID/FormID/FORMID/Lang/LANGUAGE"></script>';
        }

        //Previsualización
        $scope.openFormPreview = function(){
            //var url = $location.protocol() + "://" + $location.host() + '/form/renderwidget/format/html/AdministratorID/' + ADMINISTRATOR.AdministratorID + '/FormID/' + $scope.formID + '/Lang/' + ENVIRONMENT.lang;
            var url = "http://localhost:3000/form/renderwidget/format/html/AdministratorID/ADMIN_ID/FormID/FORMID/Lang/LANGUAGE";
            $timeout(function(){
                window.open(url, 'Previsualización', 'scrollbars=yes,menubar=no,resizable=1,location=no,width=800,height=530');
            });
        };
        
    }
    
})();
