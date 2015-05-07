(function(angular) {
  'use strict';

  angular.module('app.addressbook.storage.mongolab')
    .factory('MongoLabAdapter', function($resource, MONGOLAB_API_KEY) {
      var AddressbookEntry = $resource('https://api.mongolab.com/api/1/databases/addressbook/collections/addressbook/:id', {
        apiKey: MONGOLAB_API_KEY,
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

      // Since $resource doesn't have $create method, we use $save as a base
      AddressbookEntry.prototype._$create = AddressbookEntry.prototype.$save;

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

      return AddressbookEntry;
    });


})(angular);
