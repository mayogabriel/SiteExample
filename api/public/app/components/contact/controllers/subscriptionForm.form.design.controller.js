(function () {
    'use strict';

    angular.module('contactModule').controller('subscriptionFormFormDesignController', subscriptionFormFormDesignController);
    
    function subscriptionFormFormDesignController( messageService, uiDragService, subscriptionFormService, formPreviewService, $scope, $location, $state, $timeout) {
        var vm = this;
        
        $scope.enableCustomfieldEditFrame = true;

        //Tabs de edición
        $scope.editionTabs = {
            tab: 'elements', // | 'design'
            currentFieldSelected: false,
            editFontColor: 'input',
            dropFieldChangeRender: false,
            textFieldChangeRender: false,
            toggle: function () {
                this.tab = (this.tab === 'elements') ? 'design' : 'elements';
            },
            switch : function (tabName) {
                this.tab = tabName;
            }
        };


        $scope.uiDragService = uiDragService;

        $scope.formEditionActions = {
            hoverContainer: function () {

                if (!uiDragService.dragging && formPreviewService.getFieldToEdit() === null) {
                    $scope.formEditionActions.showContainerBorder = true;
                }

            },
            editField: function (field) {
                
                if (field.field_type === 'email' || field.field_type === 'text_field' || field.field_type === 'check_box' || field.RenderType === 'input' || field.RenderType === 'drop') {
                    $scope.editionTabs.editFontColor = 'input';
                } else {
                    $scope.editionTabs.editFontColor = 'radioCheckbox';
                }

                if (field.field_type === 'radio_button' || field.field_type === 'drop_list') {
                    $scope.editionTabs.dropFieldChangeRender = true;
                } else {
                    $scope.editionTabs.dropFieldChangeRender = false;
                }

                if (field.field_type === 'text_field') {
                    $scope.editionTabs.textFieldChangeRender = true;
                } else {
                    $scope.editionTabs.textFieldChangeRender = false;
                }


                $scope.editionTabs.currentFieldSelected = field;

                $.each($scope.formFields, function (i, formField) {
                    formField.showToolbar = false;
                    formField.showBorder = false;
                });

                $scope.formEditionActions.showContainerBorder = false;

                field.showToolbar = true;
                field.showBorder = true;

                $scope.editionTabs.switch('design');
                $scope.formEditionActions.showContainerBorder = false;
            },
            mouseLeaveContainer: function () {
                if ($scope.editionTabs.currentFieldSelected.EditClass !== 'form-body') {
                    $scope.formEditionActions.showContainerBorder = false;
                }
            },
            mouseEnterField: function () {
                if ($scope.editionTabs.currentFieldSelected.EditClass !== 'form-body') {
                    $scope.formEditionActions.showContainerBorder = false;
                }
            },
            mouseLeaveField: function () {
                if (!uiDragService.dragging) {
                    $scope.formEditionActions.showContainerBorder = true;
                }
            },
            editContainer: function (e) {
                e.stopPropagation();
                $scope.editionTabs.currentFieldSelected = {EditClass: "form-body"};
                $scope.formEditionActions.showContainerBorder = true;
                $scope.editionTabs.switch('design');
                this.closeCustomfieldEdition(false);
            },
            onDrop: function (field, index) {
                
                if (field) {
                    var isOrdering = false;
                    var indexOfFormItem = $scope.formFields.indexOf(field);
                    
                    if (indexOfFormItem > -1) {
                        isOrdering = true;
                    }
                    if (isOrdering) {
                        if (indexOfFormItem < index) {
                            index = index - 1;
                        }
                        $scope.formFields.splice(index, 0, $scope.formFields.splice(indexOfFormItem, 1)[0]);

                    } else {

                        if (field.field_type === 'custom_text') {
                            $scope.formFields.splice(index, 0, angular.copy(field));
                        } else {
                            $scope.formFields.splice(index, 0, field);
                            field.used = true;
                        }
                    }
                }
            },
            addField: function (field) {
                this.closeCustomfieldEdition(true);

                if (field && !field.used && !uiDragService.dragging) {
                    if (field.field_type === 'custom_text') {
                        $scope.formFields.splice($scope.formFields.length - 2, 0, angular.copy(field));
                    } else {
                        $scope.formFields.splice($scope.formFields.length - 2, 0, field);
                        field.used = true;
                        
                    }
                }
            },
            removeField: function (field) {
                field.used = false;
                var index = $scope.formFields.indexOf(field);
                var indexPrev = _.findIndex($scope.availableItems, 'id', $scope.availableItems.id);
                $scope.availableItems[indexPrev].used = false;
                $scope.formFields.splice(index, 1);
                $scope.editionTabs.switch('elements');                
            },
            closeCustomfieldEdition: function (deselectFields, hideContainerBorder) {

                if (deselectFields) {
                    $scope.editionTabs.currentFieldSelected = false;
                }

                $.each($scope.formFields, function (i, formField) {
                    formField.showBorder = false;
                    formField.showToolbar = false;
                });

                if ($scope.editionTabs.currentFieldSelected.EditClass !== 'form-body') {
                    $scope.formEditionActions.showContainerBorder = false;
                }
            },
            previewStyle: {'background-color': "#dfecf0"},
            formEditionActions: false

        };


        //Render options
        $scope.$watch('editionTabs.currentFieldSelected.RenderLikeRadio', function () {
            var renderType = formPreviewService.getFieldRenderType($scope.editionTabs.currentFieldSelected);
            if (typeof renderType !== 'undefined') {
                $scope.editionTabs.currentFieldSelected.RenderType = renderType;
            }
            if (renderType === 'radio') {
                $scope.editionTabs.editFontColor = 'radioCheckbox';
            } else {
                $scope.editionTabs.editFontColor = 'input';
            }
        });

        $scope.$watch('editionTabs.currentFieldSelected.RenderLikeTextarea', function () {
            var renderType = formPreviewService.getFieldRenderType($scope.editionTabs.currentFieldSelected);
            if (typeof renderType !== 'undefined') {
                $scope.editionTabs.currentFieldSelected.RenderType = renderType;
            }
        });




        var editFieldFromConfiguration = function () {
            var fieldToEdit = formPreviewService.getFieldToEdit();
            if (fieldToEdit !== null) {
                $scope.formEditionActions.editField(fieldToEdit);
            }
        };

        $timeout(function () {
            editFieldFromConfiguration();
        }, 1);

        $scope.$watch('editionTabs.currentFieldSelected', function (val) {
            if (val.style) {
                $scope.style.setCustomTextProperties(val, '', false);
            }
        }, true);
    }
})();
