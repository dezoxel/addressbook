(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .factory('mongolabAdapter', function($resource) {
      var Addressbook = $resource('https://api.mongolab.com/api/1/databases/addressbook/collections/addressbook/:id', {
        apiKey: 'ERTrXTJMc7-ELVF_uFM008EerSToARVE'
      }, {
        update: {
          method: 'PUT'
        }
      });

      Addressbook._update = Addressbook.update;

      //------------------------------------------------------------------------//
      // PUBLIC
      //------------------------------------------------------------------------//
      Addressbook.all = function() {
        return Addressbook.query().$promise;
      };

      Addressbook.find = function(id) {
        return Addressbook.get({id: id}).$promise;
      };

      Addressbook.destroy = function(id) {
        return Addressbook.remove({id: id}).$promise;
      };

      Addressbook.add = function(entry) {
        return entry.$save();
      };

      Addressbook.update = function(entry) {
        return Addressbook._update({id: entry._id.$oid}, entry).$promise;
      };

      Addressbook.setPredefinedList = function(list) {
        _predefinedList = list;
      };

      Addressbook.prototype.getId = function() {
        if (this._id) {
          return this._id.$oid;
        }

        return null;
      };

      Addressbook.prototype.isNew = function() {
        return !Boolean(this.getId());
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      var _predefinedList = [];

      return Addressbook;
    });


})(angular);
