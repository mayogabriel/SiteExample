(function () {
    'use strict';

    angular.module('backend')
        .controller('MainController', MainController);
        
    MainController.$inject = ['$scope', '$location', 'userService', 'authenticationService', '$state', 'localStorageService', '$q'];

    function MainController($scope, $location, userService, authenticationService, $state, localStorageService, $q) {

        var vm = this;
        
        //============================================
        //Current Route Params
        //============================================
        $scope.route = {};
        $scope.$watch(function(){
            return $state.$current;
        }, function(currentRoute){
            $scope.route = currentRoute.self;
        });
        
        //============================================
        //User Control
        //============================================
        // Set User in LocalStorage
        // Todo: pasarlo a servicios.
        vm.loadingUser = false;
        $scope.me = {};
        $scope.userMe = function(forceUpdate, User) {
            vm.loadingUser = true;
            forceUpdate = forceUpdate || false;
            User = User || false;
            return $q(function (resolve, reject) {
                if(forceUpdate && User) { // verifico 
                    localStorageService.set('me', User);
                    $scope.me   = User;
                    vm.loadingUser = false;
                    resolve(true);
                } else if ((forceUpdate && !User) || (authenticationService.check() && !localStorageService.get('me')) ) {
                    userService.getMe().then(function (result) {
                        localStorageService.set('me', result);
                        $scope.me   = result;
                        vm.loadingUser = false;
                        resolve(true);
                    });
                } else {
                     $scope.me = localStorageService.get('me');
                     vm.loadingUser = false;
                     resolve(true);
                }                
            });
        };
        
       
        
        // Logout
        vm.logout = function () {
            authenticationService.logout().then(function (result) {
                $location.path('auth/login');
            }, function (result) {
                $location.path('auth/login');
            });
        };
    }
})();