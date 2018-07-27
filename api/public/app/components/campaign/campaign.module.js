(function () {
    'use strict';

    angular.module('campaignModule', ['ui.router'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('main.campaign', {
                    url: 'campaign/',
                    /*permission: 'users.index',
                    mainView: 'user',
                    subView: 'list',*/
                    templateUrl: 'app/components/campaign/index.html',
                    showHeader: true,  // Muestro el header por defecto
                    header : {
                        title : 'Campañas', // titulo del header
                        subNav : null, // Sub Nav active link
                        btn : {title : null, link : null, class : null, iconClass: null}, // Boton Header
                        breadcrumb : [] // breadcrumb header
                    }
                });
    
        }).controller('CampaignController' , CampaignController);
        CampaignController.$inject = ['subNavigationMenu'];
        function CampaignController(subNavigationMenu) {
             subNavigationMenu.clearAll();
        }
        
})();