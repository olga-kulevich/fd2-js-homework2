describe('MatrixUtil', function () {
    describe('create', function () {
        it('simple', function () {
            var result = MatrixUtil.create(2, 2);

            expect(result).toEqual([
                [undefined, undefined],
                [undefined, undefined]
            ]);
        });

        it('with one argument', function () {
            var result = MatrixUtil.create(3);

            expect(result).toEqual([
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
                [undefined, undefined, undefined]
            ]);
        });

        it('with a default value', function () {
            var result = MatrixUtil.create(3, 3, true);

            expect(result).toEqual([
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ]);
        });
    });

    it('toString', function () {
        var toStringForMatrixBooleanValue = MatrixUtil.toString(function (item) {
                return item ? 'x' : 'o';
            }),
            matrix = MatrixUtil.create(2, 2, true);

        expect(toStringForMatrixBooleanValue(matrix)).toEqual(
            'xx\n' +
            'xx'
        );

        matrix[0][0] = false;
        matrix[1][1] = false;

        expect(toStringForMatrixBooleanValue(matrix)).toEqual(
            'ox\n' +
            'xo'
        );
    });

    describe('setValueForSector', function () {
        it('set for all, left and top part', function () {
            var matrix = MatrixUtil.create(3, 3, true),
                setValueForMyMatrix = MatrixUtil.setValueForSector(matrix),
                setValueForAll = setValueForMyMatrix(0, 0, 2, 2),
                setValueForLeftPart = setValueForMyMatrix(0, 0, 2, 0);
                setValueForTopPart = setValueForMyMatrix(0, 0, 0, 2);

                setValueForAll(false);

                expect(matrix).toEqual([
                    [false, false, false],
                    [false, false, false],
                    [false, false, false]
                ]);

                setValueForLeftPart(true);

                expect(matrix).toEqual([
                    [true, false, false],
                    [true, false, false],
                    [true, false, false]
                ]);

                setValueForTopPart(true);

                expect(matrix).toEqual([
                    [true, true,  true],
                    [true, false, false],
                    [true, false, false]
                ]);
        });
    });
});
