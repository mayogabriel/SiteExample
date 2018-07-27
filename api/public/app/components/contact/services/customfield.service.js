(function () {
    'use strict';

    angular.module('contactModule').factory('customFieldService', customFieldService);
    function customFieldService(Restangular) {

        var service = {};

        service.init = function () {
            return Restangular.one('contacts/customFields', '');
        };
        
        service.get = function (param, httpConfig) {
            param = param || {};
            httpConfig = httpConfig || {};
            return Restangular.all('contacts/customFields').withHttpConfig(httpConfig).getList(param);
        };
        
        service.find = function (id, httpConfig) {
            httpConfig = httpConfig || {};
            return Restangular.one('contacts/customFields', id).withHttpConfig(httpConfig).get();
        };
        
        service.update = function (id, data) {
            return Restangular.one('contacts/customFields', id).customPUT(data);
        };
        
        service.store = function (data) {
            return Restangular.all('contacts/customFields').post(data);
        };
        
        service.destroy = function (id) {
            return Restangular.one('contacts/customFields', id).remove();
        };

        return service;

    }
})();
