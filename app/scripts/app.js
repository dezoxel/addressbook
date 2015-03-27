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
        templateUrl: 'views/list.html',
        controller: 'ListCtrl as list'
      })
      .when('/add', {
        templateUrl: 'views/edit.html',
        controller: 'AddCtrl as editEntry'
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl as editEntry'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl as about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
