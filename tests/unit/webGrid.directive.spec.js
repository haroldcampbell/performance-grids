/* global describe, it, before, beforeEach, after, afterEach */

(function () {
    'use strict';

    describe('webGrid.directive', function () {
        var elm, scope;
        var gridId = "sharGridId", day = 1;

        beforeEach(module('app'));
        beforeEach(module('WeekGridService'));
        beforeEach(inject(function ($rootScope, $compile, WeekGridService) {
            var template = '<div grid-id="' + gridId + '" week-grid days="days" activities="activities">' +
                '</div>';

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
            elm = $compile(template)(scope);
            scope.$digest();
        }));

        it("should be defined", function () {
            expect(elm.isolateScope().$$childTail).toBeDefined();
        });

        it('should have "days" div', function () {
            expect(elm.children(0).attr("class")).toBe('days');
        });

        describe('Cells', function(){
            //describe("grid")
            //dump(elm.attr);
            //
            //var element;
            //beforeEach(inject(function () {
            //    dump(elm);
            //    element = elm;
            //}));

            //it('should have "days" div', function () {
            //    dump(elm.children(0).attr("class"));
            //});

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