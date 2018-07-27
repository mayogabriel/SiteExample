(function () {
    'use strict';

    angular.module('userModule').controller('AccountPlanController', AccountPlanController);
    
    function AccountPlanController($scope, $timeout, planService, messageService, toaster, $translate, $location, $q, roleService, $state, moment, languageService) {
        
        var vm = this;
        
        //================================================
        // DATA
        //================================================ 
        
        vm.credits = {
            labels : ["Créditos Disponibles", "Creditos Consumidos"],
            data : [300, 500],
            total: 800,
            available: 300,
            consumed : 500
        };
        vm.credits.percentage = calculatePercentage(vm.credits.data);

        vm.quote = {
            labels : ["Envíos Disponibles", "Envíos Consumidos"],
            data : [300, 1500],
            total: 1800,
            available: 300,
            consumed : 1500
        };
        vm.quote.percentage = calculatePercentage(vm.quote.data);
        
        //================================================
        // Charts JS
        //================================================ 
        
        vm.options = { 
            showTooltips : true,
            animation: true,
            percentageInnerCutout : 70
        };  
        
        
        function calculatePercentage(data){
            var total   =   0;
            var tpercentage = null;
            
            _.each(data, function (row, index) {
                total += parseInt(row);
            });
            
            tpercentage = Math.round(((data[0]/total)*100))+"%";
            
            return tpercentage;
        }
        
        
        /*function getAvailable ($type, $data) {
            
        } 
        
        
        vm.getConsumed = function ($type) {
            switch($type) {
                /*case 'quote': return vm.quote.data[1]; break;
                case 'credits': return vm.credits.data[1]; break;    
            }
        } */
        
}     
        
        
    
})();
        