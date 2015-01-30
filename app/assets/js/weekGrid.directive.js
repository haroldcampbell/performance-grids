(function () {
    'use strict';

    angular.module('app')
        .directive('weekGrid', weekGrid);

    weekGrid.$inject = ['WeekGridService'];

    function weekGrid(weekGridService) {
        return {
            scope: {
                days: '=',
                activities: '=',
            },
            restrict: 'A',
            controller: function($scope) {

                $scope.is_am = function (hour) {
                    return hour < 4;
                };

                $scope.evalCSS = function (day, index) {
                    var css = "";

                    if ($scope.is_am(index))
                        css = "day_am";

                    var level = getRowLevel(day, index);
                    css += " level"+level;

                    return css;
                };

                function getRowLevel(day, index) {
                    var activity = $scope.activities[day.col];

                    if (!!!activity || !!!activity[index])
                        return false;

                    var cell = activity[index];

                    return weekGridService.getActivityLevel(cell.value);
                }
            },
            template: '<div class="days">' +
            '   <div class="day" ng-repeat="day in days">' +
            '       <div class="dow">{{day.title}}</div>' +
            '       <div class="hours">' +
            '           <div id="{{day.col}}_{{row}}" class="hour {{evalCSS(day, row)}}" ng-repeat="row in day.rows"></div>' +
            '       </div>' +
            '   </div>' +
            '</div>'

        };
    }
})();
