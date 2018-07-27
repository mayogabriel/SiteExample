(function () {
    'use strict';

    angular.module('contactModule').factory('subscriptionFormService', subscriptionFormService);
    function subscriptionFormService(Restangular) {

        var service = {};

        service.init = function () {
            return Restangular.one('contacts/subscriptionForm', '');
        };
        
        service.get = function (param, httpConfig) {
            param = param || {};
            httpConfig = httpConfig || {};
            return Restangular.all('contacts/subscriptionForm').withHttpConfig(httpConfig).getList(param);
        };
        
        service.find = function (id, httpConfig) {
            httpConfig = httpConfig || {};
            return Restangular.one('contacts/subscriptionForm', id).withHttpConfig(httpConfig).get();
        };
        
        service.update = function (id, data) {
            return Restangular.one('contacts/subscriptionForm', id).customPUT(data);
        };
        
        service.store = function (data) {
            return Restangular.all('contacts/subscriptionForm').post(data);
        };
        
        service.destroy = function (id) {
            return Restangular.one('contacts/subscriptionForm', id).remove();
        };

        return service;

    }
})();
