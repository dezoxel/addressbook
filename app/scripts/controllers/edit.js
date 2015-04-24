(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('EditCtrl', function (addressbook, $routeParams, $location) {
      var vm = this;

      vm.init = function() {
        vm.entry = {};

        // edit entry action
        if ($routeParams.id) {

          addressbook.find($routeParams.id)
            .then(function(entry) {
              vm.entry = entry;
            })
            .catch(function() {
              // TODO: Implement flash messaging for user instead of logging
              console.error('Unable to find entry with id "' + $routeParams.id + '"');

              $location.path('/');
            });
        }
      };

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

      vm.init();
  });
})(angular);