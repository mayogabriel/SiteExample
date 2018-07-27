(function () {
    'use strict';

    angular.module('contactModule').controller('ListFormController', ListFormController);
    function ListFormController(listService, messageService, toaster, $q, $state, $translate, $stateParams) {
        var vm = this;
        
        vm.list  =  null;        
        if($stateParams.ListID) {
            listService.find($stateParams.ListID, {cache: false}).then( function (result) {
                vm.list =  result;
                console.log(vm.list);
            }, function (error) {
                messageService.error(error);
                $state.go('main.contacts.lists-list');
            });
        }
        //==========================================
        // save
        //==========================================
        var save = function () {
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
                $state.go('main.contacts.lists-list');
                vm.user = result;

            }, function (result) {
                vm.saveLoading = false;
                messageService.formError(result);
            });
        };
    }
})();