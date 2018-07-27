(function () {
    'use strict';

    angular.module('dashboardModule', [])
    
        .provider('roleContextHelper', function(){
            var vm = this;
                
            vm.templateProvider = function(options){
                return function(userService, $stateParams, $templateFactory){
                    return userService.getMe().then(function(result){
                        return $templateFactory.fromUrl(options[result.roles[0].name], $stateParams);
                    });
                };
            };
            vm.controllerProvider = function(options){

                //the session role is already loaded since templateProvider must be first resolved
                return function(userService){
                    return userService.getMe().then(function(result){
                        return options[result.roles[0].name];
                    });
                }
            };
            vm.$get = function(){return this;};
        })
        
        .config(function ($stateProvider, roleContextHelperProvider) {
            
            //var $roles  =   ['administrator','reseller','client','freemium'];
            
            $stateProvider
            .state('main.index', {
                url: '',
                templateProvider: roleContextHelperProvider.templateProvider({ // ROLE : URL_TEMPLATE
                    administrator: 'app/components/dashboard/roles/dashboard_administrator.html',
                    user: '/views/dashboardUser.html'
                })
            });
        });
        
})();
