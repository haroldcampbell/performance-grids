/* global describe, it, before, beforeEach, after, afterEach */

(function() {
    'use strict';

    describe('AppController', function() {

        var rootScope, scope, controller, weekMocks;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller, WeekGridService){
            rootScope = $rootScope;
            scope = rootScope.$new();
            controller = $controller('AppController', {
                $scope: scope,
                weekGridService: WeekGridService
            });

            weekMocks = WeekGridService.getWeekData();
        }));


        it('should exist', function() {
           expect(controller).toBeDefined();
        });

        it('should set am times correctly', function() {
            expect(controller.is_am(2)).toBeTruthy();
            expect(controller.is_am(4)).toBeFalsy();
        });
    });
})();
