(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .service('localstorageAdapter', function(localStorageService, $q) {
      var addressbook = this;


      //------------------------------------------------------------------------//
      // PUBLIC
      //------------------------------------------------------------------------//
      addressbook.all = function() {
        return $q(function(resolve) {

          _fetchList();

          resolve(_list);
        });
      };

      addressbook.find = function(id) {
        return $q(function(resolve, reject) {

          var i = _findIndexById(id);

          if (i === -1) {
            reject(new Error('addressbook.find(' + id +'): Not found'));
          } else {
            resolve(_list[i]);
          }

        });
      };

      addressbook.destroy = function(id) {
        return $q(function(resolve, reject) {

          var i = _findIndexById(id);

          if (i === -1) {
            reject(new Error('Unable to destroy entry, not found by id: ' + id));
          } else {
            _destroyByIndex(i);
            _syncWithStorage();

            resolve();
          }

        });
      };

      addressbook.add = function(entry) {
        return $q(function(resolve, reject) {

          if (!_isValid(entry)) {
            reject(new Error('addressbook.add: Entry is not valid'));
          } else {
            entry.id = _generateId();
            _list.push(entry);
            _syncWithStorage();

            resolve(entry);
          }

        });
      };

      addressbook.update = function(entry) {
        return $q(function(resolve, reject) {

          if (!_isValid(entry)) {
            return reject(new Error('addressbook.update: Entry is not valid'));
          }

          var i = _findIndexById(entry.id);

          if (i === -1) {
            return reject(new Error('Unable to update entry by id: "' + entry.id + '": Not found'));
          }

          _list[i] = entry;
          _syncWithStorage();

          resolve(entry);

        });
      };

      addressbook.setPredefinedList = function(list) {
        _predefinedList = list;
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      // cached list of addressbook entries
      var _list = [];
      var _predefinedList = [];

      function _init() {
        _fetchList();
      }

      function _fetchList() {
        var listFromStorage = localStorageService.get('list');

        if (_isEmpty(listFromStorage)) {
          // put the predefined list to the storage
          _list = _predefinedList;
          _syncWithStorage();
          _list = localStorageService.get('list');
        }

        _list = localStorageService.get('list');
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
        localStorageService.set('list', _list);
      }

      function _destroyByIndex(i) {
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

      //------------------------------------------------------------------------//
      // INIT
      //------------------------------------------------------------------------//
      _init();
    });

})(angular);
