(function () {
    'use strict';

    angular.module('contactModule').factory('listService', listService);
    
    function listService(Restangular, $q) {
        
        var service = {};
        
        service.init = function () {
            return Restangular.one('contacts/lists', '');
        };
        
        service.get = function (param, httpConfig) {
            param = param || {};
            httpConfig = httpConfig || {};
            return Restangular.all('contacts/lists').withHttpConfig(httpConfig).getList(param);
        };
        service.find = function (id, httpConfig) {
            httpConfig = httpConfig || {};
            return Restangular.one('contacts/lists', id).withHttpConfig(httpConfig).get();
        };
        service.update = function (id, data) {
            return Restangular.one('contacts/lists', id).customPUT(data);
        };
        service.store = function (data) {
            return Restangular.all('contacts/lists').post(data);
        };
        service.destroy = function (id) {
            return Restangular.one('contacts/lists', id).remove();
        };
        
        
        return service;
        
    }
    
})();
