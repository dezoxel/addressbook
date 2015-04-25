(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .service('addressbook', function(localStorageService, $q) {
      var addressbook = this;

      //------------------------------------------------------------------------//
      // PUBLIC
      //------------------------------------------------------------------------//
      addressbook.all = function() {
        return $q(function(resolve) {

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
            reject(new Error('addressbook.add: Entry is not valid: ', entry));
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
            reject(new Error('addressbook.update: Entry is not valid: ', entry));
          } else {
            var i = _findIndexById(entry.id);

            if (i === -1) {
              reject(new Error('Unable to update entry by id: "' + entry.id + '": Not found', entry));
            } else {
              _list[i] = entry;
              _syncWithStorage();

              resolve(entry);
            }
          }

        });
      };

      addressbook.reset = function() {
        _list = _predefinedList();
        _syncWithStorage();
        _list = localStorageService.get('list');
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      // cached list of addressbook entries
      var _list = [];

      function _init() {
        _fetchList();
      }

      function _predefinedList() {
        return [
          {
            'id': 1,
            'name': 'Laura Morin',
            'address': 'P.O. Box 825, 7962 Ante, Ave'
          },
          {
            'id': 2,
            'name': 'Teegan Medina',
            'address': '757-3869 Non St.'
          },
          {
            'id': 3,
            'name': 'Nina Guy',
            'address': 'P.O. Box 241, 3444 Purus, Road'
          },
          {
            'id': 4,
            'name': 'Elmo Frazier',
            'address': '4989 Proin Rd.'
          },
          {
            'id': 5,
            'name': 'Nyssa Leonard',
            'address': '387-6263 Pede. Av.'
          },
          {
            'id': 6,
            'name': 'Dexter Christian',
            'address': '967-8847 Vehicula Road'
          },
          {
            'id': 7,
            'name': 'Joan Reynolds',
            'address': '285-1928 In St.'
          },
          {
            'id': 8,
            'name': 'Audrey Gross',
            'address': '7130 Suspendisse Street'
          },
          {
            'id': 9,
            'name': 'Keely Mendez',
            'address': 'P.O. Box 958, 9844 Nulla Rd.'
          }
        ];
      }

      function _fetchList() {
        var listFromStorage = localStorageService.get('list');

        if (_isEmpty(listFromStorage)) {
          // put the predefined list to the storage
          addressbook.reset();
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

      // Add move validations here
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
