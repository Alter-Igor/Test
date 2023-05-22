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
             
                
                    fieldType:null,
                    searchValue:null,
                

                searchEntries : [],

                
                // The list of phase transition outlets to hook up
                phaseOutlets: [],

                // The list of role assignments to be made
                assignments: [],

                // Optionally store the id of the created work item in this variable
                outputVariable: null
            },
            
            // The list of connections as persisted
            connections: {}
        };
        var options = $.extend(true, {}, defaults, actionOptions);
        
        // Extend the action model with custom model
        self.config.searchEntry = ko.observable(options.config.searchEntry);
        self.config.fieldType = ko.observable(options.config.fieldType);
        self.config.searchValue = ko.observable(options.config.searchValue);
        self.config.searchEntries = ko.observableArray(options.config.searchEntries);

        

        self.config.outputVariable = ko.observable(options.config.outputVariable);

        // Extend the action model validation
       self.validation.searchValue = Validator.required(self, self.config.searchValue, "Specify the text to filter on");
       self.validation.fieldType = Validator.required(self, self.config.fieldType, "Specify the field type to filter on");
       
       self.actionModelErrorCount = ko.pureComputed(() =>
        {
            var fails = 0;
            if (self.config.searchEntries().length==0) fails++;
            return fails;
        });

        self.addEntryErrorCount = ko.pureComputed(() =>
        {
            var fails = 0;
            if (self.validation.searchValue()) fails++;
            if (self.validation.fieldType()) fails++;
            return fails;
        });

        // Track variable references
         self.ui.outputVariable = self.trackVariable(self.config.outputVariable, "/String");

        // Dynamic phase outlets
        self.ui.phases = new Sharedo.Core.Case.WorkflowEditor.WFPhaseOutlets(self, options.config.phaseOutlets);

        // Assignments
        self.ui.assignments = new Sharedo.Core.Case.WorkflowEditor.WFAssignments(self, options.config.assignments);
   
   
        self.addToFilter = () =>
        {
            console.log("self.addEntryErrorCount()",self.addEntryErrorCount());
            if(self.addEntryErrorCount() > 0) return;
            console.log("addToFilter");

            var searchEntry =
            {
                fieldType: self.config.fieldType(),
                searchValue: self.config.searchValue()
            };
            self.config.searchEntries.push(searchEntry);
        }

        self.removeFromFilter = function(searchEntry)
        {
            console.log("removeFromFilter");
            self.config.searchEntries.remove(searchEntry);
        }
   
    };

    var dispose = function(actionModel)
    {
        var self = actionModel;

        // Dispose variable references
        self.ui.outputVariable.dispose();

        // Dispose outlets
        self.ui.phases.dispose();

        // Dispose assignments
        self.ui.assignments.dispose();
    };

    var getModel = function(actionModel)
    {
        var self = actionModel;
        var config = ko.toJS(self.config);

        // Transform phase outlets
        config.phaseOutlets = self.ui.phases.getModel();

        // Transform assignments
        config.assignments = self.ui.assignments.getModel();

        return config;
    };

   

    return {
        createModel: createModel,
        dispose: dispose,
        getModel: getModel
    };
})();