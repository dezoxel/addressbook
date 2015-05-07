(function(angular) {
  'use strict';

  angular
    .module('app.addressbook')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/list.html',
          controller: 'ListController as vm'
        })
        .when('/add', {
          templateUrl: 'views/edit.html',
          controller: 'EditController as vm'
        })
        .when('/edit/:id', {
          templateUrl: 'views/edit.html',
          controller: 'EditController as vm'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

})(angular);
