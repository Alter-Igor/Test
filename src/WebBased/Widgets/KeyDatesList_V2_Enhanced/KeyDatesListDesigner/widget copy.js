// Namespacing
namespace("Widgets");

// View model
Widgets.KeyDatesListDesigner_V2_Enhanced = function (element, configuration, base) {
    var self = this;

   

    var defaults = {
        limitResultsTo: 20,
        includeOpen: true,
        includeClosed: false,
        keyDateTypePaths: ["/task/milestone/"],
        includeDescendentsKeyDates: true,
        useClosestKeyDateAncestorTypePaths: [],
        keyDateParentTypePaths: [],
        showTime: true,
        parentDisplayMode: "always",
        showInformationIcon: false,
        showPhaseSummary: false,
        cardDisplayStyle: "grouped",
        cardGroupDisplay: "title",
        excludePhaseSystemName:""
    };

    var options = $.extend(defaults, configuration);
    
    self.model =
    {
        limitResultsTo: ko.observable(options.limitResultsTo),
        includeOpen: ko.observable(options.includeOpen),
        includeClosed: ko.observable(options.includeClosed),
        keyDateTypePaths: ko.observableArray(options.keyDateTypePaths),
        includeDescendentsKeyDates: ko.observable(options.includeDescendentsKeyDates),
        useClosestKeyDateAncestorTypePaths: ko.observable(options.useClosestKeyDateAncestorTypePaths),
        keyDateParentTypePaths: ko.observableArray(options.keyDateParentTypePaths),
        showTime: ko.observable(options.showTime),
        parentDisplayMode: ko.observable(options.parentDisplayMode),
        showInformationIcon: ko.observable(options.showInformationIcon),
        showPhaseSummary: ko.observable(options.showPhaseSummary),
        cardDisplayStyle: ko.observable(options.cardDisplayStyle),
        cardGroupDisplay: ko.observable(options.cardGroupDisplay),
        excludePhaseSystemName: ko.observableArray(options.excludePhaseSystemName)
    };

    self.lov = {
        loaded: ko.observable(false),
        excludePhaseSystemName: ko.observableArray(options.excludePhaseSystemName)
    };

    
    self.ui =
    {
        querySettingsExpanded: ko.observable(true),
        cardDisplaySettingsExpanded: ko.observable(true),
        listDisplaySettingsExpanded: ko.observable(true)
    };

    self.ui.pickers = {
        keyDateTypes: {
            multiSelect: true,
            selectMode: "typePath",
            selectedItems: self.model.keyDateTypePaths,
            rootTypes: ["milestone"]
        },
        closestKeyDateAncestorTypes: {
            multiSelect: false,
            selectMode: "typePath",
            selectedItems: self.model.useClosestKeyDateAncestorTypePaths
        },
        keyDateParentTypes: {
            multiSelect: true,
            selectMode: "typePath",
            selectedItems: self.model.keyDateParentTypePaths
        }
    }

    self.validation = {
        limitResultsTo: Validator.required(self,
            self.model.limitResultsTo,
            "A limit for the number of key dates must be specified"),
        limitResultsToMin: Validator.min(self,
            self.model.limitResultsTo,
            {
                minValue: 1,
                message: "The limit on key dates must be at least 1"
            }),
        limitResultsToMax: Validator.max(self,
            self.model.limitResultsTo,
            {
                maxValue: 50,
                message: "The limit on key dates must be no more than 50"
            }),
        openClosedStates: ko.computed(function() {
            if (!self.model.includeOpen() && !self.model.includeClosed())
                return "You must select at least one key date open/closed state";

            return null;
        })
    }

    self.validationErrorCount = ko.pureComputed(function () {
        var errors = 0;
        
        // Field validations
        if (self.validation.limitResultsTo()) errors++;
        if (self.validation.limitResultsToMin()) errors++;
        if (self.validation.limitResultsToMax()) errors++;
        if (self.validation.openClosedStates()) errors++;

        return errors;
    });
};

Widgets.KeyDatesListDesigner_V2_Enhanced.prototype.getModel = function() {
    var self = this;

    // add single item ancestor path - to be used by end-user portal widget:
    self.model.useClosestKeyDateAncestorTypePath = self.model.useClosestKeyDateAncestorTypePaths().length
        ? _.first(self.model.useClosestKeyDateAncestorTypePaths())
        : "";

    if (self.model.keyDateTypePaths().length === 0)
        self.model.keyDateTypePaths(["/task/milestone/"]);

    var koModel = ko.toJS(self.model);

    return koModel;
};