(function () {

    'use strict';

    angular
            .module('ui.loader', [])
            .directive('uiCircleLoader', uiCircleLoader);

    function uiCircleLoader() {
        return {
            restrict: 'E',
            template:   '<div class="preloader-wrapper small  active" style="position: absolute;left: 50%;top: 50%;margin-left: -18px;margin-top: -18px;">'+
                            '<div class="spinner-layer spinner-blue-only">'+
                                '<div class="circle-clipper left">'+
                                    '<div class="circle"></div>'+
                                '</div>'+
                                '<div class="gap-patch">'+
                                    '<div class="circle"></div>'+
                                '</div>'+
                                '<div class="circle-clipper right">'+
                                    '<div class="circle"></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
        };
    };
})();