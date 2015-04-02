'use strict';

angular
  .module('addressbookApp', [
    'ngRoute',
    'ngTouch',
    'LocalStorageModule'
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
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('addressbook');
  }]);
