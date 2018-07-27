(function () {
    'use strict';

    angular.module('settingModule').factory('settingService', settingService);
    function settingService() {

        // private variable
        var settings = {
            store_name: 'Newsmaker',
            store_email: 'gabriel@powersite.com.ar',
            store_address: '',
            store_phone: '',
            timezone: 'America/Argentina/Buenos_Aires',
            currency: 'ARS',
            active: true,
            meta_title: '',
            meta_description: '',
            meta_keywords: ''
        };

        var service = {};
        service.get = function () {
            return settings;
        };
        service.find = function (key) {
            return settings[key];
        };
        return service;
    }
})();
