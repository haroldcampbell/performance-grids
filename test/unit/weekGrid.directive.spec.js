/* global describe, it, before, beforeEach, after, afterEach */

(function () {
    'use strict';

    describe('webGrid.directive', function () {
        var compile, elm, scope, day = 1;
        var templateWithGridId = '<div week-grid grid-id="sharGridId" days="days" activities="activities"></div>';
        var templateWithHightlightLevel = '<div week-grid grid-id="sharGridId" hightlight-level="4" days="days" activities="activities"></div>';

        beforeEach(module('app'));
        beforeEach(module('WeekGridService'));
        beforeEach(inject(function ($rootScope, $compile, WeekGridService) {

            compile = $compile;
            scope = $rootScope.$new();
            scope.days = WeekGridService.getWeekData();

            /* col = 1 is Monday */
            day = {col: 1};

            /* mock activities */
            scope.activities = {
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
            elm = compile(templateWithGridId)(scope);
            scope.$digest();
        }));

        it("should be defined", function () {
            expect(elm.isolateScope().$$childTail).toBeDefined();
        });

        it('should have "per-grid-col" div', function () {
            expect(elm.children(0).attr("class")).toContain('per-grid-col');
        });

        it('should NOT have "hightlightLevel" set', function () {
            var controller = elm.controller('weekGrid');
            expect(controller.$scope.hightlightLevel).toBeUndefined();
        });
        describe('Cells', function(){
            var controller;

            beforeEach(inject(function () {
                elm = compile(templateWithHightlightLevel)(scope);
                scope.$digest();

                controller = elm.controller('weekGrid');
            }));

            it('should have "hightlightLevel" set', function () {
                controller._directive.evalHighlightedLevel(controller.$scope);
                expect(controller.$scope.hightlightLevel).toBe(4);
            });

        });

        describe('Controller function', function () {
            var controller;

            beforeEach(inject(function () {
                controller = elm.controller('weekGrid');
            }));


            describe('getRowLevel', function () {
                it('should expect Level 4 is between 80-101%', function () {
                    var result = controller.getRowLevel(day, 1);
                    expect(result).toBe(4);
                });

                it('should expect Level 3 is between 60-79%', function () {
                    var result = controller.getRowLevel(day, 2);

                    expect(result).toBe(3);
                });

                it('should expect Level 2 is between 40-69%', function () {
                    var result = controller.getRowLevel(day, 3);

                    expect(result).toBe(2);
                });

                it('should expect Level 1 is between 20-39%', function () {
                    var result = controller.getRowLevel(day, 5);

                    expect(result).toBe(1);
                });

                it('should expect Level 0 is between 0-19%', function () {
                    var result = controller.getRowLevel(day, 6);

                    expect(result).toBe(0);
                });
            });

            describe('evalCSS', function () {

                it('should be correct for level 4', function () {
                    expect(controller.$scope.evalCSS(day, 1)).toContain('level4');
                });
                it('should be correct for level 3', function () {
                    expect(controller.$scope.evalCSS(day, 2)).toContain('level3');
                });
                it('should be correct for level 2', function () {
                    expect(controller.$scope.evalCSS(day, 3)).toContain('level2');
                });
                it('should be correct for level 1', function () {
                    expect(controller.$scope.evalCSS(day, 5)).toContain('level1');
                });
                it('should be correct for level 0', function () {
                    expect(controller.$scope.evalCSS(day, 6)).toContain('level0');
                });
            });

        });
    });
})();