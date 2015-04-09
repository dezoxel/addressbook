(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('EditCtrl', function (addressbook, $routeParams, $location) {
      var vm = this;

      vm.entry = {};

      // edit entry action
      if ($routeParams.id) {
        try {
          vm.entry = addressbook.find($routeParams.id);
        } catch (e) {
          // TODO: Implement flash messaging for user instead of logging
          console.error('Unable to find entry with id "' + $routeParams.id + '"');

          $location.path('/');
        }
      }

      vm.edit = function(entry) {
        addressbook.update(entry);
        $location.path('/');
      };

      vm.add = function(entry) {
        addressbook.add(entry);
        $location.path('/');
      };

      vm.destroy = function(id) {
        addressbook.destroy(id);
        $location.path('/');
      };
  });
})(angular);