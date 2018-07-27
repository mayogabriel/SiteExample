(function () {
    'use strict';

    angular.module('userModule')
        .run(function (Restangular) {
            //================================================
            // Restangular init
            //================================================
            Restangular.extendCollection('users', function (model) {
                return model;
            });

            Restangular.extendModel('users', userRestangularModel);
            Restangular.extendModel('me', userRestangularModel);

            function userRestangularModel(model) {
                // variable ===================================================
                model.permissions = _.pluck(_.pluck(model.roles, 'permissions')[0], 'name');
                
                // event ===================================================
                model.hasRole = function (roleNames, validateAll) {
                    roleNames = _.isArray(roleNames) ? roleNames : [roleNames];
                    var modelRolesNames = _.pluck(model.roles, 'name');
                                        
                    var foundRoleNames = _.filter(roleNames, function (val) {
                        return (_.indexOf(modelRolesNames, val) === -1 ) ? false : true;
                    });
                    
                    return validateAll ? foundRoleNames.length === roleNames.length : foundRoleNames.length > 0;
                };
                
                model.hasRoleID = function (roleID) {
                    var modelRolesIDs = _.pluck(model.roles, 'id');
                    return _.includes(modelRolesIDs,roleID);
                };

                model.can = function (permissionNames, validateAll) {
                    permissionNames = _.isArray(permissionNames) ? permissionNames : [permissionNames];

                    var foundPermissionNames = _.filter(permissionNames, function (val) {
                        return model.permissions.indexOf(val) !== -1;
                    });

                    return validateAll ? foundPermissionNames.length === permissionNames.length : foundPermissionNames.length > 0;
                };

                model.getFullName = function () {
                    return (model.firstname || '') + ' ' + (model.lastname || '');
                };

                model.init = function () {
                    _.extend(model, {
                        id: '',
                        status: "1",
                        country: "AR",
                        language_id: 2,
                        timezone: "America/Argentina/Buenos_Aires",
                        roles: [],
                        gender: 'M'
                    });
                };
                // data event ===================================================
                if (model.id === '') {
                    model.init();
                }
                return model;
            }

            /*Restangular.extendModel('roles', function (model) {               
                model.permissionIds = _.pluck(model.permissions, 'id');

                return model;
            });*/
        })


})();
