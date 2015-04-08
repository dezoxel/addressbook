'use strict';

describe('addressbook', function () {

  beforeEach(module('addressbookApp'));

  var addressbook;
  beforeEach(inject(function(_addressbook_) {
    addressbook = _addressbook_;
    addressbook.reset();
  }));

  describe('#all', function() {

    function destroyAll(entries) {
      var i = entries.length;
      while(i--) {
        addressbook.destroy(entries[i].id);
      }
    }

    it('returns empty array if no entries found', function() {
      var entries = addressbook.all();

      destroyAll(entries);

      expect(addressbook.all()).toEqual([]);
    });

    describe('when storage is empty', function() {

      beforeEach(inject(function(localStorageService) {

        localStorageService.set([]);
      }));

      it('uses predefined list and stores it', function() {
        addressbook.reset();

        expect(addressbook.all()).toContain({
          'id': 1,
          'name': 'Laura Morin',
          'address': 'P.O. Box 825, 7962 Ante, Ave'
        });
      });

      it('has predefined list with 9 entries by default', function() {
        expect(addressbook.all().length).toBe(9);
      });

    });

    describe('when storage is not empty', function() {

      var fakeLocalStorageList = [];

      beforeEach(inject(function(localStorageService) {
        fakeLocalStorageList = [{id: 1, name: 'Test', address: 'Hello'}];

        spyOn(localStorageService, 'get').and.callFake(function() {
          return fakeLocalStorageList;
        });

      }));

      it('uses local storage as a backend', function() {
        // force clean cache and sync with storage
        addressbook.reset();

        expect(addressbook.all()).toEqual(fakeLocalStorageList);
      });
    });

  });

  describe('#find', function() {

    it('throws an exception if entry is not found', function() {
      expect(function() { addressbook.find(999); }).toThrow();
    });

    it('returns simple js object containing addressbook entry fields', function() {
      expect(addressbook.find(1).id).toBeTruthy();
      expect(addressbook.find(1).name).toBeTruthy();
      expect(addressbook.find(1).address).toBeTruthy();
    });

    it('accepts numbers inside string as an ID', function() {
      expect(addressbook.find('2').name).toBeTruthy();
    });
  });

  describe('#destroy', function() {

    it('returns "true" if entry was destroyed', function() {
      expect(addressbook.destroy(1)).toEqual(true);
    });

    it('returns "false" if entry was not destroyed', function() {
      expect(addressbook.destroy(999)).toEqual(false);
    });

    it('removes the entry from the cached list', function() {
      var length = addressbook.all().length;

      addressbook.destroy(2);

      expect(addressbook.all().length).toEqual(length - 1);
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      spyOn(localStorageService, 'set');

      addressbook.destroy(3);

      expect(localStorageService.set).toHaveBeenCalled();
    }));
  });

  describe('#add', function() {

    var notValidEntry = {};
    var validEntry = {};

    beforeEach(function() {
      notValidEntry = {some: 'weird', properties: 'here'};
      validEntry = {name: 'Elmo Frazier', address: '4989 Proin Rd.'};
    });

    it('throws an exception if entry is not valid', function() {
      expect(function() { addressbook.add(notValidEntry); }).toThrow();
    });

    // TODO: Avoid three expectations
    it('returns the added entry', function() {
      var addedEntry = addressbook.add(validEntry);

      expect(addedEntry.name).toEqual(validEntry.name);
      expect(addedEntry.address).toEqual(validEntry.address);
      expect(addedEntry.id).toBeDefined();
    });

    it('adds the entry to the cached list', function() {
      addressbook.add(validEntry);
      var lastEntry = addressbook.all()[addressbook.all().length - 1];
      expect(lastEntry).toEqual(validEntry);
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      spyOn(localStorageService, 'set');

      addressbook.add(validEntry);

      expect(localStorageService.set).toHaveBeenCalled();
    }));
  });

  describe('#update', function() {

    var notValidEntry = {};
    var validEntry = {};

    beforeEach(function() {
      notValidEntry = {some: 'weird', properties: 'here'};
      validEntry = {id: 5, name: 'Elmo Frazier', address: '4989 Proin Rd.'};
    });

    it('throws an exception if entry is not found', function() {
      var noSuchEntry = {id: 123, name: 'Elmo Frazier', address: '4989 Proin Rd.'};
      expect(function() { addressbook.update(noSuchEntry); }).toThrow();
    });

    it('throws an exception if entry is not valid', function() {
      expect(function() { addressbook.update(notValidEntry); }).toThrow();
    });

    // TODO: Avoid three expectations
    it('returns the updated entry', function() {
      var updatedEntry = addressbook.update(validEntry);

      expect(updatedEntry.name).toEqual(validEntry.name);
      expect(updatedEntry.address).toEqual(validEntry.address);
      expect(updatedEntry.id).toEqual(validEntry.id);
    });

    it('updates the entry inside the cached list', function() {
      addressbook.update(validEntry);

      var updatedEntry = addressbook.find(validEntry.id);
      expect(updatedEntry).toEqual(validEntry);
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      spyOn(localStorageService, 'set');

      addressbook.update(validEntry);

      expect(localStorageService.set).toHaveBeenCalled();
    }));

  });

});
