(function () {
    'use strict';

    angular.module('contactModule').controller('ListController', ListController);
    
    function ListController($scope, listService ) {        
        $scope.listService = listService;

        //Import contacts IDs
        $scope.import = {
            maillistIDs: []
        };
    }
})();