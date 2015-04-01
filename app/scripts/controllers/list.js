'use strict';

/**
 * @ngdoc function
 * @name addressbookApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the addressbookApp
 */
angular.module('addressbookApp')
  .controller('ListCtrl', function (Addressbook) {
    var scope = this;

    scope.searchInput = '';
    scope.addressbook = Addressbook.all();

    scope.destroy = function(id) {
      Addressbook.destroy(id);
    };
  });
