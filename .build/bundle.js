(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/DemoSampleApp/i18n/i18n.properties":
/*!**************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/i18n/i18n.properties ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/AppUpdateFailure.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/AppUpdateFailure.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/DemoSampleApp/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/AppUpdateSuccess.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/AppUpdateSuccess.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/DemoSampleApp/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/DemoSampleApp/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/EmailValidation.js":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/EmailValidation.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmailValidation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function EmailValidation(context) {
  //The following evaluateTargetPath will retrieve the current value of the email control
  if (context.evaluateTargetPath('#Control:FCEmail/#Value').indexOf('@') === -1) {
    //If email value does not contain @ display a validation failure message to the end-user
    context.executeAction('/DemoSampleApp/Actions/ValidationFailure.action');
  } else {
    //If @ is present in the email value, return true to indicate validation is successful
    return true;
  }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/DemoSampleApp/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/OnWillUpdate.js":
/*!***************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/OnWillUpdate.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/DemoSampleApp/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/DemoSampleApp/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/ResetAppSettingsAndLogout.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/ResetAppSettingsAndLogout.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/DemoSampleApp/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.css":
/*!***********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.css ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/DemoSampleApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.less":
/*!************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.less ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/DemoSampleApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.light.css":
/*!*****************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.css ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.light.nss":
/*!*****************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.nss ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!**************************************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \**************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_Create.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Create.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateFirstName","IsEditable":true,"IsVisible":true,"Caption":"First Name","PlaceHolder":"Enter Value","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateLastName","IsEditable":true,"IsVisible":true,"Caption":"Last Name","PlaceHolder":"Enter Value","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreateEmail","IsEditable":true,"IsVisible":true,"Caption":"Email","PlaceHolder":"Enter Value","KeyboardType":"Email","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCreatePhone","IsEditable":true,"IsVisible":true,"Caption":"Phone","PlaceHolder":"Enter Value","KeyboardType":"Phone","Enabled":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCCreateDOB","IsEditable":true,"IsVisible":true,"Caption":"DOB","Mode":"Datetime"}],"Visible":true}]}],"_Type":"Page","_Name":"Customers_Create","Caption":"Create Customer","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Save","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Customers_CreateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_Detail.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Detail.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{FirstName}","Footnote":"{EmailAddress}","Description":"{CustomerId}","StatusText":"{PhoneNumber}","BodyText":"{DateOfBirth}","HeadlineText":"{LastName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"KeyAndValues":[{"Value":"{HouseNumber}{Street}","_Name":"KeyValue2","KeyName":"Address","Visible":true},{"Value":"{City}","_Name":"KeyValue0","KeyName":"City ","Visible":true},{"Value":"{PostalCode}","_Name":"KeyValue1","KeyName":"Postal Code","Visible":true},{"Value":"{Country}","_Name":"KeyValue3","KeyName":"Country","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"Customers_Detail","Caption":"Detailsl","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_Edit.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_Edit.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_Edit.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFirstName","IsEditable":true,"IsVisible":true,"Caption":"First Name","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCLastName","IsEditable":true,"IsVisible":true,"Caption":"Last Name","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCPhone","IsEditable":true,"IsVisible":true,"Caption":"Phone","PlaceHolder":"PlaceHolder","KeyboardType":"Phone","Enabled":true},{"Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCEmail","IsEditable":true,"IsVisible":true,"Caption":"Email","PlaceHolder":"PlaceHolder","KeyboardType":"Email","Enabled":true}],"Visible":true}]}],"_Type":"Page","_Name":"Customers_Edit","Caption":"Update Customer","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Cancel ","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Save","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Customers_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers_list.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers_list.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"Section":{"_Type":"Section.Type.ContactCell","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":"$orderby=LastName"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"ContactCell":{"ContextMenu":{"PerformFirstActionWithFullSwipe":true,"Items":[]},"DetailImage":"","Headline":"{LastName}","Subheadline":"{FirstName}","Description":"{City}","OnPress":"/DemoSampleApp/Actions/NavToCustomers_Detail.action","ActivityItems":[{"_Name":"SectionContactCell0ActivityItems0","ActivityType":"Phone","ActivityValue":"{PhoneNumber}"},{"_Name":"SectionContactCell0ActivityItems1","ActivityType":"Email","ActivityValue":"{EmailAddress}"}]},"Search":{"Enabled":true,"BarcodeScanner":true}},"_Type":"Control.Type.SectionedTable","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":""},"_Name":"SectionedTable0"}],"_Type":"Page","_Name":"Customers_list","Caption":"Customers","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Add","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Main.page":
/*!*********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Main.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Customers","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://customer","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/NavToCustomers_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/DemoSampleApp/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/DemoSampleApp/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/DemoSampleApp/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"DemoSampleApp","Version":"/DemoSampleApp/Globals/AppDefinition_Version.global","MainPage":"/DemoSampleApp/Pages/Main.page","OnLaunch":["/DemoSampleApp/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/DemoSampleApp/Rules/OnWillUpdate.js","OnDidUpdate":"/DemoSampleApp/Actions/Service/InitializeOffline.action","Styles":"/DemoSampleApp/Styles/Styles.css","Localization":"/DemoSampleApp/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/DemoSampleApp/Styles/Styles.light.css","ios":"/DemoSampleApp/Styles/Styles.light.nss","android":"/DemoSampleApp/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/DemoSampleApp/Styles/Styles.light.nss","android":"/DemoSampleApp/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/AppUpdate.action":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdate.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/DemoSampleApp/Rules/AppUpdateFailure.js","OnSuccess":"/DemoSampleApp/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/AppUpdateFailureMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdateFailureMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/AppUpdateProgressBanner.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdateProgressBanner.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/DemoSampleApp/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/AppUpdateSuccessMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/AppUpdateSuccessMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Complete"},"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ClosePage.action":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ClosePage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CreateCustomerEntityFailureMessage"},"Message":"Failed to Create Customer record ","Title":"Create Customer","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Customers_CreateEntity.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_CreateEntity.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"Customers_CreateEntity"},"OnFailure":"/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers"},"Properties":{"DateOfBirth":"#Control:FCCreateDOB/#Value","EmailAddress":"#Control:FCCreateEmail/#Value","FirstName":"#Control:FCCreateFirstName/#Value","LastName":"#Control:FCCreateLastName/#Value","PhoneNumber":"#Control:FCCreatePhone/#Value"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Customers_UpdateEntity.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers_UpdateEntity.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"update"},"OnFailure":"/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action","OnSuccess":"/DemoSampleApp/Actions/CloseModalPage_Complete.action","ValidationRule":"/DemoSampleApp/Rules/EmailValidation.js","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"},"Properties":{"EmailAddress":"#Control:FCEmail/#Value","FirstName":"#Control:FCFirstName/#Value","LastName":"#Control:FCLastName/#Value","PhoneNumber":"#Control:FCPhone/#Value"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logout.action":
/*!***************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logout.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/LogoutMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/LogoutMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/DemoSampleApp/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Create.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Create.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Create"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Create.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Detail.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Detail.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Detail"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Edit.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_Edit.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Edit"},"PageToOpen":"/DemoSampleApp/Pages/Customers_Edit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_List.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/NavToCustomers_List.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_List"},"PageToOpen":"/DemoSampleApp/Pages/Customers_list.page"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/OnWillUpdate.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/OnWillUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/CloseOffline.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/CloseOffline.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/DemoSampleApp/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/DownloadOffline.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/DownloadOffline.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/DemoSampleApp/Actions/Service/SyncFailureMessage.action","OnSuccess":"/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/DownloadStartedMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/DownloadStartedMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/InitializeOffline.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/InitializeOffline.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/DemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/SyncFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/SyncFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/SyncStartedMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/SyncStartedMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/Service/UploadOffline.action","OnFailure":"/DemoSampleApp/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/SyncSuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/SyncSuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Service/UploadOffline.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Service/UploadOffline.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/DemoSampleApp/Actions/Service/DownloadStartedMessage.action","OnFailure":"/DemoSampleApp/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateCustomerEntityFailureMessage"},"Message":"Failed to Save Customer Updates - {#ActionResults:update/error}","Title":"Update Customer","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ValidationFailure.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ValidationFailure.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Email address is not in the correct format recipient @ domain . domaintype","Title":"Validate Email","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/AppDefinition_Version.global":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/AppDefinition_Version.global ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Services/SampleServiceV2.service":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Services/SampleServiceV2.service ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.light.json":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/DemoSampleApp/jsconfig.json":
/*!*******************************************************!*\
  !*** ./build.definitions/DemoSampleApp/jsconfig.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let demosampleapp_actions_appupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdate.action */ "./build.definitions/DemoSampleApp/Actions/AppUpdate.action")
let demosampleapp_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdateFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/AppUpdateFailureMessage.action")
let demosampleapp_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdateProgressBanner.action */ "./build.definitions/DemoSampleApp/Actions/AppUpdateProgressBanner.action")
let demosampleapp_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/AppUpdateSuccessMessage.action")
let demosampleapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action")
let demosampleapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action")
let demosampleapp_actions_closepage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ClosePage.action */ "./build.definitions/DemoSampleApp/Actions/ClosePage.action")
let demosampleapp_actions_createcustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/CreateCustomerEntityFailureMessage.action")
let demosampleapp_actions_customers_createentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_CreateEntity.action */ "./build.definitions/DemoSampleApp/Actions/Customers_CreateEntity.action")
let demosampleapp_actions_customers_updateentity_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers_UpdateEntity.action */ "./build.definitions/DemoSampleApp/Actions/Customers_UpdateEntity.action")
let demosampleapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let demosampleapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let demosampleapp_actions_logout_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logout.action */ "./build.definitions/DemoSampleApp/Actions/Logout.action")
let demosampleapp_actions_logoutmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/LogoutMessage.action */ "./build.definitions/DemoSampleApp/Actions/LogoutMessage.action")
let demosampleapp_actions_navtocustomers_create_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Create.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Create.action")
let demosampleapp_actions_navtocustomers_detail_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Detail.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Detail.action")
let demosampleapp_actions_navtocustomers_edit_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_Edit.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_Edit.action")
let demosampleapp_actions_navtocustomers_list_action = __webpack_require__(/*! ./DemoSampleApp/Actions/NavToCustomers_List.action */ "./build.definitions/DemoSampleApp/Actions/NavToCustomers_List.action")
let demosampleapp_actions_onwillupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/OnWillUpdate.action */ "./build.definitions/DemoSampleApp/Actions/OnWillUpdate.action")
let demosampleapp_actions_service_closeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/CloseOffline.action */ "./build.definitions/DemoSampleApp/Actions/Service/CloseOffline.action")
let demosampleapp_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action")
let demosampleapp_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action")
let demosampleapp_actions_service_downloadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/DownloadOffline.action */ "./build.definitions/DemoSampleApp/Actions/Service/DownloadOffline.action")
let demosampleapp_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/DownloadStartedMessage.action")
let demosampleapp_actions_service_initializeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/InitializeOffline.action */ "./build.definitions/DemoSampleApp/Actions/Service/InitializeOffline.action")
let demosampleapp_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action")
let demosampleapp_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action")
let demosampleapp_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/SyncFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/SyncFailureMessage.action")
let demosampleapp_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/SyncStartedMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/SyncStartedMessage.action")
let demosampleapp_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/Service/SyncSuccessMessage.action")
let demosampleapp_actions_service_uploadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Service/UploadOffline.action */ "./build.definitions/DemoSampleApp/Actions/Service/UploadOffline.action")
let demosampleapp_actions_updatecustomerentityfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action")
let demosampleapp_actions_validationfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ValidationFailure.action */ "./build.definitions/DemoSampleApp/Actions/ValidationFailure.action")
let demosampleapp_globals_appdefinition_version_global = __webpack_require__(/*! ./DemoSampleApp/Globals/AppDefinition_Version.global */ "./build.definitions/DemoSampleApp/Globals/AppDefinition_Version.global")
let demosampleapp_i18n_i18n_properties = __webpack_require__(/*! ./DemoSampleApp/i18n/i18n.properties */ "./build.definitions/DemoSampleApp/i18n/i18n.properties")
let demosampleapp_jsconfig_json = __webpack_require__(/*! ./DemoSampleApp/jsconfig.json */ "./build.definitions/DemoSampleApp/jsconfig.json")
let demosampleapp_pages_customers_create_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Create.page */ "./build.definitions/DemoSampleApp/Pages/Customers_Create.page")
let demosampleapp_pages_customers_detail_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Detail.page */ "./build.definitions/DemoSampleApp/Pages/Customers_Detail.page")
let demosampleapp_pages_customers_edit_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_Edit.page */ "./build.definitions/DemoSampleApp/Pages/Customers_Edit.page")
let demosampleapp_pages_customers_list_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers_list.page */ "./build.definitions/DemoSampleApp/Pages/Customers_list.page")
let demosampleapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let demosampleapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page")
let demosampleapp_pages_main_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Main.page */ "./build.definitions/DemoSampleApp/Pages/Main.page")
let demosampleapp_rules_appupdatefailure_js = __webpack_require__(/*! ./DemoSampleApp/Rules/AppUpdateFailure.js */ "./build.definitions/DemoSampleApp/Rules/AppUpdateFailure.js")
let demosampleapp_rules_appupdatesuccess_js = __webpack_require__(/*! ./DemoSampleApp/Rules/AppUpdateSuccess.js */ "./build.definitions/DemoSampleApp/Rules/AppUpdateSuccess.js")
let demosampleapp_rules_emailvalidation_js = __webpack_require__(/*! ./DemoSampleApp/Rules/EmailValidation.js */ "./build.definitions/DemoSampleApp/Rules/EmailValidation.js")
let demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let demosampleapp_rules_onwillupdate_js = __webpack_require__(/*! ./DemoSampleApp/Rules/OnWillUpdate.js */ "./build.definitions/DemoSampleApp/Rules/OnWillUpdate.js")
let demosampleapp_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./DemoSampleApp/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/DemoSampleApp/Rules/ResetAppSettingsAndLogout.js")
let demosampleapp_services_sampleservicev2_service = __webpack_require__(/*! ./DemoSampleApp/Services/SampleServiceV2.service */ "./build.definitions/DemoSampleApp/Services/SampleServiceV2.service")
let demosampleapp_styles_styles_css = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.css */ "./build.definitions/DemoSampleApp/Styles/Styles.css")
let demosampleapp_styles_styles_less = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.less */ "./build.definitions/DemoSampleApp/Styles/Styles.less")
let demosampleapp_styles_styles_light_css = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.css */ "./build.definitions/DemoSampleApp/Styles/Styles.light.css")
let demosampleapp_styles_styles_light_json = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.json */ "./build.definitions/DemoSampleApp/Styles/Styles.light.json")
let demosampleapp_styles_styles_light_nss = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.nss */ "./build.definitions/DemoSampleApp/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	demosampleapp_actions_appupdate_action : demosampleapp_actions_appupdate_action,
	demosampleapp_actions_appupdatefailuremessage_action : demosampleapp_actions_appupdatefailuremessage_action,
	demosampleapp_actions_appupdateprogressbanner_action : demosampleapp_actions_appupdateprogressbanner_action,
	demosampleapp_actions_appupdatesuccessmessage_action : demosampleapp_actions_appupdatesuccessmessage_action,
	demosampleapp_actions_closemodalpage_cancel_action : demosampleapp_actions_closemodalpage_cancel_action,
	demosampleapp_actions_closemodalpage_complete_action : demosampleapp_actions_closemodalpage_complete_action,
	demosampleapp_actions_closepage_action : demosampleapp_actions_closepage_action,
	demosampleapp_actions_createcustomerentityfailuremessage_action : demosampleapp_actions_createcustomerentityfailuremessage_action,
	demosampleapp_actions_customers_createentity_action : demosampleapp_actions_customers_createentity_action,
	demosampleapp_actions_customers_updateentity_action : demosampleapp_actions_customers_updateentity_action,
	demosampleapp_actions_errorarchive_errorarchive_syncfailure_action : demosampleapp_actions_errorarchive_errorarchive_syncfailure_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action : demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_list_action : demosampleapp_actions_errorarchive_navtoerrorarchive_list_action,
	demosampleapp_actions_logout_action : demosampleapp_actions_logout_action,
	demosampleapp_actions_logoutmessage_action : demosampleapp_actions_logoutmessage_action,
	demosampleapp_actions_navtocustomers_create_action : demosampleapp_actions_navtocustomers_create_action,
	demosampleapp_actions_navtocustomers_detail_action : demosampleapp_actions_navtocustomers_detail_action,
	demosampleapp_actions_navtocustomers_edit_action : demosampleapp_actions_navtocustomers_edit_action,
	demosampleapp_actions_navtocustomers_list_action : demosampleapp_actions_navtocustomers_list_action,
	demosampleapp_actions_onwillupdate_action : demosampleapp_actions_onwillupdate_action,
	demosampleapp_actions_service_closeoffline_action : demosampleapp_actions_service_closeoffline_action,
	demosampleapp_actions_service_closeofflinefailuremessage_action : demosampleapp_actions_service_closeofflinefailuremessage_action,
	demosampleapp_actions_service_closeofflinesuccessmessage_action : demosampleapp_actions_service_closeofflinesuccessmessage_action,
	demosampleapp_actions_service_downloadoffline_action : demosampleapp_actions_service_downloadoffline_action,
	demosampleapp_actions_service_downloadstartedmessage_action : demosampleapp_actions_service_downloadstartedmessage_action,
	demosampleapp_actions_service_initializeoffline_action : demosampleapp_actions_service_initializeoffline_action,
	demosampleapp_actions_service_initializeofflinefailuremessage_action : demosampleapp_actions_service_initializeofflinefailuremessage_action,
	demosampleapp_actions_service_initializeofflinesuccessmessage_action : demosampleapp_actions_service_initializeofflinesuccessmessage_action,
	demosampleapp_actions_service_syncfailuremessage_action : demosampleapp_actions_service_syncfailuremessage_action,
	demosampleapp_actions_service_syncstartedmessage_action : demosampleapp_actions_service_syncstartedmessage_action,
	demosampleapp_actions_service_syncsuccessmessage_action : demosampleapp_actions_service_syncsuccessmessage_action,
	demosampleapp_actions_service_uploadoffline_action : demosampleapp_actions_service_uploadoffline_action,
	demosampleapp_actions_updatecustomerentityfailuremessage_action : demosampleapp_actions_updatecustomerentityfailuremessage_action,
	demosampleapp_actions_validationfailure_action : demosampleapp_actions_validationfailure_action,
	demosampleapp_globals_appdefinition_version_global : demosampleapp_globals_appdefinition_version_global,
	demosampleapp_i18n_i18n_properties : demosampleapp_i18n_i18n_properties,
	demosampleapp_jsconfig_json : demosampleapp_jsconfig_json,
	demosampleapp_pages_customers_create_page : demosampleapp_pages_customers_create_page,
	demosampleapp_pages_customers_detail_page : demosampleapp_pages_customers_detail_page,
	demosampleapp_pages_customers_edit_page : demosampleapp_pages_customers_edit_page,
	demosampleapp_pages_customers_list_page : demosampleapp_pages_customers_list_page,
	demosampleapp_pages_errorarchive_errorarchive_detail_page : demosampleapp_pages_errorarchive_errorarchive_detail_page,
	demosampleapp_pages_errorarchive_errorarchive_list_page : demosampleapp_pages_errorarchive_errorarchive_list_page,
	demosampleapp_pages_main_page : demosampleapp_pages_main_page,
	demosampleapp_rules_appupdatefailure_js : demosampleapp_rules_appupdatefailure_js,
	demosampleapp_rules_appupdatesuccess_js : demosampleapp_rules_appupdatesuccess_js,
	demosampleapp_rules_emailvalidation_js : demosampleapp_rules_emailvalidation_js,
	demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js : demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	demosampleapp_rules_onwillupdate_js : demosampleapp_rules_onwillupdate_js,
	demosampleapp_rules_resetappsettingsandlogout_js : demosampleapp_rules_resetappsettingsandlogout_js,
	demosampleapp_services_sampleservicev2_service : demosampleapp_services_sampleservicev2_service,
	demosampleapp_styles_styles_css : demosampleapp_styles_styles_css,
	demosampleapp_styles_styles_less : demosampleapp_styles_styles_less,
	demosampleapp_styles_styles_light_css : demosampleapp_styles_styles_light_css,
	demosampleapp_styles_styles_light_json : demosampleapp_styles_styles_light_json,
	demosampleapp_styles_styles_light_nss : demosampleapp_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map