sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sds/model/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
  ],
  function (Controller, formatter, Fragment, MessageBox) {
    "use strict";

    return Controller.extend("sds.controller.View1", {
      f: formatter,
      onInit: function () {
        this.onReadData();
      },
      
      onReadData: function () {
        var oDataModel = this.getOwnerComponent().getModel("ZFIRST_ODATA_SRV");
        var oJsonModel = this.getOwnerComponent().getModel("JsonPo");
        // Regio is a string property in the OData metadata -> use a string value
        var oFilter = new sap.ui.model.Filter(
          "Regio",
          sap.ui.model.FilterOperator.EQ,
          "13",
        );
        var oBusyDialog = new sap.m.BusyDialog({
          title: "Loading",
          text: "Please wait while data is being loaded...",
          customIcon: "./css/load.png",
          // showCancelButton: false,
          // close: function () {
          //   oBusyDialog.destroy();
          // },
        });
        oBusyDialog.open();
        oDataModel.read("/zfirst_entity_typeSet", {
          // filters : [oFilter],
          success: function (ores) {
            if (oJsonModel) {
              oJsonModel.setProperty("/sales_data", ores.results);
              this.getView().setModel(oJsonModel, "JsonPo");
            }
            oBusyDialog.close();
          }.bind(this),
          error: function (oerr) {
            console.error("Error fetching data from OData model", oerr);
            oBusyDialog.close();
          },
        });
      },

      deleteRecord: function (oEvent) {
        var oContext = oEvent
          .getSource()
          .getBindingContext("JsonPo")
          .getObject();
        MessageBox.confirm("This message should appear in the confirmation", {
          title: "Confirm", // default
          onClose: function (oAction) {
            if (oAction === "OK") {
              this.confirmDelete(oContext);
            }
          }.bind(this),
          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL], // default
          emphasizedAction: sap.m.MessageBox.Action.OK, // default
          initialFocus: null, // default
          textDirection: sap.ui.core.TextDirection.Inherit, // default
          dependentOn: null,
        });
      },
      confirmDelete: function (oContext) {
        var oDataModel = this.getOwnerComponent().getModel("ZFIRST_ODATA_SRV");
        var oBusyDialog = new sap.m.BusyDialog({
          title: "Loading",
          text: "Please wait while data is being loaded...",
          customIcon: "./css/load.png",
          // showCancelButton: false,
          // close: function () {
          //   oBusyDialog.destroy();
          // },
        });
        oBusyDialog.open();
        var sPath = "/zfirst_entity_typeSet(Kunnr='" + oContext.Kunnr + "')";
        oDataModel.remove(sPath, {
          success: function () {
            oBusyDialog.close();
            this.onReadData();
          }.bind(this),
          error: function (oerr) {
            oBusyDialog.close();
          }.bind(this),
        });
      },

      editRecord: function (oEvent) {
        var oContext = oEvent
          .getSource()
          .getBindingContext("JsonPo")
          .getObject();

        this.getView().setModel(
          new sap.ui.model.json.JSONModel({
            oPayload: oContext,
          }),
          "oPayloadModel",
        );
        var oView = this.getView();
        var oDialog = this.byId("dialogId");
        if (!oDialog) {
          Fragment.load({
            id: oView.getId(),
            name: "sds.fragments.dialogFragment",
            controller: this,
          }).then(function (dialogInstance) {
            oView.addDependent(dialogInstance);
            dialogInstance.open();
          });
        } else {
          oDialog.open();
        }
      },

      confirmUpdate: function () {
        var oDialog = this.byId("dialogId");
        var oDataModel = this.getOwnerComponent().getModel("ZFIRST_ODATA_SRV");
        var oRecord = this.getView()
          .getModel("oPayloadModel")
          .getProperty("/oPayload");
        var oBusyDialog = new sap.m.BusyDialog({
          title: "Loading",
          text: "Please wait while data is being loaded...",
          customIcon: "./css/load.png",
          // showCancelButton: false,
          // close: function () {
          //   oBusyDialog.destroy();
          // },
        });
        oBusyDialog.open();
        oDataModel.update(
          "/zfirst_entity_typeSet(Kunnr='" + oRecord.Kunnr + "')",
          oRecord,
          {
            success: function () {
              oBusyDialog.close();
              this.onReadData();
              var oDialog =
                this.byId("dialogId") ||
                Fragment.byId(this.getView().getId(), "dialogId");
              if (oDialog && oDialog.close) {
                oDialog.close();
              }
            }.bind(this),
            error: function (oerr) {
              oBusyDialog.close();
              var oDialog =
                this.byId("dialogId") ||
                Fragment.byId(this.getView().getId(), "dialogId");
              if (oDialog && oDialog.close) {
                oDialog.close();
              }
            }.bind(this),
          },
        );
      },
      cancelUpdate: function () {
        var oDialog =
          this.byId("dialogId") ||
          Fragment.byId(this.getView().getId(), "dialogId");
        if (oDialog && oDialog.close) {
          oDialog.close();
        }
      },

      AddRecord: function () {
        // var oDialog = this.byId("dialogId");
        var oDataModel = this.getOwnerComponent().getModel("ZFIRST_ODATA_SRV");
        var oRecord = {
          Kunnr: "0000000005",
          Name1: "New Customer",
          Ort01: "New City",
          Regio: "13",
          Land1: "DE",
        };

        var oBusyDialog = new sap.m.BusyDialog({
          title: "Loading",
          text: "Please wait while data is being loaded...",
          customIcon: "./css/load.png",
          // showCancelButton: false,
          // close: function () {
          //   oBusyDialog.destroy();
          // },
        });
        oBusyDialog.open();
        oDataModel.create("/zfirst_entity_typeSet", oRecord, {
          success: function () {
            oBusyDialog.close();
            this.onReadData();
            // var oDialog = this.byId("dialogId") || Fragment.byId(this.getView().getId(), "dialogId");
            // if (oDialog && oDialog.close) {
            //   oDialog.close();
            // }
          }.bind(this),
          error: function (oerr) {
            oBusyDialog.close();
            // var oDialog = this.byId("dialogId") || Fragment.byId(this.getView().getId(), "dialogId");
            // if (oDialog && oDialog.close) {
            //   oDialog.close();
            // }
          }.bind(this),
        });
      },
    });
  },
);
