(function () {
'use strict';

angular.module('authModule').factory('authenticationService', authenticationService);
    authenticationService.$inject = ['Restangular', '$sanitize', 'localStorageService', '$q'];
    function authenticationService(Restangular, $sanitize, localStorageService, $q) {

        var service = {};

        // Service logic
        var sanitizeCredentials = function (credentials) {
            return {
                email: $sanitize(credentials.email),
                password: $sanitize(credentials.password)
            };
        };
        
        service.register = function (data) {
            var deferred = $q.defer();
            Restangular.all('auth/signup').post(data).then(function (result) {               
                deferred.resolve(result);
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        service.login = function (data) {
            data = sanitizeCredentials(data);
            var deferred = $q.defer();
            Restangular.all('auth/login').post(data).then(function (result) {
                localStorageService.set('token', result.token);
                deferred.resolve(result);
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        service.logout = function () {
            var deferred = $q.defer();
            Restangular.all('auth/logout').post().then(function (result) {
                localStorageService.clearAll();
                deferred.resolve(result);
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        service.getToken = function () {
            return 'Bearer ' + localStorageService.get('token');
        };

        service.check = function () {
            return localStorageService.get('token') ? 1 : 0;
        };
        
        service.getMe = function() {
            $q(function(resolve, reject) {
                
            });
        };
        
        

        return service;

    }
})();
