sap.ui.define([
  "sap/ui/core/UIComponent",
  "sds/model/models"
], (UIComponent, models) => {
  "use strict";

  return UIComponent.extend("sds.Component", {
    metadata: {
      manifest: "json",
      interfaces: ["sap.ui.core.IAsyncContentCreation"]
    },

    init: function () {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // set the device model
      this.setModel(models.createDeviceModel(), "device");
 
      // this.ReadBank();

      // enable routing
      this.getRouter().initialize();
    },

    ReadBank: function () {
      // var odata_modal_bank = this.getModel("BankModel");
      // var Json_model_bank = this.getModel("Jsonbank");

      var odata_modal = this.getModel("ZFIRST_ODATA_SRV");
      var Json_po = this.getModel("JsonPo");

      // Read data from OData model and set it to JSON model
      odata_modal.read("/zfirst_entity_typeSet", {
        success: function (data) {
          for (var i = 0; i < data.results.length; i++) {
            data.results[i].SRNO = `${i + 1}`;
          }

          // if (data.results) {
          //   for (var i = 0; i < data.results.length; i++) {
          //     if (data.results[i] && data.results[i].BankName === "") {
          //       data.results[i].BankName = "Unknown";
          //     }
          //   }
          // }

          Json_po.setData(data);
        },
        error: function (error) {
          console.error("Error fetching data from OData model", error);
        }
      });
    }
  });

});
