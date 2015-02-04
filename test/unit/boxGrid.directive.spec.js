/* global describe, it, before, beforeEach, after, afterEach */
(function () {
    'use strict';

    describe('boxGrid.directive', function(){
        var compile, scope, elm;
        var template = '<div box-grid></div>';

        beforeEach(module('app'));
        beforeEach(inject(function($rootScope, $compile){
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

        it("should have perf-grid class on div", function () {
            expect(elm.attr("class")).toContain('perf-grid');
        });

        it('should NOT have "hightlightLevel" set', function () {
            var controller = elm.controller('boxGrid');
            expect(controller.$scope.hightlightLevel).toBeUndefined();
        });
    });

})();