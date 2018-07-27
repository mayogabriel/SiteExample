(function () {
    'use strict';
    
    angular.module('userModule').controller('UserReportController', UserReportController);
    UserReportController.$inject = ['userService', 'messageService', '$scope', '$location', '$q', '$state', '$stateParams', '$timeout' ];
    function UserReportController(userService, messageService, $scope, $location, $q, $state, $stateParams, $timeout ) {

        var vm = this;
        
        vm.loading  = true;
        vm.campaignSelected = 1;
        vm.dataRequestComplete = [];        // 
        vm.campaigns = [];
        vm.typeViewSelected = 'Dia';
        vm.typeView  = ['Dia', 'Hora'];
        vm.chart = {
            data : [],
            labels : [],
            series : [],
            colors : ["rgba(151,187,205,1)", "rgba(220,220,220,1)", "rgba(247,70,74,1)"], 
            options : {
                datasetFill:true
            }
        };
        
        //==========================================
        // Load User Entity
        //==========================================
        
        if(!_.isUndefined($stateParams.UserID)) {        
            if (/^[0-9]*$/.test($stateParams.UserID)) {
                userService.find($stateParams.UserID, {cache: false}).then( function (result) {
                    vm.user =  result;
                }, function (error) {
                    messageService.error(error);
                    $state.go('main.users.list');
                });
            }
        }      
        
        //==========================================
        // Load Campañas
        //========================================== 
        function loadCampaigns(){
             vm.campaigns =     [{
                                    name :'Compumundo', 
                                    id: 1
                                },{
                                    name: 'Logos Newsmaker', 
                                    id: 2
                                }];
        };
        
        function fillDataReportCampaign(limit) {
            return $q(function(resolve, reject) {
                $timeout(function(){
                    vm.dataRequestComplete = [];
                    limit = limit || 7;
                    var entity = {};
                    for (var i = 1; i <= limit; i++) {
                        entity = {
                             'Date' : (limit > 7) ? i :  i+'/05/2016',
                             'Aperturas' : _.random(0, 300),
                             'Clicks'   : _.random(0, 300),
                             'Conversiones' : _.random(0, 300)
                        };
                        vm.dataRequestComplete.push(entity);
                    }
                    resolve(true); 
                });
            });
        };
                
        // Transform Data for Chart JS
        function transformData(data) {
            vm.chartData = [  
                _.pluck(data, 'Aperturas'), 
                _.pluck(data, 'Clicks'), 
                _.pluck(data, 'Conversiones')
            ];
            vm.chart.labels = _.pluck(data, 'Date');
            vm.chart.series = ['Aperturas', 'Clicks', 'Conversiones'];
            vm.loading = false;
        };
        
        // events
        vm.changeCampaigns =  function changeCampaigns() {
            vm.loading  = true;
            fillDataReportCampaign().then(function(){
                transformData(vm.dataRequestComplete);
                vm.handleShow();
                vm.typeViewSelected = 'Dia';
            });
        };
        
        vm.changeTypeView =  function changeTypeView() {
            vm.loading  = true;
            var limit = (vm.typeViewSelected === 'Hora') ? 23 : 7;
            fillDataReportCampaign(limit).then(function() {
                transformData(vm.dataRequestComplete);
                vm.handleShow();
            });
        };
        
        //==========================================
        // Data Reports
        //==========================================        
        loadCampaigns();
        //fillDataReportCampaign();
        transformData(vm.dataRequestComplete);
        
        vm.onClick = function (points, evt) {
            console.log(points, evt);
        };
       
        
        vm.lineShow = [true, true, true];
        vm.handleShow = function(){
            var output = [];
            angular.copy(vm.chartData, output);
            if(!_.includes(vm.lineShow, true)) {
                vm.lineShow = [true, true, true];
            } else {
                for(var i=0; i < output.length; i++){
                    if (vm.lineShow[i] === false){
                        for(var j=0; j<output[i].length; j++){
                            output[i][j] = null;
                        }
                    }
                }
            }
            vm.chart.data = output; 
            vm.loading  = false;
        };
        
    }
})();
