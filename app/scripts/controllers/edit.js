(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('EditCtrl', function (addressbook, $routeParams, $location) {
      var scope = this;

      scope.entry = {};

      // edit entry action
      if ($routeParams.id) {
        try {
          scope.entry = addressbook.find($routeParams.id);
        } catch (e) {
          // TODO: Implement flash messaging for user instead of logging
          console.error('Unable to find entry with id "' + $routeParams.id + '"');

          $location.path('/');
        }
      }

      scope.edit = function(entry) {
        addressbook.update(entry);
        $location.path('/');
      };

      scope.add = function(entry) {
        addressbook.add(entry);
        $location.path('/');
      };

      scope.destroy = function(id) {
        addressbook.destroy(id);
        $location.path('/');
      };
  });
})(angular);