//Navegación secundaria en la barra superior, configurable por el método add()
'use strict';

angular.module('global.service').service('subNavigationMenu', function(){
    var self = this;

    self.list = [];

    self.add = function(namespace, text, href){
        this.list.push({
            namespace : namespace,
            text : text,
            href : href
        });
    };
    
    self.clearAll = function(){
        self.list = [];
    };
});