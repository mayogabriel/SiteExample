'use strict';

//Carga de página
$(window).bind('beforeunload',function(){
    try {
        $('body').scope().$broadcast('beforeunload');
        $('main').addClass('active');
        $('body').scope().$destroy();
    } catch(e) {}
});

(function () {
    'use strict';

    angular.module('backend')
        .controller('ThemeController', ThemeController);
    function ThemeController(siteThemeService, $scope, subNavigationMenu) {

        var vm = this;

        //For footer
        vm.nowDate = new Date();
        
        //============================================
        //Template Control
        //============================================
        $scope.getTemplateView  =   function (templateName , module , partials, type) {
            type = type || 'components';
            partials = partials || '';
            templateName = (partials) ? '/'+ templateName : templateName;
                
            return "app/components/" + module + "/views/"+ partials + templateName + ".html"
        };
        
        //============================================
        //Theme Control
        //============================================
        vm.isOpenSidebar = siteThemeService.get('isOpenSidebar');
        vm.isOpenControlSidebar = siteThemeService.get('isOpenControlSidebar');
        vm.isFixedLayout = siteThemeService.get('isFixedLayout');
        vm.isBoxedLayout = siteThemeService.get('isBoxedLayout');
        vm.fullscreen = siteThemeService.get('fullscreen');

        vm.toggleSidebar = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.isOpenSidebar = !vm.isOpenSidebar;
            siteThemeService.set('isOpenSidebar', vm.isOpenSidebar);
        };
        vm.toggleControlSidebar = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.isOpenControlSidebar = !vm.isOpenControlSidebar;
            siteThemeService.set('isOpenControlSidebar', vm.isOpenSidebar);
        };
        

    }
})();