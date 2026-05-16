sap.ui.define([], function () {
    "use strict";
    
    return {
        formatname: function (Name) {
            return 'MR. ' + Name;
        },
        colorIn: function (country) {
            if (country === 'IN') {
                return 'Success';
            } else {
                return 'Error';
            }
        }
    };
});