var _ = require("alloy/underscore");

var utils = require("utils");

Alloy.Globals = _.extend(Alloy.Globals, {
    UI: {
        height: utils.appHeight(),
        width : utils.appWidth(),
    },
    Colors: {
        Black: "#000000",
        White: "#ffffff",
        Transparent: "transparent",
    },
});
