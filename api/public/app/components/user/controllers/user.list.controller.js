(function () {
    'use strict';

    angular.module('userModule').controller('UserListController', UserListController);
    UserListController.$inject = ['userService', '$location', 'toaster', '$translate', '$q', 'angularMomentConfig', 'roleService', 'breadcrumbService'];
    function UserListController(userService, $location, toaster, $translate, $q, angularMomentConfig, roleService, breadcrumbService) {
        var vm = this;
        
        //==========================================
        // BREADCRUMB
        //==========================================
        breadcrumbService.clearAll();
        breadcrumbService.add('Usuarios', 'main.users.list');
        
        //==========================================
        // Load Data
        //==========================================
        vm.roles    =   [];
        vm.refreshRole = function (string) {                
            if (string !== '') {
                roleService.get({search: string}).then(function (result) {
                   vm.roles = result;
                });
            }
        };
        vm.refreshRole();
        
        //==========================================
        // Method Valid
        //==========================================
        vm.isTimestamp =   function isTimestamp(timestamp) {
            return !(new Date(timestamp)).getTime() > 0;
        };
        
        
        //==========================================
        // Date Picker
        //==========================================
        var currentTime = new Date();
        vm.years = 10;
        vm.minDate = (new Date(currentTime.getTime() - ( 1000 * 60* 60 * 24 * 30 * 12 * vm.years ))).toISOString();
        vm.maxDate = (new Date(currentTime.getTime() + ( 1000 * 60 * 60 ))).toISOString();        
        
        
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
            created_at: {min : null,
                max : null},
            role_ids: [],
            parent_id : 0
        };


        vm.resetFilter = function () {
            var deferred = $q.defer();
            vm.filter.role_ids = [];
            vm.filter.parent_id = 0;
            vm.filter.search = null;
            vm.filter.created_at_max = null;
            vm.filter.created_at_min = null;
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
                vm.filter.created_at_max =  moment(vm.filter.created_at.max).tz(angularMomentConfig.timezone).utc().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
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
            
            // add roles ids to params
            if (!_.isUndefined(params.role_ids) && params.role_ids.length > 0) {
                params['role_ids[]'] = params.role_ids;
            }
            
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
            var index = vm.rowCollection.indexOf(row);
            if (index !== -1 && row.id !== '') {
                userService.destroy(row.id).then(function () {
                        // remove the row data
                        vm.rowCollection.splice(index, 1);
                        // show notifications
                        toaster.pop('success', '', $translate.instant('user.delete_success_msg'));
                    },
                    function () {
                        // show notifications
                        toaster.pop('error', '', $translate.instant('user.delete_error_msg'));
                    });
            }
        };

        vm.bulkRemove = function () {
            var removePromises = [];
            _.each(vm.rowCollection, function (row, index) {
                if (row.isSelected === true && row.id !== '') {
                    removePromises.push(userService.destroy(row.id));
                }
            });
            $q.all(removePromises).then(function () {
                var newRowCollection = [];
                for (var i = 0; i < vm.rowCollection.length; i++) {
                    if (!(vm.rowCollection[i].isSelected === true && vm.rowCollection[i].id !== '')) {
                        newRowCollection.push(vm.rowCollection[i]);
                    }
                }
                vm.rowCollection = newRowCollection;

                // show notifications
                toaster.pop('success', '', $translate.instant('user.delete_success_msg'));
            }, function () {
                // show notifications
                toaster.error('error', '', $translate.instant('user.delete_error_msg'));
            });
        };
        
    }


})();

