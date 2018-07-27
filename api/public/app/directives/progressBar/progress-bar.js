'use strict';

/**
 * Directiva para animar la barra de progreso según la velocidad del monitor
 *
 * Atributos:
 *   progress-bar           = (restrict)
 *   progress-interval      = Retardo en milisegundos para efectuar la animación
 *   progress-active        = Si la animación esta activa
 *   progress-show-percent  = Si se establece como atributo, muestra el porcentaje de progreso
 *
 */
angular
    .module('global.directive', [])
    .directive('progressBar', function() {
    return {
        restrict: 'A',
        scope : {
            progressBar : '&progressBar',
            progressInterval : '&?progressInterval',
            progressAnimate : '&?progressAnimate'
        },
        link: function(scope, element, attr) {

            var _showPercent = angular.isDefined(attr.progressShowPercent);

            scope.$watch('progressBar()', function(val){
                var progress = parseInt(val, 10) || 0;
                var interval = parseInt(scope.progressInterval(), 10) || 10000;

                interval = interval + 500; //Add half second margin

                if (scope.progressAnimate()) {
                    element.finish().animate({
                        width : progress+'%'
                    }, {
                        easing : 'linear',
                        duration : interval,
                        step : function(now, fx){
                            element.html(Math.round(now)+'%');
                        }
                    });
                } else {
                    element.css('width', progress+'%');
                    if (_showPercent) {
                        element.html(progress+'%');
                    }
                }
            });
        }
    };
});