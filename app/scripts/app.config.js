(function(angular) {
  'use strict';

  angular
    .module('addressbookApp')
    .constant('mongoLabApiKey', 'ERTrXTJMc7-ELVF_uFM008EerSToARVE')
    .config(function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('addressbook');
    })
    .config(function(AddressbookEntryProvider) {
      AddressbookEntryProvider.setAdapterName('MongoLabAdapter');
    })
    .run(function(AddressbookEntry, predefinedList) {
      AddressbookEntry.setPredefinedList(predefinedList);
    });

})(angular);
