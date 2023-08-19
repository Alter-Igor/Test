namespace("Blades");

/**
 * Blade constructor - remember the name of this JS type must match the ID of the blade in it's .panel.json manifest
 * @param {} element            // The HTML DOM Element to which this blade model is bound 
 * @param {} configuration      // The configuration passed in from the open blade command
 * @param {} stackModel         // The base blade stack model (contains unique id etc)
 * @returns {} 
 */
Blades.PreInstruction = function(element, configuration, stackModel)
{
    console.log("Blades.PreInstruction");
    var self = this;
    var defaults = {};
    var options = $.extend(true, {}, defaults, configuration);

    // Construct the blade model
    self.model = {
        formBuilderModel : this.buildFormBuilderModel()
        
    };

    this.stackModel=stackModel;
    
    // Construct the blade validation model
    self.validation = {};

    // Store UI concerns
    self.blade = 
    {
        ribbon: null,
        formBuilder: null
    };
    
    self.sharedoId = ko.observable();

    //Sharedo.Core.Case.FormBuilder.Widgets.Aspect = function (element, config, base)
    
    
   

    self.blade.ribbon = self.createRibbonBar();
    self.blade.formBuilder = self.insertFormBuilder(self);
};


Blades.PreInstruction.prototype.buildFormBuilderModel = () =>
{
    
    return {};
    
};



Blades.PreInstruction.prototype.insertFormBuilder = (self) =>
{
    // Load a widget and create it within the container specified
    // container can be either - a jQuery node, a DOM element or a container ID
    // Examples:
    // $ui.widgets.loadWidget("Sharedo.Guidance.Widgets.Welcome", "#top", { title: "Hello" }, {}, function(widget){ console.log(widget); })
    // $ui.widgets.loadWidget("Sharedo.Core.Case.Widgets.TaskList", "#top", { title: "My tasks" }, { type: "mine", dateScope: "all" })
    // $ui.widgets.loadWidget("Sharedo.Guidance.Sample.Widgets.SupportRadar", "#top", { withChrome: false })
    //self.loadWidget = function(widgetName, containerElement, coreConfiguration, configuration, createdCallback, instrumentation)
    
    let coreConfiguration = {
        "isExpanded": true,
        "title": null,
        "withChrome": false
    };

    // self.enabled = config.model.canEdit
    // ? config.model.canEdit
    // : config.blade.enabled;

    let widgetConfig = 
    {
        formId: "4492a6a8-c08e-46bb-854e-d24f6b697e20",
        model: {
            canEdit: ko.observable(true),
            sharedoId: ko.observable(""),
        },
        blade: {
            enabled: ko.observable(true),
        }

        

    }

    widgetConfig = $.extend(true, {}, widgetConfig, self.stackModel);

    // $ui.widgets.loadWidget("Sharedo.Core.Case.FormBuilder", "#top", coreConfiguration, widgetConfig, 
    // function(widget)
    // { console.log(widget); });

    // Sharedo.Core.Case.FormBuilder.Widgets.Aspect = function (element, config, base) 

    //preinstructionFormBuilder
    let element = $("#preinstructionFormBuilder");

    var aspectConfig = self.buildAspectConfig();

    // Dynamically load aspect widget
    $ui.widgets.loadWidget(
        "Sharedo.Core.Case.FormBuilder.Widgets.Aspect",
        element,
        { withChrome: false },
        aspectConfig,
        function (aspectWidget) {

            console.log(aspectWidget);
            // self.aspectWidget = aspectWidget;

            // self.buildAspectModel().then(function (aspectModel) {
            //     aspectWidget.load(aspectModel);

            //     if (typeof next === "function") next();
            // });
        }
    );
       

    
};

Blades.PreInstruction.prototype.buildAspectConfig = function () {
    var self = this;

    // TaskBlade doesn't support striping context - build new one
    var stripingContext = $ui.striping.buildNewContext({
        sharedoId: self.sharedoId()
    });

    // Build model expected by aspect
    var defaults = {
        model: {
            id: self.sharedoId,
            canEdit: self.canChangeState,
        },
        stripingContext: stripingContext,
    };

    // Extend configuration
    var model = $.extend(defaults, self.options);
    return model;
};

/**
 * Create the ribbon for the blade
 */
Blades.PreInstruction.prototype.createRibbonBar = function()
{
    var self = this;

    var ribbon = new Components.Core.RibbonBar.Ribbon(
        {
            alignment: Components.Core.RibbonBar.RibbonAlignment.Right,
            sectionTitles: false
        });

    var section = ribbon.createAddSection("Actions", null, true);
    section.createAddButton("Save", self.saveAndClose.bind(self), "btn-success", "fa-save");
    section.createAddButton("Close", self.discard.bind(self), "btn-danger", "fa-times");
    return ribbon;
};

/**
 * Called by the UI framework when this blade is being unloaded - clean up
 * any subscriptions or references here that would keep this instance alive
 */
Blades.PreInstruction.prototype.onDestroy = function()
{
    var self = this;
};

/**
 * Called by the UI framework after initial creation and binding to load data
 * into it's model
 */
Blades.PreInstruction.prototype.loadAndBind = function()
{
    var self = this;
};

/**
 * Called from the ribbon to save data and close the blade
 */
Blades.PreInstruction.prototype.saveAndClose = function ()
{
    var self = this;
    $ui.stacks.close(self, { action: "Saved" });
};

/**
 * Called from the ribbon to discard the blade
 */
Blades.PreInstruction.prototype.discard = function ()
{
    var self = this;
    $ui.stacks.cancel(self);
};
