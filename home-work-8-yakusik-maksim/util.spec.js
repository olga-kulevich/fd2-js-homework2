describe ('AppUtil.debounce', function () {
    var spy = null;

    beforeEach(function () {
        spy = jasmine.createSpy('spy');
        jasmine.clock().install();
    });

    it('payloadFunction should be called 1 time, if debounce is called 3 times in a row', function () {

         var debounceFn = AppUtil.debounce(spy, 300);

        for (var i = 0; i < 3; i++) {
            debounceFn();
        }

        jasmine.clock().tick(500);
        expect(spy.calls.count()).toBe(1);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});

describe ('AppUtil.throttle', function () {
    var spy = null;

    beforeEach(function () {
        spy = jasmine.createSpy('spy');
        jasmine.clock().install();
    });

    it('payloadFunction should be called 3 times during 15000ms, if delay is set to 5000ms', function () {

        var throttleFn = AppUtil.throttle(spy, 5000);
        var t = setInterval( function(){
            throttleFn();
        }, 1000);

        jasmine.clock().tick(15000);
        expect(spy).toHaveBeenCalledTimes(3);

        clearInterval(t);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
});