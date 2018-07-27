(function () {

    'use strict';

    angular.module('backend')
        .controller('SidebarRightController', SidebarRightController);

    function SidebarRightController() {


        var vm = this;
        vm.element = '#alert';

        /*vm.open = function () {
            console.log('entro');

            $(vm.element).sideNav({
                menuWidth: 300, // Default is 240
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
              }
            );

             $(vm.element).sideNav('show');
        };*/
    }
})();