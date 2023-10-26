
sap.ui.define([
    "./BaseController",
    'sap/f/library',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,fioriLibrary, JSONModel,MessageToast) {
        "use strict";

        return BaseController.extend("idfood.swizoo.controller.MainPage", {
            onInit: function () {
                debugger;
                this.getView().byId("enterFullScreenBtn1").setVisible(false);
                var oModel = this.getOwnerComponent().getModel("ZPLANTDETAILS");
                oModel.read("/InputPlantInfoSet", {
                    success: function (odata) {
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        this.getView().setModel(oModel1, "Data2");
                       
                    }.bind(this),
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        var msg = $(oError.response.body).find('message').first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error(msg, {

                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        });
                    }
                })
                this._getRouter().getRoute("MainPage").attachPatternMatched(this.onRouteMatch, this);
                this.oRouter = this.getOwnerComponent().getRouter();
                this.eventBus = sap.ui.getCore().getEventBus();
                this.eventBus.subscribe("Iteams", "ShowPopup", this.onShowPopup1, this);
               
            },
            onRouteMatch: function (oEvent) {
                debugger
                var CITY = oEvent.getParameter("arguments").city;
                var CustomerID = oEvent.getParameter("arguments").CustomerID;
                var Password = oEvent.getParameter("arguments").Password;

                if (CITY === "V") {
                } else {
                    this.getView().byId("idresturantnam").setText("Order Food Online in " + CITY);
                }

                var ocity = {
                    "CustomerID": CustomerID,
                    "Password": Password,
                }
                var oModel1 = new sap.ui.model.json.JSONModel();
                oModel1.setData(ocity);
                this.getView().setModel(oModel1, "Data2");

            },
            onFindFood: function () {
                var city = this.getView().byId("SelectYourRestaurant").getValue();
                if (city === "") {

                } else {
                    this.getView().byId("idresturantnam").setText("Order Food Online in " + city);
                }
            },

            onNavBack: function () {
                this._getRouter().navTo("HomePage");

            },
            oncustomer: function () {
                this._getRouter().navTo("LoginPage", { flag: "C" });
               
            },

            onCustomerDatails: function () {
                var cId = this.getView().getModel("Data2").getData();
                if (cId.CustomerID === "S" && cId.Password === "S") {
                } else {
                    var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    loRouter.navTo("CustomerAccount", { CustomerID: cId.CustomerID, Password: cId.Password });
                }
            },

            onMainPageFilters: function (evt) {

                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "idfood.swizoo.view.Fragment.Filters"
                    });
                }

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },
            onFiltersDialogClose: function () {

                this.byId("idFiltersDialog").destroy();
                this.pDialog = undefined;
            },
            
            onPress: function (oEvent) {
               
                var Image = oEvent.getSource().getProperty("backgroundImage");
                this.eventBus.publish("MainPage", "ShowPopup", { Image: Image });
               
                this.oRouter.navTo("Iteams", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded });
                this.getView().byId("enterFullScreenBtn1").setVisible(true);
            },
            
            onFullScreen:function(){
                this.getView().byId("enterFullScreenBtn1").setVisible(false);
                this.oRouter.navTo("Iteams", { layout: fioriLibrary.LayoutType.OneColumn });
            },
            onAddAddress:function(){
                if (!this._Dialog) {
                    this._Dialog = this.loadFragment({
                        name: "idfood.swizoo.view.Fragment.Address"
                    });
                }

                this._Dialog.then(function (oDialog) {
                    oDialog.open();
                });
            },
            onCancel1: function () {
                this.byId("idAddress").destroy();
                this._Dialog = undefined;
            
             
               
            },
            onShowPopup1: function (sChanal, sEvent, oData) {
                debugger
                if (sEvent === "ShowPopup" ) {
                   var msg = oData.FullScreen;
                   if(msg){
                    this.getView().byId("enterFullScreenBtn1").setVisible(false);
                   }
                }
           

            },
            onRatingChange: function (oEvent) {
                var fValue = oEvent.getParameter("value");
                
    
                MessageToast.show("ratingConfirmation"  +  fValue);
            }

        });
    });
