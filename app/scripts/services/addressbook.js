'use strcit'

angular.module('addressbookApp')
  .service('Addressbook', function() {
    var _data = [
      {
        "id": 1,
        "name": "Laura Morin",
        "address": "P.O. Box 825, 7962 Ante, Ave"
      },
      {
        "id": 2,
        "name": "Teegan Medina",
        "address": "757-3869 Non St."
      },
      {
        "id": 3,
        "name": "Nina Guy",
        "address": "P.O. Box 241, 3444 Purus, Road"
      },
      {
        "id": 4,
        "name": "Elmo Frazier",
        "address": "4989 Proin Rd."
      },
      {
        "id": 5,
        "name": "Nyssa Leonard",
        "address": "387-6263 Pede. Av."
      },
      {
        "id": 6,
        "name": "Dexter Christian",
        "address": "967-8847 Vehicula Road"
      },
      {
        "id": 7,
        "name": "Joan Reynolds",
        "address": "285-1928 In St."
      },
      {
        "id": 8,
        "name": "Audrey Gross",
        "address": "7130 Suspendisse Street"
      },
      {
        "id": 9,
        "name": "Keely Mendez",
        "address": "P.O. Box 958, 9844 Nulla Rd."
      }
    ];

    this.all = function() {
      return _data;
    };

    this.find = function(id) {
      var i = _findIndexById(id);

      if (i === -1) {
        console.error('Unable to find entry, not found by id: ' + id);
        return {};
      }

      return _data[i];
    };

    this.destroy = function(id) {
      var i = _findIndexById(id)

      if (i === -1) {
        console.error('Unable to destroy entry, not found by id');
        console.trace(id);
        return;
      }

      _destroyByIndex(i);
    };

    this.add = function(entry) {
      entry.id = _generateId();
      _data.push(entry);
    };

    this.update = function(entry) {
      var i = _findIndexById(entry.id);

      if (i === -1) {
        console.error('Unable to update entry, not found by id');
        console.trace(entry);
        return;
      }

      // TODO: Check if it will work correctly. Maybe we have to update entry field by field?
      _data[i] = entry;
    };

    function _generateId() {
      return _data.length;
    }

    function _findIndexById(rawId) {
      var id = parseInt(rawId);
      var i = _data.length;

      while(i--) {
        if (_data[i].id === id) {
          return i;
        }
      }

      return -1;
    }

    function _destroyByIndex(i) {
      _data.splice(i, 1);
    }

  });