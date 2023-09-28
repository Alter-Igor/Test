namespace('WK');

WK.Address = function (required) {
    var self = this;

    self.id = ko.observable();
    self.companyName = ko.observable("");
    self.addressLine1 = ko.observable("");
    self.addressLine2 = ko.observable("");
    self.addressLine3 = ko.observable("");
    self.addressLine4 = ko.observable("");
    self.town = ko.observable("");
    self.county = ko.observable("");
    self.countrySystemName = ko.observable();
    self.postcode = ko.observable("");
    self.dxNumber = ko.observable("");
    self.dxName = ko.observable("");
    self.latitude = ko.observable("");
    self.longitude = ko.observable("");

    // UI config to use for validation
    self.parentUiConfig = ko.observable();
    
    self.validateAddress = () => true;

    self.validation = {};

    self.fireAddressUpdate = function (data, event) {
        var self = this;
    };

    self.isValid = ko.pureComputed(function () {
        var errors = 0;

        var cfg = self.parentUiConfig();
        if (!cfg)
            return false;

        let requiredFields = 0;
        if (cfg.companyName.required()) {
            requiredFields++;
            if (!self.companyName()) errors++;
        }
        if (cfg.addressLine1.required()) {
            requiredFields++;
            if (!self.addressLine1()) errors++;
        }
        if (cfg.addressLine2.required()) {
            requiredFields++;
            if (!self.addressLine2()) errors++;
        }
        if (cfg.addressLine3.required()) {
            requiredFields++;
            if (!self.addressLine3()) errors++;
        }
        if (cfg.addressLine4.required()) {
            requiredFields++;
            if (!self.addressLine4()) errors++;
        }
        if (cfg.town.required()) {
            requiredFields++;
            if (!self.town()) errors++;
        }
        if (cfg.county.required()) {
            requiredFields++;
            if (!self.county()) errors++;
        }
        if (cfg.postcode.required()) {
            requiredFields++;
            if (!self.postcode()) errors++;
        }

        if (required)
            return errors === 0;

        return errors === 0 || requiredFields === errors;
    });
    
    self.hasAddress = function() {
        return self.addressLine1() != null;  
    };

    self.getModel = function(){
        return {
            companyName: self.companyName(),
            addressLine1: self.addressLine1(),
            addressLine2: self.addressLine2(),
            addressLine3: self.addressLine3(),
            addressLine4: self.addressLine4(),
            town: self.town(),
            county: self.county(),
            countrySystemName: self.countrySystemName(),
            postcode: self.postcode(),
            latitude: self.latitude(),
            longitude: self.longitude(),
        }
    };

    self.map = function (address) {
        var self = this;

        self.id(address.id);

        self.companyName(address.companyName);

        self.addressLine1(address.addressLine1);
        self.addressLine2(address.addressLine2);
        self.addressLine3(address.addressLine3);
        self.addressLine4(address.addressLine4);
        self.town(address.town || address.postTown);
        self.county(address.county);
        self.countrySystemName(address.countrySystemName);

        // At some point, we camelCased postCode, but used lowercase
        //  in other APIs (such as postcode finders) - handle both here:
        self.postcode(address.postCode || address.postcode);

        self.dxNumber(address.dxNumber);
        self.dxName(address.dxName);

        self.latitude(address.latitude);
        self.longitude(address.longitude);
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


    self.clear = function () {
        var self = this;

        self.companyName("");
        self.addressLine1("");
        self.addressLine2("");
        self.addressLine3("");
        self.addressLine4("");
        self.town("");
        self.county("");
        self.countrySystemName();   // TODO this doesn't clear the observable?
        self.postcode("");
        self.dxNumber("");
        self.dxName("");
        self.latitude("");
        self.longitude("");
    }

    self.setUiConfig = function (uiConfig) {
        var self = this;

        self.parentUiConfig(uiConfig);
    }
    return self;
}