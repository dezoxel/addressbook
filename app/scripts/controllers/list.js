(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('ListCtrl', function (addressbook) {
      var vm = this;

      vm.init = function() {
        vm.searchInput = '';
        vm.addressbook = [];

        vm.fetchList();
      };

      vm.fetchList = function() {
        return addressbook.all()
          .then(function(entries) {
            vm.addressbook = entries;
          });
      };

      vm.destroy = function(id) {
        return addressbook.destroy(id);
      };

      vm.init();
    });
})(angular);
