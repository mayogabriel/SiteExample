'use strict';

angular .module('global.service')
        .service('breadcrumbService', breadcrumbService);

function breadcrumbService() {
    var self = this;

    self.list = [];

    /*self.mainStates = {
        
    };*/


    self.add = function(text, href, position){
        position = position || null;
        
        var prototype = { 
            /*namespace : namespace,*/
            text : text,
            href : href
        };
        
        if(position) { // add breadcrumb in position specific 
            this.list.splice(position, 0, prototype);
        } else { // add breadcrumb in final position
            this.list.push(prototype);
        }        
    };
    
    self.clearAll = function(){
        self.list = [];
    };
    
    /*self.$get = [function() {
        self.list = [];
    }];*/

}
