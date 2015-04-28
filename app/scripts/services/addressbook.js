(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .provider('addressbook', function() {
      var adapterName = null;

      this.setAdapter = function(value) {
        adapterName = value;
      };

      this.$get = function($injector) {
        if (!adapterName) {
          throw new Error('addressbook: `adapterName` is not specified!');
        }

        return $injector.get(adapterName);
      };
    });

})(angular);
