// /**
//  * eslint-disable @sap/ui5-jsdocs/no-jsdoc
//  */

// sap.ui.define([
//         "sap/ui/core/UIComponent",
//         "sap/ui/Device",
//         "idfood/swizoo/model/models"
//     ],
//     function (UIComponent, Device, models) {
//         "use strict";

//         return UIComponent.extend("idfood.swizoo.Component", {
//             metadata: {
//                 manifest: "json"
//             },

//             /**
//              * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
//              * @public
//              * @override
//              */
//             init: function () {
//                 // call the base component's init function
//                 UIComponent.prototype.init.apply(this, arguments);

//                 // enable routing
//                 this.getRouter().initialize();

//                 // set the device model
//                 this.setModel(models.createDeviceModel(), "device");
//             }
//         });
//     }
// );

sap.ui.define([
	
	'sap/ui/core/UIComponent',
	"sap/ui/Device",
    "idfood/swizoo/model/models",
	'sap/ui/model/json/JSONModel',
	'sap/f/library',
	"sap/f/FlexibleColumnLayoutSemanticHelper",
	"sap/m/IllustrationPool"
], function ( UIComponent, Device, models, JSONModel, fioriLibrary, FlexibleColumnLayoutSemanticHelper,IllustrationPool) {
	'use strict';

	return UIComponent.extend('idfood.swizoo.Component', {

		metadata: {
			manifest: 'json'
		},

		init: function () {
			var oModel,
				oRouter;

			UIComponent.prototype.init.apply(this, arguments);
			
			var oCustomSet = {
				setFamily: "Custom",// C:\SAPDevelop\openui5_1\src\sap.m\test\sap\m\demokit\sample\IllustratedMessageInPageCustom\illustrations
				setURI: sap.ui.require.toUrl("illustrations")
			};

			// register Custom illustration set
			IllustrationPool.registerIllustrationSet(oCustomSet, false);
			oModel = new JSONModel();
			this.setModel(oModel);

			// set products demo model on this sample

			this.setModel(models.createDeviceModel(), "device");
			oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();

		},
		getHelper: function () {
			return this._getFcl().then(function(oFCL) {
				var oSettings = {
					defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded
				};
				return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
			});
		},

		_onBeforeRouteMatched: function (oEvent) {
			var oModel = this.getModel(),
				sLayout = oEvent.getParameters().arguments.layout,
				oNextUIState;

			// If there is no layout parameter, set a default layout (normally OneColumn)
			if (!sLayout) {
				this.getHelper().then(function(oHelper) {
					oNextUIState = oHelper.getNextUIState(0);
					oModel.setProperty("/layout", oNextUIState.layout);
				});
				return;
				// sLayout = fioriLibrary.LayoutType.OneColumn;
			}
			oModel.setProperty("/layout", sLayout);

		},
		_getFcl: function () {
			return new Promise(function(resolve, reject) {
				var oFCL = this.getRootControl().byId("app");
				if (!oFCL) {
					this.getRootControl().attachAfterInit(function(oEvent) {
						resolve(oEvent.getSource().byId("app"));
					}, this);
					return;
				}
				resolve(oFCL);

			}.bind(this));
		}
	});
});