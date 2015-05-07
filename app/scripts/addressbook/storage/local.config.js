(function(angular) {
  'use strict';

  angular
    .module('app.addressbook.storage.local')
    .config(function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('addressbook');
    });

})(angular);
