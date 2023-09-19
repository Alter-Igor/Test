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
    };
    trackVariable: (observable: ko.Observable<string>, type: string) => any;
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
                expectedTypeSystemName: null,
                phaseSystemName: null,
                dynamic: false,
                reasonText: "",
                phaseFeature: null,
                jumpToPhase: false, // use "jump to phase" rather than a standard transition
                reasonType: null,
                description: "",
                suppressChecksAndGuards: false,
                suppressEvents: false
            
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
        self.config.expectedTypeSystemName = ko.observable(options.config.expectedTypeSystemName);
        self.config.phaseSystemName = ko.observable(options.config.phaseSystemName);
        
        self.config.reasonText = ko.observable(options.config.reasonText);
        self.config.phaseFeature = ko.observable(options.config.phaseFeature);
        self.config.jumpToPhase = ko.observable(options.config.jumpToPhase); 
        self.config.dynamic = ko.observable(options.config.dynamic);
        self.config.reasonType = ko.observable(options.config.reasonType);
        self.config.description = ko.observable(options.config.description || "");
        self.config.suppressChecksAndGuards = ko.observable(options.config.suppressChecksAndGuards || false);
        self.config.suppressEvents = ko.observable(options.config.suppressEvents || false);

        // Extend the action model validation
        self.validation.workItemIdVariable = Validator.required(self, self.config.workItemIdVariable, "Specify variable holding the work item id to transition");
        self.validation.expectedTypeSystemName = Validator.required(self, self.config.expectedTypeSystemName, "Specify the type of work item you expect to transition");
        self.validation.phaseSystemName = Validator.required(self, self.config.phaseSystemName, "Specify the phase to transition to");

        self.validation.phaseSystemName = Validator.required(self, self.config.phaseSystemName, "Specify the phase to transition to");

        self.validation.phaseFeature = Validator.required(self, self.config.phaseFeature, "Specify the phase feature to transition to");

        self.validation.reasonType = Validator.required(self, self.config.reasonType, "Specify the reason");
        self.validation.description = Validator.required(self, self.config.description, "Provide a description");
        
        self.addAvailableOutlet("success", "Transition Successful");
        self.addAvailableOutlet("failed", "Transition Failed");

        self.actionModelErrorCount = ko.pureComputed(() =>
        {
            var fails = 0;
            if (self.validation.workItemIdVariable()) fails++;

            if(!self.config.dynamic())
            {
            if (self.validation.expectedTypeSystemName()) fails++;
            if (self.validation.phaseSystemName()) fails++;
            }
            else
            {
                if (self.validation.phaseFeature()) fails++;
            }

            if (self.config.jumpToPhase()) {
                if (self.validation.reasonType()) fails++;
                if (self.validation.description()) fails++;
            }

            return fails;
        });

        // Variable selector
        self.ui.workItemIdVariable = self.trackVariable(self.config.workItemIdVariable, "/Identifier/Work Type Identifier");
    }

     function dispose(actionModel: ActionModel) {
        var self = actionModel;
        self.ui.workItemIdVariable.dispose();
    }

    //  const CustomProgressMilestone = {
    //     createModel: createModel,
    //     dispose: dispose
    // }


    return {
        createModel: createModel,
        dispose: dispose
    };
})();
