'use strict';

angular.module('addressbookApp')
  .controller('EditCtrl', function (Addressbook, $routeParams, $location) {
    var scope = this;

    scope.entry = {};

    // edit entry action
    if ($routeParams.id) {
      try {
        scope.entry = Addressbook.find($routeParams.id);
      } catch (e) {
        // TODO: Implement flash messaging for user instead of logging
        console.error('Unable to find entry with id "' + $routeParams.id + '"');

        $location.path('/');
      }
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