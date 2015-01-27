/* global describe, it, before, beforeEach, after, afterEach */

(function() {
    'use strict';

    describe('AppController', function() {

        var rootScope, scope, controller, weekMocks;

        beforeEach(module('app'));
        beforeEach(inject(function($rootScope, $controller){
            rootScope = $rootScope;
            scope = rootScope.$new();
            controller = $controller('AppController', {
                $scope: scope
            });

            weekMocks = [
                {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: 'W', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]}
            ];
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
