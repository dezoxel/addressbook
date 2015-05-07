(function(angular) {
  'use strict';

  angular
    .module('app.addressbook')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/list.html',
          controller: 'ListController as list'
        })
        .when('/add', {
          templateUrl: 'views/edit.html',
          controller: 'EditController as ctrl'
        })
        .when('/edit/:id', {
          templateUrl: 'views/edit.html',
          controller: 'EditController as ctrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

})(angular);
