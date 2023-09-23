// Namespacing
// namespace("Sharedo.Core.Case.WorkflowEditor.NodeTypes");

 
// View model

export function CreateTaskv2Designer(element: HTMLElement, configuration: any, baseModel: any): CreateTaskv2DesignerClass {
    return new CreateTaskv2DesignerClass(element, configuration, baseModel);
}

export class CreateTaskv2DesignerClass {
    action: any;
    model: any;
    sharedoTypePickerOptions: { multiSelect: boolean; selectMode: string; selectedItem: any; rootTypes: string[]; };
    assignmentPickerOptions: {
        action: any; sharedoTypeSystemName: any; assignments: any;
        // Exclude these roles as managed elsewhere
        excludeRoles: string[];
    };
    phases: any;
    phasePickerOptions: { action: any; sharedoTypeSystemName: any; phases: any; };
    priorities: any;
    disposables: any[];

    constructor(element: HTMLElement, configuration: any, baseModel: any) {

        var defaults =
        {
            // The selected node
            node: null,

            // The overall process model object
            model: null
        };

        var options = $.extend(true, {}, defaults, configuration);

        this.action = options.node;
        this.model = options.model;

        this.sharedoTypePickerOptions =
        {
            multiSelect: false,
            selectMode: "systemName",
            selectedItem: this.action.config.taskType,
            rootTypes: ["task"]
        };

        this.assignmentPickerOptions =
        {
            action: this.action,
            sharedoTypeSystemName: this.action.config.taskType,
            assignments: this.action.ui.assignments,
            // Exclude these roles as managed elsewhere
            excludeRoles: ["primary-owner"]
        };

        this.phases = this.action.ui.phases;
        this.phasePickerOptions =
        {
            action: this.action,
            sharedoTypeSystemName: this.action.config.taskType,
            phases: this.phases
        };

        this.priorities = ko.observableArray();

        this.disposables =
            [
                this.action.config.onCompleteOutlet.subscribe(this.setOnCompleteOutlet.bind(self)),
                this.action.config.onOverdueOutlet.subscribe(this.setOnOverdueOutlet.bind(self))
            ];
    };

    loadAndBind() {
        const self = this;

        $ajaxMutex.getOnce("/api/ods/optionsets/work-priority")
            .then((response: { optionSetValueProperties: any; }) => {
                this.priorities(response.optionSetValueProperties);
            });
    }

    onDestroy() {
        var self = this;

        _.each(this.disposables, (d: { dispose: () => any; }) => d.dispose());
    };

    setOnCompleteOutlet() {
        var self = this;
        if (this.action.config.onCompleteOutlet()) {
            this.action.addAvailableOutlet("onComplete", "Task complete");
        }
        else {
            this.action.removeAvailableOutlet("onComplete");
        }
    };

    setOnReminderOutlet() {
        var self = this;
        if (this.action.config.onReminderOutlet()) {
            this.action.addAvailableOutlet("onReminderDue", "Reminder due");
        }
        else {
            this.action.removeAvailableOutlet("onReminderDue");
        }
    };

    setOnOverdueOutlet() {

        if (this.action.config.onOverdueOutlet()) {
            this.action.addAvailableOutlet("onOverdue", "Overdue");
        }
        else {
            this.action.removeAvailableOutlet("onOverdue");
        }
    }
}
