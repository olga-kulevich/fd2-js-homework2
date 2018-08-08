describe('Prototype style', function () {
    describe("Prototype object's", function () {
        it('Property __proto__', function () {
            var animal = {
                eats: true
            };
            var rabbit = {
                jumps: true
            };
            rabbit.__proto__ = animal;

            expect(rabbit.jumps).toBe(true);
            expect(rabbit.eats).toBe(true);

            rabbit.eats = false;

            expect(rabbit.eats).toBe(false);
        });

        it('Method hasOwnProperty', function () {
            var animal = {
                eats: true
            };
            var rabbit = {
                jumps: true,
                __proto__: animal
            };

            spy = jasmine.createSpy('spy');

            for (var key in rabbit) {
                spy(key);
            }
            expect(spy).toHaveBeenCalledWith('jumps');
            expect(spy).toHaveBeenCalledWith('eats');

            expect(rabbit.hasOwnProperty('jumps')).toBe(true);
            expect(rabbit.hasOwnProperty('eats')).toBe(false);

            for (var key in rabbit) {
                if (!rabbit.hasOwnProperty(key)) continue;
                spy(key);
            }

            expect(spy).toHaveBeenCalledWith('jumps');
        });

        it(' Object.create()', function () {
            var data = Object.create(null);
            data.name = 'Olga';

            expect(data.name).toBe('Olga');
            expect(data.toString).toBe(undefined);
        });

        it('Object.getPrototypeOf(obj)', function () {
            var animal = {
                eats: true
            };
            var rabbit = {
                jumps: true,
                __proto__: animal
            };
            expect(Object.getPrototypeOf(rabbit)).toBe(animal);
        });

        it('Object.setPrototypeOf(obj, proto)', function () {
            var animal = {
                eats: true
            };
            var rabbit = {
                jumps: true,
            };
            Object.setPrototypeOf(rabbit, animal);
            expect(Object.getPrototypeOf(rabbit)).toBe(animal);
        });

        it('Object.create(proto, descriptors)', function () {
            var animal = {};
            var obj = Object.create(animal);

            expect(Object.getPrototypeOf(obj)).toBe(animal);
        });

        it("Property F.prototype", function () {
            var animal = {
                eats: true
            };

            function Rabbit(name) {
                this.name = name;
            }

            Rabbit.prototype = animal;
            var rabbit = new Rabbit("Кроль");

            expect(rabbit.eats).toBe(true);
        });

        it("Property constructor", function () {
            function Rabbit() {};

            expect(Object.getOwnPropertyNames(Rabbit.prototype)).toEqual(['constructor']);
            expect(Rabbit.prototype.constructor).toEqual(Rabbit);
        });

        it("Emulation Object.create for IE8-", function () {
        function inherit(proto) {
            function F() {}
            F.prototype = proto;
            var object = new F;
            return object;
        }

        var animal = {eats: true};
        var rabbit = inherit(animal);

        expect(rabbit.eats).toBe(true);
        });
    });

    describe("Classes", function () {
        it('Class through prototype', function () {
            function Animal(name) {
                this.name = name;
                this.speed = 0;
            }

            Animal.prototype.run = function(speed) {
                this.speed += speed;
                return speed;
            };

            Animal.prototype.stop = function() {
                this.speed = 0;
                return this.name + ' стоит';
            };

            var animal = new Animal('Зверь');

            expect(animal.speed).toBe(0);
            expect(animal.run(5)).toBe(5);
            expect(animal.stop(5)).toBe('Зверь стоит');
        });

        it('Class inheritance', function () {
            var Class = function () {
                this.className = 'Class';
            }
            Class.prototype.method = function () {
                return 'method of ' +  this.className;
            }

            var ClassSub = function () {
                this.className = 'ClassSub';
            }
            ClassSub.prototype = new Class;

            var objSub = new ClassSub();
            expect(objSub.method()).toBe('method of ClassSub');
        });

        it('Class check: "instanceof"', function () {
            function Rabbit() {}

            var rabbit = new Rabbit();

            expect(rabbit instanceof Rabbit).toBe(true);
            var arr = [];

            expect(arr instanceof Array).toBe(true);
            expect(arr instanceof Object).toBe(true);
        });

        it('Mixin', function () {

            var sayHiMixin = {
                sayHi: function() {
                    return "Привет " + this.name;
                },
                sayBye: function() {
                    return "Пока " + this.name;
                }
            };

            function User(name) {
                this.name = name;
            }

            for(var key in sayHiMixin) User.prototype[key] = sayHiMixin[key];

            expect(new User("Вася").sayHi()).toBe('Привет Вася');
        });
    });
});