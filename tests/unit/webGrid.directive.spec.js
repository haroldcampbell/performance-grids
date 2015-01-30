/* global describe, it, before, beforeEach, after, afterEach */

(function(){
    'use strict';

    describe('webGrid.directive', function(){
        var elm, scope, service;

        beforeEach(module('app'));
        beforeEach(module('WeekGridService'));
        beforeEach(inject(function($rootScope, $compile, WeekGridService){
            var template = '<div gId="{{22}}" week-grid days="days" activities="activities">' +
                '</div>';

            scope = $rootScope.$new();
            scope.days = WeekGridService.getWeekData();
            scope.activities = WeekGridService.getActivities();

            elm = $compile(template)(scope);
            scope.$digest();
        }));

        it('should have days div', function(){
            //var result = elm[0].querySelectorAll('.days');
            //angular.element(result).hasClass('findme')
            //dump(elm);
            //expect(elm.find('div.daysx')).toBeDefined();
        });
    });
})();