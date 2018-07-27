(function () {
    'use strict';

    angular.module('authModule').controller('RegisterController', RegisterController);
    RegisterController.$inject = ['$location', 'authenticationService', 'toaster', '$translate'];
    function RegisterController($location, authenticationService, toaster, $translate) {

        var vm = this;
        vm.form = {
            fistname: '',
            lastname: '',
            email: '',
            password: '',
            status:   0,
            terminos: false,
            info_news: false
        };
        
        vm.register = function () {
            vm.loading  = true;
            vm.form.roles  =  
            authenticationService.register(vm.form).then(function (result) {
                toaster.pop('success', '', $translate.instant('auth.register_success_msg'));
                vm.loading = false;
            }, function (result) {
                toaster.pop('error', '', result.data.result.message);
                vm.loading = false;
            });
        };
    }
})();
