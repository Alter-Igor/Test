namespace("WK");

WK.NewInstructionAddressModel = function(value, locationType) {
    var self = this;
    
    self.address = $ui.util.wrapObservable(value);
    
    self.locationType = locationType || "correspondence";
    
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

    self.showAutoComplete = ko.pureComputed(function () {
        if (!self.addressLookupFeatureEnabled())
            return false;
        return self.resultsExist() || self.searchInProgress() || self.showNoResultsMessage();
    });
    
    self.resultsExist = ko.pureComputed(function () {
        return self.autoCompleteResults().length > 0;
    });
    
    self.checkAddressLookupEnabled();
};

WK.NewInstructionAddressModel.prototype.reset = function (item) {
    var self = this;

    self.searchQuery("");
    self.lastSearch = "";
};

WK.NewInstructionAddressModel.prototype.checkAddressLookupEnabled = function (item) {
    var self = this;

    $ajaxMutex.getOnce("/api/feature/address-lookup")
        .done(function (data) {
            self.addressLookupFeatureEnabled(data.enabled);

            var config = JSON.parse(data.config);
            self.setupSearchSubscription(config.addressQueryDelay);
        });
};

WK.NewInstructionAddressModel.prototype.setupSearchSubscription = function (delay) {
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
}

WK.NewInstructionAddressModel.prototype.autoCompleteSelectResult = function(item) {
    
    var self = this;
    if (!item) item = self.autoCompleteSelectedResult();
    if (!item) return;
    
    self.userHasClicked = true;
    self.autoCompleteClearResults();
    self.autoCompleteSelectedResult(null);

    self.searchQuery(item.display);
    if(item !== null || item !== "" ) {
        self.setAddressById(item);
    }
};

WK.NewInstructionAddressModel.prototype.autoCompleteClearResults = function (item) {
    var self = this;
    self.autoCompleteResults.removeAll();
};

WK.NewInstructionAddressModel.prototype.hideAutoComplete = function (item) {
    var self = this;
    self.showNoResultsMessage(false);
    self.autoCompleteClearResults();
};

WK.NewInstructionAddressModel.prototype.addressSearch = function (v, next) {
    var self = this;
    self.searchInProgress(true);
    self.showNoResultsMessage(false);

    var removeSpecialCharsAndTrim = function(value) {
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
};

WK.NewInstructionAddressModel.prototype.loadCountries = function () {
    var self = this;
    return $ajaxMutex.getOnce("/api/countries/forAddressEntry")
        .then(function (data) {
            self.countries(data);
        });
};

WK.NewInstructionAddressModel.prototype.setAddressById = function(id) {
    var self = this;
    var value = id.value.udprn
    $ajax.get("/api/address/finder/addressId/" + value, {}).then(function (data) {
        
        data.locationTypes = [self.locationType];
        
        $ajax.post("/api/aspects/ods/locations", data).then(function (id) {
        
            // Optimise - can we remove this call?
            $ajax.get(`/api/aspects/ods/locations/${id}`).then(function (value){
                
                self.address(value.id)
            })
        });
    });
};

WK.NewInstructionAddressModel.prototype.autoCompleteKey = function (item, ev) {
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

WK.NewInstructionAddressModel.prototype.autoCompleteMoveSelection = function (direction) {
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
