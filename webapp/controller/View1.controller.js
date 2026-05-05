sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("sds.controller.View1", {
        onInit() {
            console.log("init")
        }
    });
});