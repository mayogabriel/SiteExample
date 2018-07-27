
(function () {
    'use strict'; 

    angular.module('contactModule', ['ui.router', 'ngFileUpload'])
    
    .config(function ($stateProvider, $urlRouterProvider) {        

            $stateProvider
                .state('main.contacts', {
                    abstract: true,
                    url: 'contacts',
                    templateUrl: 'app/components/contact/index.html'
                })

                /**
                 * Listas
                 */
                .state('main.contacts.lists-list', {
                    url: '/lists',
                    mainView: 'lists',
                    subView: 'list',
                    showHeader: false  // Muestro el header por defecto
                })                
                .state('main.contacts.lists-store', {
                    url: '/add',
                    mainView: 'lists',
                    subView: 'add',
                    showHeader: false  // Muestro el header por defecto
                })
                .state('main.contacts.lists-edit', {
                    url: '/edit/:ListID',
                    mainView: 'lists',
                    subView: 'edit',
                    showHeader: false  // Muestro el header por defecto
                })
                .state('main.contacts.lists-import', {
                    url: '/import',
                    mainView: 'lists',
                    subView: 'import',
                    showHeader: false  // Muestro el header por defecto
                })
                .state('main.contacts.list-import-id', {
                    url: '/list/import/:ListID',
                    templateUrl: 'app/components/contact.list/contact.list.list.html',
                    controller: 'ListListController as listCtrl',
                    showHeader: false  // Muestro el header por defecto
                })
                .state('main.contacts.list-purge-id', {
                    url: '/list/purge/:ListID',
                    templateUrl: 'app/components/contact.list/contact.list.list.html',
                    controller: 'ListListController as listCtrl',
                    showHeader: false  // Muestro el header por defecto
                })

                /*.state('/list/import/copypaste/:MailListID', {
                    url: '/list/import/copypaste/:MailListID',
                    templateUrl: 'app/components/contact.list/contact.list.html',
                    controller: 'ContactListListController as listCtrl'
                })
                .state('/list/import/preprocess/:MailListID', {
                    url: '/list/import/preprocess/:MailListID',
                    templateUrl: 'app/components/contact.list/contact.list.html',
                    controller: 'ContactListListController as listCtrl'
                })
             
                .state('/list/import/preprocess/:MailListID/:remoteService/', {
                    url: '/list/import/preprocess/:MailListID/:remoteService/',
                    templateUrl: 'app/components/contact.list/contact.list.html',
                    controller: 'ContactListListController as listCtrl'
                });


                /**
                 * Contactos
                 */

                .state('main.contacts.member', {
                    url: '/member',
                    templateUrl: 'app/components/contact.list/contact.list.list.html',
                    controller: 'ContactListListController as listCtrl',
                    showHeader: false  // Muestro el header por defecto
                })

                /*.state('/member/:ListID', {
                    mainView: 'member',
                    subView: 'list',
                    subnav: 'member',
                    reloadOnSearch: false
                })
                .state('/member/edit/:MemberID', {
                    mainView: 'member',
                    subView: 'edit',
                    subnav: 'member',
                    reloadOnSearch: false
                })
                .state('/member/edit/:MemberID/:ListID', {
                    mainView: 'member',
                    subView: 'edit',
                    subnav: 'member',
                    reloadOnSearch: false
                })


                /**
                 * Exclusiones
                 */

                /*.state('/ban', {
                    mainView: 'ban',
                    subView: 'list',
                    subnav: 'ban',
                    reloadOnSearch: false
                })
                .state('/ban/:BanID', {
                    mainView: 'ban',
                    subView: 'edit',
                    subnav: 'ban',
                    reloadOnSearch: false
                })


                /**
                 * Campos personalizados 
                 */
                .state('main.contacts.customfield-list', {
                    url: '/custom-fields',
                    mainView: 'customfield',
                    subView: 'list',
                    showHeader: false  // Muestro el header por defecto
                })
                
                .state('main.contacts.custom-field-new', {
                    url: '/custom-fields/new',
                    mainView: 'customfield',
                    subView: 'add',
                    showHeader: false  // Muestro el header por defecto
                })
                
                .state('main.contacts.custom-field-edit', {
                    url: '/custom-fields/edit/:CustomFieldID',
                    mainView: 'customfield',
                    subView: 'edit',
                    showHeader: false  // Muestro el header por defecto
                })

                /**
                 * Formularios 
                 */
                
                .state('main.contacts.form-list', {
                    url: '/forms',
                    mainView: 'subscriptionform',
                    subView: 'list',
                    showHeader: false  // Muestro el header por defecto
                })                
                
                .state('main.contacts.form-new', {
                    url: '/form/new',
                    mainView: 'subscriptionform',
                    subView: 'add',
                    showHeader: false  // Muestro el header por defecto
                })
                
                .state('main.contacts.form-edit', {
                    url: '/form/edit/:FormID',
                    mainView: 'subscriptionform',
                    subView: 'edit',
                    showHeader: false  // Muestro el header por defecto
                })
                        
                .state('main.contacts.form-design', {
                    url: '/form/design/:FormID',
                    mainView: 'subscriptionform',
                    subView: 'design',
                    showHeader: false  // Muestro el header por defecto
                })
                /*.state('/form/edit/:FormID', {
                    mainView: 'form',
                    subView: 'edit',
                    subnav: 'form',
                    reloadOnSearch: false
                })
                .state('/form/edit-design/:FormID', {
                    mainView: 'form',
                    subView: 'edit-design',
                    subnav: 'form',
                    reloadOnSearch: false
                })
                .state('/form/edit-confirmation/:FormID', {
                    mainView: 'form',
                    subView: 'edit-confirmation',
                    subnav: 'form',
                    reloadOnSearch: false
                })
                /*
                 * redireccion inicial
                 */
                
                $urlRouterProvider.when('contacts', '/contacts/lists');
        })
        
        // Main controller Contact 
        .controller('contactController', contactController);
        contactController.$inject = ['subNavigationMenu'];
        
        function contactController(subNavigationMenu) {
            subNavigationMenu.clearAll();
            subNavigationMenu.add('list', 'Listas', 'main.contacts.lists-list');
            //subNavigationMenu.add('member', 'Contactos', '#/member');
            //subNavigationMenu.add('ban', 'Exclusiones', '#/ban');
            subNavigationMenu.add('form', 'Formularios', 'main.contacts.form-list');
            subNavigationMenu.add('customfield', 'Campos personalizados', 'main.contacts.customfield-list');
        }       
})();