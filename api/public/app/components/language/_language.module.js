(function () {
    'use strict';

    angular.module('languageModule', [])
    .run(function (Restangular) {
            //================================================
            // Restangular init
            //================================================
            Restangular.extendCollection('languages', function (model) {
                return model;
            });

            Restangular.extendModel('languages', languagesRestangularModel);
            
            function languagesRestangularModel(model) {
                // variable ===================================================                
                return {
                        id: model.id , 
                        name: model.name
                    };
            }
            
            
    });
})();
