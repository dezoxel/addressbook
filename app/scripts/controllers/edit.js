'use strict';

angular.module('addressbookApp')
  .controller('EditCtrl', function (Addressbook, $routeParams, $location) {
    var scope = this;

    scope.entry = Addressbook.find($routeParams.id);

    scope.save = function() {
      Addressbook.update(scope.entry);
      $location.path('/');
    };

    scope.destroy = function() {
      Addressbook.destroy(scope.entry.id);
      $location.path('/');
    };
});