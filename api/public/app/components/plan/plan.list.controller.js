(function () {
    'use strict';

    angular.module('planModule').controller('PlanListController', PlanListController);
        
    function PlanListController(toaster, $timeout, planService, paymentType) {
        
        var vm = this;
        vm.loading = true;
        //================================================
        // Vars
        //================================================
        vm.titlePage    =   paymentType.name;
        
        //================================================
        // Filter
        //================================================
        
        vm.filter = {
            payment_type: paymentType.id
        };
        
        //================================================
        // List
        //================================================
        vm.tableLoading = false;
        vm.planSelected = null;
        vm.rowCollection = [];
        vm.callServer = function callServer() {
            vm.loading = true;
            var params   =   angular.copy(vm.filter);
            planService.get(params, {cache: false}).then(function (result) {
                //update result list
                $timeout(function() {
                    vm.rowCollection = result;
                    vm.loading = false;
                },300);
            });
        };
        
        vm.callServer();
        
        //================================================
        // Actions
        //================================================
        vm.actionLoading = false;
        vm.buyAction = function buyAction() {
            toaster.pop('note', 'Buy Shop Action');
            vm.actionLoading = true;
                        
            //test
            $timeout(function() {
                vm.actionLoading = false;
            }, 3000);
        };
        
        vm.changeQuote = function changeQuote() {
            
            toaster.pop('note', 'Change Quote Action');
            vm.actionLoading = true;
            
            //test
            $timeout(function() {
                vm.actionLoading = false;
            }, 2000);
        };
    }
})();