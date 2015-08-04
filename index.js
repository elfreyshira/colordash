var color = require('color');
var _ = require('lodash');
var colorSpecOutput = require('./util/color-spec-output');

function colordash (obj) {
    return new ColordashWrapper(obj);
}

function ColordashWrapper(obj, functionQueue) {
    this.__inputValue = obj;
    this.__functionQueue = functionQueue || [];
}

_.forEach(
    _.functions(color.prototype),
    function (colorFunction) {

        ColordashWrapper.prototype[colorFunction] = function (/* args */) {
            var argsArray = _.toArray(arguments);

            var inputValue = this.__inputValue;
            var functionQueue = this.__functionQueue.concat({
                functionName: colorFunction,
                argsArray: argsArray
            });

            return new ColordashWrapper(inputValue, functionQueue);
        };

        colordash[colorFunction] = function (obj /* args */) {
            var argsArray = _.drop(_.toArray(arguments));
            var colordashInstance = colordash(obj);
            return colordashInstance[colorFunction].apply(colordashInstance, argsArray).value();
        };
    }
);

ColordashWrapper.prototype.value = ColordashWrapper.prototype.valueOf = function() {
    var inputValue = this.__inputValue;
    var functionQueue = this.__functionQueue;

    var colorInstance = color(inputValue);
    _.forEach(functionQueue, function(queueObj) {
        var functionName = queueObj.functionName;
        var argsArray = queueObj.argsArray;
        colorInstance[functionName].apply(colorInstance, argsArray);
    });

    var outputFunction = colorSpecOutput(inputValue, colorInstance.alpha());
    return colorInstance[outputFunction]();

};

module.exports = colordash;
