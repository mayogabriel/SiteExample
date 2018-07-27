(function () {
    'use strict';

    angular.module('backend', [
        
        'theme.directives',
        'theme.services',
        'global.filter',
        'global.service',
        'global.directive',
        
        'authModule',
        'dashboardModule',
        'userModule',
        'contactModule',
        'settingModule',
        'languageModule',
        'planModule',
        'reportModule',
        'campaignModule',


        //UI Plugin
        'ngDialog',
        'angular-spinkit',
        'smart-table',
        'ui.router',
        'ui.materialize',
        'ui.loader',
        'ui.dragDrop',
        'ui.chartsLegend',
        //'ui.router.breadcrumbs',
        /*'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'ui.tree',*/
        /*'ui.select',*/
        'checklist-model',
        'textAngular',
        'toaster', //notification plugin

        //Plugin
        'angular.filter',
        'pascalprecht.translate', //Multi Language plugin
        'angularMoment', //moment plugin, date plugin
        'restangular',
        'LocalStorageModule', // local storage module
        'tmh.dynamicLocale',
        'angular-country-timezone-picker',
        'chart.js',
        'minicolors',
        
        // Directives
        'mouseholdDirective',
        'selectOnClickDirective',
        'uiValueSpinnerDirective',
        'uiListPicker',
        'customfieldEditFrameDirective',
        
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngRoute',
        'ngSanitize'
    ])
        //================================================
        // Check isLogin when run system
        //================================================
        .run(function ($rootScope, $location, $state,    authenticationService, localStorageService, amMoment, settingService, $translate, $timeout, $cacheFactory) {
            $rootScope.pageViewLoading = false;       
            var routesThatRequireAuth = ['/auth/register', '/auth/login', '/auth/logout'];
            
            //================================================
            // page route event
            //================================================
            $rootScope.$on('$stateChangeStart', function (event, next, current, fromState, fromParams, options) { 
                // si estoy logueado redirijo al dashboard
                if (_.includes(routesThatRequireAuth, $location.path()) && authenticationService.check()) {
                    $location.path('/');
                } // si no estoy logueado redirijo al login 
                else if(!_.includes(routesThatRequireAuth, $location.path()) && !authenticationService.check()) {
                    $location.path('auth/login');
                }  
                // Check Permission in page
                if(angular.isDefined(next.permission) && next.permission) {
                    var $user =  localStorageService.get('me');
                    if(!_.includes($user.permissions, next.permission)) {
                        // User isn’t authenticated
                        event.preventDefault();
                        $state.go("main.index", null,  {reload: true, location: 'replace'});
                    }
                }
              // $rootScope.pageViewLoading = true;
            });
            
            
            $rootScope.$on('$stateChangeSuccess', function () {
                /*$timeout(function () {
                    $rootScope.pageViewLoading = false;
                });*/
                // Clear Restangular Cache
                $cacheFactory.get('$http').removeAll();
            });            

            //================================================
            // page title init
            //================================================
            /*$translate('panel.name').then(function (translation) {
                $rootScope.siteTitle = translation;
            });
            $rootScope.meta = {
                pageTitle: ''
            };*/

            //================================================
            // global variable init
            //================================================
            $rootScope.$location = $location;

            //================================================
            // timezone init
            //================================================
            amMoment.changeTimezone(settingService.find('timezone'));

        })
        .run(function ($location, authenticationService, localStorageService, $timeout, Restangular, $http, $q, $state) {

            var refreshAccessToken = function () {
                var deferred = $q.defer();
                console.log('start get refresh token');

                $http({
                    method: 'POST', 
                    url: 'http://api.newsmaker2016.local.powersite.com.ar/api/admin/auth/refresh-token', 
                    headers: {
                        'Authorization': authenticationService.getToken()
                    }
                }).success(function (data, status, headers, config) {
                    console.log('set token');
                    console.log(data);
                    localStorageService.set('token', data.result.token);
                    deferred.resolve(data.result.token);
                }).error(function (data, status, headers, config) {
                    console.log('Oops! Expired Token, please login again! ');
                    $location.path('auth/login');
                    deferred.reject(data);
                });

                return deferred.promise;
            };

            Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
                if (response.data.message === 'token_not_provided') {
                    localStorageService.clearAll();
                    $state.go('fullscreen.login');
                    return false;
                }
                
                if (response.data.message === 'token_invalid') {
                    localStorageService.remove('token');
                    $state.go('fullscreen.login');
                    return false;
                }
                
                if (response.data.message === 'user_not_found') {
                    localStorageService.remove('token');
                    $state.go('fullscreen.login');
                    return false;
                }

                if (response.data.message === 'token_expired') {
                    return refreshAccessToken().then(function () {
                        response.config.headers.Authorization = authenticationService.getToken();
                        // Repeat the request and then call the handlers the usual way.
                        $http(response.config).then(responseHandler, deferred.resolve);
                        //return false;
                        // Be aware that no request interceptors are called this way.
                    });
                    //return false;
                }
                return true; // error not handled
            });

            Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
                //================================================
                // Token setup when load each request
                //================================================
                headers.Authorization = authenticationService.getToken();

                return {
                    element: element,
                    headers: headers,
                    params: params,
                    httpConfig: httpConfig
                };
            });
        })
})();
