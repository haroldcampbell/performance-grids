/* global describe, it, before, beforeEach, after, afterEach */
(function () {
    'use strict';

    describe('WeekGridService', function () {
        var service;

        beforeEach(module('WeekGridService'));
        beforeEach(inject(function (WeekGridService) {
            service = WeekGridService;
        }));

        it('it should exist', function () {
            expect(service).toBeDefined();
        });

        describe('Level tests', function () {
            var activities;

            beforeEach(inject(function () {
                activities = service.getActivities();

                service.execIsLevel = function (level, value) {
                    return service.context.isLevel(level, value);
                };
            }));

            it('it should have activities', function () {
                expect(activities).toBeDefined();
            });

            it('getActivityLevel(...) should be accessible', function () {
                expect(service.getActivityLevel).toBeDefined();
            });

            it('isLevel(...) should be correct for level 4', function () {

                expect(service.execIsLevel(4, 100)).toBeTruthy();
                expect(service.execIsLevel(4, 80)).toBeTruthy();
            });

            it('isLevel(...) should be correct for level 3', function () {
                expect(service.execIsLevel(3, 79)).toBeTruthy();
                expect(service.execIsLevel(3, 60)).toBeTruthy();
            });

            it('isLevel(...) should be correct for level 2', function () {
                expect(service.execIsLevel(2, 59)).toBeTruthy();
                expect(service.execIsLevel(2, 40)).toBeTruthy();
            });

            it('isLevel(...) should be correct for level 1', function () {
                expect(service.execIsLevel(1, 39)).toBeTruthy();
                expect(service.execIsLevel(1, 20)).toBeTruthy();
            });

            it('isLevel(...) should be correct for level 0', function () {
                expect(service.execIsLevel(0, 19)).toBeTruthy();
                expect(service.execIsLevel(0, 0)).toBeTruthy();
            });

            for (var level = 0; level <= 4; level++) {
                var levelMessage = level + ' should be correct';

                it('getActivityLevel should be correct between values ' + levelMessage, function(){
                    var result = service.getActivityLevel(level*20 - 1);
                    expect(result != -1).toBeTruthy();
                });
            }
        });
    });
})();