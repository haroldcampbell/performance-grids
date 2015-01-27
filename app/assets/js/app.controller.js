(function () {
    'use strict';

    ang()
//    angular.module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope'];

    function AppController($scope) {
        $scope.name = 'harold';


        $scope.days = [
            {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: 'W', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
            {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]}
        ];

        $scope.is_am = function(hour) {
            console.log(hour);
            return hour < 4;
        };
    }
})();
