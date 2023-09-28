namespace('WK');


WK.AddressPicker = function (configuration) {
    var self = this;

self.onDestroy = function (item) {
    var self = this;

    self.uiConfigHandler.dispose();
};

self.checkAddressLookupEnabled = function (item) {
    var self = this;

    $ajaxMutex.getOnce("/api/feature/address-lookup")
        .done(function (data) {
            self.addressLookupFeatureEnabled(data.enabled);

            if (!data.enabled)
                self.showAddressForm(true);

            self.loaded(true);

            var config = JSON.parse(data.config);
            self.setupSearchSubscription(config.addressQueryDelay);
        });
}

self.setupSearchSubscription = function (delay) {
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

autoCompleteSelectResult = function(item) {
    var self = this;

    if (!item) item = self.autoCompleteSelectedResult();
    if (!item) return;

    self.userHasClicked = true;
    self.autoCompleteClearResults();
    self.setAddressById(item.value.udprn);
    self.autoCompleteSelectedResult(null);
    self.showAddressForm(true);
    self.searchQuery("");
};

self.autoCompleteClearResults = function (item) {
    var self = this;
    self.autoCompleteResults.removeAll();
};

self.hideAutoComplete = function (item) {
    var self = this;

    self.showNoResultsMessage(false);
    self.autoCompleteClearResults();
};

self.addressSearch = function (v, next) {
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

            self.autoCompleteResults(results);

            self.searchInProgress(false);
        }
    });
}


executeSearch = function(searchText) {

}

self.loadCountries = function () {
    var self = this;

    $ui.widgets.lock(self);

    // Only load countries once - pretty big (shouldn't change)
    return $ajaxMutex.getOnce("/api/countries/forAddressEntry")
        .then(function (data) {
            self.countries(data);

            if (!self.address.countrySystemName())
                self.address.countrySystemName($ui.localisation.defaultCountrySystemName());

            $ui.widgets.unlock(self);
        });
}

self.setAddressById = function (id) {
    var self = this;

    $ui.widgets.lock(self);
    $ajax.get("/api/address/finder/addressId/" + id, {}, function (data) {
        self.address.map(data, id);
        self.fireAddressUpdate();
        $ui.widgets.unlock(self);
    });
}

self.autoCompleteKey = function (item, ev) {
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

self.autoCompleteMoveSelection = function (direction) {
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

self.toggleAddressForm = function () {
    var self = this;

    self.showAddressForm(!self.showAddressForm());
};

self.fireAddressUpdate = function (data, event) {
    var self = this;

    if (self.addressLine1Cache === self.address.addressLine1() &&
        self.postcodeCache === self.address.postcode()) {
        // No significant update detected, do nothing
        return;
    }

    $ui.events.broadcast("WK.AddressPicker.Updated",
        {
            contextId: self.contextId,
            address: self.address
        });

    self.addressLine1Cache = self.address.addressLine1();
    self.postcodeCache = self.address.postcode();
};

 var self = this;

    var defaults = {
        address: null,
        useCustomAddressInputConfig: null,
        customAddressInputConfig: null
    }
    self.options = $.extend(defaults, configuration);

    // if (!self.options.address) {
    //     $ui.errorHandling.handleError({ message: "AddressPicker: no address provided" });
    //     return;
    // }

    // Address model (see model.js)
    self.address =  WK.Address(self.options);

    // Setup cache
    self.addressLine1Cache = self.address.addressLine1();
    self.postcodeCache = self.address.postcode();

    // To stop mix up of updates, usually blade id
    self.contextId = self.options.contextId;

    self.loaded = ko.observable(false);
    self.addressLookupFeatureEnabled = ko.observable(true);

    self.showAddressForm = ko.observable(self.address != null && ko.unwrap(self.address.id));
    
    self.hasSearched = ko.observable(false);
    self.searchInProgress = ko.observable(false);
    self.autoCompleteResults = ko.observableArray();
    self.autoCompleteSelectedResult = ko.observable();
    self.showNoResultsMessage = ko.observable(false);

    self.countries = ko.observableArray();

//     this.uiConfigHandler = new WK.AddressUiConfigHandler({
//         countries: this.countries,
//         selectedCountry: this.address.countrySystemName
//     });

    // Create handler to apply address UI config based on selected country
    self.uiConfigHandler = new WK.AddressUiConfigHandler({
        countries: self.countries,
        selectedCountry: self.address.countrySystemName
    });

    if (self.options.useCustomAddressInputConfig)
        self.uiConfigHandler.setCustomUiConfig(self.options.customAddressInputConfig);

    // Keep UI config locally (for labels), and set in address model (for validation)
    self.uiModel = self.uiConfigHandler.getUiModel();
    self.address.setUiConfig(self.uiModel);

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
    
    return self;
}