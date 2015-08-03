var color = require('color');
var _ = require('lodash');

function colordash () {
}

_.forEach(
    _.functions(color.prototype),
    function (colorFunction) {
        colordash[colorFunction] = function (obj /* args */) {
            var argsArray = _.drop(_.toArray(arguments));
            var colorInstance = color(obj);
            return colorInstance[colorFunction].apply(colorInstance, argsArray).hexString();
        };
    }
);

module.exports = colordash;
