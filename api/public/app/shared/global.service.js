(function () {
    'use strict';

    angular.module('global.service', [])
        .factory('messageService', messageService);
    function messageService(toaster) {
        //var _self = this;
        
        var service = {};
        
        // Private
        function getMsg(result) {
            if(typeof result === "string") {
                return result;
            }
            
            return result.data.result.message;
        }
        
        // Public
        service.formError = function (result) {
            toaster.pop('error', '', getMsg(result));
        };
        
        service.error = function (result) {
            toaster.pop('error', '', getMsg(result));
        };
        
        service.success = function (result) {
            toaster.pop('success', '', getMsg(result));
        };
        
        service.notice = function (result) {
            toaster.pop('info', '', getMsg(result));
        };
        
        return service;
    }
})();
