(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .factory('mongolabAdapter', function($resource) {
      var AddressbookEntry = $resource('https://api.mongolab.com/api/1/databases/addressbook/collections/addressbook/:id', {
        apiKey: 'ERTrXTJMc7-ELVF_uFM008EerSToARVE',
        id: '@_id.$oid'
      }, {
        update: {
          method: 'PUT'
        }
      });

      //------------------------------------------------------------------------//
      // PUBLIC
      //------------------------------------------------------------------------//
      AddressbookEntry.all = function() {
        return AddressbookEntry.query().$promise;
      };

      AddressbookEntry.find = function(id) {
        return AddressbookEntry.get({id: id}).$promise;
      };

      AddressbookEntry.setPredefinedList = function(list) {
        _predefinedList = list;
      };

      AddressbookEntry.prototype.getId = function() {
        if (this._id) {
          return this._id.$oid;
        }

        return null;
      };

      AddressbookEntry.prototype.isNew = function() {
        return !Boolean(this.getId());
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      var _predefinedList = [];

      return AddressbookEntry;
    });


})(angular);
