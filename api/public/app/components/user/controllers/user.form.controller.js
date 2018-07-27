(function () {
    'use strict';

    angular.module('userModule').controller('UserFormController', UserFormController);
    
    UserFormController.$inject = ['userService', 'messageService', 'toaster', '$stateParams', '$translate', '$location', '$q', 'roleService', '$state', 'languageService', '$timeout', 'breadcrumbService'];
    
    function UserFormController(userService, messageService, toaster, $stateParams, $translate, $location, $q, roleService, $state, languageService, $timeout, breadcrumbService) {
        var vm = this;
        
        //==========================================
        // BREADCRUMB
        //==========================================
        var textBreadcrumb = 'Nuevo Usuario';
        var linkBreadcrumb = $stateParams.UserID ? 'main.users.edit({UserID:'+ $stateParams.UserID +'})' : '.';
        breadcrumbService.clearAll();
        breadcrumbService.add('Usuarios', 'main.users.list');
       
        
        
        
        //==========================================
        // Load Data Async
        //==========================================
        languageService.get().then(function (result) {
            vm.languages = result;
        });      
        
        vm.roles = [];
        vm.rolesSelectedIDs = [];
            
        roleService.get({permissions:0}).then(function (result) {
            vm.roles = result;
        });
        
        //==========================================
        // UI Collapsible
        //==========================================
        vm.collapsibleClass = null;
        
        
        //==========================================
        // Load Entity
        //==========================================
        if(!_.isUndefined($stateParams.UserID)) {        
            if (/^[0-9]*$/.test($stateParams.UserID)) {
                userService.find($stateParams.UserID, {cache: false}).then( function (result) {
                    vm.user =  result;
                    vm.rolesSelectedIDs = _.pluck(vm.user.roles, 'id');
                    textBreadcrumb = vm.user.getFullName() ;
                    breadcrumbService.add(textBreadcrumb, linkBreadcrumb);
                }, function () {
                    $state.go('main.users.list');
                }).finally(function(){ 
                    $timeout(function() {
                        vm.collapsibleClass    =   true;
                    }, 300);
                });
            }
        } else {
            vm.user = userService.init();
            breadcrumbService.add(textBreadcrumb, linkBreadcrumb);
            $timeout(function() {
                vm.collapsibleClass    =   true;
            }, 300);
        } 
        
        //==========================================
        // Date Picker
        //==========================================
        var currentTime = new Date();
        vm.years = 90;
        vm.minDate = (new Date(currentTime.getTime() - ( 1000 * 60* 60 * 24 * 30 * 12 * vm.years ))).toISOString();
        vm.maxDate = (new Date(currentTime.getTime() + ( 1000 * 60 * 60 ))).toISOString();        
        
        //==========================================
        // save
        //==========================================
        var save = function () {
            var user = angular.copy(vm.user);
            user.roles =  angular.copy(vm.rolesSelectedIDs);
            var deferred = $q.defer();
            if (user.id !== '') {
                userService.update(user.id, user).then(function (result) {
                    deferred.resolve(result);
                }, function (result) {
                    deferred.reject(result);
                });
            } else {
                userService.store(user).then(function (result) {
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
                toaster.pop('success', '', $translate.instant('user.' + (vm.user.id !== '' ? 'update_success_msg' : 'create_success_msg')));
                if (vm.isSaveAndExit) {
                    $state.go('main.users.list');
                } else if (vm.user.id === '') {
                    $state.go('main.user.edit', {id: result.id});
                } else {
                    vm.user = result;
                }
            }, function (result) {
                vm.saveLoading = false;
                messageService.formError(result);
            });
        };

        vm.saveAndExit = function () {
            vm.isSaveAndExit = true;
            vm.save();
        };

        //==========================================
        // Delete
        //==========================================
        vm.deleteLoading = false;
        vm.delete = function () {
            if (vm.user.id !== '') {
                vm.deleteLoading = true;
                userService.destroy(vm.user.id).then(function () {
                    toaster.pop('success', '', $translate.instant('user.delete_success_msg'));
                    $location.path('/users');
                }, function (error) {
                    vm.deleteLoading = false;
                    toaster.pop('success', '', $translate.instant('user.delete_error_msg'));
                });
            }

        };
        
        
        /*vm.breadcrumb = [{
                            text : 'Usuarios',
                            state : 'main.users.list'
                        }];*/
        
    }
})();
