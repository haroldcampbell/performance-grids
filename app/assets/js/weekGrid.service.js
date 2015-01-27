(function() {
    'use strict';

    angular
        .module('WeekGridService', [])
        .factory('WeekGridService', WeekGridService);

    WeekGridService.$inject = [];

    function WeekGridService () {
        return {
            getWeekData: getWeekData
        };

        function getWeekData() {
            return [
                {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: 'W', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: '', hour: [0, 1, 2, 3, 4, 5, 6, 7]},
                {dow: 'S', hour: [0, 1, 2, 3, 4, 5, 6, 7]}
            ];
        }
    }

})();
