// Namespacing
namespace("Widgets");

// View model
Widgets.KeyDatesList_V2_Enhanced.AssembleModel = function (keyDate) {
    var self = this;
    
    self.getKeyDatePhaseCssClass = function (keyDateStatus) {
        switch (keyDateStatus) {
        case "milestone-planned":
            return "border-left-warning";

        case "milestone-missed":
            return "border-left-danger";

        case "milestone-complete":
        case "milestone-done":
            return "border-left-success";
        }
    };

    var dueDateMoment = moment(keyDate.dueDate);

    self.id = keyDate.id;
    self.dueDate = keyDate.dueDate;

    self.dayOfMonth = dueDateMoment.date();
    self.dateOnly = keyDate.dateOnly;
    self.title = keyDate.title;
    self.phaseName = keyDate.phaseName;
    self.phaseCssClass = self.getKeyDatePhaseCssClass(keyDate.phaseSystemName);
    self.phaseIcon = keyDate.phaseIcon;
    self.sharedoTypeDescription = keyDate.sharedoTypeDescription;
    self.parentId = keyDate.parentId;
    self.parentTitle = keyDate.parentTitle;
    self.parentReference = keyDate.parentReference;
    self.showParentSummary = keyDate.showParentSummary;

    self.parentReferenceAndTitle = keyDate.parentReference;
    if (!self.parentReferenceAndTitle)
        self.parentReferenceAndTitle = keyDate.parentTitle;
    else
        self.parentReferenceAndTitle += (" - " + keyDate.parentTitle);

    self.parentNavLinkEnabled = keyDate.parentNavLinkEnabled;
    self.parentOpenCommand = keyDate.parentOpenCommand;
};