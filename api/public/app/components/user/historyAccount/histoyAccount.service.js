(function () {
    'use strict';

    angular.module('userModule').factory('historyAccountService', accountMovementService);
    
    function accountMovementService(Restangular) {

        var service = {};

        service.init = function () {
            return Restangular.one('history/account', '');
        };
        
         service.get = function (param, httpConfig) {
            param = param || {};
            httpConfig = httpConfig || {};
            return Restangular.all('history/account').withHttpConfig(httpConfig).getList(param);
        };
        
        service.find = function (id, httpConfig) {
            httpConfig = httpConfig || {};
            return Restangular.one('history/account', id).withHttpConfig(httpConfig).get();
        };

        return service;
    }
})();
