(function () {
    'use strict';

    angular.module('app')
        .directive('boxGrid', boxGrid);

    //weekGrid.$inject = ['WeekGridService'];

    function boxGrid() {
        var _directive = boxGrid;

        _directive.evalHighlightedLevel = function($scope) {
            if (!!$scope.hightlightLevel) {
                $scope.hightlightLevel = parseInt($scope.hightlightLevel);
            }
        };
        /**
         * lookup used to identify the levels with their upper and lower bounds.
         * The bounds are in percent
         */
        _directive.levels = {
            4: {lower: 80, upper: 101},
            3: {lower: 60, upper: 79},
            2: {lower: 40, upper: 59},
            1: {lower: 20, upper: 39},
            0: {lower: 0, upper: 19}
        };

        /**
         * Generic function used to test if a value is within a particular level
         * @param level A value between 0 - 4. Levels outside of 0 - 4 result in an exception
         * @param value A percentage being tested.
         * @returns {boolean} True or False.
         */
        _directive.isLevel = function (level, value) {
            if (level < 0 || level > 4) {
                throw "Invalid level: '" + level + "'. Valid levels are 0 - 4.";
            }
            return _directive.levels[level].lower <= value && value <= _directive.levels[level].upper;
        };

        _directive.getLevel = function(value) {
            if (_directive.isLevel(4, value))
                return 4;

            if (_directive.isLevel(3, value))
                return 3;

            if (_directive.isLevel(2, value))
                return 2;

            if (_directive.isLevel(1, value))
                return 1;

            if (_directive.isLevel(0, value))
                return 0;

            return -1;
        };

        return {
            scope: {
                gridDataSource: '=',
                levelsDataSource: '=',
                boxGridId: '@',
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

                $scope.evalCSS = function (data, index) {
                    var css = "";

                    /** Only apply the highlight if the hightlightLevel is set and the row_index is less than that hightlightLevel */
                    if (!!_this.$scope.hightlightLevel && $scope.isLevelHighlighted(index))
                        css = "perf-grid-highlight";

                    var level = _this.getRowLevel(data, index);
                    if (level !== false)
                        css += " perf-level" + level;

                    return css;
                };

                this.getRowLevel = function (data, index) {
                    var levelData = $scope.levelsDataSource[data.col];

                    if (!!!levelData || !!!levelData[index])
                        return false;

                    var cell = levelData[index];

                    return _directive.getLevel(cell.value);
                };
            },
            template: '<div id="{{boxGridId}}" class="perf-grid">' +
            '   <div class="per-grid-col" ng-repeat="data in gridDataSource">' +
            '       <div class="per-grid-col-rows">' +
            '           <div id="{{data.col}}_{{row}}" class="per-grid-col-row {{evalCSS(data, row)}}" ng-repeat="row in data.rows"></div>' +
            '       </div>' +
            '   </div>' +
            '</div>'

        };
    }
})();
