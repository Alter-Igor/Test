(function()
{
    var createModel = function(actionModel: any, actionOptions: any, wfModel: any, stepModel: any)
    {
        // Reference self as the action model we're extending
        var self = actionModel;

        // Setup model defaults and extend from loaded config
        var defaults =
        {
            // Your custom config is passed in this object
            config:
            {
                title: null,            
                icon: null,             
                css: null,              
                styles: null,
                command: null,
                commandConfig: "{\n}",
                contextType: null,              // Sharedo/Participant/Role
                contextIdVariable: null,
                outputVariable: null
            },

            // The list of connections as persisted
            connections: {}
        };
        var options = $.extend(true, {}, defaults, actionOptions);

        // Add this action's specific config to the model
        self.config.title = ko.observable(options.config.title);
        self.config.icon = ko.observable(options.config.icon);
        self.config.css = ko.observable(options.config.css);
        self.config.styles = ko.observable(options.config.styles);
        self.config.command = ko.observable(options.config.command);
        self.config.commandConfig = ko.observable(options.config.commandConfig);
        self.config.contextType = ko.observable(options.config.contextType);
        self.config.contextIdVariable = ko.observable(options.config.contextIdVariable);
        self.config.outputVariable = ko.observable(options.config.outputVariable);

        // Extend with this action's specific validation
        self.validation.title = Validator.required(self, self.config.title, "Title is required");
        self.validation.command = Validator.required(self, self.config.command, "Command is required");
        self.validation.contextIdVariable = ko.pureComputed(() =>
        {
            var contextType = self.ui.contextType();
            var contextIdVar = self.config.contextIdVariable();

            // NONE selected or there is a variable selection
            if( !contextType || !contextType.value || contextIdVar ) return null;

            return "Please select a variable holding the " + contextType.name;
        });

        // Extend the action model with our custom model validation
        self.actionModelErrorCount = ko.pureComputed(function()
        {
            var fails = 0;
            if (self.validation.title()) fails++;
            if (self.validation.command()) fails++;
            if (self.validation.contextIdVariable()) fails++;
            return fails;
        });

        // Add the list of context types to this action's UI
        // We're adding this here because the model validation relies on it, so can't
        // just put it in the designer. 
        self.ui.contextTypes = 
        [
            { value: null, name: "None", varType: "/" },
            { value: "sharedo", name: "Work Item", varType:"/Identifier/Work Type Identifier" },
            { value: "participant", name: "Participant", varType:"/Identifier/Participant Identifier" },
            { value: "participantRole", name: "Participant Role", varType:"/Identifier/Participant Role Identifier" }
        ];

        // Computed to get the current context type
        self.ui.contextType = ko.pureComputed(() =>
        {
            var contextTypeSystemName = self.config.contextType();
            if( !contextTypeSystemName ) return null;

            return _.find(self.ui.contextTypes, (t: { value: any; }) => t.value === contextTypeSystemName);

        });
        
        self.ui.allowedVariableType = ko.pureComputed(() =>
        {
            var type = self.ui.contextType();
            if( type ) return type.varType;
            return "/";
        });
        
        // Create the variable validator/selector - this is dynamic based on context type
        self.ui.contextIdVariableSelector = self.trackVariable(self.config.contextIdVariable, self.ui.allowedVariableType);
        self.ui.outputVariableSelector = self.trackVariable(self.config.outputVariable, "/Entity/Call To Action");
    };

    var dispose = function(actionModel: any)
    {
        var self = actionModel;
        self.ui.contextIdVariableSelector.dispose();
        self.ui.outputVariableSelector.dispose();
    };

    return {
        createModel: createModel,
        dispose: dispose
    };
})();