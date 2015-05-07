(function(angular) {
  'use strict';

  angular
    .module('app.addressbook')
    .config(function(EntryProvider) {
      EntryProvider.setAdapterName('MongoLabAdapter');
    })
    .run(function(Entry, PREDEFINED_LIST) {
      Entry.setPredefinedList(PREDEFINED_LIST);
    });

})(angular);
