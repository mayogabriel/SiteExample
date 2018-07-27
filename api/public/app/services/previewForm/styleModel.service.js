(function () {
    'use strict';
    angular
        .module('global.service')
        .service('styleModelService', styleModelService);

    styleModelService.$inject = [];
    
    function styleModelService() {
        var service = {
            getStyleModel : getStyleModel
        };
        //***************************************************
        // Data Static | Private Methods
        //***************************************************
        
        // Fonts Lists
        function getFontList() {
            return  [
                {name: 'Arial', value: 'Arial, Helvetica, sans-serif'},
                {name: 'Impact', value: 'Impact, Charcoal, sans-serif'},
                {name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif'},
                {name: 'Trebuchet', value: '"Trebuchet MS", Helvetica, sans-serif'},
                {name: 'Verdana', value : 'Verdana, Geneva, sans-serif'},
                {name: 'Georgia', value : 'Georgia, serif'},
                {name: 'Palatino', value : '"Palatino Linotype", "Book Antiqua", Palatino, serif'},
                {name: 'Times New Roman', value : '"Times New Roman", Times, serif'},
                {name: 'Courier', value : '"Courier New", Courier, monospace'}
            ];
        }
        // Fonts Weight List
        function getFontWeightList() {
            return [
                {name: 'Light', value: '300'},
                {name: 'Normal', value: '400'},
                {name: 'SemiBold', value: '600'},
                {name: 'Bold', value: '700'},
                {name: 'Black', value: '900'}
            ];
        }
        
        // Fonts Style Lists
        function getBorderStyleList() {
            return [
                {name: 'Ninguno', value: 'none'},
                {name: 'Lína de puntos', value: 'dotted'},
                {name: 'Línea de guiones', value: 'dashed'},
                {name: 'Línea sólida', value: 'solid'},
                {name: 'Línea doble', value: 'double'},
                {name: 'groove', value: 'groove'},
                {name: 'ridge', value: 'ridge'},
                {name: 'inset', value: 'inset'},
                {name: 'outset', value: 'outset'}
            ];
        }
        
        //***************************************************
        // Public Methods
        //***************************************************
        // Set Properties To custom text
        function setCustomTextProperties(customTextField, preset, initialize) {
            
            var style = (initialize) ? angular.copy(this.customText) : customTextField.style;
            
            if (initialize) {
                switch(preset) {
                    case 'Title' :
                        style.fontSizeSelected = '24';
                        style.fontWeightSelected = {name: '300', value: '300'};
                        break;
                }
            }
            
            style.css['font-family'] = style.fontSelected.value;
            style.css['font-size'] = style.fontSizeSelected + "px";
            style.css['font-weight'] = style.fontWeightSelected.value;
            style.css['font-style'] = style.fontStyleSelected;
            style.css['color'] = style.fontColorSelected;
            style.css['text-decoration'] = style.textDecorationSelected;
            style.css['text-align'] = style.textAlignSelected;
            
            return style;
        };
        
        // Set Box Properties
        function setBoxProperties(formSection, formSectionToCopy) {
            
            var boxCss = {};
            var section = this[formSection];
            var sectionData = angular.isDefined(formSectionToCopy) ? this[formSectionToCopy] : this[formSection];
            
            boxCss.width = section.widthSelected + "%";
            boxCss.padding = section.paddingHorizontalSelected + "px " + section.paddingVerticalSelected + "px";
            boxCss.margin = "10px 0";
            boxCss['background-color'] = sectionData.backgroundColorSelected;
            
            if (formSection === 'select') {
                boxCss['height'] = sectionData.heightSelected + "px";
            } else if (formSection !== 'textarea') {
                boxCss['line-height'] = sectionData.heightSelected + "px";
            }
            
            return boxCss;
        }
                
        function setBorderProperties(formSection, formSectionToCopy) {
            var borderCss = {};
            var section = angular.isDefined(formSectionToCopy) ? this[formSectionToCopy] : this[formSection];
            borderCss.border = section.borderWidthSelected + "px solid " + section.borderColorSelected;
            borderCss['border-radius'] = section.borderRadiusSelected + "px";
            return borderCss;
        }
        
        function setTextProperties(formSection, formSectionToCopy) {
            var textCss = {};
            var section = angular.isDefined(formSectionToCopy) ? this[formSectionToCopy] : this[formSection];
            textCss['font-family'] = section.fontSelected.value;
            textCss['font-size'] = section.fontSizeSelected + "px";
            textCss['font-weight'] = section.fontWeightSelected.value;
            textCss['font-style'] = section.fontStyleSelected;
            textCss.color = formSection === 'label' ? this.label.fontColorSelected : section.fontColorSelected;
            textCss['text-decoration'] = section.textDecorationSelected;
            textCss['text-align'] = section.textAlignSelected;           
            return textCss;
        }
        
        function getFontObject(value, fontProperty) {
            var index = 0;
            $.each(fontProperty, function (i, fontItem) {
                if (fontItem.value == value) {
                    index = i;
                }
            });
            return fontProperty[index];
        }
        
        // Return Form Style Structure
        function getStyleModel(){
            return {
                self: this,
                container: {
                    borderStyleSelected: {name: 'Línea sólida', value: 'solid'},
                    css: {},
                    widthType: 'fluid',
                    widthUnit: '%',
                    widthFixedDisabled: false,
                    widthSelected: '100',
                    heightSelected: 'auto',
                    paddingHorizontalSelected: 20,
                    paddingVerticalSelected: 20,
                    borderWidthSelected: 1,
                    borderColorSelected: '#eeeeee',
                    borderRadiusSelected: 4,
                    backgroundColorSelected: '#eff5f7',
                    cssGetter: function (styleModel) {
                        return angular.extend(styleModel.setBoxProperties('container'), styleModel.setBorderProperties('container'));
                    }
                },
                customText: {
                    fontSelected: { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif'},
                    fontWeightSelected: { name: 'Normal', value: '400' },
                    css: {},
                    paddingHorizontalSelected: 10,
                    paddingVerticalSelected: 10,
                    fontSizeSelected: "13",
                    fontStyleSelected: 'normal',
                    fontColorSelected: '#383838',
                    textDecorationSelected: 'none',
                    textAlignSelected: 'left',
                    cssGetter: function (styleModel) {
                        return angular.extend(styleModel.setTextProperties('container'), styleModel.setBorderProperties('container'));
                    }
                },
                input: {
                    fontSelected: {name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif'},
                    fontWeightSelected: {name: 'Light', value: '300'},
                    borderStyleSelected: {name: 'Línea sólida', value: 'solid'},
                    css: {},
                    paddingHorizontalSelected: 0,
                    paddingVerticalSelected: 10,
                    fontSizeSelected: "16",
                    fontStyleSelected: 'normal',
                    fontColorSelected: '#383838',
                    textDecorationSelected: 'none',
                    textAlignSelected: 'left',
                    widthSelected: '100',
                    heightSelected: '40',
                    borderWidthSelected: 1,
                    borderColorSelected: '#9c9c9c',
                    backgroundColorSelected: '#dae2e4',
                    borderRadiusSelected: 4,
                    maxWidth: 100,
                    cssGetter: function (styleModel) {
                        return angular.extend(styleModel.setTextProperties('input'), styleModel.setBoxProperties('input'), styleModel.setBorderProperties('input'));
                    }
                },
                textarea: {
                    borderStyleSelected: {name: 'Línea sólida', value: 'solid'},
                    fontSelected: {name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif'},
                    fontWeightSelected: {name: 'Light', value: '300'},
                    css: {},
                    paddingHorizontalSelected: 10,
                    paddingVerticalSelected: 10,
                    backgroundColorSelected: '#dae2e4',
                    borderWidthSelected: 1,
                    borderColorSelected: '#9c9c9c',
                    borderRadiusSelected: 4,
                    widthSelected: '100',
                    heightSelected: 80,
                    fontSizeSelected: "16",
                    textDecorationSelected: 'none',
                    textAlignSelected: 'left',
                    fontStyleSelected: 'normal',
                    fontColorSelected: '#383838',
                    cssGetter: function (styleModel) {
                        return angular.extend(styleModel.setTextProperties('textarea', 'input'), styleModel.setBoxProperties('textarea', 'input'), styleModel.setBorderProperties('textarea', 'input'));
                    }
                },
                label: {
                    fontColorSelected: '#383839',
                    cssGetter: function (styleModel) {
                        return angular.extend(styleModel.setTextProperties('label', 'input'), {display: 'block', 'margin-top': '10px'});
                    }
                },
                select: {
                    borderStyleSelected: {name: 'Línea sólida', value: 'solid'},
                    fontSelected: {name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif'},
                    fontWeightSelected: {name: 'Light', value: '300'},
                    css: {},
                    paddingHorizontalSelected: 0,
                    paddingVerticalSelected: 10,
                    backgroundColorSelected: '#dae2e4',
                    borderWidthSelected: 1,
                    borderColorSelected: '#9c9c9c',
                    borderRadiusSelected: 4,
                    widthSelected: '100',
                    heightSelected: 40,
                    fontSizeSelected: "16",
                    textDecorationSelected: 'none',
                    textAlignSelected: 'left',
                    fontStyleSelected: 'normal',
                    fontColorSelected: '#383838',
                    cssGetter: function (styleModel) {
                        return angular.extend({}, styleModel.setTextProperties('select', 'input'), styleModel.setBorderProperties('select', 'input'), styleModel.setBoxProperties('select', 'input'));
                    }
                },
                button: {
                    fontSelected: { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif'},
                    fontWeightSelected: {name: 'Light', value: '300'},
                    borderStyleSelected: {name: 'Línea sólida', value: 'solid'},
                    css: {},
                    containerAligment: 'center',
                    text: 'Enviar',
                    paddingHorizontalSelected: 0,
                    paddingVerticalSelected: 10,
                    fontSizeSelected: "16",
                    fontColorSelected: '#ffffff',
                    fontStyleSelected: 'normal',
                    textDecorationSelected: 'none',
                    textAlignSelected: 'center',
                    widthSelected: '50',
                    heightSelected: '45',
                    backgroundColorSelected: '#0d4968',
                    borderWidthSelected: 1,
                    borderColorSelected: '#eeeeee',
                    borderRadiusSelected: 4,
                    cssGetter: function (styleModel) {
                        return angular.extend(styleModel.setTextProperties('button'), styleModel.setBoxProperties('button'), styleModel.setBorderProperties('button'));
                    }
                },
                radioCheckbox: {
                    fontColorSelected: '#383838',
                    labelCssGetter: function (styleModel) {
                        var labelCss = {};
                        var sectionToCopy = styleModel.input;
                        labelCss.color = styleModel.radioCheckbox.fontColorSelected;
                        labelCss['font-family'] = sectionToCopy.fontSelected.value;
                        labelCss['font-size'] = sectionToCopy.fontSizeSelected + "px";
                        labelCss['font-weight'] = sectionToCopy.fontWeightSelected.value;
                        labelCss['font-style'] = sectionToCopy.fontStyleSelected;
                        labelCss['text-decoration'] = sectionToCopy.textDecorationSelected;
                        labelCss['text-align'] = "left";
                        return labelCss;
                    },
                    inputCssGetter: function (styleModel) {
                        var inputCss = {};
                        var sectionToCopy = styleModel.input;
                        inputCss.border = sectionToCopy.borderWidthSelected + "px solid " + sectionToCopy.borderColorSelected;
                        inputCss['background-color'] = sectionToCopy.backgroundColorSelected;
                        return inputCss;
                    }
                },
                changeTextStyle: {
                    toggleUnderline: function (formSectionObj, model) {

                        if (typeof formSectionObj === 'string') {
                            model[formSectionObj].textDecorationSelected = model[formSectionObj].textDecorationSelected === 'underline' ? 'none' : 'underline';
                        } else {
                            formSectionObj.style.textDecorationSelected = formSectionObj.style.textDecorationSelected === 'underline' ? 'none' : 'underline';
                        }
                    },
                    toggleItalic: function (formSectionObj, model) {

                        if (typeof formSectionObj === 'string') {
                            model[formSectionObj].fontStyleSelected = model[formSectionObj].fontStyleSelected === 'normal' ? 'italic' : 'normal';
                        } else {
                            formSectionObj.style.fontStyleSelected = formSectionObj.style.fontStyleSelected === 'normal' ? 'italic' : 'normal';
                        }
                    },
                    toggleAlign: function (formSection, align, model) {

                        if (typeof formSection === 'string') {
                            model[formSection].textAlignSelected = align;
                        } else {
                            formSection.style.textAlignSelected = align;
                        }
                    }
                },    
                fontList: getFontList(),
                fontWeightList: getFontWeightList(),
                borderStyleList: getBorderStyleList(),
                // functions
                setCustomTextProperties : setCustomTextProperties, 
                setBoxProperties : setBoxProperties,
                setBorderProperties : setBorderProperties,
                setTextProperties : setTextProperties,
                getFontObject : getFontObject
            };
        };
        
       
        return service;
        
    }
    
})();