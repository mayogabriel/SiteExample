(function () {
    'use strict';

    angular.module('userModule').controller('AccountMovementsListController', AccountMovementsListController);
    
    function AccountMovementsListController($scope, accountMovementService, userMovement, messageService, toaster, $translate, $location, $q) {
        
        var vm = this;
        
        //================================================
        // Table & Filter
        //================================================
        vm.tableLoading = false;
        vm.paginationAction = '';
        vm.rowCollection = [];
        vm.itemsByPage = 15;
        
        vm.filter = {
            limit: vm.itemsByPage,
            page: parseInt($location.search().page) || 1
        };
        
        vm.callServer = function callServer(tableState) {
            
            var params = angular.copy(vm.filter);
            
            // sort           
            if(_.size(tableState.sort)) {
                params['order_field']   = tableState.sort.predicate;
                params['order_value']   = tableState.sort.reverse ? 'desc' : 'asc';                
            }
            
            var pagination = tableState.pagination;
            
            vm.paginationAction =   pagination.paginationAction;
                        
            // set page in params
            switch (vm.paginationAction) {
                case 'next': params.page = pagination.next; break;
                case 'prev': params.page = pagination.prev; break;    
                case 'selectPage':  params.page = pagination.selectPage; break;
                default :  params.page = 1; break;
            }
            
            vm.tableLoading = true;
            accountMovementService.get(params, {cache: false}).then(function (result) {
                                
                tableState.pagination.next = result.meta.pagination.next_page || null;
                tableState.pagination.prev = result.meta.pagination.prev_page || null;
                tableState.pagination.totalItemCount = result.meta.pagination.total || null;                
                
                //update result list
                vm.rowCollection = result;
                vm.tableLoading = false;
                    
            });
        };

    }
})();