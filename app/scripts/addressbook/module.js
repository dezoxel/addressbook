(function(angular) {
  'use strict';

  angular
    .module('app.addressbook', [
      'app.addressbook.storage.local',
      'app.addressbook.storage.mongolab'
    ]);

})(angular);
