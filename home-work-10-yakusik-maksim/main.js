(function (global) {
    'use strict';

    var AppUtil = {};

    global.AppUtil = AppUtil;

    AppUtil.isValidEmail = function (value) {
        return (/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i).test(value);
    }

    AppUtil.isTime = function (value) {
        return /^\d{2}:\d{2}$/gm.test(value);
    };

    AppUtil.isTimeIn12HourClock = function (value) {
        return /^(10|11|12|[1-9]):([0-5][0-9])\s(am|pm)$/.test(value);
    };

    AppUtil.isValidNumber = function(value) {
        return /^\d*[,.]?\d*([eE][-+]\d+)?$/.test(value);
    };

    AppUtil.isValidJsFileName = function (value) {
        return /^[\w.-]+\.js$/.test(value);
    };

})(typeof module !== 'undefined' ? module.exports : window);
