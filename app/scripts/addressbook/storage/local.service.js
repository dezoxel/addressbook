(function(angular) {
  'use strict';

  angular.module('app.addressbook.storage.local')
    .factory('LocalStorageAdapter', function(localStorageService, $q) {

      function Entry(entry) {
        if (entry) {
          this.id = entry.id;
          this.name = entry.name;
          this.address = entry.address;
        }
      }

      //------------------------------------------------------------------------//
      // PUBLIC
      //------------------------------------------------------------------------//
      Entry.all = function() {
        return $q(function(resolve) {

          _fetchListFromStorage();

          resolve(_list);
        });
      };

      Entry.find = function(id) {
        return $q(function(resolve, reject) {

          _fetchListFromStorage();

          var i = _findIndexById(id);

          if (i === -1) {
            reject(new Error('Entry.find(' + id +'): Not found'));
          } else {
            resolve(_list[i]);
          }

        });
      };

      Entry.prototype.$save = function() {
        if (this.isNew()) {
          return _add(this);
        } else {
          return _update(this);
        }
      };

      Entry.prototype.$delete = function() {
        return $q(function(resolve, reject) {

          var i = _findIndexById(this.getId());

          if (i === -1) {
            reject(new Error('Unable to delete entry, not found by id: ' + this.getId()));
          } else {
            _deleteByIndex(i);
            _syncWithStorage();

            resolve();
          }

        }.bind(this));
      };

      Entry.prototype.getId = function() {
        return this.id;
      };

      Entry.prototype.isNew = function() {
        return !Boolean(this.getId());
      };

      Entry.setPredefinedList = function(list) {
        _predefinedList = list;
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      // cached list of Entry entries
      var _list = [];
      var _predefinedList = [];

      function _fetchListFromStorage() {
        _list = _deserialize(localStorageService.get('list'));

        if (_isEmpty(_list)) {
          _list = _deserialize(_predefinedList);
          _syncWithStorage();
        }
      }

      function _serialize(list) {
        return JSON.stringify(list);
      }

      function _deserialize(list) {
        var resultList = [];

        list.forEach(function(entry) {
          resultList.push(new Entry(entry));
        });

        return resultList;
      }

      function _add(entry) {
        return $q(function(resolve, reject) {

          if (!_isValid(entry)) {
            return reject(new Error('Entry.add: Entry is not valid'));
          }

          entry.id = _generateId();
          _list.push(entry);

          _syncWithStorage();

          return resolve(entry);
        });
      }

      function _update(entry) {
        return $q(function(resolve, reject) {

          if (!_isValid(entry)) {
            return reject(new Error('Entry.update: Entry is not valid'));
          }

          var i = _findIndexById(entry.id);

          if (i === -1) {
            return reject(new Error('Unable to update entry by id: "' + entry.id + '": Not found'));
          }

          _list[i] = entry;
          _syncWithStorage();

          resolve(entry);
        });
      }

      function _generateId() {
        return _list.length;
      }

      // Improve the algorithm here if performance issues occured or we have to work
      // with big lists
      function _findIndexById(rawId) {
        var id = parseInt(rawId);
        var i = _list.length;

        while(i--) {
          if (_list[i].id === id) {
            return i;
          }
        }

        return -1;
      }

      function _syncWithStorage() {
        localStorageService.set('list', _serialize(_list));
      }

      function _deleteByIndex(i) {
        _list.splice(i, 1);
      }

      function _isEmpty(list) {
        return !list || list.length === 0;
      }

      // Add more validations here
      function _isValid(entry) {
        var isValidName = entry.name && typeof entry.name === 'string' && entry.name !== '';
        var isValidAddress = entry.address && typeof entry.address === 'string' && entry.address !== '';

        return isValidName && isValidAddress;
      }

      return Entry;
    });

})(angular);
