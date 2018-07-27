(function () {
    'use strict';

    angular.module('reportModule', ['ui.router'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('main.report', {
                    url: 'reports/',
                    /*permission: 'users.index',
                    mainView: 'user',
                    subView: 'list',*/
                    templateUrl: 'app/components/report/index.html',
                    showHeader: true,  // Muestro el header por defecto
                    header : {
                        title : 'Reportes', // titulo del header
                        subNav : null, // Sub Nav active link
                        btn : {title : null, link : null, class : null, iconClass: null}, // Boton Header
                        breadcrumb : [] // breadcrumb header
                    }
                });
    
        }).controller('ReportController' , ReportController);
        ReportController.$inject = ['subNavigationMenu'];
        function ReportController(subNavigationMenu) {
             subNavigationMenu.clearAll();
        }
        
})();