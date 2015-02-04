(function () {
    'use strict';

    angular.module('app')
        .controller('DemoWeekController', DemoWeekController);

    DemoWeekController.$inject = ['$scope', 'WeekGridService'];

    function DemoWeekController($scope, weekGridService) {
        var vm = this;
        $scope.name = 'harold';
        $scope.vm = vm;

        $scope.days = weekGridService.getWeekData();
        $scope.activities = weekGridService.getActivities();
    }
})();
