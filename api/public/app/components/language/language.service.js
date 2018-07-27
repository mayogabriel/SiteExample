(function () {
    'use strict';

    angular.module('languageModule')
        .factory('languageService', function (Restangular, $q, $filter, $translate, amMoment, $state) {

            //private variables
            var service = {};
            
            service.init = function () {
                return Restangular.one('languages', '');
            };
            service.setCurrentLanguage = function (languageCode) {
                $translate.use(languageCode);
                amMoment.changeLocale(languageCode);
                $state.go('.');
            };

            service.get = function (param, httpConfig) {
                param = param || {};
                httpConfig = httpConfig || {};
                return Restangular.all('languages').withHttpConfig(httpConfig).getList(param);
            };
            
            return service;
        });
})();
