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
    this.searchInput = '';
    this.addressbook = Addressbook.all();

    this.deleteEntryBy = function(i) {
      Addressbook.destroyByIndex(i);
    };
  });
