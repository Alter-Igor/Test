namespace("Aspects");

/**
 * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
 * @param {} element            The Html DOM element to which this widget will bind
 * @param {} configuration      The configuration passed in from the designer/config
 * @param {} baseModel          The base widget model (contains unique id etc)
 * @returns {} 
 */
Aspects.AutoSave = function (element, configuration, baseModel) {

    this.monitorHandlers();
    this.firedEvents = [];
    this.monitoredHandlers = [];
    this.readyForSave = false;
    let self = this;
    let defaults =
    {
        // Parameters from the host
        _host:
        {
            model: null,
            blade: null,
            enabled: false
        },

        // Aspect widget config parameters
        eventToFireSaveOn: null,
        singleEvent: null,
        runSaveAfterMilliseconds: null,
        debug:
        {
            enabled: null,
            logToConsole: null,
            showEvents: null,
            showInAspect: null
        }
    }

    let options = $.extend(true, {}, defaults, configuration);
    self.blade = configuration._host.blade;
    let hostModel = configuration._host.model;

    self.model =
    {
        // This is referencing a standard observable item from the main model
        title: options._host.model.title,
        // This is the configured message against the aspect instance
        eventToFireSaveOn: options.eventToFireSaveOn,
        singleEvent: options.singleEvent || true,
        runSaveAfterMilliseconds: options.runSaveAfterMilliseconds,
        saveRuns: 0,
        debug: options.debug || {
            enabled: options.debug.enabled || false,
            logToConsole: options.debug.logToConsole || false,
            showEvents: options.debug.showEvents || false,
            showInAspect: options.debug.showInAspect || false
        }

    };
    this.log("Aspects.AutoSave.Init", 'background: #222; color: #bada55');



    if (self.model.eventToFireSaveOn) {
        self.disposables = [
            $ui.events.subscribe(self.model.eventToFireSaveOn, self.save, self)
        ];
    }

    // Every widget gets this
    self.enabled = configuration._host.blade.enabled;
    self.instanceId = hostModel.instanceId;
    self.element = element;
    self.blade = configuration._host.blade
    self.parentSharedoId = hostModel.parentSharedoId;
    self.toolbarContext = configuration._host.toolbarContext;
    self.burgerContext = configuration._host.burgerContext;
    self.sharedoId = hostModel.id;
    self.reloading = false;

    if (self.model.debug.enabled) {
        window.aspectDebug = window.aspectDebug || {};
        window.aspectDebug.autoSave = self;
    }
};

Aspects.AutoSave.prototype.log = function (message, color, data) {
    var self = this;
    if (this.model.debug.enabled) {
        if (this.model.debug.logToConsole) {
            console.log("%c Aspects.AutoSave - " + message, color, data);
        }
    }
}

Aspects.AutoSave.prototype.saveClicked = function () {

    this.runSaveWithNoValidation();
}

Aspects.AutoSave.prototype.save = function () {
    this.log("Save", 'background: #222; color: #bada55');
    var self = this;

    if (self.sharedoId()) {
        this.log("SharedoId is present so no need to do initial save.")
        return;
    }

    if (this.model.saveRuns > 0) {
        this.log("Single event is true and save has already run");
        return;
    }

    this.areAllAspectsLoaded();

    if (this.readyForSave === false) {
        this.log("Not all aspects are loaded yet");
        //wait 500ms and try again
        setTimeout(() => {
            this.save();
        }, 500);
        return;
    }

    this.log("All aspects are loaded so proceeding with save")

    this.runSaveWithNoValidation();


}

Aspects.AutoSave.prototype.runSaveWithNoValidation = function () {
    var self = this;
    this.model.saveRuns++;
    this.log("----> Running Save", 'background: #222; color: #bada55');
    //Store the validate function in temp
    self.isValidTemp = self.blade.isValid;

    //wait 500 ms then run the save - to give models time to load
    setTimeout(() => {
        //override the validate function
        self.blade.isValid = () => { return true };
        self.blade.save(false, () => {
            self.saveCompleted();
        }, false, null);
        this.blade.isValid = this.isValidTemp;
    }, 500);

}

Aspects.AutoSave.prototype.areAllAspectsLoaded = function () {
    //this.blade.aspects()[0].widget.widgetLoaded()
    let testValue = true;

    let aspects = this.blade.aspects();

    //loop through aspects
    for (let i = 0; i < aspects.length; i++) {
        let aspect = aspects[i];
        let widget = aspect.widget;
        let model = aspect.model;

        //if not model then it's not loaded
        if (!model) {
            testValue = false;
            break;
        }

        //if any aspect has a widgetLoaded function and it returns false then it's not loaded
        if (widget?.widgetLoaded) {
            if (widget.widgetLoaded() === false) {
                testValue = false;
                break;
            }
        }
    }
    this.readyForSave = testValue;
}

Aspects.AutoSave.prototype.saveCompleted = function () {
    this.log("Save Completed", 'background: #222; color: #bada55');
}

// function to list and subscribe to all events
// used for debugging
Aspects.AutoSave.prototype.monitorHandlers = function (isAutoSave) {
    
    //run every 100ms and add any new handlers to the monitoredHandlers array
    setInterval(() => {
        let handlers = $ui.events.handlers;
        for(let i = 0; i < handlers.length; i++){
            let handler = handlers[i].eventName;
            if (this.monitoredHandlers.indexOf(handler) === -1) {
                this.monitoredHandlers.push(handler);
                this.log("New Handler Added: " + handler);
                this.addSubscription(handler);
            }
        }
    }, 100);
}

Aspects.AutoSave.prototype.addSubscription = function (eventName) {
    var self = this;
  
    $ui.events.subscribe(eventName, (data) => {
        this.firedEvents.push({ "eventName": eventName, "data": data, "time": new Date(Date.now()) });
        if (this.log) {
            this.log("__ " + eventName + " fired", ' color: blue', data);
        }
        else {
            console.log("__ " + eventName + " fired", ' color: blue', data);
        }
    }, this);
};



Aspects.AutoSave.prototype.buildExtendedMenu = function (menuData, burger, ribbon, section) {
    var self = this;
    this.log("buildExtendedMenu");
};

Aspects.AutoSave.prototype.runMenuCommand = function (command) {
    this.log("runMenuCommand");
};

/**
 * Called by the UI framework after initial creation and binding to load data
 * into it's model
 */
Aspects.AutoSave.prototype.loadAndBind = function () {
    var self = this;
    this.log("Load And Bind");


    if (self.model.runSaveAfterMilliseconds != null) {
        setTimeout(() => {
            this.log("Aspects.AutoSave TimeoOut Fired", 'background: #222; color: #bada55');
            self.save();
        }, self.model.runSaveAfterMilliseconds);
    }
};

Aspects.AutoSave.prototype.load = function (model) {
    var self = this;
    this.log("Load");
};

Aspects.AutoSave.prototype.reload = function (model) {
    var self = this;
    this.log("Reload");
};

Aspects.AutoSave.prototype.onDataChanged = function (data) {
    var self = this;
    this.log("onDataChanged");
};

// More menu
Aspects.AutoSave.prototype.buildBurgerMenu = function (data) {
    var self = this;
    var ribbon = self.ribbon;
    if (!self.burgerContext)
        return;
    this.log("buildBurgerMenu");
};

Aspects.AutoSave.prototype.onDestroy = function () {
    var self = this;
    //console log color
    this.log("onDestroy", 'background: #222; color: #bada55');
    $ui.util.dispose(self.disposables);
};