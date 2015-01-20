var args = arguments[0] || {};

var utils = require("utils");

$.initialize = function() {
    $.initializeViews();
    $.initializeHandlers();
};

$.initializeViews = function() {};

$.initializeHandlers = function() {
    $.win.addEventListener("open", $.onWindowOpened);
    $.win.addEventListener("close", $.onWindowClosed);
};

$.nuke = function() {
    $.nukeHandlers();
    $.nukeViews();
};

$.nukeViews = function() {
    $.destroy();
    $.win.removeAllChildren();
    utils.deallocate($);
    $ = null;
};

$.nukeHandlers = function() {
    $.win.removeEventListener("open", $.onWindowOpened);
    $.win.removeEventListener("close", $.onWindowClosed);
};

$.onWindowOpened = function(event) {};

$.onWindowClosed = function(event) {
    $.nuke();
};

args.initialize && $.initialize();
