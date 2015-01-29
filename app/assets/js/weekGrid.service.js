(function () {
    'use strict';

    angular
        .module('WeekGridService', [])
        .factory('WeekGridService', WeekGridService);

    WeekGridService.$inject = [];

    function WeekGridService() {
        return {
            getWeekData: getWeekData,
            getActivities: getActivities
        };

        function getWeekData() {
            return [
                {col: 0, title: 'S', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 1, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 2, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 3, title: 'W', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 4, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 5, title: '', rows: [0, 1, 2, 3, 4, 5, 6, 7]},
                {col: 6, title: 'S', rows: [0, 1, 2, 3, 4, 5, 6, 7]}
            ];
        }

        function getActivities() {
            return {
                /* col: {...} */
                1: {
                    /* row: {...} */
                    1: {row: 1, value: 83},
                    2: {row: 2, value: 63},
                    3: {row: 2, value: 41},
                    5: {row: 5, value: 28}
                },
                /* col: {...} */
                2: {
                    /* row: {...} */
                    1: {row: 1, value: 33},
                    2: {row: 2, value: 85},
                    3: {row: 2, value: 21},
                    4: {row: 5, value: 60}
                },
                /* col: {...} */
                3: {
                    /* row: {...} */
                    1: {row: 1, value: 3},
                    2: {row: 2, value: 23},
                    3: {row: 2, value: 90},
                    4: {row: 5, value: 98},
                    5: {row: 5, value: 28}
                },
                /* col: {...} */
                4: {
                    /* row: {...} */
                    1: {row: 1, value: 23},
                    2: {row: 2, value: 23},
                    3: {row: 2, value: 41},
                    4: {row: 5, value: 28},
                    6: {row: 5, value: 28}
                },
                /* col: {...} */
                5: {
                    /* row: {...} */
                    1: {row: 1, value: 23},
                    2: {row: 2, value: 43},
                    3: {row: 2, value: 21},
                    5: {row: 5, value: 28}
                }
            };
        }
    }

})();
