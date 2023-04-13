(function()
{
    var createModel = function(actionModel, actionOptions, wfModel, stepModel)
    {
        // Reference self as the action model we're extending
        var self = actionModel;

        // Setup model defaults and extend from loaded config
        var defaults =
        {
            // Your custom config is passed in this object
            config:
            {
                variableToUpdate: null,
                newValue: null
            },
            
            // The list of connections as persisted
            connections: {}
        };
        var options = $.extend(true, {}, defaults, actionOptions);
                
        self.config.variableToUpdate = ko.observable(options.config.variableToUpdate);
        self.config.newValue = ko.observable(options.config.newValue);

        // EXAMPLE: Extend the action model validation
        self.validation.variableToUpdate = Validator.required(self, self.config.variableToUpdate, "Select the variable to be updated");
        self.validation.newValue = Validator.required(self, self.config.newValue, "Enter the new value");
        
        self.actionModelErrorCount = ko.pureComputed(() =>
        {
            var fails = 0;
            if (self.validation.newValue()) fails++;
            if (self.validation.variableToUpdate()) fails++;
            return fails;
        });

        // EXAMPLE: Store non config model properties in the action
        // You normally only need to store things in the action model if you need them outside of the designer widget
        // e.g. to validate the step without the designer widget being loaded
        // self.ui.someThing = true;

        // EXAMPLE: Reference and track variable selections
        // Be aware that variable tracking creates a subscription, so any `trackVariable`'s must be disposed
        self.ui.variableToUpdate = self.trackVariable(self.config.variableToUpdate, "");
        self.ui.newValue = self.trackVariable(self.config.newValue, "");

        // EXAMPLE: force addition of outlets to an action of this type
        // NOTE the outlet label can be observable to keep in sync in the diagram
        // self.addAvailableOutlet("success", "Success");
        // self.addAvailableOutlet("failed", "Failed");
    };

    var dispose = function(actionModel)
    {
        var self = actionModel;
        self.ui.variableToUpdate.dispose();
        self.ui.newValue.dispose();
    };

    return {
        createModel: createModel,
        dispose: dispose
    };
})();