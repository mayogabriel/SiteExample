(function () {

'use strict';

/**
 * Hold mouse click event
 * Usage
 *   data-mousehold = Expression to eval
 *   data-mousehold-accel = Acceleration (default:2)
 */
angular
        .module('mouseholdDirective', [])
        .directive('mousehold', mousehold);

        mousehold.$inject = ['$timeout'];

function mousehold($timeout) {

    return {
        restrict: "A",
        link: function(scope, element, attr) {

            var _hold = false
                ,_cycleLazyInterval = 200   //Time to wait before the cycling starts
                ,_cycleIteration = 0        //Number of iterations from the first hold
                ,_interval                  //Current time
                ,_timeoutPromise            //Promise
                ,_maxDelay = parseInt(attr.mouseholdMaxDelay, 10) || 80            //Min speed interval
                ,_minDelay = parseInt(attr.mouseholdMinDelay, 10) || 10             //Max speed interval
                ,_accel = parseInt(attr.mouseholdAccel, 10) || 2;                //Acceleration

            var _holding = function(){
                if (_hold) return false;
                _hold = true;
                _reset();
                _cycle();
            }

            var _reset = function(){
                $timeout.cancel(_timeoutPromise);
                _cycleIteration = 0;
                _interval = _maxDelay;
            }

            var _notHolding = function(){
                _hold = false;
                _reset();
            }

            /**
             * Recursive cycle
             */
            var _cycle = function(){
                var handler = function(){
                    if (_hold) {
                        scope.$eval(attr.mousehold);
                        _cycleIteration++;
                        _interval = (_interval <= _minDelay) ? _minDelay : (_interval - _accel); //Accelerate to max speed
                        _cycle();
                    }
                };

                if (_cycleIteration===0) {
                    _timeoutPromise = $timeout(handler);
                } else if (_cycleIteration===1) {
                    _timeoutPromise = $timeout(handler, _cycleLazyInterval);
                } else {
                    _timeoutPromise = $timeout(handler, _interval);
                }

            };

            /**
             * Element events
             */
            element.on('mousedown', function(e){
                _holding();
            }).on('keydown', function(e){
                if (e.keyCode === 32 || e.keyCode === 13) {
                    _holding();
                }
            }).on('keyup mouseup', function(){
                _notHolding();
            });

            angular.element(window).on('mouseup keyup mouseleave mouseout', function(e){
                _notHolding();
            });

        }
    };
};
})();