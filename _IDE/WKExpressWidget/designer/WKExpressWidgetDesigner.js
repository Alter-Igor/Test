namespace("");

WKExpressWidgetDesigner = function(element, configuration, baseModel)
{
    var self = this;
    var defaults =
    {
        // These configurations are passed from the host of this designer widget
        blade: null,                        // The blade hosting the widget
        __scope:
        {
            mode: null,                     // Will be globalPortal or sharedoType
            sharedoTypeSystemName: null     // If mode===sharedoType, contains the type being edited
        },
        // Your designer model is also passed in
        complexDesigner: null,
        expressDesigner: null
    };
    var options = $.extend(true, {}, defaults, configuration);

    // Create the model
    self.model =
    {
        complexDesigner: ko.observable(options.complexDesigner),
        expressDesigner: ko.observable(options.expressDesigner)
    };
    
    self.model.expressRich = new Sharedo.Core.TextEditor.TextEditorModel(
    {
            loadOnFocus: true,
            content: self.model.expressDesigner,
            readonly: false,
            minHeight: 300,
            features: 
            {
                fullscreen: true,
                markdownTags: true
            }
    });
    self.model.complexRich = new Sharedo.Core.TextEditor.TextEditorModel(
    {
            loadOnFocus: true,
            content: self.model.complexDesigner,
            readonly: false,
            minHeight: 300,
            features: 
            {
                fullscreen: true,
                markdownTags: true
            }
    });


    // Create the model validators
    self.validation =
    {
        complexDesigner: Validator.required(self, self.model.complexDesigner, "Complex Terms and Conditions are required"),
        expressDesigner: Validator.required(self, self.model.expressDesigner, "Express Terms and Conditions are required")
    };

    self.validationErrorCount = ko.pureComputed(function()
    {
        var fails = 0;
        if (self.validation.complexDesigner()) fails++;
        if (self.validation.expressDesigner()) fails++;
        return fails;
    });
};


WKExpressWidgetDesigner.prototype.getModel = function()
{
    var self = this;
    
    var model = 
    {
        complexDesigner: self.model.complexDesigner(),
        expressDesigner: self.model.expressDesigner(),
        
    };
    return model;
};

