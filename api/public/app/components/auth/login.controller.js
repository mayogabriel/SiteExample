(function () {
    'use strict';

    angular.module('authModule').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', 'authenticationService', 'toaster'];
    function LoginController($location, authenticationService, toaster) {

        var vm = this;
        vm.form = {
            email: '',
            password: ''
        };
        
        vm.login = function () {
            vm.loading = true;
            authenticationService.login(vm.form).then(function (result) {
                $location.path('/');
            }, function (result) {
                toaster.pop('error', '', result.data.result.message);
                vm.loading = false;
            });
        };
    }
})();
