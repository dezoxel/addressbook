(function(angular) {
  'use strict';

  angular.module('app.addressbook.storage.mongolab')
    .factory('MongoLabAdapter', function($resource, MONGOLAB_API_KEY) {
      var Entry = $resource('https://api.mongolab.com/api/1/databases/addressbook/collections/addressbook/:id', {
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
      Entry.all = function() {
        return Entry.query().$promise;
      };

      Entry.find = function(id) {
        return Entry.get({id: id}).$promise;
      };

      Entry.setPredefinedList = function(list) {
        _predefinedList = list;
      };

      Entry.prototype.getId = function() {
        if (this._id) {
          return this._id.$oid;
        }

        return null;
      };

      // Since $resource doesn't have $create method, we use $save as a base
      Entry.prototype._$create = Entry.prototype.$save;

      // we redefine $save method because we want to follow RESTful API of MongoLab where creating of resource uses
      // POST and updating of resource uses PUT
      Entry.prototype.$save = function() {
        return this.isNew() ? this._$create.apply(this, arguments) : this.$update.apply(this, arguments);
      };

      Entry.prototype.isNew = function() {
        return !Boolean(this.getId());
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      var _predefinedList = [];

      return Entry;
    });


})(angular);
