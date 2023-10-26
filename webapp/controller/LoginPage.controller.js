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
            onRouteMatch: function (oEvent) {

                var KeyID2 = oEvent.getParameter("arguments").flag;
                var odata = {
                    "C": KeyID2
                }
                var oModel1 = new sap.ui.model.json.JSONModel();
                oModel1.setData(odata);
                this.getView().setModel(oModel1, "Data2");

            },

            onHome: function () {
                this._getRouter().navTo("HomePage");
            },

            onLogin: function () {
                
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
                            loRouter.navTo("MainPage", { CustomerID: CustomerID, Password: Password, city: "V" });
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
            onRigister: function () {
                var Kunnr = this.getView().byId("idcustomerid").getValue();
                if (Kunnr === "") {
                    MessageToast.show("please give Value");
                    this.byId("idcustomerid").setValueState("Warning");
                    return;
                } else {

                    this.byId("idcustomerid").setValueState("Success");
                }

                var Name1 = this.getView().byId("idname").getValue();
                if (Name1 === "") {
                    MessageToast.show("please give Value");
                    this.byId("idname").setValueState("Warning");
                    return;
                } else {
                    var p = /^[A-Za-z]+$/;
                  
                    if (Name1.match(p)) {
                       
                        this.byId("idname").setValueState("Success");
                       
                    }
                    else {
                        alert("plz Enzzter alphabit only");
                        
                        this.byId("idname").setValueState("Warning");
                        return false;
                    }
                    

                }

                var SmtpAddr = this.getView().byId("idaddress").getValue();
                if (SmtpAddr === "") {
                    MessageToast.show("please give Value");
                    this.byId("idaddress").setValueState("Warning");
                    return;
                } else {

                    this.byId("idaddress").setValueState("Success");
                }


                var Telf1 = this.getView().byId("idm_number").getValue();
                if (Telf1 === "") {
                    MessageToast.show("please give Value");
                    this.byId("idm_number").setValueState("Warning");
                    return;
                } else {
                    var p = /^\d{10}$/;

                    if (Telf1.length != 10) {
                        alert("Mobile Number Plz Enter 10 Digit Only!!");
                        this.byId("idm_number").setValueState("Warning");
                        return false;
                    }
                    this.byId("idm_number").setValueState("Success");
                }
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                var AppUsrid = this.getView().byId("iduserid").getValue();
                if (AppUsrid === "") {
                    MessageToast.show("please give Value");
                    this.byId("iduserid").setValueState("Warning");
                    return;
                } 
                else if(AppUsrid.match(pattern) === null){
                    this.byId("iduserid").setValueState("Error");
                    alert(" Email : wrong format");
                    return false;
                }else{
                    this.byId("iduserid").setValueState("Success");
                }

                var Password = this.getView().byId("idpassword1").getValue();
                if (Password === "") {
                    MessageToast.show("please give Value");
                    this.byId("idpassword1").setValueState("Warning");
                    return;
                } else {

                    this.byId("idpassword1").setValueState("Success");
                }
                var array = { Kunnr, Name1, SmtpAddr, Telf1, AppUsrid, Password };
                var t = this;
                var oModel = this.getOwnerComponent().getModel("ZCUSTOMAPP");
                oModel.create("/CustomdetailsSet", array, {
                    success: function (odata) {
                        var success = "Rigistraion Successufull.";
                       
                        MessageBox.success(success, {
                            icon: MessageBox.Icon.success,
                            title: "SUCCESS",
                            type: "SUCCESS",
                            actions: [MessageBox.Action.OK],
                            emphasizedAction: [MessageBox.Action.OK],
                            onClose: function (actions) {
                                debugger
                                if (actions === "OK") {
                                    t.onRegLogin();
                                }

                            }
                        });

                    },
                    error: function (oError) {
                        MessageToast.show("Rigistraion Failed!");

                    }
                });

                var Kunnr = this.getView().byId("idcustomerid").setValue();
                var Name1 = this.getView().byId("idname").setValue();
                var SmtpAddr = this.getView().byId("idaddress").setValue();
                var Telf1 = this.getView().byId("idm_number").setValue();
                var AppUsrid = this.getView().byId("iduserid").setValue();
                var Password = this.getView().byId("idpassword1").setValue();

            },
            onNavBack: function () {
                this._getRouter().navTo("CustomerACPage");

            },
            onEyePassword: function (oEvent) {
                if (oEvent.getSource()._getValueHelpIcon().getSrc() === "sap-icon://hide") {
                    oEvent.getSource().setValueHelpIconSrc("sap-icon://show");
                    this.byId("idpassword").setType("Text");
                    this.byId("idpassword1").setType("Text");

                }
                else if (oEvent.getSource()._getValueHelpIcon().getSrc() === "sap-icon://show") {
                    oEvent.getSource().setValueHelpIconSrc("sap-icon://hide");
                    this.byId("idpassword").setType("Password");
                    this.byId("idpassword").setType("Password1");

                }
            }
        });
    });
