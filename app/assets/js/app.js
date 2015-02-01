/* global angular */
(function () {

    'use strict';

    angular.module("app", ['ngRoute', 'WeekGridService']);
    angular.module("app")
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'assets/views/app.html',
                    controller: 'AppController'
                });
        }]);
})();
