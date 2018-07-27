'use strict';

/**
 * Drag and drop service
 */
angular.module('ui.dragDrop', []).service('uiDragService', ['$timeout', function($timeout){
    var self = this;

    self.dragging = false;                  //Boolean if we are dragging
    self.helperElement = false;             //Drag helper element
    self.dataModel = false;                 //Data model beign 'dragged'
    self.dropControllers = [];              //Droppable controllers collection

    /**
     * End drop action, reset values.
     */
    self.finishDragging = function(){
        $timeout(function(){
            if (self.helperElement) {
                self.helperElement.remove();
                self.helperElement = false;
            }

            _batchLeaveEvent();
            self.dragging = false;
            self.dataModel = {};
            _closestHoverDistance = -1;
            _closestDroppable = false;
        });
    };

    /**
     * Runs "leave()" for every droppable controller, setting $hover to false.
     * This function should run when dragging is finished or when there is no collision
     *
     * @return {Boolean} True if leave() function ran on any drop control
     */
    var _batchLeaveEvent = function(){
        var changed = false;

        for(var i in self.dropControllers) {
            var droppable = self.dropControllers[i];
            if (droppable.scope.$hover) {
                droppable.leave();
                changed = true;
            }
        }

        return changed;
    };

    /**
     * Test helper and landing collision and return its distance center 2 center.
     * If there's no collision, returns false
     *
     * @param {Object} land Landing coordinates
     * @param {Object} helper Helper coordinates
     * @returns {Number} Distance or false if not collides
     */
    var hit={}, landPos={}, helperPos={};
    var _hitTest = function(land, helper){

        hit = {
            v : Math.abs(helper.y - land.y) <= (helper.h/2 + land.h/2), //Collides vertically?
            h : Math.abs(helper.x - land.x) <= (helper.w/2 + land.w/2), //Collides horizontally?
            dh : Math.abs(helper.x - land.x),                           //Horizontal distance
            dv : Math.abs(helper.y - land.y)                            //Vertical distance
        };

        var collides = hit.v && hit.h;                                            //Collides?
        var myDistance = Math.sqrt(Math.pow(hit.dh, 2) + Math.pow(hit.dv, 2));    //Real distance center 2 center

        return (collides) ? myDistance : false;
    };

    var _closestHoverDistance = -1;
    var _closestDroppable = false;
    var _mousemove = function(){

        if (self.dragging) {

            var helperPos = {
                y : self.helperElement.offset().top + (self.helperElement.outerHeight() / 2),
                x : self.helperElement.offset().left + (self.helperElement.outerWidth() / 2),
                h : self.helperElement.outerHeight(),
                w : self.helperElement.outerWidth()
            };

            var collisionSucceeded = false;   //Helper collided with any droppable?

            //Check collision for every droppable element
            for(var i in self.dropControllers) {
                var droppable = self.dropControllers[i];

                if (droppable.element.is(':visible')) {
                    landPos = {
                        y : droppable.element.offset().top + (droppable.element.outerHeight() / 2),
                        x : droppable.element.offset().left + (droppable.element.outerWidth() / 2),
                        h : droppable.element.outerHeight(),
                        w : droppable.element.outerWidth()
                    };

                    //Refresh minimum distance if 'droppable' is the closest hovered. Else, check if 'droppable' should be the closest one
                    var distance = _hitTest(landPos, helperPos);
                    if (distance !== false) {
                        collisionSucceeded = true;

                        if (_closestDroppable === droppable) {
                            _closestHoverDistance = distance;

                        } else {
                            if (distance < _closestHoverDistance || _closestHoverDistance === -1) {
                                _closestDroppable = droppable;
                                _closestHoverDistance = distance;
                            }
                        }
                    }
                }
            }

            //Trigger the correspondant cycle for enter and leave when needed
            var digestCycle = false;

            if (!collisionSucceeded) {
                _closestHoverDistance = -1;
                _closestDroppable = false;
                digestCycle = _batchLeaveEvent();

            } else {
                for(var i in self.dropControllers) {
                    var droppable = self.dropControllers[i];

                    if (droppable === _closestDroppable) {
                        if (!droppable.scope.$hover) {
                            droppable.enter();
                            _closestDroppable = droppable;
                            _closestHoverDistance = distance;
                            digestCycle = true;
                        }
                    } else {
                        if (droppable.scope.$hover) {
                            droppable.leave();
                            digestCycle = true;
                        }
                    }
                }
            }

            //Digest should run?
            if (digestCycle) {
                $timeout(function(){});
            }

        }

    };

    var _mouseup = function(){
        $timeout(function(){
            if (_closestDroppable) {
                _closestDroppable.drop();
            }
        });
    };

    /**
     * Initialize events
     */
    $(document).on('vmousemove', _mousemove).on('vmouseup', _mouseup);

}]);

/**
 * Draggable item
 *
 * Attributes:
 *   ui-drag   = (Restricted) Expression of dataModel to be dropped at uiDrop
 *   disable-drag = Expression that disables drag functionality at any time when evaluates true
 *   lock-x-axis = When evaluates true, locks x drag axis
 *   lock-y-axis = When evaluates true, locks y drag axis
 */
angular.module('ui.dragDrop').directive('uiDrag', ['uiDragService', '$timeout', function(uiDragService, $timeout) {
    return {
        restrict: "A",
        controller : function(){
            this.uiDragHandleElement = false;
        },
        require: 'uiDrag',
        link: function(scope, element, attr, uiDrag) {

            var container = $('.custom-form-nm');
            var _grabOffset = {x:0, y:0};
            var _disabled = false;

            /**
             * Event handlers
             */
            var dragPrepared = false;

            var mouseDown = function(e){

                if (_disabled) return false;

                //Prepare drag, will set dragging state when a mousemove is performed.
                dragPrepared = true;
                $(document).on('vmousemove', mouseMove).on('vmouseup', finishDragging);
                container.on('vmousecancel mouseleave', finishDragging);

                //Set "grab" offset
                _grabOffset.x = e.pageX - element.offset().left;
                _grabOffset.y = e.pageY - element.offset().top;

            };

            var helperPos = {};
            var mouseMove = function(e){

                if (dragPrepared || uiDragService.dragging) {
                    helperPos = {
                        x : e.pageX - $(document).scrollLeft() - _grabOffset.x,
                        y : e.pageY - $(document).scrollTop() - _grabOffset.y
                    };
                }

                //Runs just once
                if (dragPrepared) {

                    dragPrepared = false;
                    e.preventDefault();

                    //Create helper element
                    if (!uiDragService.helperElement) {
                        uiDragService.helperElement = element.clone();
                        container.append(uiDragService.helperElement);
                    }

                    //Add classes and styles
                    $('body').addClass('grabbing');
                    element.addClass('ui-drag-dragging');
                    uiDragService.helperElement.addClass('ui-drag-helper');
                    uiDragService.helperElement.css({
                        'position' : 'fixed',
                        'pointer-events' : 'none',
                        'z-index' : 999999,
                        'left' : helperPos.x,
                        'top' : helperPos.y,
                        'width' : element.outerWidth(),
                        'height' : element.outerHeight()
                    });

                    //Set dragging and data model
                    $timeout(function(){
                        uiDragService.dragging = true;
                        uiDragService.dataModel = scope.$eval(attr.uiDrag);
                        scope.$apply();
                    });
                }

                //Runs on every move
                if (uiDragService.dragging && uiDragService.helperElement) {
                    var css = {};
                    if (!attr['lockXAxis']) {css.left = helperPos.x;}
                    if (!attr['lockYAxis']) {css.top = helperPos.y;}

                    uiDragService.helperElement.css(css);
                }
            };


            /**
             * Dettach events, remove helper and reset
             */
            var finishDragging = function(){

                dragPrepared = false;

                $(document).off('vmousemove', mouseMove).off('vmouseup', finishDragging);
                container.off('vmousecancel mouseleave', finishDragging);

                $('body').removeClass('grabbing');
                element.removeClass('ui-drag-dragging');

                uiDragService.finishDragging();
            };

            /**
             * Initialize events (wait a timeout 'til uiDragHandleElement exists)
             */
            $timeout(function(){
                if (uiDrag.uiDragHandleElement) {
                    uiDrag.uiDragHandleElement.on('vmousedown', mouseDown);
                } else {
                    element.on('vmousedown', mouseDown);
                }
            });

            element.on('vmouseup', finishDragging);

            /**
             * Listeners
             */

            //Disabled
            scope.$watch(function(){
                if (!angular.isDefined(attr.disableDrag)) {
                    return false;
                } else {
                    return !!scope.$eval(attr.disableDrag);
                }
            }, function(disabled){
                _disabled = disabled;
                if (_disabled) {
                    finishDragging();
                }
            });

            //Destroy
            scope.$on('$destroy', function(){
                element.off('vmousedown', mouseDown);
                finishDragging();
            });
        }
    };
}]);

/**
 * Draggable item handle
 *
 * Required:
 *   ^uiDrag
 *
 * Attributes:
 *   ui-drag-handle   = (Restricted) Use this element as drag handle.
 */
angular.module('ui.dragDrop').directive('uiDragHandle', ['uiDragService', function(uiDragService) {
    return {
        require : '^uiDrag',
        link : function(scope, element, attr, uiDrag){
            uiDrag.uiDragHandleElement = element;
        }
    };
}]);


/**
 * Droppable area
 *
 * Attributes:
 *   ui-drop       = (Restricted) Expression to eval after dropping. $dragModel is evaluated as the ui-drag expression.
 *   ui-onhover    = Expression to eval when drag enters or leaves the area.
 *                    $dragModel is evaluated as the ui-drag expression when drag is over
 *                    and evaluated as FALSE when dragleaves.
 *                    $hover is true on the scope while the ui-drag helper is on the element
 */
angular.module('ui.dragDrop').directive('uiDrop', ['uiDragService', function(uiDragService) {
    return {
        restrict: "A",
        scope : true,
        require : 'uiDrop',
        controller : function(){},
        link: function(scope, element, attr, uiDrop) {

            scope.$hover = false;

            uiDrop.element = element;
            uiDrop.scope = scope;

            uiDrop.enter = function(){
                if (uiDragService.dragging) {
                    scope.$eval(attr.uiOnhover, {'$dragModel' : uiDragService.dataModel, '$hover' : true});
                    scope.$hover = true;
                }
            };

            uiDrop.leave = function(){
                if (uiDragService.dragging) {
                    scope.$eval(attr.uiOnhover, {'$dragModel' : false, '$hover' : false});
                    scope.$hover = false;
                }
            };

            uiDrop.drop = function(){
                scope.$eval(attr.uiDrop, {'$dragModel' : uiDragService.dataModel, '$hover' : false});
                scope.$hover = false;
            };

            uiDragService.dropControllers.push(uiDrop);

            /**
             * Listeners
             */
            scope.$on('$destroy', function(){
                var i = uiDragService.dropControllers.indexOf(element);
                uiDragService.dropControllers.splice(i, 1);
            });
        }
    };
}]);