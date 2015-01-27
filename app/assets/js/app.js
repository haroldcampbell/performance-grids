/* global angular */

//'use strict';

angular.module("app", ['ngRoute']);

/* short cut to keep it dry. */
function ang() {
    return angular.module("app");
}

ang()
//angular.module("app")
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'assets/views/app.html',
                controller: 'AppController'
            });
    }]);
