describe('String', function () {

    it('Creat string', function () {
        expect(typeof "newString").toBe('string');

        expect(typeof 'newString').toBe('string');
    });

    it('Экранирование спец. символов', function () {
        expect("Hello \"Olga\"").toBe('Hello "Olga"');
        expect('Hello I\'m Olga').toBe("Hello I\'m Olga");
        expect("\a").toBe("a");
    });

    describe('Методы и свойства', function () {

        it('Определяем длину строки. Св-во Length', function () {
            var str = 'Olga\\\n';

            expect(str.length).toBe(6);
        });

        it('Доступ к символам через метод charAT и []', function () {
            var str = 'My name is Olga';

            expect(str.charAt(2)).toBe(' ');
            expect(str[2]).toBe(' ');

            str = '';

            expect(str.charAt(0)).toBe('');
            expect(str[0]).not.toBeDefined();
        });
    });

    describe('Изменение строки', function () {
        it('Присваиваем переменной вместо старой строки новую', function () {
            var str = 'Hello World';
            expect(str = str[0] + str[4]).toBe('Ho');
        });

        it('Смена регистра. Метод toLowerCase()', function () {
            var str = 'Hello World';
            expect(str.toLowerCase()).toBe('hello world');
        });

        it('Смена регистра. Метод toUpperCase()', function () {
            var str = 'Hello World';
            expect(str.toUpperCase()).toBe('HELLO WORLD');
        });

        it('Поиск подстроки. Метод indexOf()', function () {
            var str = 'Hello World';
            expect(str.indexOf('Hello')).toBe(0);
            expect(str.indexOf('World')).toBe(6);
            expect(str.indexOf('Helena')).toBe(-1);
            expect(str.indexOf('l',6)).toBe(9);
            expect(str.indexOf('l',30)).toBe(-1);
            expect(str.indexOf('l','a')).toBe(2);
        });

        it('Поиск подстроки. Метод indexOf() и побитовый оператор "~"', function () {
            var str = 'Hello World';
            expect(~str.indexOf('Hello')).toBeTruthy();
            expect(~str.indexOf('ololo')).toBeFalsy();
        });

        it('Поиск подстроки. Метод lastIndexOf()', function () {
            var str = 'Hello World';
            expect(str.lastIndexOf('Hello')).toBe(0);
            expect(str.lastIndexOf('World')).toBe(6);
            expect(str.lastIndexOf('Helena')).toBe(-1);
            expect(str.lastIndexOf('l',6)).toBe(3);
            expect(str.lastIndexOf('l',0)).toBe(-1);
        });

        it('Взятие подстроки: substring, substr, slice', function () {
            var str = 'Hello World';
            expect(str.substring(0,1)).toBe('H');
            expect(str.substring(0)).toBe('Hello World');
            expect(str.substring(-2)).toBe('Hello World');
            expect(str.substring(5,-2)).toBe('Hello');

            expect(str.substr(0,5)).toBe('Hello');
            expect(str.substr(0)).toBe('Hello World');

            expect(str.slice(0,5)).toBe('Hello');
            expect(str.slice(0)).toBe('Hello World');
            expect(str.slice(-2)).toBe('ld');
            expect(str.slice(6,-2)).toBe('Wor');

            expect(str.substring(0)).toEqual(str.substr(0));
            expect(str.substring(0)).toEqual(str.slice(0));
            expect(str.slice(0,5)).toEqual(str.substr(0,5));
            expect(str.slice(0,-5)).not.toEqual(str.substr(0,-5));
        });
    });

    describe('Кодировка Юникод. Сравнение строк', function () {
        it('Методы String.fromCharCode() и str.charCodeAt()', function () {
            expect('ё' > 'я').toBeTruthy();
            expect('a' > 'Z').toBeTruthy();

            expect(String.fromCharCode(1072)).toEqual('а');
            expect('айсберг'.charCodeAt(0)).toEqual(1072);
        });

        it('Посимвольное сравнение строк', function () {
            expect('Olala' > 'Ola').toBeTruthy();
            expect('Ola' > 'Olga').toBeFalsy();
        });

        it('Сравнение чисел в виде строк', function () {
            expect('2' > '14').toBeTruthy();
            expect(2 > '12').toBeFalsy();
        });

        it('Правильное сравнение. Метод str1.localeCompare(str2)', function () {
            var str = 'Ёлки';
            expect(str.localeCompare('Яблони')).toBe(-1);
            expect(str.localeCompare('Грущи')).toBe(1);
            expect(str.localeCompare('Ёлки')).toBe(0);
        });
    });
});