(function () {
    'use strict';

    angular.module('app')
        .directive('weekGrid', weekGrid);

    weekGrid.$inject = ['WeekGridService'];

    function weekGrid(weekGridService) {
        var _directive = weekGrid;

        _directive.evalHighlightedLevel = function ($scope) {
            if (!!$scope.highlightLevel) {
                $scope.highlightLevel = parseInt($scope.highlightLevel);
            }
        };

        return {
            scope: {
                days: '=',
                activities: '=',
                gridId: '@',
                /**
                 * An integrer value.
                 * highlightLevel set the level above which the grid should be hightlighted.
                 * If this is not set, then the grid will only have a standard color.
                 * If set, then cell above the highlighted level will given the 'perf-grid-highlight' css style.
                 */
                highlightLevel: '@'

            },
            replace: true,
            restrict: 'EA',

            controller: function ($scope) {
                var _this = this;

                _this.$scope = $scope;
                _this._directive = _directive;
                _this._directive.evalHighlightedLevel($scope);

                /**
                 * @param row_index the lower level for which cell must be hightlighted.
                 * @returns {boolean}
                 */
                $scope.isLevelHighlighted = function (row_index) {
                    if (!!!_this.$scope.highlightLevel)
                        return false;

                    return row_index < _this.$scope.highlightLevel;
                };

                $scope.evalCSS = function (day, index) {
                    var css = "";

                    /** Only apply the highlight if the highlightLevel is set and the row_index is less than that highlightLevel */
                    if (!!_this.$scope.highlightLevel && $scope.isLevelHighlighted(index))
                        css = "perf-grid-highlight";

                    var level = _this.getRowLevel(day, index);
                    if (level !== false)
                        css += " perf-level" + level;

                    return css;
                };

                this.getRowLevel = function (day, index) {
                    var activity = $scope.activities[day.col];

                    if (!!!activity || !!!activity[index])
                        return false;

                    var cell = activity[index];

                    return weekGridService.getActivityLevel(cell.value);
                };
            },
            template: '<div id="{{gridId}}" class="week-grid">' +
            '   <div class="wkg-time-stamp">' +
            '       <div class="wkg-am">a.m.</div>' +
            '       <div class="wkg-pm">p.m.</div>' +
            '   </div>' +
            '   <div class="wkg-container">' +
            '       <div class="wkg-title"><span class="wkg-day" ng-repeat="day in days">{{day.title}}</span></div>' +
            '       <div box-grid box-grid-id="bg{{gridId}}" hightlight-level="{{highlightLevel}}" grid-data-source="days" levels-data-source="activities"></div>' +
            '   </div>' +
            '</div>'

        };
    }
})();
