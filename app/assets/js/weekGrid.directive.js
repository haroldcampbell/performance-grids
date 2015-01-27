(function(){
    'use strict';

    ang()
        .directive('weekGrid', weekGrid);

    function weekGrid () {
        return {
            restrict: 'A',
            template: '<div class="week">' +
                '</div>'
        };
    }
})();
