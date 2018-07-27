(function () {
    'use strict';

     angular
        .module('backend')
        //================================================
        // UI router Config
        //================================================
        .config(function ($provide) {
            $provide.decorator('$state', function ($delegate, $rootScope) {
                $rootScope.$on('$stateChangeStart', function (event, state, params) {
                    $delegate.next = state;
                    $delegate.toParams = params;
                });
                return $delegate;
            });
        })
        //================================================
        // Local storage module init
        //================================================
        .config(function ($httpProvider, localStorageServiceProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            localStorageServiceProvider
                .setPrefix('newsmaker')
                // setStorageType('localStorage') cookie
                .setStorageType('sessionStorage') // Session
                .setNotify(true, true);
        })
        //================================================
        // Translate Config
        //================================================
        .config(function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'app/languages/locale-',
                suffix: '.json'
            });

            $translateProvider.useCookieStorage();
            $translateProvider.useSanitizeValueStrategy('sanitize');
            $translateProvider.preferredLanguage('es-es');
            $translateProvider.fallbackLanguage(['es-es' ,'en-us']);

        })
        //================================================
        // UI select Config
        //================================================
        /*.config(function (uiSelectConfig) {
            uiSelectConfig.theme = 'bootstrap';
            uiSelectConfig.resetSearchInput = true;
        })*/

        //================================================
        // Plugin: Smart-table init
        //================================================
        .config(function (stConfig) {
            stConfig.select.mode = 'multiple';
        })

        //================================================
        // Chart Js Config
        //================================================
        .config(function (ChartJsProvider) {
            // Configure all charts
            ChartJsProvider.setOptions({
                colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360' ] 
            });
            // Configure all line charts
            ChartJsProvider.setOptions('line', {
                showLines: true
            });
        })

        //================================================
        // Plugin: Restangular init
        //================================================
        .config(function (RestangularProvider) {
            RestangularProvider.setBaseUrl('http://localhost:8000/api/admin');
            RestangularProvider.setRestangularFields({
                ids: "_ids"
            });

            RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var extractedData;
                if (operation === 'getList') {
                    // handle the data and meta data
                    extractedData = data.result;
                    if (!_.isUndefined(data.meta)) {
                        extractedData.meta = data.meta;
                    }
                } else {
                    extractedData = data.result;
                }

                return extractedData;
            });

            RestangularProvider.setDefaultHttpFields({
                cache: true
            });

        })
        .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider
                .state('main', {
                    url: '/',
                    abstract: true,
                    templateUrl: 'app/main/main.html',
                    controller: 'MainController as mainCtrl'
                })
                .state('fullscreen', {
                    url: '/',
                    abstract: true,
                    templateUrl: 'app/main/fullscreen.html'
                })
                .state('main.coming-soon', {
                    url: 'comming-soon',
                    templateUrl: 'app/main/coming-soon.html'
                })
                .state('main.not-found', {
                    url: '404',
                    templateUrl: 'app/template/404.html'
                });

            $urlRouterProvider.otherwise('/');
        });
})();
