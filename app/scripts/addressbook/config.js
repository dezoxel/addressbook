(function(angular) {
  'use strict';

  angular
    .module('app.addressbook')
    .config(function(AddressbookEntryProvider) {
      AddressbookEntryProvider.setAdapterName('MongoLabAdapter');
    })
    .run(function(AddressbookEntry, PREDEFINED_LIST) {
      AddressbookEntry.setPredefinedList(PREDEFINED_LIST);
    });

})(angular);
