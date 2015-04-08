(function(angular) {
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
          controller: 'EditCtrl as editCtrl'
        })
        .when('/edit/:id', {
          templateUrl: 'views/edit.html',
          controller: 'EditCtrl as editCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
      localStorageServiceProvider.setPrefix('addressbook');
    }])
    .config(function() {

    });

})(angular);
