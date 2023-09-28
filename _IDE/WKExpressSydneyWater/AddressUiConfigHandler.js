
/* Helper to apply address UI config based on currently selected country, i.e.
 * - which address fields are mandatory
 * - what the field labels are
 *
 * Configuration comes from countries table (addressInputConfig field).
 */
WK.AddressUiConfigHandler = function (configuration) {
    var self = this;

    var defaults = {
        countries: null,        // Countries observable [ { addressInputConfig: ... }], might not be loaded yet
        selectedCountry: null   // Selected country (system name, observable)
    }
    self.options = $.extend(defaults, configuration);

    if (!self.options.countries || !self.options.selectedCountry) {
        $ui.errorHandling.handleError({ message: "AddressUiConfigHandler: no countries / selectedCountry provided" });
        return;
    }

    // Set initial UI model
    self.uiModel = ko.mapping.fromJS(self.defaultUiConfig());

    self.customUiConfig = null;

    // Override UI config from selected country
    self.countrySubs = self.options.countries.subscribe(self.mapUiModelFromCountry.bind(self));
    self.selectedSubs = self.options.selectedCountry.subscribe(self.mapUiModelFromCountry.bind(self));
  
};

WK.AddressUiConfigHandler.prototype.dispose = function () {
    var self = this;

    self.countrySubs.dispose();
    self.selectedSubs.dispose();
};

WK.AddressUiConfigHandler.prototype.getUiModel = function () {
    var self = this;
    return self.uiModel;
};

WK.AddressUiConfigHandler.prototype.defaultUiConfig = function () {

    return {
        companyName: {
            label: "Company",
            required: false,
            hide: false
        },
        addressLine1: {
            label: "Address Line 1", // May be overridden for searchable addresses, e.g. "Street Address"
            required: true, // The only required field for countries without UI config
            hide: false
        },
        addressLine2: {
            label: "Address Line 2",
            required: false,
            hide: false
        },
        addressLine3: {
            label: "Address Line 3",
            required: false,
            hide: false
        },
        addressLine4: {
            label: "Address Line 4",
            required: false,
            hide: false
        },
        town: {
            label: "Town/City",
            required: false,
            hide: false
        },
        county: {
            label: "County/State",
            required: false
        },
        postcode: {
            label: "Postcode/Zip",
            required: false,
            hide: false
        },
        externalReference: {
            label: "External Reference",
            required: false,
            hide: false
        }
    };
};

// Allow callees to override the country-specific UI config with their own custom config.
WK.AddressUiConfigHandler.prototype.setCustomUiConfig = function (customUiConfig) {
    var self = this;

    self.customUiConfig = customUiConfig;
    self.applyCustomUiConfig();
};

WK.AddressUiConfigHandler.prototype.applyCustomUiConfig = function () {
    var self = this;

    if (self.customUiConfig)
        ko.mapping.fromJS(self.customUiConfig, {}, self.uiModel);
};

// Map selected country's UI config -> self.uiModel
WK.AddressUiConfigHandler.prototype.mapUiModelFromCountry = function () {
    var self = this;

    // Default any missing UI config via recursive copy
    var countryUiConfig = $.extend(true, {}, self.defaultUiConfig(), self.getInputConfigFromCountry());

    // Safety net to ensure all hidden fields are not marked as required
    Object.keys(self.uiModel).forEach(function(x) {
        if (x.hide === false)
            x.required = false;
    });

    ko.mapping.fromJS(countryUiConfig, {}, self.uiModel);
    self.applyCustomUiConfig();
};

// Get UI config from selected country
WK.AddressUiConfigHandler.prototype.getInputConfigFromCountry = function () {
    var self = this;

    var countrySysName = self.options.selectedCountry();
    if (!countrySysName) return {};

    var country = _.find(self.options.countries(), function (x) { return x.systemName === countrySysName });
    var configJson = ((country || {}).addressInputConfig || "{}");
    return JSON.parse(configJson);
};
