(function () {
    'use strict';

    angular.module('userModule').config(function ($stateProvider) {
        $stateProvider
            .state('main.user-account', {
                    url: 'account',
                    templateUrl: 'app/components/user/account/account.form.html',
                    controller: 'AccountFormController as formCtrl',
                    showHeader: false,  // Muestro el header por defecto
                    resolve: {
                        
                        /*user: function (userService, $stateParams, $q, $state) {
                            var deferred = $q.defer();
                            userService.getMe().then(function (result) {
                                deferred.resolve(result);
                            }, function () {
                                $state.go('main.users.list');
                                deferred.reject();
                            });
                            return deferred.promise;
                        }*/
                    }
            })
            .state('main.account-movements', {
                url: 'account/:id/movements',
                templateUrl: 'app/components/user/account/movements.list.html',
                controller: 'AccountMovementsListController as listCtrl',
                resolve: {
                    hasPermission: function (userService, $state, $q) {
                        var deferred = $q.defer();
                        userService.getMe().then(function (result) {
                            if (!result.can('roles.index')) {
                                $state.go('main.index');
                                deferred.resolve(false);
                            }
                            deferred.resolve(true);
                        }, function () {
                            $state.go('main.index');
                            deferred.reject(false);
                        });
                        return deferred.promise;
                    }
                   
                }
            }).state('main.account-plan', {
                    url: 'account/plan',
                    templateUrl: 'app/components/user/account/plan/accountPlan.show.html',
                    controller: 'AccountPlanController as accountPlanCtrl',
                    
                    resolve: {
                        hasPermission: function (userService, $state, $q) {
                            var deferred = $q.defer();
                            userService.getMe().then(function (result) {
                                if (!result.can('plans.index')) {
                                    $state.go('main.index');
                                    deferred.resolve(false);
                                }
                                deferred.resolve(true);
                            }, function () {
                                $state.go('main.index');
                                deferred.reject(false);
                            });
                            
                            return deferred.promise;
                        }
                    }
                })
    });
    
    
})();
