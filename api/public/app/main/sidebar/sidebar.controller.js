(function () {
    'use strict';

    angular.module('backend')
        .controller('SidebarController', SidebarController);
    
    SidebarController.$inject = ['$scope', '$translate', 'Restangular'];
    
    function SidebarController($scope, $translate, Restangular) {

        var vm = this;
        vm.menu = [];
        
        $scope.userMe().then(function() {
            var me =  Restangular.restangularizeElement(null, $scope.me , 'users');
            
            vm.menu = [{
                label: $translate.instant('sidebar.home'),
                iconClasses: 'icon-home',
                enabled: true
            }, {
                label: $translate.instant('sidebar.users'),
                iconClasses: 'icon-usuarios',
                enabled: me.can(['users.index']),
                state: 'main.users.list'
            },{
                label: $translate.instant('sidebar.campaigns'),
                iconClasses: 'icon-campanas',
                enabled: me.can(['users.index', 'users.store', 'roles.index']),
                state: 'main.campaign'
            },{
                label: $translate.instant('sidebar.contacts'),
                iconClasses: 'icon-contactos',
                enabled: me.can(['users.index', 'users.store', 'roles.index']),
                state: 'main.contacts.lists-list'
            },{
                label: $translate.instant('sidebar.reports'),
                iconClasses: 'icon-reportes',
                enabled: me.can(['users.index', 'users.store', 'roles.index']),
                state : 'main.report'
            },{
                label: $translate.instant('sidebar.credits_quote'),
                iconClasses: 'icon-creditos',
                enabled: true ,
                state: 'main.account-plan'
            },{
                label: $translate.instant('sidebar.faq'),
                iconClasses: 'icon-preguntas',
                enabled: true ,
                state: 'main.coming-soon'
            }];
        });
    }
})();