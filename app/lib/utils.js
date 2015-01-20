!function() {
    
    var BASE_DPI = 160;
    var STATUSBARHEIGHT = 12.5;
    
    module.exports = {
        
        /***
        Assigns a null value to the passed objects and its children.
        
        @param {Object} _obj - Object to be deallocated.
        ***/
        deallocate: function(_obj) {
            try {
                if (_.isObject(_obj)) {
                    _.each(_obj, function(child) {
                        if(_.isObject(child) && !_.isFunction(child) && !_.isEmpty(child)) {
                            this.deallocate(child);
                        }
                    });
                    _obj = null;
                } else {
                    Ti.API.debug("Passed in _obj to be cleaned is not an object.");
                }
            } catch (error) {
                Ti.API.debug("Error: " + JSON.stringify(error));
            }
        },
        
        /***
        Converts pixel values to dp units based on the BASE_DPI.
        
        @param {Number} pixelUnits - unit to be converted to dp units.
        @return {Number} - the converted dp units.
        ***/
        pixelsToDPUnits: function(pixelUnits) {
            pixelUnits = parseFloat(pixelUnits);
            
            if (Ti.Platform.displayCaps.dpi > BASE_DPI)
                return Math.round(pixelUnits / (Ti.Platform.displayCaps.dpi / BASE_DPI));
            else
                return pixelUnits;
        },
        
        /***
        Converts dp units to pixel values based on the BASE_DPI.
        
        @param {Number} pixelUnits - unit to be converted to dp units.
        @return {Number} - the converted pixel values.
        ***/
        dpUnitsToPixels: function(dpUnits) {
            dpUnits = parseFloat(dpUnits);
            
            if (Ti.Platform.displayCaps.dpi > BASE_DPI)
                return Math.round(dpUnits * (Ti.Platform.displayCaps.dpi / BASE_DPI));
            else
                return dpUnits;
        },
        
        /***
        Returns the total available height for the application.
        
        @return {Number} - the total available height.
        ***/
        appHeight: function() {
            var platformHeight = this.pixelsToDPUnits(Ti.Platform.displayCaps.platformHeight);
            return platformHeight - this.statusBarHeight();
        },
        
        /***
        Returns the total available width for the application.
        
        @return {Number} - the total available width.
        ***/
        appWidth: function() {
            var platformWidth = this.pixelsToDPUnits(Ti.Platform.displayCaps.platformWidth);
            return platformWidth;
        },
        
        /***
        Returns the total height for the android status bar.
        
        @return {Number} - the total height of the status bar.
        ***/
        statusBarHeight: function() {
            if (Ti.Platform.displayCaps.dpi > BASE_DPI)
                return Math.round(STATUSBARHEIGHT * (Ti.Platform.displayCaps.dpi / BASE_DPI));
            else
                return STATUSBARHEIGHT;
        },
        
        /***
        Centers an ImageView to a parentView, given the dimension of the image.
        
        @param {Object} imageRatio - an object with `width` and `height` of the image to be centered.
        @param {Object} parentView - an object with `width` and `height` to place the image.
        @param {Object} imageView - the ImageView or View to be centered in the parentView.
        ***/
        centerImage: function(imageRatio, parentView, imageView) {
            var h1, w1, h2, w2, x1, x2;
            
            h1 = parseFloat(parentView.height);
            w1 = parseFloat(parentView.width);
            h2 = parseFloat(imageView.height);
            w2 = parseFloat(imageView.width);

            if (imageRatio.width > imageRatio.height) {
                h2 = h1;
                w2 = (imageRatio.width * h2) / imageRatio.height;
            } else {
                w2 = w1;
                h2 = (imageRatio.height * w2) / imageRatio.width;
            }
            
            x1 = -((w2 * 0.5) - (w1 * 0.5));
            x2 = -((h2 * 0.5) - (h1 * 0.5));

            imageView.height = h2;
            imageView.width  = w2;
            imageView.left   = x1;
            imageView.top    = x2;
        },
        
        /***
        Returns a controller based on the file and args.
        
        @param {String} ctrl - filename of the controller to be created.
        @param {Object} args - specific arguments for the controller.
        
        @return {Object} - created controller object.
        ***/
        getCtrl: function(ctrl, args) {
            args = (args) ? args : {};
            return Alloy.createController(ctrl, args);
        },
        
        /***
        Returns a view based on the file and args.
        
        @param {String} ctrl - filename of the controller to be created.
        @param {Object} args - specific arguments for the controller.
        
        @return {Object} - created view object.
        ***/
        getView: function(ctrl, args) {
            args = (args) ? args : {};
            return this.getCtrl(ctrl, args).getView();
        },
        
    };
    
}();
