'use strict';

/**
 * @ngdoc overview
 * @name addressbookApp
 * @description
 * # addressbookApp
 *
 * Main module of the application.
 */
angular
  .module('addressbookApp', [
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
