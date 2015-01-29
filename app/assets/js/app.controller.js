(function () {
    'use strict';

    angular.module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', 'WeekGridService'];

    function AppController($scope, weekGridService) {
        var vm = this;
        $scope.name = 'harold';
        $scope.vm = vm;

        $scope.days = weekGridService.getWeekData();
        $scope.activities = weekGridService.getActivities();

        vm.is_am = function (hour) {
            return hour < 4;
        };

        function getRow(day, row, low_value, upper_value) {
            var activity = $scope.activities[day.col];

            if (!!!activity || !!!activity[row])
                return false;

            var cell = activity[row];

            //if(day.col == 1 && row ==1) {
            //    console.log("1_1: " + cell.value + "["+low_value+"]["+upper_value+"]"+ " exp: " + (cell.value > low_value && cell.value <= upper_value));
            //}
            return low_value < cell.value && cell.value <= upper_value;
        }

        vm.is_level_4 = function (day, row) {
            return getRow(day, row, 80.0, 100);
        };
        vm.is_level_3 = function (day, row) {
            return getRow(day, row, 60.0, 80);
        };
        vm.is_level_2 = function (day, row) {
            return getRow(day, row, 40.0, 60);
        };
        vm.is_level_1 = function (day, row) {
            return getRow(day, row, 20, 40);
        };
    }
})();
