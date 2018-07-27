(function () {
    'use strict';

    angular.module('planModule').factory('planService', planService);
    
    function planService(Restangular) {
        
        var service = {};
        
        service.init = function () {
            return Restangular.one('plans', '');
        };
        
        service.get = function (param, httpConfig) {
            param = param || {};
            httpConfig = httpConfig || {};
            return Restangular.all('plans').withHttpConfig(httpConfig).getList(param);
        };
        
        service.find = function (id, httpConfig) {
            httpConfig = httpConfig || {};
            return Restangular.one('plans', id).withHttpConfig(httpConfig).get();
        };
        
        service.getMe = function (param, httpConfig) {
            param = param || {};
            httpConfig = httpConfig || {};
            return Restangular.one('me', '').withHttpConfig(httpConfig).get(param);
        };
        
        return service;
    }
})();
