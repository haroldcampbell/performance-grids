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
                gridId: '@gridId'
            },
            restrict: 'A',
            controller: function ($scope) {
                var _this = this;

                _this.$scope = $scope;

                $scope.is_am = function (hour) {
                    return hour < 4;
                };

                $scope.evalCSS = function (day, index) {
                    var css = "";

                    if ($scope.is_am(index))
                        css = "day_am";

                    var level = _this.getRowLevel(day, index);
                    if (level !== false)
                        css += " level" + level;

                    return css;
                };

                this.getRowLevel = function(day, index) {
                    var activity = $scope.activities[day.col];

                    if (!!!activity || !!!activity[index])
                        return false;

                    var cell = activity[index];

                    return weekGridService.getActivityLevel(cell.value);
                }
            },
            template: '<div id="{{gridId}}" class="days">' +
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
