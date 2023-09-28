namespace("WK");

/**
 * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
 * @param {} element            The Html DOM element to which this widget will bind
 * @param {} configuration      The configuration passed in from the designer/config
 * @param {} baseModel          The base widget model (contains unique id etc)
 * @returns {} 
 */
WKExpressSydneyWater = function (element, configuration, baseModel) {
    const self = this;

    const defaults =
    {
        useCustomAddressInputConfig: null,
        customAddressInputConfig: null,

        address: {
            countrySystemName: ko.observable("au")
        }
    };

    const options = $.extend(true, {}, defaults, configuration);
    

    self.userId = $ui.pageContext.user.userid();
    self.tcSettingKey = `wk-express-recoveries-tc-${self.userId}`;
    self.hasUserSetTc = ko.observable($ui.settings.get(self.tcSettingKey) === self.userId);

    //Igor: Manual Address Setup
    self.manualAddressModel = WK.AddressPicker(defaults);
    //End Manul Address Setup

    self.model =
    {
        complexHtml: options.complexDesigner,
        expressHtml: options.exprescDesigner,
        //yesNoOptionSets
        optionsetYesNo: ko.observableArray(),
        //thirdpartyNamesOptionSet
        thirdPartyNames: ko.observableArray([{ name: "Select a value", id: "Select a value" }]),
        //thirdpartyNamesInsurerOptionSet
        thirdPartyInsurerName: ko.observableArray([]),

        // Section 1:
        particpantTeam: ko.observable(),
        organisationName: ko.observable(),
        organisation: ko.observable(),
        claimHandlerName: ko.pureComputed(function () {
            var name = $ui.pageContext.user.firstname() + ' ' + $ui.pageContext.user.lastname()
            return name;
        }),
        shortName: ko.pureComputed(function () {
            var name = self.model.insuredName() + ' vs ' + self.model.TPIName()
            return name.slice(0, 40);
        }),
        // Section 2: Your Insured’s Details 
        claimRef: ko.observable(),
        insuredName: ko.observable("Sydney Water"),
        insuredABN: ko.observable(),

        //Section 3: Third Party Identification 
        thirdParty: ko.observable(true),
        thirdPartyIdentifiedId: ko.observable(5023402),

        //thirdpartynames
        checkedThirdPartyNamesValue: ko.observable(5023403),
        selectedThirdPartyNames: ko.observable("Select a value"),
        TPIName: ko.observable(),
        TPIFirstName: ko.observable(),
        TPILastName: ko.observable(),
        tpiAddress: ko.observable(),
        tpiEmail: ko.observable(),

        //thirdpartyInsurerName
        selectedThirdPartyInsurerName: ko.observable(null),
        checkedThirdPartyInsurerName: ko.observable(null),
        TPI: ko.observable(null),
        TPIClaimNo: ko.observable(null),

        // Section 4: Date of Loss 
        dateOfLoss: ko.observable(null),
        dateOfLossInput: ko.observable(null).extend({ notify: "always" }),
        dateOfLossInputChecked: ko.observable(null),
        dateOfLossComplex: ko.observable(null),
        dateofLossGreaterThan: ko.observable(null),

        //Section 5: Has the claim been settled 
        claimSettled: ko.observable(5023402),
        claimSettledComplex: ko.observable(false),
        settleAmount: ko.observable(null),
        estimatedsettleAmount: ko.observable(null),
        incorrectAmount: ko.observable(null),
        checkedSettleAmount: ko.pureComputed({
            read: function () {
                if (self.model.settleAmount() >= 100000) {

                    self.model.incorrectAmount(false)
                } else {
                    self.model.incorrectAmount(false)
                }
            },
            write: function (value) {
                self.model.settleAmount(100000)

            },
            owner: self
        }),

        // uninsuredsection
        uninsuredLoss: ko.observable(null),
        uninsuredLossValue: ko.observable(500002002),
        uninsuredLossDocs: ko.observable(null),
        uninsuredLossDocsValue: ko.observable(null),
        uninsuredLossExpress: ko.observable(null),
        uninsuredCorrect: ko.observable(null),
        uninsuredSettleAmount: ko.observable(0),

        //policenumber
        policeNumberAvailable: ko.observable(5023402),
        inputPoliceNumber: ko.observable(null),

        //  Section 6: Details of Loss 
        typeOfLoss: ko.observableArray(),
        selectedTypeOfLoss: ko.observable(),
        selectedCauseIncorrect: ko.observable(true),

        assetDetails: ko.observable(""),

        incidentCausingDamage: ko.observable(),
        descriptionOfRemedialWorksRequired: ko.observable(),

        // Section 7: Location of Loss
        locationOfLoss: ko.observableArray(null),
        selectedLocation: ko.observable(null),
        selectedLocationIncorrect: ko.observable(true),
        inputLocationLoss: ko.observable(),

        //Igor added for manual location prototype
        manualAddress: ko.observable(false),
        locationOfLossManualLocation: self.manualAddressModel,
        autoCompleteAddress: ko.observable(true),
        addressToggleDisplay: ko.observable(),
        locationId: ko.observable(),

        // lod
        havePreviousLodBeenSent: ko.observable(5023403),
        firstLodSent: ko.observable(),
        secondLodSent: ko.observable(),
        thirdLodSent: ko.observable(),

        amountClaimed: ko.observable(),

        // Section 8: Additional Instructions 
        additionalInfo: ko.observable(),


        //Submitted
        currentlySubmited: ko.observable(false),
        validationMessages: ko.observable(true),
    };

    // Location of Loss
    self.address = ko.observable(null);
    self.loaded = ko.observable(false);
    self.addressLookupFeatureEnabled = ko.observable(true);
    self.checkAddressLookupEnabled();
    self.searchInProgress = ko.observable(false);
    self.autoCompleteResults = ko.observableArray();
    self.autoCompleteSelectedResult = ko.observable();
    self.showNoResultsMessage = ko.observable(false);
    self.countries = ko.observableArray();
    self.loadCountries();
    self.lastSearch = "";
    self.searchQuery = ko.observable();

    self.tpiAddressModel = new WK.Address(false);
    self.lossAddressModel = new WK.Address(false);

    self.resetAddressToggleDisplay();

    self.showAutoComplete = ko.pureComputed(function () {
        if (!self.addressLookupFeatureEnabled())
            return false;
        return self.resultsExist() || self.searchInProgress() || self.showNoResultsMessage();
    });
    self.resultsExist = ko.pureComputed(function () {
        return self.autoCompleteResults().length > 0;
    });

    // Section 7: Supporting Documents 
    self.uploadFolder = ko.observable();
    self.files = ko.observableArray();
    self.filesNotUploaded = ko.observableArray();
    self.documentsSuccesfullyUploaded = ko.observableArray();

    self.complex = ko.observable(5023402);

    //section 8 T&C
    self.tandcValue = ko.observable(self.hasUserSetTc() === true ? "1" : "0");
    self.expressModalClicked = ko.observable(false);
    //   self.tandcComplexText = options.complexDesigner();
    //   self.tandcExpressText = options.expressDesigner();

    //Validation left in encase required
    self.validation =
    {
        insuredName: Validator.required(self, self.model.insuredName, "Please enter an Insured's name"),
        TPIName: Validator.required(self, self.model.TPIName, "Please enter a third party insurer name"),
        TPIFirstName: Validator.required(self, self.model.TPIFirstName, "First name required"),
        TPILastName: Validator.required(self, self.model.TPILastName, "Last name required"),
        dateOfLossInput: Validator.required(self, self.model.dateOfLossInput, "Please enter the date of loss"),
        selectedTypeOfLoss: Validator.required(self, self.model.selectedTypeOfLoss, "Please select the type of loss"),
        selectedLocation: Validator.required(self, self.model.selectedLocation, "Please select a loss location"),
        locationOfLoss: Validator.required(self, self.model.selectedLocation, "Please select the location of loss"),
        locationOfLossAddress: ko.pureComputed(() => {
            return self.lossAddressModel.isValid() ? null : "Please enter a valid location of loss address";
        }),
        firstLodSent: Validator.date(self, self.model.firstLodSent, { allowFuture: false, allowFutureMsg: "Letter of demand sent date cannot be in the future" }),
        secondLodSent: Validator.date(self, self.model.secondLodSent, { allowFuture: false, allowFutureMsg: "Letter of demand sent date cannot be in the future" }),
        thirdLodSent: Validator.date(self, self.model.third, { allowFuture: false, allowFutureMsg: "Letter of demand sent date cannot be in the future" }),
        tpiEmail: ko.pureComputed(() => {
            const email = self.model.tpiEmail();
            if (!email) return null;

            const match = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
            return match ? null : "Please enter a valid email";
        }),
        tpiAddress: ko.pureComputed(() => {
            return self.tpiAddressModel.isValid() ? null : "Please enter a valid third party address";
        }),
    };

    self.validationErrorCount = ko.pureComputed(function () {
        var fails = 0;
        if (self.validation.insuredName()) fails++;
        if (self.validation.TPIName()) fails++;
        if (self.validation.dateOfLossInput()) fails++;
        return fails;
    })

    self.toggleAddressInput = function () {
        self.model.autoCompleteAddress(self.model.manualAddress());
        self.model.manualAddress(!self.model.manualAddress());
        //could not in UI get visible to work with !manualAddress
        self.resetAddressToggleDisplay();
    };

    //Validation count
    self.validationErrorCount = ko.pureComputed(function () {
        var fails = 0;
        if (self.validation.insuredName()) fails++;
        if (self.validation.dateOfLossInput()) fails++;
        if (self.validation.selectedTypeOfLoss()) fails++;
        if (self.validation.locationOfLoss()) fails++;
        if (self.validation.locationOfLossAddress()) fails++;

        if (self.ui.thirdPartyIsOrganisation()) {
            if (self.validation.TPIName()) fails++;
        }
        else {
            if (self.validation.TPIFirstName()) fails++;
            if (self.validation.TPILastName()) fails++;
        }

        if (self.validation.tpiEmail()) fails++
        if (self.validation.tpiAddress()) fails++

        if (self.validation.firstLodSent()) fails++;
        if (self.validation.secondLodSent()) fails++;
        if (self.validation.thirdLodSent()) fails++;

        if (self.files().length === 0) fails++;

        return fails;
    });

    self.hasValidationErrors = ko.pureComputed(() => self.validationErrorCount() > 0);

    //state of the ui
    self.ui =
    {
        state: ko.observable("start"),
        loaded: ko.observable(false),

        folders: [
            "Claim Form",
            "Invoices",
            "Assessment Report(s)",
            "Expert Report(s)",
            "Photos/Videos",
            "Release or subrogation release",
            "Loss adjuster's report and any annexures",
        ],


        submitEnabled: ko.pureComputed(function () {
            return self.validationErrorCount() <= 0;
        }),

        handler: {
            name: ko.observable(),
            email: ko.observable(),
            tel: ko.observable()
        },
        
        tpiAddressPicker: {
            address: self.tpiAddressModel
        },
        
        lossAddressPicker: {
            address: self.lossAddressModel
        },

        thirdPartyIsOrganisation: ko.observable(false)
    };

    self.widgets = [];
};

WKExpressSydneyWater.prototype.resetAddressToggleDisplay = function () {
    var self = this;
    self.model.addressToggleDisplay("Enter address manually");

    if (self.model.manualAddress() === true) {
        self.model.addressToggleDisplay("Enter address using address lookup");
    }
}

//thirdPartyNamesOptionSet
WKExpressSydneyWater.prototype.checkthirdPartyNames = function (event, data) {
    var self = this;
    if (data.target.value === "500001538" || data.target.value === "Select a value") {
        self.model.selectedThirdPartyNames(data.target.value)
        return self.model.checkedThirdPartyNamesValue(false)
    } else {
        self.model.selectedThirdPartyNames(data.target.value)
        return self.model.checkedThirdPartyNamesValue(true)
    }
}

//thirdPartyInsurerNameOptionSet
WKExpressSydneyWater.prototype.checkedThirdPartyInsurerName = function (event, data) {
    var self = this;
    if (data.target.value === "500002009" || data.target.value === "" || data.target.value === "500002008") {
        self.model.selectedThirdPartyInsurerName(data.target.value)
        return self.model.checkedThirdPartyInsurerName(false)
    } else {
        self.model.selectedThirdPartyInsurerName(data.target.value)
        return self.model.checkedThirdPartyInsurerName(true)
    }
}


WKExpressSydneyWater.prototype.checkDate = function (event, data) {
    var self = this;



    var today = new Date();
    var todayCopy = new Date(today.getTime());
    var threeYearsAgo = todayCopy.setFullYear(todayCopy.getFullYear() - 3);
    var olderThenThreeYears = new Date(self.model.dateOfLossInput()) - new Date(threeYearsAgo);

    if (olderThenThreeYears / (1000 * 60 * 60 * 24 * 365) < 0) {
        self.model.dateofLossGreaterThan(false);
        self.model.dateOfLossInputChecked(false)
        self.model.dateOfLossComplex(true)
        return self.model.dateOfLoss(false)
    } else if (new Date(self.model.dateOfLossInput()) > today) {
        self.model.dateofLossGreaterThan(true);
        self.model.dateOfLossInputChecked(false)
        self.model.dateOfLossComplex(false)
        return self.model.dateOfLoss(true)
    } else {
        self.model.dateofLossGreaterThan(false);
        self.model.dateOfLossInputChecked(true)
        self.model.dateOfLossComplex(false)
        return self.model.dateOfLoss(false)
    }


}

WKExpressSydneyWater.prototype.claimSettledToggle = function (event, data) {
    var self = this;
    if (data.target.value.name === "Yes") {
        self.model.claimSettledComplex(false)
        return self.model.claimSettled(data.target.value.id)
    } else {
        self.model.claimSettledComplex(true)
        return self.model.claimSettled(data.target.value.id)
    }
}

WKExpressSydneyWater.prototype.submitSettleMentAmount = function (event, data) {
    var self = this;
    if (data.target.id === "estimated") {
        self.model.settleAmount(0)
    } else {
        self.model.estimatedsettleAmount(0)
    }
}

WKExpressSydneyWater.prototype.checkUninsuredLoss = function (event, data) {
    var self = this;
    if (data.target.value === "500002003") {
        self.model.uninsuredLossValue(data.target.value)
        self.model.uninsuredLossExpress(true);
        self.model.uninsuredCorrect(true)
    } else if (data.target.value === "500002001") {
        self.model.uninsuredLossValue(data.target.value)
        self.model.uninsuredCorrect(true)
        self.model.uninsuredLossExpress(false);
    } else if (data.target.value === "500002002") {
        self.model.uninsuredLossValue(data.target.value)
        self.model.uninsuredCorrect(false)
        self.model.uninsuredLossExpress(false);
    } else {
        self.model.uninsuredLossValue(data.target.value)
        self.model.uninsuredLossExpress(false);
        self.model.uninsuredCorrect(false)
    }
}

WKExpressSydneyWater.prototype.checkUninsuredLossDocs = function (event, data) {
    var self = this;
    if (data.target.value === "5023402") {
        self.model.uninsuredCorrect(true)
        self.model.uninsuredLossDocsValue(data.target.value)

    } else if (data.target.value === "5023403") {
        self.model.uninsuredCorrect(true)
        self.model.uninsuredLossDocsValue(data.target.value)

    } else {
        self.model.uninsuredCorrect(false)
        self.model.uninsuredLossDocsValue(data.target.value)

    }
    if (self.model.uninsuredLossValue() === '500002002' && self.model.uninsuredLossDocsValue() === '5023402') {
        self.model.uninsuredCorrect(true)
    }
}

WKExpressSydneyWater.prototype.checkCauseOfLoss = function (event, data) {
    var self = this;
    if (data.target.value !== "500001544") {

        self.model.selectedTypeOfLoss(data.target.value);
        return self.model.selectedCauseIncorrect(false);
    } else if (data.target.value === "") {
        return self.model.selectedCauseIncorrect(true);
    } else {
        self.model.selectedTypeOfLoss(data.target.value);
        return self.model.selectedCauseIncorrect(false);
    }
}

WKExpressSydneyWater.prototype.checkLocation = function (event, data) {
    var self = this;
    if (data.target.value === "500000313" || data.target.value === "500000406" || data.target.value === "500000003") {
        self.model.selectedLocation(data.target.value);
        return self.model.selectedLocationIncorrect(true);
    } else if (data.target.value === "") {
        self.model.selectedLocation(data.target.value);
    } else {
        self.model.selectedLocation(data.target.value);
    }
}


WKExpressSydneyWater.prototype.tandcToggle = function (event, data) {
    var self = this;
    $ui.startWaitingFor("step1", "check complex");
    self.checkComplex();
    $ui.stopWaitingFor("step1");
    return self.tandcValue(data.target.value);
}

WKExpressSydneyWater.prototype.submit = function (model, ev) {
    var self = this;
    //sanity checks
    self.checkDate();
    self.checkComplex();
    var formData = new FormData();

    var agent = new CreateBladeAgent();
    
    const createTpiAdress = !self.tpiAddressModel.hasAddress()
        ? $.when()
        : agent.createLocation(self.tpiAddressModel)
            .then(id => {
                self.model.tpiAddress(id);
                return $.when();
            });
    
    const createLossAddress = !self.lossAddressModel.hasAddress()
        ? $.when()
        : agent.createLocation(self.lossAddressModel)
            .then(id => {
                self.address(id);
                return $.when();
            });
    
    const isOrg = self.ui.thirdPartyIsOrganisation();
    
    const prereqs = $.when(createTpiAdress, createLossAddress)
        .then(() => {
            return isOrg
                ? agent.createOrganisation(self.model.TPIName(), self.model.tpiAddress(), self.model.tpiEmail())
                : agent.createPerson(self.model.TPIFirstName(), self.model.TPILastName(), self.model.tpiAddress(), self.model.tpiEmail());
        })

    if (self.files().length > 0) {

        _.each(self.files(), function (f) {
            formData.append(f.name, f);
        });

        formData.append("folder", "A");

        $ui.startWaitingFor("step1", "Create instruction");

        // creates the new instruction
        prereqs
            .then(thirdPartyOdsId => {
                
                const thirdPartyType = isOrg ? "organisation" : "person";

                agent.createInstruction(self, thirdPartyOdsId, thirdPartyType).then(id => {
                    $ui.settings.set(self.tcSettingKey, self.userId);
                    self.hasUserSetTc(true);

                    $ajax.get(`/api/sharedo/${id}/linkedRepositories?includeAncestors=true`).then((data) => {

                        $ajax.rawPost(`api/sharedo/${id}/relatedDocuments/upload/${data[0].repositoryId}/${data[0].repositoryName}/${ko.unwrap(self.uploadFolder)}`, formData).then(() => {
                            $ui.stopWaitingFor("step1");
                        }).then(() => {
                            $ajax.get(`/api/sharedo/${id}/relatedDocuments`).then((data) => {
                                self.documentsSuccesfullyUploaded(data);
                            }).then(() => {
                                self.checkFilesUploadSuccessfully();
                            });
                        });
                    });
                });
            });
    } else {

        prereqs
            .then(thirdPartyOdsId => {
                const thirdPartyType = isOrg ? "organisation" : "person";

                agent.createInstruction(self, thirdPartyOdsId, thirdPartyType).then(id => {
                    $ui.settings.set(self.tcSettingKey, self.userId);
                    self.hasUserSetTc(true);

                    $ui.stopWaitingFor("step1")
                });
            });

    }

    return self.model.currentlySubmited(true);
};

WKExpressSydneyWater.prototype.checkFilesUploadSuccessfully = function (model, ev) {
    var self = this;
    var filesArray = [];
    var docArray = [];
    _.each(self.files(), function (file) {
        filesArray.push(file.name)
    })

    _.each(self.documentsSuccesfullyUploaded(), function (doc) {
        docArray.push(doc.title)
    })


    _.each(filesArray, function (value) {
        if (docArray.indexOf(value) == -1) {
            self.filesNotUploaded.push({ "name": value });
        }
    })

};

WKExpressSydneyWater.prototype.selectFiles = function (model, ev) {
    var self = this;
    _.each(ev.target.files, f => {
        self.files.push(f);
    });
};

WKExpressSydneyWater.prototype.removeFiles = function (event, data) {
    var self = this;
    return self.files.remove(function (file) { return file.name === event.name })
};

WKExpressSydneyWater.prototype.dropFiles = function (dropInfo) {
    var self = this;
    if (dropInfo.isFile) {
        _.each(dropInfo.dataTransfer.files, function (f) {
            self.files.push(f);
        });
    }
};

WKExpressSydneyWater.prototype.reset = function () {
    var self = this;

    // Section1
    self.model.claimRef("");
    self.model.insuredName("Sydney Water");
    self.model.insuredABN("");

    //thirdPartyToggleAndOptionSet
    self.model.thirdPartyIdentifiedId(5023402);
    self.model.thirdParty(true);

    //thirdpartyNamesOptionSet
    self.model.selectedThirdPartyNames("Select a value");
    self.model.checkedThirdPartyNamesValue(5023403);
    self.model.TPIName("");
    self.model.TPIFirstName("");
    self.model.TPILastName("");
    self.model.tpiAddress("");
    self.model.tpiEmail("");

    // thirdPartyInsurersAndName
    self.model.selectedThirdPartyInsurerName(null);
    self.model.checkedThirdPartyInsurerName(null);
    self.model.TPI("");
    self.model.TPIClaimNo("");

    //date of loss
    self.model.dateOfLoss(null);
    self.model.dateOfLossInput(null);
    self.model.dateOfLossComplex(null);
    self.model.dateOfLossInputChecked(null);
    self.model.dateofLossGreaterThan(null),

        //settlement amount
        self.model.claimSettled(5023402);
    self.model.claimSettledComplex(false);
    self.model.settleAmount(null);
    self.model.incorrectAmount(null);


    self.model.assetDetails("");
    self.model.incidentCausingDamage("");
    self.model.descriptionOfRemedialWorksRequired("");

    //selected type of loss
    self.model.selectedTypeOfLoss(null);
    self.model.selectedCauseIncorrect(true);

    //police
    self.model.inputPoliceNumber("")
    self.model.policeNumberAvailable(null);

    //location
    self.model.selectedLocation("");
    self.model.selectedLocationIncorrect(true);
    self.model.inputLocationLoss("");

    self.model.amountClaimed("");

    // lod
    self.model.havePreviousLodBeenSent(5023403);
    self.model.firstLodSent(null);
    self.model.secondLodSent(null);
    self.model.thirdLodSent(null);

    //additionalInfo
    self.model.additionalInfo("");

    //
    self.model.uninsuredLossValue(500002002),
        self.model.uninsuredLossDocsValue(null),
        self.model.uninsuredLossExpress(null),
        self.model.uninsuredCorrect(null),
        self.model.uninsuredSettleAmount(0),

        //address
        self.address("");
    self.loaded(false);
    self.addressLookupFeatureEnabled(true);
    self.checkAddressLookupEnabled("");
    self.searchInProgress(false);
    self.autoCompleteResults();
    self.autoCompleteSelectedResult("");
    self.showNoResultsMessage(false);
    self.countries("");
    self.loadCountries("");
    self.lastSearch = "";
    self.searchQuery("");

    //files
    self.files([]);
    self.documentsSuccesfullyUploaded([]);
    self.filesNotUploaded([])

    // tpi address 
    self.tpiAddressModel.clear();
    self.ui.thirdPartyIsOrganisation(false);
    
    
    self.lossAddressModel.clear();

    //complex
    self.complex(5023402);
    //tandc
    self.tandcValue(self.hasUserSetTc() === true ? "1" : "0");
    //expressmodal
    self.expressModalClicked(false);
    self.ui.state("start");
    return self.model.currentlySubmited(false);
};

WKExpressSydneyWater.prototype.checkAddressLookupEnabled = function (item) {
    var self = this;

    $ajaxMutex.getOnce("/api/feature/address-lookup")
        .done(function (data) {
            self.addressLookupFeatureEnabled(data.enabled);

            self.loaded(true);
            var config = JSON.parse(data.config);
            self.setupSearchSubscription(config.addressQueryDelay);
        });
};

WKExpressSydneyWater.prototype.setupSearchSubscription = function (delay) {
    var self = this;

    self.searchQuery.subscribe(_.debounce(function (v) {
        if (!self.addressLookupFeatureEnabled()) {
            return false;
        }

        if (!v) {
            self.autoCompleteResults([]);
        }

        if (v && v !== self.lastSearch && !self.userHasClicked) {
            self.addressSearch(v);
        }

        self.userHasClicked = false;
        self.lastSearch = v;

    }, delay || 500));
};

WKExpressSydneyWater.prototype.autoCompleteSelectResult = function (item, value) {
    const self = this;
    if (!item) item = self.autoCompleteSelectedResult();
    if (!item) return;
    self.userHasClicked = true;
    self.autoCompleteClearResults();
    self.autoCompleteSelectedResult(null);

    if (item !== null || item !== "") {
        self.searchQuery(item.display);
        self.setAddressById(item, value);
    }
};

WKExpressSydneyWater.prototype.autoCompleteClearResults = function (item) {
    var self = this;
    self.autoCompleteResults.removeAll();
};

WKExpressSydneyWater.prototype.hideAutoComplete = function (item) {
    var self = this;
    self.showNoResultsMessage(false);
    self.autoCompleteClearResults();
};

WKExpressSydneyWater.prototype.addressSearch = function (v, next) {
    var self = this;
    self.searchInProgress(true);
    self.showNoResultsMessage(false);

    var removeSpecialCharsAndTrim = function (value) {
        return value
            .replace(/[^0-9a-zA-Z ]/g, "")
            .replace(/\s\s+/g, " ")
            .trim();
    };

    var searchText = removeSpecialCharsAndTrim(v);

    if (!searchText)
        return;

    $ajax.get("/api/address/finder/searchTerm/" + encodeURIComponent(searchText), {}, function (data) {
        if (v === self.lastSearch) {
            if (data.length === 0) {
                self.showNoResultsMessage(true);
            }

            var results = [];
            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                var placeName = item.place === null ? "" : item.place;

                results.push({
                    display: item.streetAddress + ", " + placeName,
                    value: item,
                    selected: ko.observable(false)
                });
            }

            self.autoCompleteResults(results.slice(0, 5));

            self.searchInProgress(false);
        }
    });
}

WKExpressSydneyWater.prototype.loadCountries = function () {
    var self = this;
    return $ajaxMutex.getOnce("/api/countries/forAddressEntry")
        .then(function (data) {
            self.countries(data);
        });
}

WKExpressSydneyWater.prototype.setAddressById = function (id, address) {
    var self = this;
    var value = id.value.udprn
    $ajax.get("/api/address/finder/addressId/" + value, {}).then(function (data) {

        $ajax.post("/api/aspects/ods/locations", data).then(function (id) {

            $ajax.get(`/api/aspects/ods/locations/${id}?_=1662041529874`).then(function (value) {
                self.address(value.id)
            })
        });
    });
};

WKExpressSydneyWater.prototype.autoCompleteKey = function (item, ev) {
    var self = this;
    var keys = {
        Up: 38,
        Down: 40,
        Return: 13,
        Escape: 27,
        Tab: 9
    };
    if (ev.keyCode === keys.Up || ev.keyCode === keys.Down) {
        if (ev.keyCode === keys.Up) self.autoCompleteMoveSelection(-1);
        if (ev.keyCode === keys.Down) self.autoCompleteMoveSelection(1);
        return false;
    }

    if (ev.keyCode === keys.Escape) {
        self.hideAutoComplete();
        return false;
    }

    if (ev.keyCode === keys.Return) {
        self.autoCompleteSelectResult();
        return false;
    }

    // Let the character be added to the input
    return true;
};

WKExpressSydneyWater.prototype.autoCompleteMoveSelection = function (direction) {
    var self = this;
    var currentSelection = self.autoCompleteSelectedResult();
    var count = self.autoCompleteResults().length;
    var nextSelection = null;

    if (!currentSelection && count < 1) return;

    if (!currentSelection) {
        if (direction === 1) nextSelection = self.autoCompleteResults()[0];
        if (direction === -1) nextSelection = self.autoCompleteResults()[count - 1];
    }
    else {
        var index = self.autoCompleteResults.indexOf(currentSelection);
        index += direction;

        if (index < 0) index = 0;
        if (index > (count - 1)) index = (count - 1);
        nextSelection = self.autoCompleteResults()[index];
    }

    if (!nextSelection) return;

    if (currentSelection) currentSelection.selected(false);
    self.autoCompleteSelectedResult(nextSelection);
    nextSelection.selected(true);
};


WKExpressSydneyWater.prototype.loadAndBind = function () {
    var self = this;

    $ui.widgets.loadWidget("Sharedo.Core.Case.Widgets.AddressPicker",
        "#wk-tpi-address",
        { withChrome: false },
        self.ui.tpiAddressPicker,
        function (widget) {
            self.widgets.push(widget);
        });
    $ui.widgets.loadWidget("Sharedo.Core.Case.Widgets.AddressPicker",
        "#wk-loss-address",
        { withChrome: false },
        self.ui.lossAddressPicker,
        function (widget) {
            self.widgets.push(widget);
        });

    WKExpressSydneyWaterAgent.WKAgent.getJurisdictionsOptionSet().then(function (types) {
        self.model.locationOfLoss(types)
    });

    WKExpressSydneyWaterAgent.WKAgent.getOrg($ui.pageContext.user.organisationId()).then(function (value) {
        self.model.organisation(value)
        self.model.organisationName(value.name)
    });

    WKExpressSydneyWaterAgent.WKAgent.getTeamsID($ui.pageContext.user.userid()).then(function (value) {

        self.model.particpantTeam(value)
    });

    WKExpressSydneyWaterAgent.WKAgent.getYesNoOptionset().then(function (types) {
        self.model.optionsetYesNo(types)
        self.model.uninsuredLossDocs(types)
    });

    WKExpressSydneyWaterAgent.WKAgent.getThirdPartyNamesOptionset().then(function (types) {
        self.model.thirdPartyNames.push(...types)
    });

    WKExpressSydneyWaterAgent.WKAgent.getThirdPartyInsurerNamesOptionset().then(function (types) {
        self.model.thirdPartyInsurerName.push(...types)
    });

    WKExpressSydneyWaterAgent.WKAgent.getTypesOfLossOptionset().then(function (types) {
        self.model.typeOfLoss(types)
    });

    WKExpressSydneyWaterAgent.WKAgent.getUninsuredLossOptionset().then(function (types) {
        self.model.uninsuredLoss(types)
    });

    WKExpressSydneyWaterAgent.WKAgent.getClaimHandlerUser()
        .then(response => {
            if (!response) return;

            const emails = response.contactDetails.filter(x => x.contactTypeSystemName === "email");
            if (emails.length > 0) {
                const email = _.find(emails, x => x.isPrimary) || emails[0];

                self.ui.handler.email(email.contactValue);
            }

            const tels = response.contactDetails.filter(x => x.contactTypeSystemName === "direct-line");
            if (tels.length > 0) {
                const tel = _.find(tels, x => x.isPrimary) || tels[0];

                self.ui.handler.tel(tel.contactValue);
            }
        });
};

WKExpressSydneyWater.prototype.checkComplex = function () {
    var self = this;

    self.complex(5023402);
};

