sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("sds.controller.View1", {
        onInit() {
            console.log("init")
        },
        onPress() {
            alert("test")
           this.getOwnerComponent().getRouter().navTo("RouteView2") 
        },
        OnSearch(){
            var dname = this.getView().byId("ip1").getValue()
            var msg = "Hello" + " "+ dname;
            this.getView().byId("txt1").setText(msg);
            this.getView().byId("txt1").setTextAlign("Right")
            this.getView().byId("ip1").setValue("")
        }
    });
});