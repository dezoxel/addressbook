describe('addressbook', function () {
  'use strict';

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

      expect(addressbook.all()).to.deep.equal([]);
    });

    describe('when storage is empty', function() {

      beforeEach(inject(function(localStorageService) {

        localStorageService.set([]);
      }));

      it('uses predefined list and stores it', function() {
        addressbook.reset();

        expect(addressbook.all()).to.contain({
          'id': 1,
          'name': 'Laura Morin',
          'address': 'P.O. Box 825, 7962 Ante, Ave'
        });
      });

      it('has predefined list with 9 entries by default', function() {
        expect(addressbook.all().length).to.equal(9);
      });

    });

    describe('when storage is not empty', function() {

      var fakeLocalStorageList = [];

      beforeEach(inject(function(localStorageService) {
        fakeLocalStorageList = [{id: 1, name: 'Test', address: 'Hello'}];

        sinon.stub(localStorageService, 'get').returns(fakeLocalStorageList);
      }));

      it('uses local storage as a backend', function() {
        // force clean cache and sync with storage
        addressbook.reset();

        expect(addressbook.all()).to.deep.equal(fakeLocalStorageList);
      });
    });

  });

  describe('#find', function() {

    it('throws an exception if entry is not found', function() {
      expect(function() { addressbook.find(999); }).to.throw;
    });

    it('returns simple js object containing addressbook entry fields', function() {
      expect(addressbook.find(1).id).to.exist;
      expect(addressbook.find(1).name).to.exist;
      expect(addressbook.find(1).address).to.exist;
    });

    it('accepts numbers inside string as an ID', function() {
      expect(addressbook.find('2').name).to.exist;
    });
  });

  describe('#destroy', function() {

    it('returns "true" if entry was destroyed', function() {
      expect(addressbook.destroy(1)).to.be.true;
    });

    it('returns "false" if entry was not destroyed', function() {
      expect(addressbook.destroy(999)).to.be.false;
    });

    it('removes the entry from the cached list', function() {
      var length = addressbook.all().length;

      addressbook.destroy(2);

      expect(addressbook.all().length).to.equal(length - 1);
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      sinon.spy(localStorageService, 'set');

      addressbook.destroy(3);

      expect(localStorageService.set).to.have.been.called;
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
      expect(function() { addressbook.add(notValidEntry); }).to.throw;
    });

    // TODO: Avoid three expectations
    it('returns the added entry', function() {
      var addedEntry = addressbook.add(validEntry);

      expect(addedEntry.name).to.equal(validEntry.name);
      expect(addedEntry.address).to.equal(validEntry.address);
      expect(addedEntry.id).to.exist;
    });

    it('adds the entry to the cached list', function() {
      addressbook.add(validEntry);
      var lastEntry = addressbook.all()[addressbook.all().length - 1];
      expect(lastEntry).to.equal(validEntry);
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      sinon.spy(localStorageService, 'set');

      addressbook.add(validEntry);

      expect(localStorageService.set).to.have.been.called;
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
      expect(function() { addressbook.update(noSuchEntry); }).to.throw;
    });

    it('throws an exception if entry is not valid', function() {
      expect(function() { addressbook.update(notValidEntry); }).to.throw;
    });

    // TODO: Avoid three expectations
    it('returns the updated entry', function() {
      var updatedEntry = addressbook.update(validEntry);

      expect(updatedEntry.name).to.equal(validEntry.name);
      expect(updatedEntry.address).to.equal(validEntry.address);
      expect(updatedEntry.id).to.equal(validEntry.id);
    });

    it('updates the entry inside the cached list', function() {
      addressbook.update(validEntry);

      var updatedEntry = addressbook.find(validEntry.id);
      expect(updatedEntry).to.equal(validEntry);
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      sinon.spy(localStorageService, 'set');

      addressbook.update(validEntry);

      expect(localStorageService.set).to.have.been.called;
    }));

  });

});
