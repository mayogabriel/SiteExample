(function () {
    'use strict';

    angular.module('dashboardModule').controller('DashboardAdminController', DashboardAdminController);

    function DashboardAdminController(userService) {
        
        var vm = this;
        
        vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
        vm.series = ['Aperturas', 'Clicks', 'Conversiones'];
        vm.data   = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90],
            [70, 60, 35, 25, 10, 15, 110]
        ];

        vm.onClick = function (points, evt) {
            console.log(points, evt);
        };

        vm.datasetOverride  =   [
                                    { yAxisID: 'y-axis-1' }, 
                                    { yAxisID: 'y-axis-2' }, 
                                    { yAxisID: 'y-axis-3' }
                                ];

        vm.options = {
            scales: {

                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    },
                    {
                        id: 'y-axis-3',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };
    }
    
})();