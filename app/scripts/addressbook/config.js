(function(angular) {
  'use strict';

  angular
    .module('app.addressbook')
    .config(function(AddressbookEntryProvider) {
      AddressbookEntryProvider.setAdapterName('MongoLabAdapter');
    })
    .run(function(AddressbookEntry, predefinedList) {
      AddressbookEntry.setPredefinedList(predefinedList);
    });

})(angular);
