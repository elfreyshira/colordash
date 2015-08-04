var hexRegex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;
var hslRegex = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;

function isHex(str) {
    return hexRegex.test(str);
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
    else { // if input is rgb or anything else
        return RGB_STRING_FUNCTION;
    }
}

module.exports = colorSpecOutput;
