(function(angular) {
  'use strict';

  angular.module('app.addressbook')
    .controller('ListController', function (Entry, $route) {
      var vm = this;

      vm.init = function() {
        vm.searchInput = '';
        vm.entries = [];

        vm.fetchList();
      };

      vm.fetchList = function() {

        return Entry.all()
          .then(function(entries) {
            vm.entries = entries;
          });
      };

      vm.delete = function(entry) {

        entry.$delete()
          .catch(function() {
            console.error('Unable to delete entry');
          })
          .finally(function() {
            $route.reload();
          });
      };

      vm.init();
    });
})(angular);
