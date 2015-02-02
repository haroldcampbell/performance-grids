/* global describe, it, before, beforeEach, after, afterEach */

(function () {
    'use strict';

    describe('AppController', function () {

        var rootScope, scope, controller, weekMocks;

        beforeEach(module('app'));

        beforeEach(inject(function ($rootScope, $controller, WeekGridService) {


            rootScope = $rootScope;
            scope = rootScope.$new();
            //weekMocks = WeekGridService.getWeekData();

            controller = $controller('AppController', {
                $scope: scope,
                weekGridService: WeekGridService
            });
        }));


        it('should exist', function () {
            expect(controller).toBeDefined();
        });

    });


})();
