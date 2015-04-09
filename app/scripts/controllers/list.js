(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .controller('ListCtrl', function (addressbook) {
      var vm = this;

      vm.searchInput = '';
      vm.addressbook = addressbook.all();

      vm.destroy = function(id) {
        addressbook.destroy(id);
      };
    });
})(angular);
