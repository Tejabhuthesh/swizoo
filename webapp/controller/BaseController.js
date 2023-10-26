sap.ui.define([
  "sap/ui/core/mvc/Controller",
 
  "sap/m/MessageBox"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("idfood.swizoo.controller.BaseController", {
      onInit: function () {
        debugger;
        var FoodData = this.getOwnerComponent().getModel("FoodItem").getData();
        var oModel1 = new sap.ui.model.json.JSONModel();
        oModel1.setData(FoodData);

        this.getView().setModel(oModel1, "FoodItem");
        var oModel = this.getOwnerComponent().getModel("ZCUSTOMAPP");
        oModel.read("/CustomdetailsSet", {
          success: function (odata) {
            var oModel1 = new sap.ui.model.json.JSONModel();
            oModel1.setData(odata);
            this.getView().setModel(oModel1, "Data1");
          
          }.bind(this),
          error: function (error) {
            BusyIndicator.hide();

            var msg = $(error.response.body).find('message').first().text();
            var action = "OK";
            new sap.m.MessageBox.error(msg, {

              onClose: function () {

              }
            });
          }

        });


        this._getRouter().getRoute("LoginPage").attachPatternMatched(this.onRouteMatch, this);

      },
      _getRouter: function () {
        // Keep in basecontroller
        return sap.ui.core.UIComponent.getRouterFor(this);
      },
      onRegLogin: function () {

        this._getRouter().navTo("LoginPage", { flag: "C" });
      },
      onLogReg: function () {
        this._getRouter().navTo("LoginPage", { flag: "X" });
      },
      onAvatarPressed: function (oEvent) {
        var oButton = oEvent.getSource();
        this.byId("actionSheet").openBy(oButton)
      },
      onLogOut: function () {
        var t = this;
        var warning = "Are You Sure Want To LogOut!!";

        MessageBox.warning(warning, {
          icon: MessageBox.Icon.warning,
          title: "Warning",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: function (actions) {
            debugger;
            if (actions === "OK") {
              var loRouter = sap.ui.core.UIComponent.getRouterFor(t);
              loRouter.navTo("LoginPage", { flag: "C" });
            }

          },

        });
      }
    });
  });
