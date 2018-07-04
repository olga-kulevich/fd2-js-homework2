(function (global) {
    'use strict';

    var AppUtil = {};

    global.AppUtil = AppUtil;

    AppUtil.isValidEmail = function (value) {
        // TODO need improve code here
        return /email@gmail\.com/.test(value);
    }

    AppUtil.isTime = function (value) {
        // TODO need improve code here
        return /23:59/.test(value);
    };

    AppUtil.isTimeIn12HourClock = function (value) {
        // TODO need improve code here
        return /12:00 pm/.test(value);
    };

    AppUtil.isValidNumber = function(value) {
        return /^\d*[,.]?\d*([eE][-+]\d+)?$/.test(value);
    };

    AppUtil.isValidJsFileName = function (value) {
        return /^[\w.-]+\.js$/.test(value);
    };

})(typeof module !== 'undefined' ? module.exports : window);
