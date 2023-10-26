sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox, MessageToast, Dialog,Log) {
        "use strict";
        // var DialogType = mobileLibrary.DialogType;
        return BaseController.extend("idfood.swizoo.controller.CustomerAccount", {
            onInit: function () {
                
               
                this._getRouter().getRoute("CustomerAccount").attachPatternMatched(this.onRouteMatch, this);
            },
            onRouteMatch: function (evt) {
                var that = this;

                var CustomerID = evt.mParameters.arguments.CustomerID;
                var Password = evt.mParameters.arguments.Password;

                var odata = {
                    "CustomerID": CustomerID,
                    "Password": Password,
                }
                var oModel1 = new sap.ui.model.json.JSONModel();
                oModel1.setData(odata);
                that.getView().setModel(oModel1, "CPData");
                debugger;
                var oModel = that.getOwnerComponent().getModel("ZCUSTOMAPP");
                // var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCUSTOMAPP_SRV/");

                oModel.read("/CustomdetailsSet", {
                    success: function (odata) {
                        // debugger;
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        that.getView().setModel(oModel1, "CData");
                        var CData = that.getView().getModel("CData").getData();
                        that.customer(CData, CustomerID, Password);
                        // MessageBox.success("Success");
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                       
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
                this.onMasterHide();
                this.getView().byId("idMenu2").setVisible(false);
            },
            customer: function (CData, CustomerID, Password) {
                var CData = CData;
                var CustomerID = CustomerID;
                var Password = Password;
                var CDetails = CData.results;
                var aCDetails = [];
                for (var i = 0; i < CDetails.length; i++) {

                    if (CustomerID === CDetails[i].Kunnr && Password === CDetails[i].Password) {
                        aCDetails.push(CDetails[i]);

                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(aCDetails);
                        this.getView().setModel(oModel, "CDetails");
                    }
                }


            },
            onNavBack: function () {
                var cId = this.getView().getModel("CPData").getData();
                var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                loRouter.navTo("MainPage", { CustomerID: cId.CustomerID, Password: cId.Password, city: "X" });
            },
            getSplitContObj: function () {
                var result = this.byId("SplitContDemo");
                if (!result) {
                    Log.error("SplitApp object can't be found");
                }
                return result;
            },
            onPressMasterBack: function () {
                var that = this;
                that.getSplitContObj().backMaster();
                that.getSplitContObj().backDetail();
            },
            onPressDetailBack: function () {
                this.getSplitContObj().backDetail();
            },
            orders: function () {
                var that = this;
                that.getSplitContObj().toDetail(this.createId("Feedback"));
            },
            takePhoto: function (oEvent) {
                debugger;
                var that = this;
                that.fixedDialog = new Dialog({
                    title: "Camera",
                    // const stream = await navigator.mediaDevices.getUserMedia({ /* ... */ }),
                    beginButton: new sap.m.Button({
                        text: "OK",
                        press: function () {
                            that.imageVal = document.getElementById("player");
                            that.fixedDialog.close();

                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Close",

                        press: function () {
                            player.srcObject.getTracks()[0].stop();
                            that.fixedDialog.close();
                        }
                    }),

                    content: [
                        new sap.ui.core.HTML({
                            content: "<video id='player' autoplay/>"

                        })
                        // ,
                        // new sap.m.Input({
                        //     placeholder: 'ID',
                        //     width: "8rem",

                        //     required: false
                        // }),
                        // new sap.m.Button({
                        //     text: "Close Vidio",

                        //     press: function (evt) {
                        //         player.srcObject.getTracks()[0].stop() ;
                        //         that.fixedDialog.close();
                        //     }
                        // })
                    ]
                });
                that.getView().addDependent(this.fixedDialog);
                this.fixedDialog.open();
                that.fixedDialog.attachBeforeClose(this.setImage, this);

                var handleSuccess = function (stream) {
                    player.srcObject = stream;
                };
                navigator.mediaDevices.getUserMedia({
                    video: true
                }).then(handleSuccess);

            },
            setImage: function () {
                debugger;
                var oVBox = this.getView().byId("wow");
                var canvasContainer = this.getView().byId("canvasContainer");
                // var items = oVBox.getItems();
                var items = oVBox.getItems()[0];
                // var items = itemss.splice(oVBox.getItems(), 1);

                // var snapId = 'canvas-' + items.length;
                var snapId = 'canvas-' + items;
                var textId = snapId + '-text';
                var imageVal = this.imageVal;
                var snapImg = null;
                if (imageVal === null) {
                    MessageToast.show("No image Captured..!");
                } else {

                    var snapCanvas = new sap.ui.core.HTML({
                        content: "<canvas display:none id='" + snapId + "'  width='250' height='200' ></canvas>"
                    });
                    oVBox.addItem(snapCanvas);
                    snapCanvas.addEventDelegate({
                        onAfterRendering: function () {
                            var canvasElem = document.getElementById(snapId);
                            var snapCanvasContext = canvasElem.getContext('2d');
                            snapCanvasContext.drawImage(imageVal, 0, 0, canvasElem.width, canvasElem.height);
                        }
                    });

                }

            },
            onpreees: function () {
                // var sPerdmm = this.getView().getModel("i18n").getResourceBundle().getText(">Name");
                // var sPerdmm = this.getView().getModel("i18n").getResourceBundle().aPropertyFiles[0].mProperties.Name;
                // var name = this.getView().getModel("i18n").getResourceBundle().aPropertyFiles[0].mProperties.setName("Teja");


            },
          
            // location.reload(true);
            onCollapseExpandPress: function () {
                var oSideNavigation = this.byId("sideNavigation");
                var bExpanded = oSideNavigation.getExpanded();

                oSideNavigation.setExpanded(!bExpanded);
            },
          


            onMasterHide: function (oEvent) {
                this.getSplitContObj().setMode("HideMode");
                this.getView().byId("idMenu2").setVisible(false);
            },
            onMasterShow: function (oEvent) {
                
                this.getSplitContObj().setMode("ShowHideMode");
                this.getView().byId("idMenu2").setVisible(true);
            },
           
            onCart:function(){
                this._getRouter().navTo("HomeCart");
            },
            
        });
    });