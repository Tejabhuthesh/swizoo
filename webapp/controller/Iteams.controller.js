
sap.ui.define([
    "./BaseController",
    'sap/f/library',
    "sap/m/Dialog",
    "sap/m/Image",
    "sap/m/Button",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
  
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, fioriLibrary, Dialog, Image, Button) {
        "use strict";

        return BaseController.extend("idfood.swizoo.controller.Iteams", {
            onInit: function () {
                this.dataToPush = [];
                this.getOwnerComponent().getModel("Cart").setData(this.dataToPush);
                this.cart();
                this.getView().byId("exitFullScreenBtn").setVisible(false);
                
                this.eventBus = sap.ui.getCore().getEventBus();
                this.eventBus.subscribe("MainPage", "ShowPopup", this.onShowPopup, this); // Listener L
                this.oRouter = this.getOwnerComponent().getRouter();

            },
            onShowPopup: function (sChanal, sEvent, oData) {
                debugger
                var msg = oData.Image;
                var data = {
                    image: msg
                }
                var oModel1 = new sap.ui.model.json.JSONModel();
                oModel1.setData(data);
                this.getView().setModel(oModel1, "Data2");

            },
            onFullScreen: function () {
                this.getView().byId("enterFullScreenBtn").setVisible(false);
                this.getView().byId("exitFullScreenBtn").setVisible(true);
                this.oRouter.navTo("Iteams", { layout: fioriLibrary.LayoutType.MidColumnFullScreen });
            },
            handleExitFullScreen: function () {
                this.getView().byId("enterFullScreenBtn").setVisible(true);
                this.getView().byId("exitFullScreenBtn").setVisible(false);

                // var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/exitFullScreen");
                this.oRouter.navTo("Iteams", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded });
            },
            handleClose: function () {
                var FullScreen = "gg";
                this.eventBus.publish("Iteams", "ShowPopup", { FullScreen: FullScreen });
                this.oRouter.navTo("Iteams", { layout: fioriLibrary.LayoutType.OneColumn });
            },
            handlePress: function (oEvent) {
                var sSrc = oEvent.getSource().getProperty("src");
                var oDialog = new sap.m.Dialog({
                    content: new sap.m.Image({
                        src: sSrc
                    }),
                    beginButton: new sap.m.Button({
                        text: 'Close',
                        press: function () {
                            oDialog.close();
                        }
                    }),
                    afterClose: function () {
                        oDialog.destroy();
                    }
                });
                oDialog.open();
            },
            onCart: function () {
                if (!this.aDialog) {
                    this.aDialog = this.loadFragment({
                        name: "idfood.swizoo.view.Fragment.Cart"
                    });
                }

                this.aDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },
            onCancelCart: function () {
                this.byId("idCart").destroy();
                this.aDialog = undefined;
            },
            onIteamAdd: function (oEvent) {
                // this.getView().byId("expirationInput").setVisible(true);
                // this.getView().byId("idAdd").setVisible(false);
                var sPath = oEvent.getSource().oPropagatedProperties.oBindingContexts.FoodItem.sPath.split("/").pop();

                // this.oRouter.navTo("HomeCart", { sPath: sPath});
                this.eventBus.publish("Iteams", "ShowPopup", { sPath: sPath });
                var FoodData = this.getOwnerComponent().getModel("FoodItem").getData().FoodItems[sPath].Pizza;
                this.Fdata =
                {
                    FoodData: FoodData
                }

                this.dataToPush.push(this.Fdata);

                var oModel1 = new sap.ui.model.json.JSONModel();
                oModel1.setData(this.dataToPush);

                this.getView().setModel(oModel1, "Iteam");


                this.cart();
            },
            cart: function () {
                if (this.dataToPush.length == '0') {
                    var EmptyCart = {
                        EmptyCart: '0'
                    }
                    var oModel1 = new sap.ui.model.json.JSONModel();
                    oModel1.setData(EmptyCart);

                    this.getView().setModel(oModel1, "EmptyCart");
                }
                else {
                    var EmptyCart = {
                        EmptyCart: '1'
                    }
                    var oModel1 = new sap.ui.model.json.JSONModel();
                    oModel1.setData(EmptyCart);

                    this.getView().setModel(oModel1, "EmptyCart");
                }
            },
            onCartIteamDelete: function (oEvent) {
                var iteam = oEvent.getSource()._getPropertiesToPropagate().oModels.Iteam.oData;
                var oIteam = oEvent.getParameters().listItem.oBindingContexts.Iteam.getPath().slice(1);
                iteam.splice(oIteam, 1);
                this.getView().getModel("Iteam").setData(iteam);                             

                var CartEmpty = this.getView().getModel("Iteam").getData();
                var oModel1 = new sap.ui.model.json.JSONModel();
                oModel1.setData(CartEmpty);

                this.getView().setModel(oModel1, "Iteam");
              

                if (CartEmpty.length == '0') {
                    var EmptyCart = {
                        EmptyCart: '0'
                    }
                    var oModel1 = new sap.ui.model.json.JSONModel();
                    oModel1.setData(EmptyCart);

                    this.getView().setModel(oModel1, "EmptyCart");
                }
            },
            onEditToggleButtonPress:function(){
                this._getRouter().navTo("HomeCart");
            }

        });
    });