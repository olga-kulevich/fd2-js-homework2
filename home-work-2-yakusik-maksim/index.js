var data = [42, null, null, 42000, true, true, null, 'foo', false, {}, undefined, undefined, 'bar', { foo: 'bar' }],
    result;

result = prioritySort(data, ['number', 'null', 'string', 'object', 'undefined', 'boolean']);
//expected result [42, 42000, null, null, null, 'bar', 'foo', { foo: 'bar' }, {}, false, true, true, undefined, undefined]

console.log('result', result);

function prioritySort(array, dataPriority) {
    return array.sort(function (left, right) {
        var typeLeft, typeRight;
        if (isNull(left)) {
            typeLeft = 'null';
        } else {
            typeLeft = typeof(left)
        }
        if (isNull(right)) {
            typeRight = 'null';
        } else {
            typeRight = typeof(right);
        }
        if (dataPriority.indexOf(typeLeft) < dataPriority.indexOf(typeRight)) {
            return -1;
        } else if (dataPriority.indexOf(typeLeft) === dataPriority.indexOf(typeRight)) {
            if (left < right) {
                return -1;
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    });
}

function isNull(value) {
    if (value === null) {
        return true;
    }
}
