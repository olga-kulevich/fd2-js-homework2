function addition(left, right) {
    return left + right;
}

function isNull(value) {
    return value === null;
}

function getGreeting(name) {
    return 'Hello ' + name;
}

function parseBoolean(value) {
    return value.trim().toLowerCase() === 'true';
}

function getPathByHash(hash) {
    return hash.split('/').map(function (item) {
        return item.trim();
    }).filter(function (item) {
        return item !== ''
    });
}

describe('Test for addition', function () {

    it('must return 5 for arguments 2 and 3', function() {
        expect(addition(2,3)).toBe(5);
    });

    it('must return "helloWorld" for arguments "hello" and "World"', function() {
        expect(addition('hello','World')).toBe('helloWorld');
    });

});

describe('Test for isNull', function () {

    it('must return true for null', function() {
        expect(isNull(null)).toBeTruthy();
    });

    it('must return false for 0', function() {
        expect(isNull(0)).toBeFalsy();
    });

    it('must return false for ""', function() {
        expect(isNull('')).toBeFalsy();
    });

});

describe('Test for getGreeting', function () {

    it('must contain string "Hello "', function () {
        var result;

        result = getGreeting('guys');

        expect(result).toContain("Hello ");
    });

    it('must check and return string', function () {
        var result;

        result = getGreeting({});

        expect(typeof result === "string").toBe(true);
    });

});

describe('Test for parseBoolean', function () {

    it('must return true for " TruE" string', function () {
        expect(parseBoolean(' TruE')).toBe(true);
    });

    it('must return true for "\tTruE\t" string', function () {
        expect(parseBoolean('\tTruE\t')).toBe(true);
    });

    it('must return false for "khghgkTruE" string', function () {
        expect(parseBoolean('khghgkTruE')).toBe(false);
    });

});

describe('Test for getPathByHash', function () {

    it('must return ["user","create"] for "user/create" hash string', function () {
        expect(getPathByHash('user/create')).toEqual(['user', 'create']);
    });

    it('must return ["user","create"] for "user/   /create" hash string', function () {
        expect(getPathByHash('user/   /create')).toEqual(['user','create']);
    });

    it('must return ["user","abc","create"] for "user/ abc  /create" hash string', function () {
        expect(getPathByHash('user/ abc  /create')).toEqual(['user','abc','create']);
    });

    it('must return ["user","abc","create"] for "user/ abc\t /create" hash string', function () {
        expect(getPathByHash('user/ abc\t /create')).toEqual(['user','abc','create']);
    });

});



