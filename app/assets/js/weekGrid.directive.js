(function(){
    'use strict';

    angular.module('app')
        .directive('weekGrid', weekGrid);

    function weekGrid () {
        return {
            restrict: 'A',
            template: '<div class="week">' +
                '</div>'
        };
    }
})();
