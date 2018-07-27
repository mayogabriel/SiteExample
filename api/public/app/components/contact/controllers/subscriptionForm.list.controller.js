(function () {
    'use strict';

    angular.module('contactModule').controller('subscriptionFormListController', subscriptionFormListController);
    
    function subscriptionFormListController( subscriptionFormService, formPreviewService, messageService, toaster, $translate, $location, $q, $state,$scope ) {
        var vm = this;
        
        //================================================
        // Table & Filter
        //================================================
        vm.tableLoading = false;
        vm.paginationAction = '';
        vm.rowCollection = [];
        vm.itemsByPage = 10;
        
        vm.callServer = function callServer(tableState) {
            
            var pagination          =   tableState.pagination;
            
            var params              =   {
                                            limit: vm.itemsByPage,
                                            page: parseInt($location.search().page) || 1,
                                        };
            
            vm.paginationAction     =   pagination.paginationAction;
                        
            // set page in params
            switch (vm.paginationAction) {
                case 'next': params.page = pagination.next || pagination.prev; break;
                case 'prev': params.page = pagination.prev || pagination.next; break;    
            }
                                
            vm.tableLoading = true;
            subscriptionFormService.get(params , {cache: false}).then(function (result) {
                                
                tableState.pagination.next = result.meta.pagination.next_page || null;
                tableState.pagination.prev = result.meta.pagination.prev_page || null;
                tableState.pagination.number = result.meta.pagination.count || null; 
                tableState.pagination.totalItemCount = result.meta.pagination.total || null;                
                
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
                subscriptionFormService.destroy(row.id).then(function () {
                    // remove the row data
                    vm.rowCollection.splice(index, 1);
                    // show notifications
                    toaster.pop('success', '', $translate.instant('customField.delete_success_msg'));
                },
                function () {
                    // show notifications
                    toaster.pop('error', '', $translate.instant('customField.delete_error_msg'));
                });
            }
        };
        
        
        formPreviewService.resetModel();
    }
    
})();
