
sap.ui.define([
    "./BaseController",
    "sap/m/library",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, library, MessageBox, MessageToast) {
        "use strict";

        return BaseController.extend("idfood.swizoo.controller.HomePage", {
            onInit: function () {
                debugger;
                var comboid = this.getView().byId("SelectYourRestaurant");
                    comboid.mBindingInfos.items .length = 341;
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


            },


            onFindFood: function () {
                debugger;
                var city = this.getView().byId("SelectYourRestaurant").getValue();
                if (city === "") {

                } else {
                    var loRouter = sap.ui.core.UIComponent.getRouterFor(this)
                    loRouter.navTo("MainPage", { CustomerID: "V", Password: "V", city: city });

                }
            },
            onHomeLogin: function () {
                this.onRegLogin();
            },
            onHomesign: function () {
                this.onLogReg();
            },

            onPlayStore: function () {
                // window.location.replace("https://www.facebook.com/campaign/landing.php?campaign_id=14884913640&extra_1=s%7Cc%7C589460569891%7Cb%7Cfacebook%20signin%7C&placement=&creative=589460569891&keyword=facebook%20signin&partner_id=googlesem&extra_2=campaignid%3D14884913640%26adgroupid%3D128696221832%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-3821998899%26loc_physical_ms%3D9062038%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAiAy_CcBhBeEiwAcoMRHPuTGGya5CLXKQQvlHI_FMoru1y_-FLXG1FMgnq56dTmgW3iPQlWrxoCO-QQAvD_BwE"); 
                window.open("https://play.google.com/store/apps/details?id=in.swiggy.android");
            }
        });
    });
