(function (ng, undefined) {
    'use strict';
    ng.module('smart-table')
        .directive('stNextPrevPagination', function () {
            return {
                restrict: 'EA',
                require: '^stTable',
                scope: {
                    stItemsByPage: '=?',
                    stDisplayedPages: '=?'
                },
                templateUrl: function (element, attrs) {
                    if (attrs.stTemplate) {
                        return attrs.stTemplate;
                    }
                    return 'app/directives/smart-table/pagination.html';
                },
                link: function (scope, element, attrs, ctrl) {
                    var paginationState = ctrl.tableState().pagination;
                    scope.setPaginationAction = function splice(action) {
                        scope.paginationAction = action;
                        ctrl.tableState().pagination.paginationAction   =   action;
                        ctrl.slice((scope.currentPage) * scope.stItemsByPage, scope.stItemsByPage);
                    };
                    
                    /*if(_.isUndefined(scope.currentPage)) {
                        scope.currentPage = 1;
                    }*/
                    
                    scope.cantPageForward = true;
                    scope.cantPageBackward = true;

                    function redraw() {
                        var paginationState = ctrl.tableState().pagination;
                        scope.totalPages = Math.ceil(paginationState.totalItemCount / scope.stItemsByPage);
                        
                        console.log(ctrl.tableState().pagination);
                        
                        if (paginationState.start === 0) {
                            scope.currentPage = 1;
                        }
                        
                        console.log(paginationState.start);
                        // Next
                        if (!_.has(paginationState, 'next')) {
                            scope.cantPageForward = true;
                        } else {
                            scope.cantPageForward = _.isNull(paginationState.next);
                        }
                         // Prev
                        if (!_.has(paginationState, 'prev')) {
                            scope.cantPageBackward = true;
                        } else {
                            scope.cantPageBackward = _.isNull(paginationState.prev);
                        }
                    }

                    scope.prev = function () {
                        scope.currentPage = Math.max(scope.currentPage - 1, 1);
                        console.log(scope.currentPage);
                        if (scope.currentPage !== 1) {
                            scope.setPaginationAction('prev');
                        } else {
                            scope.setPaginationAction('prev');
                        }
                    };
                    scope.next = function () {
                        scope.currentPage += 1;
                        scope.setPaginationAction('next');
                    };

                    //table state --> view
                    scope.$watch(function () {
                        return ctrl.tableState().pagination;
                    }, redraw, true);
                }
            };
        })
        .directive('stSelectAll', function () {
            return {
                require: '^stTable',
                template: '<input type="checkbox" id="isAllSelected" ng-model="isAllSelected" /><label for="isAllSelected"></label>',
                scope: {
                    rows: '=all',
                    ngModel: '=',
                    countSelectedRows: '='
                },
                link: function (scope, element, attr, ctrl) {

                    function getAllSelected() {
                        return (getTotalRows() === getSelectedRows());
                    }

                    function getTotalRows() {
                        return scope.rows.length;
                    }

                    function getSelectedRows() {
                        var selectedRows = 0;
                        scope.rows.forEach(function (row) {
                            if (row.isSelected) {
                                selectedRows++;
                            }
                        });
                        scope.countSelectedRows = selectedRows;
                        return selectedRows;
                    }

                    function setAllRows(bool) {
                        scope.rows.forEach(function (row) {
                            if (row.isSelected !== bool) {
                                row.isSelected = bool;
                            }
                        });
                    }

                    scope.$watch('rows', function () {
                        scope.isAllSelected = getAllSelected();
                    }, true);

                    scope.$watch('isAllSelected', function () {
                        if (scope.isAllSelected) {
                            setAllRows(true);
                        } else {
                            if (getAllSelected()) {
                                setAllRows(false);
                            }
                        }
                    });

                }
            };
        })
        .directive('stCustomAction', function () {
            var directiveConfig = {
                restrict: 'AE',
                require: '^stTable',
                link: function (scope, element, attrs, ctrl) {
                    var table = ctrl.tableState();
                    element.on('click', function (ev) {
                        scope.callback.call().then(function () {
                            ctrl.pipe();
                        });
                    });
                },
                scope: {
                    callback: '&'
                }
            };
            return directiveConfig;
        });

})(angular);