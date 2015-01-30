/* global describe, it, before, beforeEach, after, afterEach */

(function () {
    'use strict';

    describe('AppController', function () {

        var rootScope, scope, controller, weekMocks, day;

        beforeEach(module('app'));

        beforeEach(inject(function ($rootScope, $controller, WeekGridService) {


            rootScope = $rootScope;
            scope = rootScope.$new();
            weekMocks = WeekGridService.getWeekData();

            controller = $controller('AppController', {
                $scope: scope,
                weekGridService: WeekGridService
            });

            /* col = 1 is Monday */
            day = {col: 1};
            /* mock activities */
            scope.activities = {
                /* col: {...} */
                1: [
                    /* row: {...} */
                    {value: 83}, /* Level 4 */
                    {value: 63}, /* Level 3 */
                    {value: 41}, /* Level 2 */
                    {value: 28}, /* Level 1 */
                    {value: 18}  /* Level 0 */
                ]
            };
        }));


        it('should exist', function () {
            expect(controller).toBeDefined();
        });

    });
})();
