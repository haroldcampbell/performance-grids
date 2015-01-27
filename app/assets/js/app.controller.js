(function () {
    'use strict';

    angular.module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope'];

    function AppController($scope) {
        var vm = this;
        $scope.name = 'harold';
        $scope.vm = vm;

        $scope.days = [
            {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: 'W', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]}
        ];

        vm.is_am = function(hour) {
            return hour < 4;
        };
    }
})();
