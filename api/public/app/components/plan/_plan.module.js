(function () {
    'use strict';

    angular.module('planModule', [])
    
    .config(function ($stateProvider) {
        $stateProvider
            .state('main.plan-list', {
                url: 'plans/:name',
                templateUrl: 'app/components/plan/plan.list.html',
                controller: 'PlanListController as listCtrl',
                resolve: {
                    paymentType: function ($stateParams, $location) {
                        // reeplace for ServiceTypePlan
                        switch($stateParams.name) {
                            case 'credits': return { name : 'Créditos' , id : 1  }; break;
                            case 'quote': return { name : 'Cuota Mensual'   , id : 2  }; break;
                            default: $location.path('/');
                        }
                    }
                }
            });
    });
})();
