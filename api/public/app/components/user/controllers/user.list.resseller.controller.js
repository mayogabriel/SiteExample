(function () {
    'use strict';

    angular.module('userModule').controller('UserListRessellerController', UserListRessellerController);
    UserListRessellerController.$inject = ['$scope', '$state', '$stateParams', '$location', '$q', '$translate', 'userService', 'messageService', 'angularMomentConfig', 'breadcrumbService'];
    function UserListRessellerController($scope, $state, $stateParams, $location, $q, $translate,  userService, messageService, angularMomentConfig, breadcrumbService) {
        
        var vm = this;      
        
        vm.user = null;
        
        //==========================================
        // BREADCRUMB
        //==========================================
        var textBreadcrumb = 'Usuarios de ';
        var linkBreadcrumb = $stateParams.UserID ? 'main.users.by-resseller({UserID:'+ $stateParams.UserID +'})' : '.';
        breadcrumbService.clearAll();
        breadcrumbService.add('Usuarios', 'main.users.list');
        
        
        if(!_.isUndefined($stateParams.UserID) && /^[0-9]*$/.test($stateParams.UserID)) {       
            userService.find($stateParams.UserID, {cache: false}).then( function (result) {
                vm.user = result;
                textBreadcrumb +=  result.getFullName();
                breadcrumbService.add(textBreadcrumb, linkBreadcrumb);
                $scope.route.header.title = textBreadcrumb;
            }, function(error) {
                messageService.error(error);
                $state.go('main.users.list');                
            });
        } else {
            $state.go('main.users.list');
            messageService.error('Hubo un error al recuperar el usuario.');
        } 
                
        //==========================================
        // Method Valid
        //==========================================
        vm.isTimestamp =   function isTimestamp(timestamp) {
            return !(new Date(timestamp)).getTime() > 0;
        };
        
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
            search: $location.search().search || '',
            created_at: '',
            role_ids: [],
            parent_id : $stateParams.UserID
        };


        vm.resetFilter = function () {
            var deferred = $q.defer();
            vm.filter.role_ids = [];
            vm.filter.parent_id = $stateParams.UserID;
            vm.filter.search = null;
            /*vm.filter.created_at_max = null;
            /*vm.filter.created_at_min = null;*/
            vm.filter.created_at = {
                min : null,
                max : null
            };
            deferred.resolve();
            return deferred.promise;
        };

        vm.filterAction = function () {
            var deferred = $q.defer();
            if (vm.filter.created_at.max !== '' && vm.filter.created_at.max !== null) {                
                vm.filter.created_at_max =  moment(vm.filter.created_at.max).tz(angularMomentConfig.timezone).utc().format('YYYY-MM-DD HH:mm:ss');
            }
            if (vm.filter.created_at.min !== '' && vm.filter.created_at.min !== null) {
                vm.filter.created_at_min  = moment(vm.filter.created_at.min).tz(angularMomentConfig.timezone).utc().format('YYYY-MM-DD HH:mm:ss');
            }
            deferred.resolve();
            
            return deferred.promise;
        };
        
        vm.resetFilter();
        
        vm.callServer = function callServer(tableState) {
            
            var params = angular.copy(vm.filter);
            
            console.log(params);
            
            // sort           
            if(_.size(tableState.sort)) {
                params.order_field   = tableState.sort.predicate;
                params.order_value   = tableState.sort.reverse ? 'desc' : 'asc';                
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
            userService.get(params, {cache: false}).then(function (result) {
                                
                tableState.pagination.next = result.meta.pagination.next_page || null;
                tableState.pagination.prev = result.meta.pagination.prev_page || null;
                tableState.pagination.totalItemCount = result.meta.pagination.total || null;                
                //update result list
                vm.rowCollection = result;
                vm.tableLoading = false;
                
                /*if(params.page > 1)
                    toaster.pop('note', "Paginador", "Esta en la pagina "+ params.page);*/
            });
        };


        //================================================
        //Event
        //================================================
        vm.remove = function removeItem(row) {
            var index = $scope.rowCollection.indexOf(row);
            if (index !== -1 && row.id !== '') {
                userService.destroy(row.id).then(function () {
                        // remove the row data
                        $scope.rowCollection.splice(index, 1);
                        // show notifications
                        messageService.error($translate.instant('user.delete_success_msg'));
                    },
                    function () {
                        // show notifications
                        messageService.error($translate.instant('user.delete_error_msg'));
                    });
            }
        };        
    }
})();