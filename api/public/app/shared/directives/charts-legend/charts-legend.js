 'use strict';

    angular
            .module('ui.chartsLegend', [])
            .directive('chartsLegend', chartsLegend);
            
    function chartsLegend() { /*needs $scope.show to be defined...*/
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shared/directives/charts-legend/charts-legend.html',
            scope:{
                chartdata:"=",
                show:"="
            }
        };
    };