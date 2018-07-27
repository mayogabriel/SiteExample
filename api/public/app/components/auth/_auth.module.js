(function () {
    'use strict';

    angular.module('authModule', ['ui.router'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('fullscreen.login', {
                    url: 'auth/login',
                    templateUrl: 'app/components/auth/login.html',
                    controller: 'LoginController as loginCtrl'
                })
                
                .state('fullscreen.register', {
                    url: 'auth/register',
                    templateUrl: 'app/components/auth/register.html',
                    controller: 'RegisterController as registerCtrl',
                });
        });
})();
