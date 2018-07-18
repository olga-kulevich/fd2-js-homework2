describe('Using Patterns', function () {
    describe('Singleton', function () {
        window.MyApp = {
            userService: new UserService,
            repositoryService: new RepositoryService
        };

        function UserService() {
            var self = this,
                namePattern = /^[A-Z][a-z]*\s[A-Z][a-z]*$/,
                repositoryService = function () {
                    return window.MyApp.repositoryService;
                };

            self.create = function (id, user) {
                var result = repositoryService().find(id);

                if (result) {
                    throw new Error(`user with id:${id} already exists`);
                }

                if (myTypeOf(id) !== 'number' ||
                    myTypeOf(user) !== 'object') {
                    throw new Error('Wrong arguments');
                }

                if (myTypeOf(user.name) !== 'string') {
                    throw new Error('user.name toBe string');
                }

                if (!namePattern.test(user.name)) {
                    throw new Error('Wrong name format');
                }

                repositoryService().save(id, user);
            };

            self.get = function (id) {
                var result = repositoryService().find(id);

                if (result === undefined || result.deleteDate !== undefined) {
                    throw new Error(`User not found by id:${id}`);
                }

                return result;
            };

            self.find = function (id) {
                var result = repositoryService().find(id);

                return result;
            };

            self.findAll = function (ids) {
                var result = ids.map(function (id) {
                    return repositoryService().find(id);
                });
                return result;
            };

            self.update = function (id, user) {
                var result = repositoryService().find(id);

                if (!result) {

                    if (myTypeOf(id) !== 'number' ||
                        myTypeOf(user) !== 'object') {
                        throw new Error('Wrong arguments');
                    }

                    if (myTypeOf(user.name) !== 'string') {
                        throw new Error('user.name toBe string');
                    }

                    if (!namePattern.test(user.name)) {
                        throw new Error('Wrong name format');
                    }
                }

                repositoryService().save(id, user);
            };

            self.delete = function (id, force) {
                var result;

                if (force) {
                    result = repositoryService().delete(id);
                } else {
                    result = repositoryService().find(id);

                    if (result) {
                        result.deleteDate = new Date;
                        repositoryService().save(id, result);
                    }
                }

                if (!result) {
                    throw new Error(`User not found by id:${id}`);
                }

                return result;
            };

            function myTypeOf(value) {
                var result;

                if (value === null) {
                    result = 'null';
                } else {
                    result = typeof value;
                }
                return result;
            }
        }

        function RepositoryService() {
            var self = this,
                storage = {};

            self.find = function (id) {
                var result = storage[id];

                if (result) {
                    result = Object.assign({}, result);
                }

                return result;
            };

            self.save = function (id, data) {
                storage[id] = Object.assign({}, data);
            };

            self.delete = function (id) {
                var result = self.find(id);

                delete storage[id];

                return result;
            };
        }

        it('Function create: if field "name" does not match Pattern, then return an error', function () {
            expect(function () {MyApp.userService.create(123, {name: 'olga kulevich'})})
                .toThrowError('Wrong name format');
        });

        it('Function create: if type of arguments are not correct, then return an error', function () {
            expect(function () {MyApp.userService.create(123, 'ola')})
                .toThrowError("Wrong arguments");
        });

        it('Function create: if type of (user.name) not a "string", then return an error', function () {
            expect(function () {MyApp.userService.create(123, {name: 123})})
                .toThrowError("user.name toBe string");
        });

        it('Function create: if the object already exists, then return an error', function () {
            MyApp.userService.create(1, {name: 'Olga Kulevich'});

            expect(function () {MyApp.userService.create(1, {name: 'Olga Kulevich'})})
                .toThrowError("user with id:1 already exists");
        });

        it('Function get: if the object exists, then return data. If the object does not exist, then return an error', function () {
            MyApp.userService.create(7, {name: 'Maksim Yakusik'});

            expect(MyApp.userService.get(7)).toEqual({name: 'Maksim Yakusik'});

            expect(function () {MyApp.userService.get(20)}).toThrowError("User not found by id:20");
        });

        it('Function update: must replace record with id=1', function () {
            MyApp.userService.create(2, {name: 'Olga Kulevich'});
            MyApp.userService.update(2, {name: 'Maksim Yakusik'});

            expect(MyApp.userService.get(2)).toEqual({name: 'Maksim Yakusik'});
        });

        it('Function findAll: must return record with ids[3, 4], if it exists. Else return undefined', function () {
            MyApp.userService.create(3, {name: 'Olga Olga'});
            MyApp.userService.create(4, {name: 'Alex Alex'});

            expect(MyApp.userService.findAll([3, 4])).toEqual([{name: 'Olga Olga'}, {name: 'Alex Alex'}]);
        });

        it('Function find: must return records with id=5, if they exist. Else return undefined', function () {
            expect(MyApp.userService.find(5)).toBe(undefined);

            MyApp.userService.create(5, {name: 'Olga Kulevich'});

            expect(MyApp.userService.find(5)).toEqual({name: "Olga Kulevich"});
        });

        beforeEach(function() {
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('Function delete: if (!force) must return records with id=6 with set propety ' +
            'to deleteDate. If deleting object does not exist, then return an error', function () {

            MyApp.userService.create(6, {name: 'Alex Alex'});

            var baseTime = new Date(2013, 9, 23);
            jasmine.clock().mockDate(baseTime);

            expect(MyApp.userService.delete(6)).toEqual({name: 'Alex Alex',
                deleteDate: Date('Wed Oct 23 2013 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)')});

            expect(MyApp.userService.delete(6, true)).toEqual({name: 'Alex Alex',
                deleteDate: Date('Wed Oct 23 2013 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)')});

            expect(function () {MyApp.userService.delete(666)})
                .toThrowError("User not found by id:666");
        });

        it('Function delete: if (force) must return deleted records', function () {

            MyApp.userService.create(77, {name: 'Alex Alex'});

            expect(MyApp.userService.delete(77, true)).toEqual({name: 'Alex Alex'});

            expect(function () {MyApp.userService.get(77)}).toThrowError("User not found by id:77");
        });
    });

    describe('Inversion of Control', function () {
        describe('Constructor injection', function () {
            var repositoryService = new RepositoryService(),
                userService = new UserService(repositoryService);

            function UserService(repositoryService) {
                var self = this,
                    namePattern = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;

                self.create = function (id, user) {
                    console.log(repositoryService);
                    var result = repositoryService.find(id);

                    if (result) {
                        throw new Error(`user with id:${id} already exists`);
                    }

                    if (myTypeOf(id) !== 'number' ||
                        myTypeOf(user) !== 'object') {
                        throw new Error('Wrong arguments');
                    }

                    if (myTypeOf(user.name) !== 'string') {
                        throw new Error('user.name toBe string');
                    }

                    if (!namePattern.test(user.name)) {
                        throw new Error('Wrong name format');
                    }

                    repositoryService.save(id, user);
                };

                self.get = function (id) {
                    var result = repositoryService.find(id);

                    if (result === undefined || result.deleteDate !== undefined) {
                        throw new Error(`User not found by id:${id}`);
                    }

                    return result;
                };

                self.find = function (id) {
                    var result = repositoryService.find(id);

                    return result;
                };

                self.findAll = function (ids) {
                    var result = ids.map(function (id) {
                        return repositoryService.find(id);
                    });
                    return result;
                };

                self.update = function (id, user) {
                    var result = repositoryService.find(id);

                    if (!result) {

                        if (myTypeOf(id) !== 'number' ||
                            myTypeOf(user) !== 'object') {
                            throw new Error('Wrong arguments');
                        }

                        if (myTypeOf(user.name) !== 'string') {
                            throw new Error('user.name toBe string');
                        }

                        if (!namePattern.test(user.name)) {
                            throw new Error('Wrong name format');
                        }
                    }

                    repositoryService.save(id, user);
                };

                self.delete = function (id, force) {
                    var result;

                    if (force) {
                        result = repositoryService.delete(id);
                    } else {
                        result = repositoryService.find(id);

                        if (result) {
                            result.deleteDate = new Date;
                            repositoryService.save(id, result);
                        }
                    }

                    if (!result) {
                        throw new Error(`User not found by id:${id}`);
                    }

                    return result;
                };

                function myTypeOf(value) {
                    var result;

                    if (value === null) {
                        result = 'null';
                    } else {
                        result = typeof value;
                    }
                    return result;
                }
            }

            function RepositoryService() {
                var self = this,
                    storage = {};

                self.find = function (id) {
                    var result = storage[id];

                    if (result) {
                        result = Object.assign({}, result);
                    }

                    return result;
                };

                self.save = function (id, data) {
                    storage[id] = Object.assign({}, data);
                };

                self.delete = function (id) {
                    var result = self.find(id);

                    delete storage[id];

                    return result;
                };
            }

            it('Function create: if field "name" does not match Pattern, then return an error', function () {
                expect(function () {userService.create(123, {name: 'olga kulevich'})})
                    .toThrowError('Wrong name format');
            });

            it('Function create: if type of arguments are not correct, then return an error', function () {
                expect(function () {userService.create(123, 'ola')})
                    .toThrowError("Wrong arguments");
            });

            it('Function create: if type of (user.name) not a "string", then return an error', function () {
                expect(function () {userService.create(123, {name: 123})})
                    .toThrowError("user.name toBe string");
            });

            it('Function create: if the object already exists, then return an error', function () {
                userService.create(1, {name: 'Olga Kulevich'});

                expect(function () {userService.create(1, {name: 'Olga Kulevich'})})
                    .toThrowError("user with id:1 already exists");
            });

            it('Function get: if the object exists, then return data. If the object does not exist, then return an error', function () {
                userService.create(7, {name: 'Maksim Yakusik'});

                expect(userService.get(7)).toEqual({name: 'Maksim Yakusik'});

                expect(function () {userService.get(20)}).toThrowError("User not found by id:20");
            });

            it('Function update: must replace record with id=1', function () {
                userService.create(2, {name: 'Olga Kulevich'});
                userService.update(2, {name: 'Maksim Yakusik'});

                expect(userService.get(2)).toEqual({name: 'Maksim Yakusik'});
            });

            it('Function findAll: must return record with ids[3, 4], if it exists. Else return undefined', function () {
                userService.create(3, {name: 'Olga Olga'});
                userService.create(4, {name: 'Alex Alex'});

                expect(userService.findAll([3, 4])).toEqual([{name: 'Olga Olga'}, {name: 'Alex Alex'}]);
            });

            it('Function find: must return records with id=5, if they exist. Else return undefined', function () {
                expect(userService.find(5)).toBe(undefined);

                userService.create(5, {name: 'Olga Kulevich'});

                expect(userService.find(5)).toEqual({name: "Olga Kulevich"});
            });

            beforeEach(function() {
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });

            it('Function delete: if (!force) must return records with id=6 with set propety ' +
                'to deleteDate. If deleting object does not exist, then return an error', function () {

                userService.create(6, {name: 'Alex Alex'});

                var baseTime = new Date(2013, 9, 23);
                jasmine.clock().mockDate(baseTime);

                expect(userService.delete(6)).toEqual({name: 'Alex Alex',
                    deleteDate: Date('Wed Oct 23 2013 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)')});

                expect(userService.delete(6, true)).toEqual({name: 'Alex Alex',
                    deleteDate: Date('Wed Oct 23 2013 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)')});

                expect(function () {userService.delete(666)})
                    .toThrowError("User not found by id:666");
            });

            it('Function delete: if (force) must return deleted records', function () {

                userService.create(77, {name: 'Alex Alex'});

                expect(userService.delete(77, true)).toEqual({name: 'Alex Alex'});

                expect(function () {userService.get(77)}).toThrowError("User not found by id:77");
            });
        });

        describe('Setter injection', function () {
            var userService = new UserService(),
                repositoryService = new RepositoryService();

            userService.setRepositoryService(repositoryService);

            function UserService() {
                var self = this,
                    namePattern = /^[A-Z][a-z]*\s[A-Z][a-z]*$/,
                    repositoryService;

                self.setRepositoryService = function (_repositoryService) {
                    repositoryService = _repositoryService;
                };

                self.create = function (id, user) {
                    console.log(repositoryService);
                    var result = repositoryService.find(id);

                    if (result) {
                        throw new Error(`user with id:${id} already exists`);
                    }

                    if (myTypeOf(id) !== 'number' ||
                        myTypeOf(user) !== 'object') {
                        throw new Error('Wrong arguments');
                    }

                    if (myTypeOf(user.name) !== 'string') {
                        throw new Error('user.name toBe string');
                    }

                    if (!namePattern.test(user.name)) {
                        throw new Error('Wrong name format');
                    }

                    repositoryService.save(id, user);
                };

                self.get = function (id) {
                    var result = repositoryService.find(id);

                    if (result === undefined || result.deleteDate !== undefined) {
                        throw new Error(`User not found by id:${id}`);
                    }

                    return result;
                };

                self.find = function (id) {
                    var result = repositoryService.find(id);

                    return result;
                };

                self.findAll = function (ids) {
                    var result = ids.map(function (id) {
                        return repositoryService.find(id);
                    });
                    return result;
                };

                self.update = function (id, user) {
                    var result = repositoryService.find(id);

                    if (!result) {

                        if (myTypeOf(id) !== 'number' ||
                            myTypeOf(user) !== 'object') {
                            throw new Error('Wrong arguments');
                        }

                        if (myTypeOf(user.name) !== 'string') {
                            throw new Error('user.name toBe string');
                        }

                        if (!namePattern.test(user.name)) {
                            throw new Error('Wrong name format');
                        }
                    }

                    repositoryService.save(id, user);
                };

                self.delete = function (id, force) {
                    var result;

                    if (force) {
                        result = repositoryService.delete(id);
                    } else {
                        result = repositoryService.find(id);

                        if (result) {
                            result.deleteDate = new Date;
                            repositoryService.save(id, result);
                        }
                    }

                    if (!result) {
                        throw new Error(`User not found by id:${id}`);
                    }

                    return result;
                };

                function myTypeOf(value) {
                    var result;

                    if (value === null) {
                        result = 'null';
                    } else {
                        result = typeof value;
                    }
                    return result;
                }
            }

            function RepositoryService() {
                var self = this,
                    storage = {};

                self.find = function (id) {
                    var result = storage[id];

                    if (result) {
                        result = Object.assign({}, result);
                    }

                    return result;
                };

                self.save = function (id, data) {
                    storage[id] = Object.assign({}, data);
                };

                self.delete = function (id) {
                    var result = self.find(id);

                    delete storage[id];

                    return result;
                };
            }

            it('Function create: if field "name" does not match Pattern, then return an error', function () {
                expect(function () {userService.create(123, {name: 'olga kulevich'})})
                    .toThrowError('Wrong name format');
            });

            it('Function create: if type of arguments are not correct, then return an error', function () {
                expect(function () {userService.create(123, 'ola')})
                    .toThrowError("Wrong arguments");
            });

            it('Function create: if type of (user.name) not a "string", then return an error', function () {
                expect(function () {userService.create(123, {name: 123})})
                    .toThrowError("user.name toBe string");
            });

            it('Function create: if the object already exists, then return an error', function () {
                userService.create(1, {name: 'Olga Kulevich'});

                expect(function () {userService.create(1, {name: 'Olga Kulevich'})})
                    .toThrowError("user with id:1 already exists");
            });

            it('Function get: if the object exists, then return data. If the object does not exist, then return an error', function () {
                userService.create(7, {name: 'Maksim Yakusik'});

                expect(userService.get(7)).toEqual({name: 'Maksim Yakusik'});

                expect(function () {userService.get(20)}).toThrowError("User not found by id:20");
            });

            it('Function update: must replace record with id=1', function () {
                userService.create(2, {name: 'Olga Kulevich'});
                userService.update(2, {name: 'Maksim Yakusik'});

                expect(userService.get(2)).toEqual({name: 'Maksim Yakusik'});
            });

            it('Function findAll: must return record with ids[3, 4], if it exists. Else return undefined', function () {
                userService.create(3, {name: 'Olga Olga'});
                userService.create(4, {name: 'Alex Alex'});

                expect(userService.findAll([3, 4])).toEqual([{name: 'Olga Olga'}, {name: 'Alex Alex'}]);
            });

            it('Function find: must return records with id=5, if they exist. Else return undefined', function () {
                expect(userService.find(5)).toBe(undefined);

                userService.create(5, {name: 'Olga Kulevich'});

                expect(userService.find(5)).toEqual({name: "Olga Kulevich"});
            });

            beforeEach(function() {
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });

            it('Function delete: if (!force) must return records with id=6 with set propety ' +
                'to deleteDate. If deleting object does not exist, then return an error', function () {

                userService.create(6, {name: 'Alex Alex'});

                var baseTime = new Date(2013, 9, 23);
                jasmine.clock().mockDate(baseTime);

                expect(userService.delete(6)).toEqual({name: 'Alex Alex',
                    deleteDate: Date('Wed Oct 23 2013 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)')});

                expect(userService.delete(6, true)).toEqual({name: 'Alex Alex',
                    deleteDate: Date('Wed Oct 23 2013 00:00:00 GMT+0300 (Саудовская Аравия, стандартное время)')});

                expect(function () {userService.delete(666)})
                    .toThrowError("User not found by id:666");
            });

            it('Function delete: if (force) must return deleted records', function () {

                userService.create(77, {name: 'Alex Alex'});

                expect(userService.delete(77, true)).toEqual({name: 'Alex Alex'});

                expect(function () {userService.get(77)}).toThrowError("User not found by id:77");
            });
        });
    });
});

