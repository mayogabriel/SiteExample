(function () {
    'use strict';

    angular.module('contactModule').controller('ListImportController', ListImportController);
    function ListImportController($scope, $location, Upload, $timeout) {
        var vm = this;
        
        $scope.Upload = Upload;
        
        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'http://api.newsmaker2016.local.powersite.com.ar/api/contacts/lists/import/upload',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
                
                file.upload.catch(function(errorCallback){});
                file.upload.finally(function(callback, notifyCallback){});
            }   
        };
        
        $scope.abortUpload = function() {
            $scope.Upload.abort();
        };
        
        
        //vm.list  = null;
        
        /*vm.importActions = {
            importCsv: function () {
            },
            importCopyPaste: function () {
                $location.url('list/import/copypaste/' + $scope.route.pathParams.MailListID);
            }
        };
        
        $scope.uploader = new FileUploader();
        
        $scope.uploader.url = "http://localhost:8000/api/contacts/lists/import/upload";
        $scope.uploader.alias = "nqfile";
        $scope.uploader.autoUpload = true;

        /*if ($scope.route.pathParams.MailListID && $scope.import.maillistIDs.length === 0) {
            vm.import.maillistIDs.length = 0;
            vm.import.maillistIDs.push(parseInt($scope.route.pathParams.MailListID));
        }*/

        /*$scope.uploader.onAfterAddingAll = function (item) {

            var fileName = item[0].file.name;
            var fileSize = item[0].file.size;


            if (fileSize > 30000000) {
                //notificationService.notify(i18n('Tamaño máximo de archivo 30MB'), 'error');
                $scope.uploader.clearQueue();
                $scope.uploader.cancelAll();
            }

            var fileAux = fileName.split('.');
            var fileExtension = angular.isDefined(fileAux[1]) ? fileAux[1] : 'aaa';

            var allowedExtensions = ['csv', 'txt'];

            if (allowedExtensions.indexOf(fileExtension) === -1) {
                //notificationService.notify(i18n('Extensión inválida. Solo se permite .csv y .txt'), 'error');
                $scope.uploader.clearQueue();
                $scope.uploader.cancelAll();
            }

        };

        $scope.uploader.onProgressAll = function (progress) {
            $scope.uploadProgress = progress + "%";
        };

        $scope.uploader.onSuccessItem = function (item, response, status, headers) {

            if (angular.isDefined(response.result) && response.result.success) {
                $location.url('/list/import/preprocess/' + $scope.route.pathParams.MailListID);
            } else {
                //notificationService.notify(i18n('Ha ocurrido un error. Intente nuevamente'), 'error');
            }

        };
        $scope.uploader.onErrorItem = function (item, response, status, headers) {
            //notificationService.notify(i18n('Ha ocurrido un error. Intente nuevamente'), 'error');
        };
        
        //================================================
        // Upload
        //================================================
        /*vm.files = [];
        $scope.$watch('listCtrl.files', function () {
            console.log('sd');
            vm.upload(vm.files);
        });*/
        
        //==========================================
        // save
        //==========================================
        /*var save = function () {
            var list = angular.copy(vm.list);
            var deferred = $q.defer();
            
            if (list.id) {
                listService.update(list.id, list).then(function (result) {
                    deferred.resolve(result);
                }, function (result) {
                    deferred.reject(result);
                });
            } else {
                listService.store(list).then(function (result) {
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
                toaster.pop('success', '', $translate.instant('list.create_success_msg'));
                
                $state.go('main.contacts.list');
                vm.user = result;

            }, function (result) {
                vm.saveLoading = false;
                messageService.formError(result);
            });
        };*/
    }
})();


/**
 * CONTACT IMPORT COPYPASTE
 */
angular.module('contactModule').controller('ListImportCopyPasteController', ListImportCopyPasteController);

function ListImportCopyPasteController($scope, listService, messageService, toaster, $q, $state, $translate, $location) {
        /*if ($scope.import.maillistIDs.length < 1) {
           // notificationService.notify(i18n('No has seleccionado ninguna lista de contactos'), "error")
            $location.url('/list/import');
        } else {

            /*maillistService.selectSource.fetch({
                query: {MailListsIds: $scope.import.maillistIDs}
            }).then(function () {
                //Todo ok, prosigo con la importacion
            }, function () {
                notify(i18n("Ocurrió un error, intente nuevamente"), "error");
                $location.url('/list/import');
            });*/
        /*}

        $scope.importMembers = {
            MailListsIds: $scope.import.maillistIDs,
            CopyPaste: ''
        };

        $scope.copyPasteLoadMembers = function () {

            if ($scope.importMembers.CopyPaste === '') {
                //notificationService.notify(i18n('Debe ingresar sus contactos'), 'error');
                return false;
            }

            /*maillistService.copyPaste.fetch({
                data: $scope.importMembers
            }).then(function () {
                //todo OK , mando a preprocess
                $location.url('/list/import/preprocess/'+$scope.route.pathParams.MailListID);
            }, function () {
                //fail
                notificationService.notify(i18n('Ha ocurrido un error. Intente nuevamente'), 'error');
            });*/
       // };
}