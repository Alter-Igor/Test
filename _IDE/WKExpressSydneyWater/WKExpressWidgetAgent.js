namespace("WKExpressSydneyWaterAgent");


CreateBladeAgent = function (model) {
    
    var createLocation = function(address) {
        const model = address.getModel();
        model.locationTypes = ["correspondence"];
        
        return $ajax.post("/api/aspects/ods/locations", model);
    }
    
    var createPerson = function(firstName, lastName, addressId, email) {
        const request = {
            firstName: firstName, 
            surname: lastName,
            isActive: true
        };
        
        
        if (email) {
            request.contactDetails = [
                {
                    contactTypeSystemName: "email",
                    contactValue: email,
                    isPrimary: true
                }
            ];
        }
        
        return $ajax.post("/api/public/v1/people", request)
            .then(response => {
                const odsId = response.id;
                if (!addressId)
                    return odsId;
                
                return $ajax.post(`/api/ods/locations/for/${odsId}`, addressId)
                    .then(() => odsId);
            });
    };
    
    var createOrganisation = function(name, addressId, email) {
        const request = {
            name: name,
            isActive: true
        };
        
        if (email) {
            request.contactDetails = [
                {
                    contactTypeSystemName: "email",
                    contactValue: email,
                    isPrimary: true
                }
            ];
        }
        
        return $ajax.post("/api/v2/public/organisation", request)
            .then(response => {
                const odsId = response.id;
                if (!addressId)
                    return odsId;
                    
                return $ajax.post(`/api/ods/locations/for/${odsId}`, addressId)
                    .then(() => odsId);
            });
    };
    
    var createInstruction = function (instructionValues, thirdPartyOdsId, thirdPartyOdsEntityType) {
        var promise = $.Deferred();
        
        let thirdPartyName = instructionValues.model.TPIName();
        if (!instructionValues.ui.thirdPartyIsOrganisation()) {
            thirdPartyName = instructionValues.model.TPIFirstName() + " " + instructionValues.model.TPILastName();
        }
        
        var request =
        {

            workItem:
            {
                sharedoTypeSystemName: "instruction-b2b-dispute-external-recovery",
                titleIsUserProvided: false,
                reference: null,
                referenecIsUserProvided: false
            },
            aspectData:
            {
                instructionWorkTypeDetails:
                {
                    caseSharedoTypeSystemName: "wk-matter-dispute-plaintiff-recoveries",
                    caseWorkTypeId: 500000284,
                    jurisdictionId: instructionValues.model.selectedLocation(),
                },
                incidentDetailsLocation:
                {
                    IncidentLocationId: instructionValues.address(),
                    IncidentTypeId: "['street']"
                },
                FormBuilder: {
                    formData: {
                        preInstructionInterimPayments: 0,
                        matterStrategy: 500000029,
                        outlier: false,
                        isFirstPartyClaimSettled: false,
                        areThereUninsuredLosses: false,
                        isClientVulnerable: false,

                        //look on devops
                        matterLongName: instructionValues.model.insuredName() + " vs " + thirdPartyName,
                        matterShortName: instructionValues.model.shortName(),

					    //third party identified
				        hasTheThirdPartyBeenIdentified: instructionValues.model.thirdPartyIdentifiedId(),
					    //claim handlers name
					    claimHandlerName: instructionValues.model.claimHandlerName(),

                        //Section 1
                        ClientRef: instructionValues.model.claimRef(),
                        insuredsName: instructionValues.model.insuredName(),
                        insuredABN: instructionValues.model.insuredABN(),

                        //thirdpartyNames optionset 
                        thirdPartyNames: instructionValues.model.selectedThirdPartyNames(),

                        //Section 2
                        thirdPartyNamesInput: thirdPartyName,
                        thirdPartyInsurer: instructionValues.model.selectedThirdPartyInsurerName(),
                        enterTPIName: instructionValues.model.TPI(),
                        TPIClaimNo: instructionValues.model.TPIClaimNo(),
                        thirdPartyLocation: instructionValues.model.tpiAddress(),

                        //dateofloss
                        dateOfLoss: instructionValues.model.dateOfLossInput(),

                        //claimSettled yes-no-optionset
                        hasTheClaimBeenSettled: instructionValues.model.claimSettled(),

                        //enterSettlementAmount    
                        enterSettlementAmount: instructionValues.model.settleAmount(),
                        enterEstimatedSettlementAmount: instructionValues.model.estimatedsettleAmount(),

                        //uinsured
                        isThereUninsuredLoss: instructionValues.model.uninsuredLossValue(),
                        areDocumentsAvailable: instructionValues.model.uninsuredLossDocsValue(),
                        uninsuredLossAmount: instructionValues.model.uninsuredSettleAmount(),

                        typeOfLossAssetDetails: instructionValues.model.assetDetails(),
                        incidentCausingDamage: instructionValues.model.incidentCausingDamage(),
                        descriptionOfRemedialWorksRequired: instructionValues.model.descriptionOfRemedialWorksRequired(),
                        
                        //typeOfLoss
                        typeOfLoss: instructionValues.model.selectedTypeOfLoss(),

                        //addressofloss
                        locationOfLoss: instructionValues.model.selectedLocation(),
                        otherLocation: instructionValues.address(),

                        //policeAvaliable
                        isAPoliceReportAvailable: instructionValues.model.policeNumberAvailable(),
                        policeReportNumber: instructionValues.model.inputPoliceNumber(),
                        
                        amountClaimed: instructionValues.model.amountClaimed(),
                         
                        // lod
                        havePreviousLodBeenSent: instructionValues.model.havePreviousLodBeenSent(),
                        firstLodSent: instructionValues.model.firstLodSent(),
                        secondLodSent: instructionValues.model.secondLodSent(),
                        thirdLodSent: instructionValues.model.thirdLodSent(),

                        //additionalInfo
                        additionalInstructions: instructionValues.model.additionalInfo(),

                        //complex
                        qualifiesForExpress: "5023402" // yee
                    },
                }
            },
            keyDates:
            {
                "kd-instruction-received": new Date()
            },
            participants: [
                {
                    roleSystemName: "reader",
                    odsType: "team",
                    odsId: instructionValues.model.particpantTeam().primaryTeamId
                },
                {
                    roleSystemName: "client",
                    odsReference: instructionValues.model.organisation().name,
                    odsType: "organisation",
                    odsId: instructionValues.model.organisation().id
                },
                {
                    roleSystemName: "insured",
                    odsReference: instructionValues.model.organisation().name,
                    odsType: "organisation",
                    odsId: instructionValues.model.organisation().id
                },
                {
                    roleSystemName: "client-case-handler",
                    odsReference: $ui.pageContext.user.username(),
                    odsType: "person",
                    odsId: $ui.pageContext.user.userid()
                },
                {
                    roleSystemName: "third-party",
                    odsReference: thirdPartyName,
                    odsType: thirdPartyOdsEntityType,
                    odsId: thirdPartyOdsId
                },
            ]
        };
        
        $ajax.post("/api/v1/public/workItem", request).then(response => {

            promise.resolve(response.workItem.id);
        })

        return promise;
    };

    return {
        createLocation: createLocation,
        createPerson: createPerson,
        createOrganisation: createOrganisation,
        createInstruction: createInstruction
    };
}

WKExpressSydneyWaterAgent.WKAgent = function () {
    var getJurisdictionsOptionSet = function () {
        return $ajax.get("api/v1/public/modeller/optionSets/jurisdictions/values");
    }

    var getOrg = function (id) {
        return $ajax.get("api/public/v1/organisation/" + id);
    }

    var getTeamsID = function (id) {
        return $ajax.get("/api/public/v1/people/" + id);
    }

    var getYesNoOptionset = function () {
        return $ajax.get("api/v1/public/modeller/optionSets/yes-or-no/values");
    }

    var getThirdPartyNamesOptionset = function () {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-third-party-name/values");
    }

    var getThirdPartyInsurerNamesOptionset = function () {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-third-party-insurer-name-2/values");
    }

    var getTypesOfLossOptionset = function () {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-type-of-loss/values").then(data =>
        {
            let result =  data.filter(f=>f.isActive===true);
            return result;
        })
        
        
    }

    var getUninsuredLossOptionset = function () {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-uninsured-loss/values");
    }

    var getClaimHandlerUser = function () {
        return $ajax.get(`/api/v2/public/people/${$ui.pageContext.user.userid()}`);
    };


    return {
        getThirdPartyNamesOptionset: getThirdPartyNamesOptionset,
        getThirdPartyInsurerNamesOptionset: getThirdPartyInsurerNamesOptionset,
        getTypesOfLossOptionset: getTypesOfLossOptionset,
        getYesNoOptionset: getYesNoOptionset,
        getOrg: getOrg,
        getTeamsID: getTeamsID,
        getUninsuredLossOptionset: getUninsuredLossOptionset,
        getJurisdictionsOptionSet: getJurisdictionsOptionSet,
        getClaimHandlerUser: getClaimHandlerUser
    };
}();