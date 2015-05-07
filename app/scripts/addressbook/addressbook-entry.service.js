(function(angular) {
  'use strict';

  angular.module('app.addressbook')
    .provider('AddressbookEntry', function() {
      var adapterName = null;

      this.setAdapterName = function(value) {
        adapterName = value;
      };

      this.getAdapterName = function() {
        return adapterName;
      };

      this.$get = function($injector) {
        if (!adapterName) {
          throw new Error('AddressbookEntry: `adapterName` is not specified!');
        }

        return $injector.get(adapterName);
      };
    });

})(angular);
