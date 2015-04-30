(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('EditCtrl', function (AddressbookEntry, $routeParams, $location) {
      var vm = this;

      vm.init = function() {

        vm.entry = new AddressbookEntry();

        // edit entry action
        if ($routeParams.id) {
          vm.fetchEntryBy($routeParams.id);
        }
      };

      vm.fetchEntryBy = function(id) {

        return AddressbookEntry.find(id)
          .then(function(entry) {
            vm.entry = entry;
          })
          .catch(function() {
            // TODO: Implement flash messaging for user instead of logging
            console.error('Unable to find entry with id "' + $routeParams.id + '"');

            $location.path('/');
          });
      };

      vm.save = function() {

        return vm.entry.$save()
          .catch(function() {
            // TODO: Implement flash messaging for user instead of logging
            console.error('Unable to save entry');
          })
          .finally(function() {
            $location.path('/');
          });
      };

      vm.destroy = function(id) {

        return AddressbookEntry.destroy(id)
          .catch(function() {
            // TODO: Implement flash messaging for user instead of logging
            console.error('Unable to delete entry');
          })
          .finally(function() {
            $location.path('/');
          });
      };

      vm.init();
  });
})(angular);