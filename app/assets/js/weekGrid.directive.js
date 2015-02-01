(function () {
    'use strict';

    angular.module('app')
        .directive('weekGrid', weekGrid);

    weekGrid.$inject = ['WeekGridService'];

    function weekGrid(weekGridService) {
        var _directive = weekGrid;

        _directive.evalHighlightedLevel = function($scope) {
            if (!!$scope.hightlightLevel) {
                $scope.hightlightLevel = parseInt($scope.hightlightLevel);
            }
        };

        return {
            scope: {
                days: '=',
                activities: '=',
                gridId: '@gridId',
                /**
                 * An integrer value.
                 * hightlightLevel set the level above which the grid should be hightlighted.
                 * If this is not set, then the grid will only have a standard color.
                 * If set, then cell above the highlighted level will given the 'perf-grid-highlight' css style.
                 */
                hightlightLevel: '@'

            },
            replace: true,
            restrict: 'A',

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
                    if (!!!_this.$scope.hightlightLevel)
                        return false;

                    return row_index < _this.$scope.hightlightLevel;
                };

                $scope.evalCSS = function (day, index) {
                    var css = "";

                    /** Only apply the highlight if the hightlightLevel is set and the row_index is less than that hightlightLevel */
                    if (!!_this.$scope.hightlightLevel && $scope.isLevelHighlighted(index))
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
            template: '<div id="{{gridId}}" class="perf-grid">' +
            '   <div class="per-grid-col" ng-repeat="day in days">' +
            '       <div class="per-grid-col-title">{{day.title}}</div>' +
            '       <div class="per-grid-col-rows">' +
            '           <div id="{{day.col}}_{{row}}" class="per-grid-col-row {{evalCSS(day, row)}}" ng-repeat="row in day.rows"></div>' +
            '       </div>' +
            '   </div>' +
            '</div>'

        };
    }
})();
