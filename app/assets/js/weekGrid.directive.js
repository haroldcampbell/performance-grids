(function () {
    'use strict';

    angular.module('app')
        .directive('weekGrid', weekGrid);

    function weekGrid() {

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
                this.$scope = $scope;
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
