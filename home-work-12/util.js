(function (global) {
    'use strict';

    let AppUtil = {};

    global.AppUtil = AppUtil;

    AppUtil.debounce = (payloadFunction, delayMs, callback, onError) => {
        let timerId;
        let params;

        let applyPayloadFunction = () => {
            let result;

            try {
                result = payloadFunction.apply(null, params);
                callback && callback(result);
            } catch (err) {
                if (onError) {
                    onError(err);
                } else {
                    console.error('Error in AppUtil.debounce:', err);
                }
            }
        };

        return function () {
            params = arguments;
            clearTimeout(timerId);

            timerId = setTimeout(() => {
                applyPayloadFunction();
            }, delayMs);
        };
    };

    AppUtil.throttle = (payloadFunction, delayMs, callback, onError) => {
        let intervalId,
            lastParamsApplied,
            params;
        let applyPayloadFunction = () => {
            let result;

            try {
                result = payloadFunction.apply(null, params);
                lastParamsApplied = true;
                params = undefined;

                callback && callback(result);
            } catch (err) {
                if (onError) {
                    onError(err);
                } else {
                    console.error('Error in AppUtil.throttle:', err);
                }
            }
        };

        return function () {
            params = arguments;
            lastParamsApplied = false;

            if (intervalId === undefined) {
                applyPayloadFunction();

                intervalId = setInterval(() => {
                    if (!lastParamsApplied) {
                        applyPayloadFunction();
                    } else {
                        clearInterval(intervalId);
                        intervalId = undefined;
                    }
                }, delayMs);
            }
        };
    };

})(typeof module !== 'undefined' ? module.exports : window);
