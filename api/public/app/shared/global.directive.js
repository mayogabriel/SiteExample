(function () {
    'use strict';

     angular
        .module('global.directive', [])
        .directive('ngReallyClick', function (ngDialog) {

            return {
                restrict: 'A',
                scope: {
                    ngReallyClick: "&"
                },
                link: function (scope, element, attrs) {
                    element.bind('click', function () {
                        console.log(attrs);
                        var message = attrs.ngReallyMessage || "Are you sure ?";

                        var modalHtml    =     '\<p>'+message+'</p>\
                                                <div class="ngdialog-buttons">\
                                                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                                                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
                                                </div>';
                        
                        ngDialog.openConfirm({
                            template: modalHtml,
                            plain: true
                        }).then(function (confirm) {
                                scope.ngReallyClick();
                        });
                        
                    });

                }
            };
        });
})();
