(function () {
    'use strict';

    angular.module('userModule').controller('AccountFormController', AccountFormController);
    
    function AccountFormController($scope, userService, messageService, toaster, $translate, $location, $q, $state, $timeout, languageService, subNavigationMenu, breadcrumbService) {
        var vm = this;
        
        //==========================================
        // BREADCRUMB
        //==========================================
        breadcrumbService.clearAll();
        breadcrumbService.add('Mis datos', 'main.user-account');
        
        //==========================================
        // Sub Nav
        //==========================================
        subNavigationMenu.clearAll();
        
        //==========================================
        // Load Data 
        //==========================================
        languageService.get().then(function (result) {
            vm.languages = result;
        });      
        
        //==========================================
        // UI Collapsible
        //==========================================
        vm.collapsibleClass = null;
        
        
        //==========================================
        // Date Picker
        //==========================================
        var currentTime = new Date();
        vm.years = 90;
        vm.minDate = (new Date(currentTime.getTime() - ( 1000 * 60* 60 * 24 * 30 * 12 * vm.years ))).toISOString();
        vm.maxDate = (new Date(currentTime.getTime() + ( 1000 * 60 * 60 ))).toISOString();        
        
        
        //==========================================
        // Variable
        //==========================================
        userService.getMe().then(function (result) {
            $timeout(function() {
                vm.user = result;
                vm.collapsibleClass    =   true;
            });
        }, function (error) {
            $state.go('main.users.list');
            messageService.error(error);
        });        
               
        //==========================================
        // save
        //==========================================
        var save = function () {
            var user = angular.copy(vm.user);
            user.roles = _.pluck(user.roles, 'id');
            var deferred = $q.defer();
            if (user.id) {
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
            //vm.user.roles = _.pluck(vm.user.roles, 'id');
            save().then(function (result) {
                vm.saveLoading = false;
                toaster.pop('success', '', $translate.instant('user.' + (vm.user.id !== '' ? 'update_success_msg' : 'create_success_msg')));
                
                $timeout(function() {
                    $scope.userMe(true, result);
                });
                
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
                    $location.path('users');
                }, function (result) {
                    vm.deleteLoading = false;
                    toaster.pop('success', '', $translate.instant('user.delete_error_msg'));
                });
            }

        };

    }
})();
