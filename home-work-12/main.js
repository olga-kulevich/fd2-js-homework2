(function (AppUtil) {

    let setInputListener = (element, callback) => {
        element.on('input',event => {
            let input = element.val();

            callback(input);
        });
    };

    let getBlockElemets = blockId => {

        let blockElement = $(`#${blockId}`),
            input = blockElement.find('input'),
            span = blockElement.find('span');

        return {input, span};
    };

    let getFormatedName = input => getSeparateWords(input)
        .map(toUpperFirstLetter)
        .join(' ');

    let debounceBlockElements = getBlockElemets('blockWithDebounce'),
        setValueInDebounceSpan = AppUtil.debounce(getFormatedName, 500, (value) => {
            debounceBlockElements.span.text(value || '-');
        }),
        throttleBlockElements = getBlockElemets('blockWithThrottle'),
        setValueInThrottleSpan = AppUtil.throttle(getFormatedName, 1000, (value) => {
            throttleBlockElements.span.text(value || '-');
        });

    setInputListener(debounceBlockElements.input, setValueInDebounceSpan);
    setInputListener(throttleBlockElements.input, setValueInThrottleSpan);

    let getSeparateWords = string => {
        let result;

        if (string) {
            result = string.split(' ').filter(word => !!word);
        } else {
            result = [];
        }

        return result;
    };

    let toUpperFirstLetter = string => {
        let result;

        if (string) {
            result = string.charAt(0).toUpperCase() +
                string.slice(1).toLowerCase();
        } else {
            result = '';
        }

        return result;
    };
})(AppUtil);