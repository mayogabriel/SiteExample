'use strict';

angular
        .module('backend')
        .directive('headerComponent', headerComponent);

headerComponent.$inject = ['$compile', '$rootScope', 'headerComponentProvider', 'subNavigationMenu', 'breadcrumbService'];

function headerComponent( $compile, $rootScope, headerComponentProvider, subNavigationMenu, breadcrumbService) {
    return {
        restrict: 'E',
        scope: {
            title : '@title',
            /*breadcrumb: '=',*/
            btn: '=', // object
            subNav: '@subNav'            
        },
        templateUrl:   'app/directives/header-components/header-components.html',
        link: {
            
            pre: function link(scope, element, attrs) {
                                
                // Title
                if(scope.title) {
                    scope.Title = scope.title;
                }

                // Breadcrumb
                scope.Breadcrumbs = [];
                scope.showBreadcrumb = false;
                if(_.size(breadcrumbService.list)) {
                    scope.Breadcrumbs = breadcrumbService;
                    scope.showBreadcrumb = true;
                }

                // Nav
                scope.nav = [];
                if(angular.isDefined(subNavigationMenu.list) && subNavigationMenu.list.length) {
                    scope.nav = subNavigationMenu.list;
                }

                // Button
                scope.showButton = false;
                if(angular.isDefined(scope.btn)) {
                    if(scope.btn.link && scope.btn.title){
                        scope.showButton = true;
                        scope.Button =  scope.btn;   
                    }
                }

                // Watch Vars
                scope.$watch("title",function(newValue,oldValue) {
                    scope.Title = newValue;
                });

                scope.$watch("btn",function(newValue,oldValue) {
                    if(angular.isDefined(scope.btn)) {
                        scope.showButton = scope.btn.link && scope.btn.title ? true : false;
                        scope.Button = newValue;
                    }
                });
                
                scope.$watch("subNav",function(newValue,oldValue) {
                     scope.subNav = newValue;
                });
                
                $rootScope.$on('$stateChangeSuccess', function() {
                    scope.showBreadcrumb = _.size(breadcrumbService.list);
                    scope.Breadcrumbs = breadcrumbService;
                });
                
            }
        }
    };
}

angular
    .module('backend')
    .provider('headerComponentProvider', headerComponentProvider);

function headerComponentProvider() {
    'use strict';
    var compile;

    function defaultCompiler(currentState) {
        if(!currentState.header) { return null; }        
        return currentState.header;
    }

    compile = defaultCompiler;

    function refresh($state, header) {
        var currentState = $state.$current;
    
        header.length = 0;
        header.push(compile(currentState.self));        
        
        return header;
    }
    
    // Init
    this.$get = [
        '$rootScope',
        '$state',
        function($rootScope, $state ) {            
            var header = [];
                        
            refresh($state, header); // init            
            
            $rootScope.$on('$stateChangeSuccess', function() {
                refresh($state, header);       
            });
                        
            return header;
        }
    ];
}