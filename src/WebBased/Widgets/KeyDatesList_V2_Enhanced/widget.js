// Namespacing
namespace("Widgets");

// View model
Widgets.KeyDatesList_V2_Enhanced = function (element, configuration) {
    var self = this;

    var defaults = {
        limitResultsTo: 20,
        includeOpen: true,
        includeClosed: false,
        keyDateTypePaths: ["/task/milestone/"],
        includeDescendentsKeyDates: true,
        includeRelatedItemsKeyDates: false,
        useClosestKeyDateAncestorTypePath: "/matter/",
        keyDateParentTypePaths: [],
        showTime: true,
        parentDisplayMode: "always",
        showInformationIcon: false,
        showPhaseSummary: true,
        cardDisplayStyle: "grouped",
        cardGroupDisplay: "title",
        excludePhases: "",
        includeRemoved: false
    };

    self.options = $.extend(defaults, configuration);

    self.loaded = ko.observable(false);
    self.showCategorisedKeyDates = ko.observable(configuration.immediateAncestorTypePathFilter && configuration.immediateAncestorTypePathFilter.length > 0);
    self.showParentSummary = ko.observable(false);
    self.keyDates = ko.observableArray([]);
    self.groupedKeyDates = ko.observableArray([]);
    self.inGroupedMode = ko.observable(self.options.cardDisplayStyle === "grouped");
    self.totalKeyDates = ko.observable(0);
    self.excludePhases = ko.observable(self.options.excludePhases);
    self.noKeyDates = ko.pureComputed(function() {
        return self.loaded() && self.totalKeyDates() === 0;
    });
    self.keyDateLimitReached = ko.pureComputed(function () {
        // not working out total server-side otherwise need to search everything (and not a limited paged search)
        // as the results are striped afterwards, and some of these may be culled depending on any rules setup
        return self.loaded() && self.totalKeyDates() > self.options.limitResultsTo;
    });

    self.stripingContext = $ui.striping.buildNewContext({
        sharedoId: $ui.pageContext.sharedoId(),
        sharedoTypeSystemName: $ui.pageContext.sharedoType(),
        sharedoPhaseSystemName: $ui.pageContext.sharedoPhase()
    });

    self.initEventSubs();
}

Widgets.KeyDatesList_V2_Enhanced.prototype.initEventSubs = function () {
    var self = this;

    self.disposables = [
        $ui.events.subscribe("sharedo.core.case.components.taskList.data-changed", self.reload, self)
    ];
};

Widgets.KeyDatesList_V2_Enhanced.prototype.loadAndBind = function () {
    var self = this;

    $ui.widgets.lock(self);

    var request = {
        sharedoId: $ui.pageContext.sharedoId(),
        limitResultsTo: self.options.limitResultsTo,
        includeOpen: self.options.includeOpen,
        includeClosed: self.options.includeClosed,
        keyDateTypePaths: self.options.keyDateTypePaths,
        includeDescendentsKeyDates: self.options.includeDescendentsKeyDates,
        includeRelatedItemsKeyDates: self.options.includeRelatedItemsKeyDates,
        useClosestKeyDateAncestorTypePath: self.options.useClosestKeyDateAncestorTypePath,
        keyDateParentTypePaths: self.options.keyDateParentTypePaths,
        parentDisplayMode: self.options.parentDisplayMode,
        cardDisplayStyle: self.options.cardDisplayStyle
    };

    $ajax.stripedPost("/api/keyDates/search",
        self.stripingContext,
        request,
        function (data) {
            self.showParentSummary(data.showParentSummary);
            self.totalKeyDates(data.totalKeyDates);
            
            if (!self.inGroupedMode()) {
                _.each(data.keyDates,
                    function (keyDate) {
                        if(!self.validateKeyDate(keyDate)) {
                            return;
                        }
                        var uiKeyDate = new Widgets.KeyDatesList_V2_Enhanced.AssembleModel(keyDate);

                        self.keyDates.push(uiKeyDate);
                    });
            } else {
                _.each(data.groupedKeyDates,
                    function(groupedKeyDate) {
                        var uiGroupedKeyDate = {
                            isExpanded: ko.observable(true),
                            id: groupedKeyDate.id,
                            title: groupedKeyDate.title,
                            reference: groupedKeyDate.reference,
                            keyDates: [],
                            totalKeyDates: groupedKeyDate.totalKeyDates,
                            totalKeyDatesText: groupedKeyDate.totalKeyDates + ' key dates'
                        };

                        switch (self.options.cardGroupDisplay) {
                        case "title":
                            uiGroupedKeyDate.heading = groupedKeyDate.title;
                            break;
                        case "reference":
                            uiGroupedKeyDate.heading = groupedKeyDate.reference;
                            break;
                        default:
                            uiGroupedKeyDate.heading = groupedKeyDate.reference;
                            if (!uiGroupedKeyDate.heading)
                                uiGroupedKeyDate.heading = groupedKeyDate.title;
                            else
                                uiGroupedKeyDate.heading += (' - ' + groupedKeyDate.title);
                            break;
                        }

                        _.each(groupedKeyDate.keyDates,
                            function(keyDate) {
                                if(!self.validateKeyDate(keyDate)) {
                                    return;
                                }
                                var uiKeyDate = new Widgets.KeyDatesList_V2_Enhanced.AssembleModel(keyDate);

                                uiGroupedKeyDate.keyDates.push(uiKeyDate);
                            });

                        self.groupedKeyDates.push(uiGroupedKeyDate);
                        
                    });
            }

            self.loaded(true);
            $ui.widgets.unlock(self);
        });
    return;
};

/**
 * Validates the key date against the excludePhases option
 * @param {*} keyDate 
 * @returns False if the key date should be excluded, otherwise true
 */
Widgets.KeyDatesList_V2_Enhanced.prototype.validateKeyDate = function(keyDate) {
    var self = this;

    //excludePhases is an array of strings, check that the key date phaseSystemName is not in the array
     if (self.excludePhases().length > 0 && self.excludePhases().indexOf(keyDate.phaseSystemName) > -1) {
        return false;
        }

        if(!self.options.includeRemoved && keyDate.removed)
        {
            return false;
        }

        return true;
}

Widgets.KeyDatesList_V2_Enhanced.prototype.reload = function () {
    var self = this;

    self.loaded(false);
    self.totalKeyDates(0);
    self.keyDates([]);
    self.groupedKeyDates([]);

    self.loadAndBind();
}

Widgets.KeyDatesList_V2_Enhanced.prototype.openParentSharedo = function (item) {
    var self = this;

    if (!item.parentOpenCommand)
        return;

    $ui.stacks.cancelAll();
    $ui.nav.invoke(item.parentOpenCommand);
};

Widgets.KeyDatesList_V2_Enhanced.prototype.openKeyDate = function (item) {
    var self = this;

    $ui.nav.invoke({
        invokeType: "panel",
        invoke: "Sharedo.Core.Case.Panels.AddEditKeyDates",
        config: {
            id: item.id,
            parentSharedoId: $ui.pageContext.sharedoId()
        }
    });
};

Widgets.KeyDatesList_V2_Enhanced.prototype.onDestroy = function () {
    var self = this;

    $ui.util.dispose(self.disposables);
};