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
        addressbook.all()
          .then(function(entries) {
            vm.addressbook = entries;
          });
      };

      vm.destroy = function(id) {
        addressbook.destroy(id);
      };

      vm.init();
    });
})(angular);
