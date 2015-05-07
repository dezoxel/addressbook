(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('ListController', function (AddressbookEntry) {
      var vm = this;

      vm.init = function() {
        vm.searchInput = '';
        vm.entries = [];

        vm.fetchList();
      };

      vm.fetchList = function() {

        return AddressbookEntry.all()
          .then(function(entries) {
            vm.entries = entries;
          });
      };

      vm.delete = function(entry) {

        entry.$delete()
          .catch(function() {
            console.error('Unable to delete entry');
          });
      };

      vm.init();
    });
})(angular);
