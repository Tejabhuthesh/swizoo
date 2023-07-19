sap.ui.define([
    // "sap/ui/core/mvc/Controller", 
    "./BaseController", "sap/m/MessageBox", "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox, MessageToast) {
        "use strict";

        return BaseController.extend("idfood.swizoo.controller.LoginPage", {
            onInit: function () {
                var that = this;
                // var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCUSTOMAPP_SRV/");
                var oModel = that.getOwnerComponent().getModel("ZCUSTOMAPP");
                oModel.read("/CustomdetailsSet", {
                    success: function (odata) {
                     
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        that.getView().setModel(oModel1, "Data1");
                       
                        // MessageBox.success("Success");
                    },
                    error: function (error) {
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

                });
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("LoginPage").attachPatternMatched(this.onRouteMatch, this);
            },
            onRouteMatch: function (evt) {
                var that = this
                var KeyID2 = evt.mParameters.arguments.flag;
                var odata = {
                    "C": KeyID2
                }
                var oModel1 = new sap.ui.model.json.JSONModel();
                oModel1.setData(odata);
                that.getView().setModel(oModel1, "Data2");

            },
            onHome: function (oEvent) {
                var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                loRouter.navTo("HomePage");
            },
           
            onLogin: function () {
                debugger;
                var CustomerID = this.getView().byId("idcustomer_id").getValue();
                var Password = this.getView().byId("idpassword").getValue();

                var oarray = this.getView().getModel("Data1").getData().results;

                if (CustomerID == '') {
                    this.byId("idcustomer_id").setValueState(sap.ui.core.ValueState.Error);
                } else {
                    this.byId("idcustomer_id").setValueState(sap.ui.core.ValueState.Success);
                }

                if (Password === '') {
                    this.byId("idpassword").setValueState(sap.ui.core.ValueState.Error);
                } else {
                    this.byId("idpassword").setValueState(sap.ui.core.ValueState.Success);
                }
                for (var i = 0; i < oarray.length; i++) {

                    if (CustomerID === "") {

                        this.byId("idcustomer_id").setValueState("Warning");
                        MessageToast.show("Please give UserName!");

                    } else if (Password === "") {
                        MessageToast.show("Please give Password");
                        this.byId("idpassword").setValueState("Warning");
                    } else
                        
                        if (CustomerID === oarray[i].Kunnr && Password === oarray[i].Password) {
                            
                            this.byId("idcustomer_id").setValueState(sap.ui.core.ValueState.Success);
                            // this.byId("idcustomer_id").setValueState(sap.ui.core.ValueState.Success);
                            this.byId("idpassword").setValueState(sap.ui.core.ValueState.Success);
                            this.getView().byId("idlogin").setType("Success");
                            MessageBox.success("Login Successful!");
                            var loRouter = sap.ui.core.UIComponent.getRouterFor(this)
                            loRouter.navTo("MainPage", { CustomerID: CustomerID, Password: Password ,city:"V"});
                            var CustomerID = this.getView().byId("idcustomer_id").setValue();
                            var Password = this.getView().byId("idpassword").setValue();
                            return true;
                        }



                }

                for (var j = 0; j < oarray.length; j++) {
                    if (CustomerID !== oarray[j].Kunnr && Password !== oarray[j].Password) {

                           this.byId("idcustomer_id").setValueState(sap.ui.core.ValueState.Error);
                        this.byId("idpassword").setValueState(sap.ui.core.ValueState.Error);
                        this.getView().byId("idlogin").setType("Reject");
                        MessageToast.show("Invalid User / Password!");
                        return false;
                    } 
                }

               
               
            },



            onRigister: function (oEvent) {

                var that = this;
                var Kunnr = that.getView().byId("idcustomerid").getValue();
                if (Kunnr === "") {
                    MessageToast.show("please give Value");
                    that.byId("idcustomerid").setValueState("Warning");
                    return;
                } else {

                    that.byId("idcustomerid").setValueState("Success");
                }

                var Name1 = that.getView().byId("idname").getValue();
                if (Name1 === "") {
                    MessageToast.show("please give Value");
                    that.byId("idname").setValueState("Warning");
                    return;
                } else {
                    var p = /^[A-Za-z]+$/;
                    //   var val = document.getElementById('fname');

                    // if (Name1.p != null) {
                    //     alert("plz Enter alphabit only");
                    // }
                    // else {
                    if (Name1.match(p)) {
                        // alert("Submitted Successfully");
                        that.byId("idname").setValueState("Success");
                    }
                    else {
                        alert("plz Enzzter alphabit only");
                        that.byId("idname").setValueState("Warning");
                    }
                    // }

                }

                var SmtpAddr = that.getView().byId("idaddress").getValue();
                if (SmtpAddr === "") {
                    MessageToast.show("please give Value");
                    that.byId("idaddress").setValueState("Warning");
                    return;
                } else {

                    that.byId("idaddress").setValueState("Success");
                }


                var Telf1 = that.getView().byId("idm_number").getValue();
                if (Telf1 === "") {
                    MessageToast.show("please give Value");
                    that.byId("idm_number").setValueState("Warning");
                    return;
                } else {
                    var p = /^\d{10}$/;

                    if (Telf1.length != 10) {
                        alert("Mobile Number Plz Enter 10 Digit Only!!");
                        that.byId("idm_number").setValueState("Warning");
                    }
                    that.byId("idm_number").setValueState("Success");
                }

                var AppUsrid = that.getView().byId("iduserid").getValue();
                if (AppUsrid === "") {
                    MessageToast.show("please give Value");
                    that.byId("iduserid").setValueState("Warning");
                    return;
                } else {

                    that.byId("iduserid").setValueState("Success");
                }

                var Password = that.getView().byId("idpassword1").getValue();
                if (Password === "") {
                    MessageToast.show("please give Value");
                    that.byId("idpassword1").setValueState("Warning");
                    return;
                } else {

                    that.byId("idpassword1").setValueState("Success");
                }


                var array = { Kunnr, Name1, SmtpAddr, Telf1, AppUsrid, Password };
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCUSTOMAPP_SRV/");

                oModel.create("/CustomdetailsSet", array, {
                    success: function (odata) {

                        oModel.read("/CustomdetailsSet", {
                            success: function (odata) {
                                var oModel1 = new sap.ui.model.json.JSONModel();
                                oModel1.setData(odata);
                                that.getView().setModel(oModel1, "Data1");
                                MessageToast.show(" Rigistraion Successufull.");

                            }
                        })

                    },
                    error: function (oError) {
                        MessageToast.show("Rigistraion Failed!");

                    }
                });

                var Kunnr = that.getView().byId("idcustomerid").setValue();
                var Name1 = that.getView().byId("idname").setValue();
                var SmtpAddr = that.getView().byId("idaddress").setValue();
                var Telf1 = that.getView().byId("idm_number").setValue();
                var AppUsrid = that.getView().byId("iduserid").setValue();
                var Password = that.getView().byId("idpassword1").setValue();

            },
            onNavBack: function () {
                var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                loRouter.navTo("CustomerACPage");

            }
        });
    });
