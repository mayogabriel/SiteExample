(function () {
        'use strict';

/**
 * Value spinner
 *
 * Element:
 *   <ui-value-spinner> (Restricted)
 *
 * Attributes:
 *   ng-model   = (Required)
 *   title      = Title string
 *   value      = Number model to spin
 *   max        = Max value
 *   min        = Min value
 *   on-spin    = Callback on spin
 */

angular
        .module('uiValueSpinnerDirective', [])
        .directive('uiValueSpinner', function () {

            return {
                restrict: "E",
                scope: {
                    max: '@max',
                    min: '@min',
                    onSpin: '&onSpin',
                    disabled: '=disabled'

                },
                require: 'ngModel',
                template: '<button type="button" class="waves-effect waves-light btn" data-mousehold="shift(-1)" data-ng-disabled="disabled_input">' +
                            '<i class="fa fa-minus" aria-hidden="true"></i></button>' +
                            '<input type="text" class="size" data-ng-model="value" data-ng-disabled="disabled_input"/>' +
                            '<button type="button" class="waves-effect waves-light btn" data-mousehold="shift(1)" data-ng-disabled="disabled_input">' +
                            '<i class="fa fa-plus" aria-hidden="true"></i></button>',
                link: function (scope, element, attr, ngModel) {
                    if (angular.isDefined(scope.disabled)) {
                        scope.disabled_input = scope.disabled;
                        scope.$watch('disabled', function (val) {
                            scope.disabled_input = val;
                        });
                    }

                    scope.shift = function (dir) {
                        var n = parseInt(scope.value, 10) || 0;

                        var maxValue = angular.isDefined(scope.max) ? scope.max : 1000000;
                        var minValue = angular.isDefined(scope.min) ? scope.min : -1;

                        if (n + dir > minValue && n + dir <= maxValue) {
                            scope.value = (n + dir).toString();
                        }

                        ngModel.$setViewValue(scope.value);

                        scope.onSpin();
                    };



                    //Watchers
                    scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function (val) {
                        scope.value = parseInt(val, 10);
                    });

                    scope.$watch('value', function (val) {
                        ngModel.$setViewValue(val);
                    });

                    if (angular.isDefined(scope.max)) {
                        scope.$watch('max', function (val) {

                            if (parseInt(val) === 100 && scope.value > 100) {
                                scope.value = 100;
                                ngModel.$setViewValue(scope.value);
                            }
                        });
                    }

                    //Events
                    element.find('button').on('blur', function () {
                        var focused = false;

                        element.find('button').each(function () {
                            if ($(this).is(':focus')) {
                                focused = true;
                                return false;
                            }
                        });
                    });
                }
            };
        });

})();