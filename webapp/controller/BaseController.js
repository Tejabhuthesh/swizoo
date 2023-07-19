sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
      "use strict";
  
      return BaseController.extend("idfood.swizoo.controller.BaseController", {
        onInit: function () {
        
        },
         onRegLogin:function(){
        
            var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
            loRouter.navTo("LoginPage", { flag: "C" });
        },
        onLogReg:function(){
            var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
            loRouter.navTo("LoginPage", { flag: "X" });
        }
    
      });
    });
  