import { ConfigurationType, ObservableConfig } from "./IConfiguration";


interface ActionModel {
    addAvailableOutlet: any;
    config: ObservableConfig;
    validation: {
        [key: string]: () => boolean;
    };
    actionModelErrorCount: ko.PureComputed<number>;
    ui: {
        workItemIdVariable: any;  // Adjust the type based on the actual implementation
        outputVariable: any;
    };
    trackVariable: (observable: ko.Observable<string | undefined | null>, type: string) => any;
}

interface Defaults {
    config: ConfigurationType;
    connections: {
        [key: string]: any;
    };
}

(function()
{ 
     function createModel(actionModel: ActionModel, actionOptions: Defaults, wfModel: any, stepModel: any) {
        // Reference self as the action model we're extending
        var self = actionModel;

        let config : ConfigurationType = {
                workItemIdVariable: "",
                attribute:"",
                outputVariable: "",
                parents: false,
                children: false,
                
        }
        // Setup model defaults and extend from loaded config
        var defaults =
        {
            // Your custom config is passed in this object
            config: config,
            
            // The list of connections as persisted
            connections: {}
        };
        var options = $.extend(true, {}, defaults, actionOptions);

        // Extend the action model with custom model
        self.config.workItemIdVariable = ko.observable(options.config.workItemIdVariable);
        self.config.attribute = ko.observable(options.config.attribute);
        self.config.outputVariable = ko.observable(options.config.outputVariable);
        self.config.parents = ko.observable(options.config.parents);
        self.config.children = ko.observable(options.config.children);

       

        // Force the execute outlet to be present - ignoring anything in the
        // persisted model (there's always one outlet and it's always called execute
        self.addAvailableOutlet("found", "Attribute Found");
        self.addAvailableOutlet("notFound", "Attribute Not Found");

        // Extend the action model validation
        self.validation.workItemIdVariable = Validator.required(self, self.config.workItemIdVariable, "Specify variable holding the work item id to transition");
        self.ui.outputVariable = actionModel.trackVariable(self.config.outputVariable, "/String");

        self.actionModelErrorCount = ko.pureComputed(() =>
        {
            var fails = 0;
            if (self.validation.workItemIdVariable()) fails++;
            return fails;
        });

        // Variable selector
        self.ui.workItemIdVariable = self.trackVariable(self.config.workItemIdVariable, "/Identifier/Work Type Identifier");
    }

     function dispose(actionModel: ActionModel) {
        var self = actionModel;
        self.ui.workItemIdVariable.dispose();
    }

    function getModel(actionModel: ActionModel)
    {
        var config = ko.toJS(actionModel.config);
        return config;
    };

     const RecursiveFindAttribute = {
        createModel: createModel,
        dispose: dispose,
        getModel: getModel
    }

    return {
        createModel: createModel,
        dispose: dispose
    };
})();
