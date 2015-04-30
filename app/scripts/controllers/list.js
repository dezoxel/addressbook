(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('ListCtrl', function (AddressbookEntry) {
      var vm = this;

      vm.init = function() {
        vm.searchInput = '';
        vm.addressbook = [];

        vm.fetchList();
      };

      vm.fetchList = function() {
        return AddressbookEntry.all()
          .then(function(entries) {
            vm.addressbook = entries;
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
