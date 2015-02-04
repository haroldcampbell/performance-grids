/* global describe, it, before, beforeEach, after, afterEach */
(function () {
    'use strict';

    describe('boxGrid.directive', function () {
        var compile, scope, elm;
        var template = '<box-grid grid-data-source="gridDataSource" levels-data-source="levelsDataSource"></box-grid>';
        var templateWithHightlightLevel = '<box-grid grid-id="sharGridId" hightlight-level="4" grid-data-source="gridDataSource" levels-data-source="levelsDataSource"></box-grid>';
        var data = {col: 1};

        beforeEach(module('app'));
        beforeEach(inject(function ($rootScope, $compile) {
            compile = $compile;
            scope = $rootScope.$new();

            scope.gridDataSource = [
                {col: 0, title: 'S', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 1, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 2, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 3, title: 'W', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 4, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 5, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 6, title: 'S', rows: [0, 1, 2, 3, 4, 5, 6, 7]}
            ];

            scope.levelsDataSource = {
                /* col: {...} */
                1: {
                    /* rows */
                    1: {value: 83}, /* Level 4 */
                    2: {value: 63}, /* Level 3 */
                    3: {value: 41}, /* Level 2 */
                    5: {value: 28}, /* Level 1 */
                    6: {value: 18}  /* Level 0 */
                }
            };

            elm = compile(template)(scope);
            scope.$digest();
        }));

        it("should be defined", function () {
            expect(elm.isolateScope().$$childTail).toBeDefined();
        });

        it("should have box-grid class on div", function () {
            expect(elm.attr("class")).toContain('box-grid');
        });

        it('should NOT have "hightlightLevel" set', function () {
            var controller = elm.controller('boxGrid');
            expect(controller.$scope.hightlightLevel).toBeUndefined();
        });

        describe('Highlighted Cells', function () {
            var controller, index;

            beforeEach(inject(function () {
                elm = compile(templateWithHightlightLevel)(scope);
                scope.$digest();

                controller = elm.controller('boxGrid');
                controller._directive.evalHighlightedLevel(controller.$scope);
            }));

            it('should have hightlightLevel wired in controller', function () {
                expect(controller.$scope.hightlightLevel).toBe(4);
            });

            for (index = 0; index < 4; index++) {
                (function (_index) {
                    it('should highlight cells at index/row ' + _index, function () {
                        expect(controller.$scope.isLevelHighlighted(_index)).toBeTruthy();
                        expect(controller.$scope.evalCSS(data, _index)).toContain('bg-col-row-highlight');
                    });
                })(index);
            }

            for (index = 4; index < 8; index++) {
                (function (_index) {
                    it('should NOT highlight cells at index/row ' + _index, function () {
                        expect(controller.$scope.isLevelHighlighted(_index)).toBeFalsy();
                        expect(controller.$scope.evalCSS(data, _index)).not.toContain('bg-col-row-highlight');
                    });
                })(index);
            }
        });

        describe('Controller function', function () {
            var controller;

            beforeEach(inject(function () {
                controller = elm.controller('boxGrid');
            }));

            it("should be gridDataSource wired", function () {
                expect(controller.$scope.gridDataSource).toBeDefined();
            });

            it("should be levelsDataSource wired", function () {
                expect(controller.$scope.levelsDataSource).toBeDefined();
            });

            describe('Row Level', function () {
                it('should expect Level 4 is between 80-101%', function () {
                    var result = controller.getRowLevel(data, 1);
                    expect(result).toBe(4);
                });

                it('should expect Level 3 is between 60-79%', function () {
                    var result = controller.getRowLevel(data, 2);

                    expect(result).toBe(3);
                });

                it('should expect Level 2 is between 40-69%', function () {
                    var result = controller.getRowLevel(data, 3);

                    expect(result).toBe(2);
                });

                it('should expect Level 1 is between 20-39%', function () {
                    var result = controller.getRowLevel(data, 5);

                    expect(result).toBe(1);
                });

                it('should expect Level 0 is between 0-19%', function () {
                    var result = controller.getRowLevel(data, 6);

                    expect(result).toBe(0);
                });
            });

            describe('CSS Eval', function () {
                it('should be correct for level 4', function () {
                    expect(controller.$scope.evalCSS(data, 1)).toContain('bg-perf-level4');
                });
                it('should be correct for level 3', function () {
                    expect(controller.$scope.evalCSS(data, 2)).toContain('bg-perf-level3');
                });
                it('should be correct for level 2', function () {
                    expect(controller.$scope.evalCSS(data, 3)).toContain('bg-perf-level2');
                });
                it('should be correct for level 1', function () {
                    expect(controller.$scope.evalCSS(data, 5)).toContain('bg-perf-level1');
                });
                it('should be correct for level 0', function () {
                    expect(controller.$scope.evalCSS(data, 6)).toContain('bg-perf-level0');
                });
            });

        });

    });

})();