(function () {

    'use strict';

    angular
            .module('selectOnClickDirective', [])
            .directive('selectOnClick', selectOnClick);

    function selectOnClick() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    console.log('select-on-click');
                    if (!window.getSelection().toString()) {
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    };
})();