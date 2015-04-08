'use strict';

angular.module('addressbookApp')
  .controller('ListCtrl', function (addressbook) {
    var scope = this;

    scope.searchInput = '';
    scope.addressbook = addressbook.all();

    scope.destroy = function(id) {
      addressbook.destroy(id);
    };
  });
