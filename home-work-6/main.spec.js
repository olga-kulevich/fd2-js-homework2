describe('DateTime', function () {

    describe('Creat Date Object', function() {

        it('Creat new Date(datestring)', function() {
           expect(String(new Date('October 12 1989'))).toBe('Thu Oct 12 1989 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)');
        });

        it('Creat new Date(milliseconds)', function() {
            expect(String(new Date(86400000))).toBe('Fri Jan 02 1970 03:00:00 GMT+0300 (Саудовская Аравия, стандартное время)');
        });

        it('Creat   new Date(year, month, date, hours, minutes, seconds, ms)', function() {
            expect(String(new Date(2011, 0, 1, 0, 0, 0, 0))).toBe('Sat Jan 01 2011 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)');
            expect(String(new Date(2011, 0, 1))).toBe('Sat Jan 01 2011 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)');
            expect(String(new Date(2011, 0, 1, 2, 3, 4, 567))).toBe('Sat Jan 01 2011 02:03:04 GMT+0300 (Саудовская Аравия, стандартное время)');
        });
    });

    describe('Getting Date components', function() {
        var date = new Date(2011, 0, 1, 2, 3, 4, 567);
        it('getFullYear()', function() {
            expect(String(date.getFullYear())).toBe('2011');
        });

        it('getMonth()', function() {
            expect(String(date.getMonth())).toBe('0');
        });

        it('getDay()', function() {
            expect(String(date.getDay())).toBe('6');
        });

        it('getDate()', function() {
            expect(String(date.getDate())).toBe('1');
        });

        it('getHours(), getMinutes(), getSeconds(), getMilliseconds()', function() {
            expect(String(date.getHours())).toBe('2');
            expect(String(date.getMinutes())).toBe('3');
            expect(String(date.getSeconds())).toBe('4');
            expect(String(date.getMilliseconds())).toBe('567');
        });
    });

    describe('Getting GMT+0 (UTC) Date components', function() {
        var date = new Date(2011, 0, 1, 2, 3, 4, 567);
        it('getUTCFullYear()', function() {
            expect(String(date.getUTCFullYear())).toBe('2010');
        });

        it('getUTCMonth()', function() {
            expect(String(date.getUTCMonth())).toBe('11');
        });

        it('getUTCDay()', function() {
            expect(String(date.getUTCDay())).toBe('5');
        });

        it('getUTCDate()', function() {
            expect(String(date.getUTCDate())).toBe('31');
        });

        it('getUTCHours()', function() {
            expect(String(date.getUTCHours())).toBe('23');
        });

        it('Разница между местным и UTC-временем, в минутах. Метод getTimezoneOffset()', function() {
            expect((new Date().getTimezoneOffset())).toBe(-180);
        });
    });

    describe('Set Date components', function() {
        var date = new Date(2011, 0, 1, 2, 3, 4, 567);
        it('на примере метода setFullYear(year [, month, date])', function() {
            expect(date.setFullYear(2013)).toBe(1356994984567);
        });
    });

    describe('Автоисправление даты', function() {
        it('Auto update date', function() {
            var date = new Date(2013, 0, 32);
            expect(String(date)).toBe('Fri Feb 01 2013 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)');
            var date = new Date(2011, 1, 28);
            expect(date.setDate(date.getDate() + 2)).toBe(1299013200000);
        });
    });

    describe('Форматирование и вывод дат', function() {
        it('Метод date.toLocaleString(локаль, опции)', function () {
            var date = new Date(2014, 11, 31, 12, 30, 0);
            var options = {
                era: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            expect(String(date.toLocaleString("ru", options))).toBe('среда, 31 декабря 2014 г. от Рождества Христова, 12:30:00');
            expect(String(date.toLocaleString("en-US", options))).toBe('Wednesday, December 31, 2014 Anno Domini, 12:30:00 PM');
        });

        it('Методы вывода без локализации: toString(), toDateString(), toTimeString()', function () {
            var date = new Date(2014, 11, 31, 12, 30, 0);
            expect(date.toString()).toBe('Wed Dec 31 2014 12:30:00 GMT+0300 (Саудовская Аравия, стандартное время)');
            expect(date.toTimeString()).toBe('12:30:00 GMT+0300 (Саудовская Аравия, стандартное время)');
            expect(date.toDateString()).toBe('Wed Dec 31 2014');
        });
    });

    describe('Разбор строки', function() {
        it('Метод Date.parse(str)', function () {
            expect(Date.parse('2012-01-26T13:51:50.417Z')).toBe(1327585910417);
            expect(Date.parse('Hello World')).toBeNaN();
        });
    });
});