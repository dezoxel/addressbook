(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .factory('MongoLabAdapter', function($resource) {
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

      // we redefine $save method because we want to follow RESTful API of MongoLab where creating of resource uses
      // POST and updating of resource uses PUT
      AddressbookEntry.prototype.$save = function() {
        return this.isNew() ? this._$create.apply(this, arguments) : this.$update.apply(this, arguments);
      };

      AddressbookEntry.prototype.isNew = function() {
        return !Boolean(this.getId());
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      var _predefinedList = [];

      // Since $resource doesn't have $create method, we use $save as a base
      AddressbookEntry.prototype._$create = AddressbookEntry.prototype.$save;

      return AddressbookEntry;
    });


})(angular);
