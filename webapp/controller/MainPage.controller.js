
sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("idfood.swizoo.controller.MainPage", {
            onInit: function () {
                var that = this;
                debugger;
                // var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPLANTDETAILS_SRV/");
                var oModel = that.getOwnerComponent().getModel("ZPLANTDETAILS");
                oModel.read("/InputPlantInfoSet", {
                    success: function (odata) {

                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        that.getView().setModel(oModel1, "Data1");

                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;
                        var msg = $(error.response.body).find('message').first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error(msg, {

                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        });
                    }
                })

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("MainPage").attachPatternMatched(this.onRouteMatch, this);
              

            },
            onRouteMatch: function (evt) {
                var that = this
                var CITY = evt.mParameters.arguments.city;
                var CustomerID = evt.mParameters.arguments.CustomerID;
                var Password = evt.mParameters.arguments.Password;

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
                that.getView().setModel(oModel1, "Data2");

            },

            onFindFood: function (oEvent) {
                var city = this.getView().byId("SelectYourRestaurant").getValue();
                if (city === "") {

                } else {
                    this.getView().byId("idresturantnam").setText("Order Food Online in " + city);
                }
            },

            onNavBack: function () {
                var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                loRouter.navTo("HomePage");

            },
            oncustomer: function () {
                var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                loRouter.navTo("LoginPage", { flag: "C" });

            },

            onCustomerDatails: function (evt) {
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

            onsort: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "idfood.swizoo.view.Fragment.CustomerDeatails"
                    });
                }

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });

            },

            onCancel: function () {
                this.byId("idCustomersDeatailsDialog").destroy();
                this.pDialog = undefined;
            }


        });
    });
