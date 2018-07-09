"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (chance) {
    var serializeDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return function randomDate(minDate, maxDate) {
        var minTs = minDate instanceof Date ? minDate.getTime() : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
        var maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
        var range = maxTs - minTs;
        var ts = chance.natural({ max: range });
        // move it more towards today to account for traffic increase
        ts = Math.sqrt(ts / range) * range;
        var date = new Date(minTs + ts);

        if (serializeDate) {
            return date.toISOString();
        }

        return date;
    };
};

module.exports = exports["default"];