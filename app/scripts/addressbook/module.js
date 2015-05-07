(function(angular) {
  'use strict';

  angular
    .module('app.addressbook', [
      'app.core',
      'app.addressbook.storage.local',
      'app.addressbook.storage.mongolab'
    ]);

})(angular);
