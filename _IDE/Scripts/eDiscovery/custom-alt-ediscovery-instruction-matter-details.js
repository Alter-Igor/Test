function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//This function is called from the module-loader webcomponent in the form builder
export function runMe(_x) {
  return _runMe.apply(this, arguments);
}

// This function creates variables for the form.
function _runMe() {
  _runMe = _asyncToGenerator(function* (context) {
    var {
      expertMatterNumber,
      matterDetails,
      pipelineMatter
    } = createVariables(context);
    window.tester = context; //just for debugging
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    //add a change event to the expert-matter-number
    addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter);
  });
  return _runMe.apply(this, arguments);
}
function createVariables(context) {
  // Get the fields
  var matterDetails = context.fields[enumFields.matterDetails];
  var expertMatterNumber = context.fields[enumFields.expertMatterNumber];
  var pipelineMatter = context.fields[enumFields.pipelineMatter];
  var jurisdiction = context.fields[enumFields.jurisdictionsCountry];

  // Return the variables
  return {
    expertMatterNumber,
    matterDetails,
    pipelineMatter
  };
}
function addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter) {
  context.fields[enumFields.expertMatterNumber].on("change", function (ev) {
    // hide or show the matter details field
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

    // update the matter details field
    updateMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
  });

  //add event handlet for pipeline-matter changed
  context.fields["pipeline-matter"].on("change", function (ev) {
    // hide or show the matter details field
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

    // update the matter details field
    updateMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
  });
}
function hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter) {
  setMatterDetailsState(matterDetails, pipelineMatter.getValue());
}

// make all child properties readonly
function setMatterDetailsState(matterDetails) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  // get all the child properties
  matterDetails.children.forEach(function (child) {
    // set the readonly status of the child property
    child.options.readonly = !status;
    // refresh the child property
    child.refresh();
  });

  // show/hide the partner name and selector
  matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerSelector].options.hidden = !status;
  matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerName].options.hidden = status;
  matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerName].refresh();
  matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerSelector].refresh();
}
function clearMatterDetails(_x2) {
  return _clearMatterDetails.apply(this, arguments);
}
/* Here is the explanation for the code above:
1. We first get the data from the endpoint by calling getMatterData() function
2. Then we clear the matterDetails
3. We find the selected matter by using the matter code and client name from the data we got from the endpoint
4. If the matter is undefined, we clear the matterDetails and return
5. If the matter is not undefined, we set the values of the matterDetails fields */
function _clearMatterDetails() {
  _clearMatterDetails = _asyncToGenerator(function* (matterDetails) {
    matterDetails.children.forEach(function (child) {
      child.setValue("-");
    });
  });
  return _clearMatterDetails.apply(this, arguments);
}
function updateMatterDetails(_x3, _x4, _x5) {
  return _updateMatterDetails.apply(this, arguments);
}
function _updateMatterDetails() {
  _updateMatterDetails = _asyncToGenerator(function* (matterDetails, expertMatterNumber, pipelineMatter) {
    var data = yield getMatterData();
    clearMatterDetails(matterDetails); //clear the matter details form

    var selectedMatter = data.find(function (matter) {
      return expertMatterNumber.getValue() === "".concat(matter.data.matterCode, " - ").concat(matter.data.client.name);
    });
    if (selectedMatter === undefined || pipelineMatter.getValue() === true) {
      //if the matter is not found or if the matter is a pipeline matter, clear the matter details form and return
      clearMatterDetails(matterDetails);
      return;
    }
    var tempMatterNumber = matterDetails.parent.childrenByPropertyId['temp-matter-number'].getValue();
    if (tempMatterNumber === undefined || tempMatterNumber.length === 0) {
      matterDetails.parent.childrenByPropertyId['temp-matter-number'].setValue("N/A");
    }
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsClientName].setValue(selectedMatter.data.client.name);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsClientCode].setValue(selectedMatter.data.client.code);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPracticeArea].setValue(selectedMatter.data.practiceArea.name);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsName].setValue(selectedMatter.data.shortName);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerName].setValue(selectedMatter.data.partner.name);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsIb].setValue(selectedMatter.data.secure);
    console.log("matterDetails.isValid():" + matterDetails.isValid());
  });
  return _updateMatterDetails.apply(this, arguments);
}
function getMatterData() {
  return _getMatterData.apply(this, arguments);
}
function _getMatterData() {
  _getMatterData = _asyncToGenerator(function* () {
    //get the data from the server without cache
    return yield $ajax.get(window.document.location.origin + "/_ideFiles/SampleData/eDiscovery/matters.json");
  });
  return _getMatterData.apply(this, arguments);
}
export var enumFields = /*#__PURE__*/function (enumFields) {
  enumFields["customAltEdiscoveryInstructionMatterDetails"] = "custom-alt-ediscovery-instruction-matter-details";
  enumFields["jurisdictionsCountry"] = "jurisdictions-country";
  enumFields["pipelineMatter"] = "pipeline-matter";
  enumFields["expertMatterNumber"] = "expert-matter-number";
  enumFields["tempMatterNumber"] = "temp-matter-number";
  enumFields["subMatterCode"] = "sub-matter-code";
  enumFields["abcMatterNumber"] = "abc-matter-number";
  enumFields["matterDetails"] = "matter-details";
  return enumFields;
}({});
export var enumMatterDetailFields = /*#__PURE__*/function (enumMatterDetailFields) {
  enumMatterDetailFields["matterDetailsPartnerSelector"] = "matter-details-partner-selector";
  enumMatterDetailFields["matterDetailsPartnerName"] = "matter-details-partner-name";
  enumMatterDetailFields["matterDetailsClientName"] = "matter-details-client-name";
  enumMatterDetailFields["matterDetailsClientCode"] = "matter-details-client-code";
  enumMatterDetailFields["matterDetailsPracticeArea"] = "matter-details-practice-area";
  enumMatterDetailFields["matterDetailsName"] = "matter-details-name";
  enumMatterDetailFields["matterDetailsIb"] = "matter-details-ib";
  return enumMatterDetailFields;
}({});
//# sourceMappingURL=custom-alt-ediscovery-instruction-matter-details.js.map