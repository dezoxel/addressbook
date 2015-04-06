'use strict';

angular.module('addressbookApp')
  .service('Addressbook', function(localStorageService) {
    var Addressbook = this;

    //------------------------------------------------------------------------//
    // PUBLIC
    //------------------------------------------------------------------------//
    Addressbook.all = function() {
      return _list;
    };

    Addressbook.find = function(id) {
      var i = _findIndexById(id);

      if (i === -1) {
        throw new Error('Addressbook.find(' + id +'): Not found');
      }

      return _list[i];
    };

    Addressbook.destroy = function(id) {
      var i = _findIndexById(id);

      if (i === -1) {
        console.error('Unable to destroy entry, not found by id: ' + id);
        return false;
      }

      _destroyByIndex(i);
      _syncWithStorage();

      return true;
    };

    Addressbook.add = function(entry) {
      if (!_isValid(entry)) {
        throw new Error('Addressbook.add: Entry is not valid: ', entry);
      }

      entry.id = _generateId();
      _list.push(entry);
      _syncWithStorage();

      return entry;
    };


    Addressbook.update = function(entry) {
      if (!_isValid(entry)) {
        throw new Error('Addressbook.update: Entry is not valid: ', entry);
      }

      var i = _findIndexById(entry.id);

      if (i === -1) {
        throw new Error('Unable to update entry by id: "' + entry.id + '": Not found', entry);
      }

      // TODO: Check if it will work correctly. Maybe we have to update entry field by field?
      _list[i] = entry;
      _syncWithStorage();

      return entry;
    };

    Addressbook.reset = function() {
      _init();
    };

    //------------------------------------------------------------------------//
    // PRIVATE
    //------------------------------------------------------------------------//
    // cached list of addressbook entries
    var _list = [];

    function _init() {
      var listFromStorage = _fetchList();
      _list = _isNotEmpty(listFromStorage) ? listFromStorage : _predefinedList();
    }

    function _predefinedList() {
      // intentioal log output, we need to know when predefined list is used or
      // user is using local storage
      console.info('Use predefined list');

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
      return localStorageService.get('list');
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

    function _isNotEmpty(list) {
      return list && !angular.equals([], list);
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