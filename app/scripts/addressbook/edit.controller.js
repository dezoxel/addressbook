(function(angular) {
  'use strict';

  angular.module('app.addressbook')
    .controller('EditController', function (AddressbookEntry, $routeParams, $location) {
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
            console.error('Unable to find entry with id "' + id + '"');

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

      vm.delete = function() {

        return vm.entry.$delete()
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