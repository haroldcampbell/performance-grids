(function () {
    'use strict';

    angular
        .module('WeekGridService', [])
        .factory('WeekGridService', WeekGridService);

    WeekGridService.$inject = [];

    function WeekGridService() {
        var _this = this;
        /**
         * lookup used to identify the levels with their upper and lower bounds.
         * The bounds are in percent
         */
        _this.levels = {
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
        _this.isLevel = function (level, value) {
            if (level < 0 || level > 4) {
                throw "Invalid level: '" + level + "'. Valid levels are 0 - 4.";
            }
            return _this.levels[level].lower <= value && value <= _this.levels[level].upper;
        };

        return {
            context: _this,
            getWeekData: getWeekData,
            getActivities: getActivities,
            getActivityLevel: getLevel
        };

        function getLevel(value) {
            if (_this.isLevel(4, value))
                return 4;

            if (_this.isLevel(3, value))
                return 3;

            if (_this.isLevel(2, value))
                return 2;

            if (_this.isLevel(1, value))
                return 1;

            if (_this.isLevel(0, value))
                return 0;

            return -1;
        }

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
                    /* rows */
                    1: {value: 83}, /* Level 4 */
                    2: {value: 63}, /* Level 3 */
                    3: {value: 41}, /* Level 2 */
                    5: {value: 28}, /* Level 1 */
                    6: {value: 18}  /* Level 0 */
                },
                /* col: {...} */
                2: {
                    /* rows */
                    1: {value: 33},
                    2: {value: 85},
                    3: {value: 21},
                    5: {value: 60}
                },
                /* col: {...} */
                3: {
                    /* rows */
                    1: {value: 3},
                    2: {value: 23},
                    3: {value: 90},
                    4: {value: 98},
                    5: {value: 28}
                },
                /* col: {...} */
                4: {
                    /* rows */
                    1: {value: 23},
                    2: {value: 23},
                    5: {value: 28}
                },
                /* col: {...} */
                5: {
                    /* rows */
                    5: {value: 23},
                    6: {value: 43}
                }
            };
        }


    }

})();
