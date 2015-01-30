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

    }
})();
