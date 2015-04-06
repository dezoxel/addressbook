'use strict';

describe('Addressbook', function () {

  beforeEach(module('addressbookApp'));

  var Addressbook;
  beforeEach(inject(function(_Addressbook_) {
    Addressbook = _Addressbook_;
  }));

  describe('when storage is empty', function() {

    it('fetches predefined list of addressbook entries');
    it('has predefined list with 10 entries by default');

  });

  describe('when storage is not empty', function() {
    it('uses local storage as a backend');
  });

  describe('#find', function() {

    it('throws an exception if entry is not found', function() {
      expect(function() { Addressbook.find(999); }).toThrow();
    });

    it('returns simple js object containing addressbook entry fields', function() {
      expect(Addressbook.find(1).id).toBeTruthy();
      expect(Addressbook.find(1).name).toBeTruthy();
      expect(Addressbook.find(1).address).toBeTruthy();
    });

    it('accepts numbers inside string as an ID', function() {
      expect(Addressbook.find('2').name).toBeTruthy();
    });
  });

  describe('#destroy', function() {

    it('returns "true" if entry was destroyed', function() {
      expect(Addressbook.destroy(1)).toEqual(true);
    });

    it('returns "false" if entry was not destroyed', function() {
      expect(Addressbook.destroy(999)).toEqual(false);
    });

    it('removes the entry from the cached list', function() {
      var length = Addressbook.all().length;

      Addressbook.destroy(2);

      expect(Addressbook.all().length).toEqual(length - 1);
    });

    it('syncs the cached list with a storage', inject(function(localStorageService) {
      spyOn(localStorageService, 'set');

      Addressbook.destroy(3);

      expect(localStorageService.set).toHaveBeenCalled();
    }));
  });

  describe('#add', function() {

    it('throws an exception if entry is not valid');
    it('returns the added entry');
    it('adds the entry to the cached list');
    it('syncs the cached list with a storage');
  });

  describe('#update', function() {

    it('throws an exception if entry is not found');
    it('throws an exception if entry is not valid');
    it('returns the updated entry');
    it('updates the entry inside the cached list');
    it('syncs the cached list with a storage');
  });

});