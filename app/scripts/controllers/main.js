'use strict';

/**
 * @ngdoc function
 * @name addressbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the addressbookApp
 */
angular.module('addressbookApp')
  .controller('MainCtrl', function (Addressbook) {
    this.searchInput = '';
    this.addressbook = Addressbook.all();

    this.deleteEntryBy = function(i) {
      Addressbook.destroyByIndex(i);
    };
  });