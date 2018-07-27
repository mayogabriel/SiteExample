    'use strict';

    angular
            .module('customfieldEditFrameDirective', ['ui.dragDrop'])
            .directive('customfieldEditFrame', customfieldEditFrame);

    customfieldEditFrame.$inject = ['uiDragService'];

    function customfieldEditFrame(uiDragService) {

        return {
            restrict: 'E',
            scope: {
                customfieldModel: '=customfieldModel',
                noDelete: '=noDelete',
                enabled: '=enabled',
                noDrag: '=noDrag',
                noDrop: '=noDrop',
                trashButtonAction: '&trashButtonAction',
                clickAction: '&clickAction',
                mouseEnterAction: '&mouseEnterAction',
                mouseLeaveAction: '&mouseLeaveAction'
            },
            transclude: true,
            template:   '<div class="customfield-edit-frame-container" data-ui-drag="customfieldDragModel" data-disable-drag="!canDrag" data-lock-x-axis="true">' +
                            '<div class="customfield-edit-frame"  data-ng-mouseover="showBorder();mouseEnterAction();" data-ng-mouseleave="hideBorder();mouseLeaveAction()">' +
                                '<div class="edit-frame-hover-container" data-ng-show="customfieldModel.showToolbar && (canDrag || canDelete)">' +
                                    '<ul class="edit-frame-hover" >' +
                                        '<li data-ng-if="canDrag"><button class="edit-frame-hover-drag orange" data-ng-mousedown="mouseDownAction()" data-ng-mouseup="mouseUpAction();$event.stopPropagation();"><i class="fa fa-arrows"></i></button><div class="edit-frame-hover-triangle"></div></li>' +
                                        '<li data-ng-if="canDelete" class="edit-frame-hover-delete"><button data-ng-mousedown="trashButtonAction();$event.stopPropagation();"  class="red"><i class="icon-borrar"></i></button></li>' +
                                    '</ul>' +
                                '</div>' +
                                '<div class="customfield-edit-border" data-ng-class="{\'showingToolbar\':customfieldModel.showToolbar, \'canDrag\':canDrag}" data-ng-click="showToolbar();clickAction(); $event.stopPropagation();" data-ng-show="customfieldModel.showBorder" >' +
                                    '<div class="customfield-edit-border-icon-container"><div class="customfield-edit-border-icon"><i class="icon-editar"></i></div></div>' +
                                '</div>' +
                                '<div class="customfield-edit-element-wrapper" data-ng-transclude></div>' +
                            '</div>' +
                        '</div>',
            link: function (scope, element, attrs) {
               
                scope.mouseDownAction = function () {
                    scope.customfieldModel.showBorder = false;
                };

                scope.mouseUpAction = function () {
                    scope.customfieldModel.showBorder = true;
                };

                scope.showBorder = function () {
                    if (!uiDragService.dragging && scope.enabled) {
                        scope.customfieldModel.showBorder = true;
                    }
                };

                scope.hideBorder = function () {
                    if (!scope.customfieldModel.showToolbar) {
                        scope.customfieldModel.showBorder = false;
                    }
                };

                scope.showToolbar = function () {
                    if (scope.enabled) {
                        scope.customfieldModel.showToolbar = true;
                    }

                };

                scope.hideToolbar = function () {
                    scope.customfieldModel.showToolbar = false;
                };


                scope.canDelete = true;
                if (scope.noDelete) {
                    scope.canDelete = false;
                }


                scope.customfieldDragModel = scope.customfieldModel;
                scope.canDrag = true;
                if (scope.noDrag | !scope.enabled) {
                    scope.canDrag = false;
                    scope.customfieldDragModel = false;
                }
                scope.canDrop = true;
                if (scope.noDrop) {
                    scope.canDrop = false;
                }
            }
        };
    };
