(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('ListCtrl', function (addressbook) {
      var vm = this;

      vm.searchInput = '';
      vm.addressbook = [];

      addressbook.all()
        .then(function(entries) {
          vm.addressbook = entries;
        });

      vm.destroy = function(id) {
        addressbook.destroy(id);
      };
    });
})(angular);
