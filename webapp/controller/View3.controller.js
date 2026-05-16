sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("sds.controller.View3", {
    onInit() {
      console.log("init");
    },
    onPress() {
      alert("test");
      this.getOwnerComponent().getRouter().navTo("RouteView3");
    }
  });
});
