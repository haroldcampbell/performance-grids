/* global describe, it, before, beforeEach, after, afterEach */

(function () {
    'use strict';

    describe('webGrid.directive', function () {
        var compile, elm, scope, day = 1;
        var templateWithGridId = '<week-grid grid-id="sharGridId" days="days" activities="activities"></week-grid>';

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

        //it('should have "per-grid-col" div', function () {
        //    expect(elm.children(0).attr("class")).toContain('per-grid-col');
        //});

        it('should NOT have "hightlightLevel" set', function () {
            var controller = elm.controller('weekGrid');
            expect(controller.$scope.hightlightLevel).toBeUndefined();
        });

    });
})();