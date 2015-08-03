var color = require('color');
var _ = require('lodash');

var colorModuleFunctions = _.functions(color.prototype);


function colordash () {
}


var hexRegex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;
var rgbRegex = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
var hslRegex = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;

function isHex(str) {
    return hexRegex.test(str);
}
function isRgb(str) {
    return rgbRegex.test(str);
}
function isHsl(str) {
    return hslRegex.test(str);
}

var HEX_STRING_FUNCTION = 'hexString';
var RGB_STRING_FUNCTION = 'rgbString';
var HSL_STRING_FUNCTION = 'hslString';

function colorSpecOutput(colorInput, alphaArg) {
    var alpha = alphaArg || 1;
    var colorIsHex = isHex(colorInput);

    if (colorIsHex && alpha === 1) {
        return HEX_STRING_FUNCTION;
    }
    else if (colorIsHex && alpha < 1) {
        return RGB_STRING_FUNCTION;
    }
    else if (isHsl(colorInput)) {
        return HSL_STRING_FUNCTION;
    }
    else { // if rgb or anything else
        return RGB_STRING_FUNCTION;
    }
}

_.forEach(
    colorModuleFunctions,
    function (colorFunction) {
        colordash[colorFunction] = function (obj /* args */) {
            var argsArray = _.drop(_.toArray(arguments));
            var colorInstance = color(obj);
            colorInstance[colorFunction].apply(colorInstance, argsArray)

            var outputFunction = colorSpecOutput(obj, colorInstance.alpha());
            return colorInstance[outputFunction]();
        };
    }
);

module.exports = colordash;
