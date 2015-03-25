'use strict';

/**
 * @ngdoc function
 * @name addressbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the addressbookApp
 */
angular.module('addressbookApp')
  .controller('MainCtrl', function (db) {
    console.log(db);
    this.addressbook = db.addressbook;
  });
