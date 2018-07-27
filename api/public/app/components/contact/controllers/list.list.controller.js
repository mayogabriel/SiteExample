(function () {
    'use strict';

    angular.module('contactModule').controller('ListListController', ListListController);
    
    function ListListController($location, toaster, $translate, $q, angularMomentConfig, listService) {
        var vm = this;
        
        
        
        //================================================
        // Table & Filter
        //================================================
        vm.tableLoading = true;
        vm.paginationAction = '';
        vm.rowCollection = [];
        vm.itemsByPage = 15;
        
        vm.filter = {
            limit: vm.itemsByPage,
            page: parseInt($location.search().page) || 1,
            search: $location.search().search || ''
        };
        
         vm.resetFilter = function () {
            var deferred = $q.defer();
            vm.filter.search = null;

            deferred.resolve();
            return deferred.promise;
        };

        vm.filterAction = function () {
            var deferred = $q.defer();


            deferred.resolve();
            return deferred.promise;
        };
        
        vm.resetFilter();
        
        vm.callServer = function callServer(tableState) {
            
            var pagination          =   tableState.pagination;
            var params              =   angular.copy(vm.filter);
            
            vm.paginationAction     =   pagination.paginationAction;
            
            // set page in params
            switch (vm.paginationAction) {
                case 'next': params.page = pagination.next; break;
                case 'prev': params.page = pagination.prev; break;    
                case 'selectPage':  params.page = pagination.selectPage; break;
                default :  params.page = 1; break;
            }
                    
            vm.tableLoading = true;
            listService.get(params , {cache: false}).then(function (result) {
                tableState.pagination.next = result.meta.pagination.next_page || null;
                tableState.pagination.prev = result.meta.pagination.prev_page || null;
                tableState.pagination.totalItemCount = result.meta.pagination.total || null;                
                console.log(result);
                //update result list
                vm.rowCollection = result;
                vm.tableLoading = false;
            });
        };
        
        //================================================
        //Event
        //================================================
        vm.remove = function removeItem(row) {
            var index = vm.rowCollection.indexOf(row);
            if (index !== -1 && row.id !== '') {
                listService.destroy(row.id).then(function () {
                        // remove the row data
                        vm.rowCollection.splice(index, 1);
                        // show notifications
                        toaster.pop('success', '', $translate.instant('list.delete_success_msg'));
                    },
                    function () {
                        // show notifications
                        toaster.pop('error', '', $translate.instant('list.delete_error_msg'));
                    });
            }
        };
    }
    
})();
