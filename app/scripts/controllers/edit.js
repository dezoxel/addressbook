'use strict';

angular.module('addressbookApp')
  .controller('EditCtrl', function (Addressbook, $routeParams, $location) {
    var scope = this;

    scope.entry = {};

    // edit entry action
    if ($routeParams.id) {
      scope.entry = Addressbook.find($routeParams.id);
    }

    scope.edit = function(entry) {
      Addressbook.update(entry);
      $location.path('/');
    };

    scope.add = function(entry) {
      Addressbook.add(entry);
      $location.path('/');
    };

    scope.destroy = function(id) {
      Addressbook.destroy(id);
      $location.path('/');
    };
});