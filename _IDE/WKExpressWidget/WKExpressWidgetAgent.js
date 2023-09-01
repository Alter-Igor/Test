namespace("WKExPressAgent");


CreateBladeAgent = function(model)
{
    var createInstruction = function(instructionValues)
    {
        var promise = $.Deferred();
 
        var request = 
        {
            
            workItem:
            {
                sharedoTypeSystemName: "instruction-b2b-dispute-plaintiff",
                titleIsUserProvided: false,
                reference: null,
                referenecIsUserProvided: false
            },
            aspectData:
            {
                instructionWorkTypeDetails:
                {
                    caseSharedoTypeSystemName: "wk-matter-dispute-plaintiff-recoveries",
                    caseWorkTypeId:500000284,
                    jurisdictionId: instructionValues.model.selectedLocation(),
                },
                incidentDetailsLocation:
                {
                    IncidentLocationId: instructionValues.address(),
                    IncidentTypeId: "['street']"
                },
                FormBuilder: {
				    formData: {
					    preInstructionInterimPayments:0,
					    matterStrategy: 500000029,
					    outlier:false,
					    isFirstPartyClaimSettled:false,
					    areThereUninsuredLosses:false,
					    isClientVulnerable:false,
					    
					    //look on devops
					    matterLongName: instructionValues.model.insuredName() + " vs " + instructionValues.model.TPIName(),
					    matterShortName : instructionValues.model.shortName(),
					    
					    //third party identified
				        hasTheThirdPartyBeenIdentified: instructionValues.model.thirdPartyIdentifiedId(),
					    //claim handlers name
					    claimHandlerName: instructionValues.model.claimHandlerName(),
					    
					    //Section 1
					    claimReferenceNo: instructionValues.model.claimRef(),
					    insuredsName: instructionValues.model.insuredName(),
					    insuredABN: instructionValues.model.insuredABN(),
					    
					    //thirdpartyNames optionset 
					    thirdPartyNames: instructionValues.model.selectedThirdPartyNames(),
					    
					    //Section 2
					    thirdPartyNamesInput: instructionValues.model.TPIName(),
					    thirdPartyInsurer: instructionValues.model.selectedThirdPartyInsurerName(),
					    enterTPIName: instructionValues.model.TPI(),
				        TPIClaimNo: instructionValues.model.TPIClaimNo(),
				        
				        //dateofloss
						dateOfLoss: instructionValues.model.dateOfLossInput(),
						
						//claimSettled yes-no-optionset
						hasTheClaimBeenSettled: instructionValues.model.claimSettled(),
						
						//enterSettlementAmount    
						enterSettlementAmount: instructionValues.model.settleAmount(),
			            enterEstimatedSettlementAmount: instructionValues.model.estimatedsettleAmount(),
			            
			            //uinsured
			            isThereUninsuredLoss:  instructionValues.model.uninsuredLossValue(),
			            areDocumentsAvailable:  instructionValues.model.uninsuredLossDocsValue(),
			            uninsuredLossAmount: instructionValues.model.uninsuredSettleAmount(),
			            
			            
			            //typeOfLoss
			            typeOfLoss: instructionValues.model.selectedTypeOfLoss(),
			            
			            //addressofloss
			            locationOfLoss: instructionValues.model.selectedLocation(),
			            otherLocation: instructionValues.address(),
			            
			            //policeAvaliable
			            isAPoliceReportAvailable:  instructionValues.model.policeNumberAvailable(),
			            policeReportNumber:  instructionValues.model.inputPoliceNumber(),
			            
			            //additionalInfo
			            additionalInstructions : instructionValues.model.additionalInfo(),
			            
			            //complex
			            qualifiesForExpress: instructionValues.complex()
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
                roleSystemName: "client-case-handler",
                odsReference: $ui.pageContext.user.username(),
                odsType: "person",
                odsId: $ui.pageContext.user.userid()
            },
        ]
         
        
        
    };
        $ajax.post("/api/v1/public/workItem", request).then(response =>
        {
            
            promise.resolve(response.workItem.id);
        })
        
        return promise;
    };
    
    return {
        createInstruction:createInstruction
    };
}

WKExPressAgent.WKAgent = function()
{
    var getJurisdictionsOptionSet = function()
    {
        return $ajax.get("api/v1/public/modeller/optionSets/jurisdictions/values");
    }
    
    var getOrg = function(id)
    {
        return $ajax.get("api/public/v1/organisation/" + id);
    }
    
    var getTeamsID = function(id)
    {
        return $ajax.get("/api/public/v1/people/" + id);
    }
    
    var getYesNoOptionset = function()
    {
        return $ajax.get("api/v1/public/modeller/optionSets/yes-or-no/values");
    }
    
    var getThirdPartyNamesOptionset = function()
    {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-third-party-name/values");
    }
    
    var getThirdPartyInsurerNamesOptionset = function()
    {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-third-party-insurer-name-2/values");
    }
   
    var getTypesOfLossOptionset = function()
    {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-type-of-loss/values");
    }
    
    var getUninsuredLossOptionset = function()
    {
        return $ajax.get("api/v1/public/modeller/optionSets/express-recoveries-uninsured-loss/values");
    }
   
   
    return {
        getJurisdictionsOptionSet: getJurisdictionsOptionSet,
        getThirdPartyNamesOptionset: getThirdPartyNamesOptionset,
        getThirdPartyInsurerNamesOptionset: getThirdPartyInsurerNamesOptionset,
        getTypesOfLossOptionset: getTypesOfLossOptionset,
        getYesNoOptionset: getYesNoOptionset,
        getOrg: getOrg,
        getTeamsID: getTeamsID,
        getUninsuredLossOptionset:getUninsuredLossOptionset
    };
}();





   


