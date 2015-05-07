(function(angular) {
  'use strict';

  angular
    .module('addressbookApp', [
      'ngRoute',
      'ngTouch',
      'LocalStorageModule',
      'ngResource'
    ])
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
    })
    .constant('mongoLabApiKey', 'ERTrXTJMc7-ELVF_uFM008EerSToARVE')
    .config(function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('addressbook');
    })
    .config(function(AddressbookEntryProvider) {
      AddressbookEntryProvider.setAdapterName('MongoLabAdapter');
    })
    .run(function(AddressbookEntry, predefinedList) {
      AddressbookEntry.setPredefinedList(predefinedList);
    });

})(angular);
