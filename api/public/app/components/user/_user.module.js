(function () {
    'use strict';

    angular.module('userModule', ['ui.router'])
        .config(function ($stateProvider) {
            $stateProvider
    
                .state('main.users', {
                    abstract: true,
                    url: 'users',
                    templateUrl: 'app/components/user/index.html'  
                })
                
                // Users
                .state('main.users.list', {
                    url: '/',
                    permission: 'users.index',
                    mainView: 'user',
                    subView: 'list',
                    showHeader: true,  // Muestro el header por defecto
                    header : {
                        title : 'Usuarios', // titulo del header
                        subNav : 'user', // Sub Nav active link
                        btn : { title : 'Agregar Usuario', link : 'main.users.store({reload: true})', class : 'orange', iconClass: 'icon-add-usuarios' }
                    }
                })
                
                .state('main.users.store', {
                    url: '/create',
                    mainView: 'user',
                    subView: 'add',
                    permission: 'users.store',
                    showHeader: true,  // Muestro el header por defecto
                    header : {
                        title : 'Nuevo Usuario', // titulo del header
                        subNav : 'user', // Sub Nav active link
                        btn : {title : null, link : null, class : null, iconClass: null}, // Boton Header
                    }
                })
                
                .state('main.users.edit', {
                    url: '/:UserID/edit',
                    mainView: 'user',
                    subView: 'edit',
                    permission: 'users.update',
                    showHeader: true,  // Muestro el header por defecto
                    header : {
                        title : 'Editando Usuario', // titulo del header
                        subNav : 'user', // Sub Nav active link
                        btn : {title : null, link : null, class : null, iconClass: null}, // Boton Header
                        breadcrumb : [] // breadcrumb header
                    }
                })
                
                .state('main.users.by-resseller', {
                    url: '/:UserID/resseller',
                    mainView: 'user',
                    subView: 'list.resseller',
                    permission: 'users.index', // add permission "user.resseller.index"
                    showHeader: true,  // Muestro el header por defecto
                    header : {
                        subNav : 'user', // Sub Nav active link
                        btn : {title : 'volver', link : 'main.users.list({reload: true})', class : 'celeste', iconClass: 'icon-cancelar'} // Boton Header
                    }
                })
                
                // User Report
                .state('main.users.report-user', {
                    url: '/users/:UserID/report/last-campaign',
                    mainView: 'user',
                    subView: 'report',
                    permission: 'users.index', // add permission "user.resseller.report"
                    showHeader: false,  // Muestro el header por defecto
                    /*header : {
                        title : 'Reporte de Últimas campañas', // titulo del header
                        subNav : 'user', // Sub Nav active link
                        btn : {title : null, link : null, class : null, iconClass: null}, // Boton Header
                        breadcrumb : [] // breadcrumb header
                    }*/
                })
                
                // Roles
                .state('main.users.role-list', {
                    url: '/roles',
                    mainView: 'roles',
                    subView: 'list',
                    permission: 'roles.index',
                     showHeader: true,  // Muestro el header por defecto
                    header : {
                        title : 'Roles', // titulo del header
                        subNav : 'role', // Sub Nav active link
                        btn : {title : null, link : null, class : null, iconClass: null}, // Boton Header
                        breadcrumb : [] // breadcrumb header
                    }
                });
        })  
        
        .controller('UserController', UserController);
        UserController.$inject = ['subNavigationMenu', 'breadcrumbService'];
        function UserController(subNavigationMenu, breadcrumbService) {
            subNavigationMenu.clearAll();
            //subNavigationMenu.add('user', 'Usuarios', 'main.users.list');
            //subNavigationMenu.add('role', 'Roles', 'main.users.role-list');
            breadcrumbService.add('Usuarios', 'main.users');
            
        }
        
    
})();