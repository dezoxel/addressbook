'use strict';

/**
 * @ngdoc function
 * @name addressbookApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the addressbookApp
 */
angular.module('addressbookApp')
  .controller('AddCtrl', function (Addressbook, $location) {
    var scope = this;

    scope.save = function() {
      Addressbook.add(scope.entry);
      $location.path('/');
    };
  });
