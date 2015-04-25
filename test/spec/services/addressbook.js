describe('addressbook', function () {
  'use strict';

  beforeEach(module('addressbookApp'));

  var addressbook, $rootScope;
  beforeEach(inject(function (_addressbook_, _$rootScope_) {
    addressbook = _addressbook_;
    $rootScope = _$rootScope_;
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
      addressbook.all().then(function(entries) {
        destroyAll(entries);
      });

      expect(addressbook.all()).to.eventually.be.empty;

      $rootScope.$digest();
    });

    describe('when storage is empty', function() {

      beforeEach(inject(function(localStorageService) {

        localStorageService.set([]);
      }));

      it('uses predefined list and stores it', function() {
        addressbook.reset();

        expect(addressbook.all()).to.eventually.contain({
          'id': 1,
          'name': 'Laura Morin',
          'address': 'P.O. Box 825, 7962 Ante, Ave'
        });

        $rootScope.$digest();
      });

      it('has predefined list with 9 entries by default', function() {
        expect(addressbook.all()).to.eventually.have.length(9);

        $rootScope.$digest();
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

        expect(addressbook.all()).to.eventually.be.deep.equal(fakeLocalStorageList);

        $rootScope.$digest();
      });
    });

  });

  describe('#find', function() {

    it('rejects the promise if the entry is not found', function() {
      expect(addressbook.find(999)).to.be.rejectedWith(/Not found/);

      $rootScope.$digest();
    });

    it('returns simple js object containing addressbook entry fields', function() {
      expect(addressbook.find(1)).to.eventually.have.property('id');
      expect(addressbook.find(1)).to.eventually.have.property('name');
      expect(addressbook.find(1)).to.eventually.have.property('address');

      $rootScope.$digest();
    });

    it('accepts numbers inside string as an ID', function() {
      expect(addressbook.find('2')).to.eventually.have.property('name');

      $rootScope.$digest();
    });
  });

  describe('#destroy', function() {

    it('fulfills promise if entry was destroyed', function() {
      expect(addressbook.destroy(1)).to.be.fulfilled;

      $rootScope.$digest();
    });

    it('rejects promise if entry was not destroyed', function() {
      expect(addressbook.destroy(999)).to.be.rejectedWith(/Unable to destroy/);

      $rootScope.$digest();
    });

    it('removes the entry from the cached list', function(done) {
      var length = 0;

      addressbook.all().then(function(entries) {
        length = entries.length;

        addressbook.destroy(2);

        expect(addressbook.all()).to.eventually.have.length(length - 1);
        done();
      });

      $rootScope.$digest();
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      sinon.spy(localStorageService, 'set');

      addressbook.destroy(3);

      expect(localStorageService.set).to.have.been.called;

      $rootScope.$digest();
    }));
  });

  describe('#add', function() {

    var notValidEntry = {};
    var validEntry = {};

    beforeEach(function() {
      notValidEntry = {some: 'weird', properties: 'here'};
      validEntry = {name: 'Elmo Frazier', address: '4989 Proin Rd.'};
    });

    it('rejects the promise if the entry is not valid', function() {
      expect(addressbook.add(notValidEntry)).to.be.rejectedWith(/not valid/);

      $rootScope.$digest();
    });

    // TODO: Avoid three expectations
    it('returns the added entry', function() {
      expect(addressbook.add(validEntry)).to.eventually.have.property('name', validEntry.name);
      expect(addressbook.add(validEntry)).to.eventually.have.property('address', validEntry.address);
      expect(addressbook.add(validEntry)).to.eventually.have.property('id');

      $rootScope.$digest();
    });

    it('adds the entry to the cached list', function(done) {
      addressbook.add(validEntry)
        .then(function() {
          return addressbook.all();
        })
        .then(function(entries) {
          return entries[entries.length - 1];
        })
        .then(function(lastEntry) {
          expect(lastEntry).to.deep.equal(validEntry);
          done();
        });

      $rootScope.$digest();
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      sinon.spy(localStorageService, 'set');

      addressbook.add(validEntry);

      expect(localStorageService.set).to.have.been.called;

      $rootScope.$digest();
    }));
  });

  describe('#update', function() {

    var notValidEntry = {};
    var validEntry = {};

    beforeEach(function() {
      notValidEntry = {some: 'weird', properties: 'here'};
      validEntry = {id: 5, name: 'Elmo Frazier', address: '4989 Proin Rd.'};
    });

    it('rejects the promise if the entry is not found', function() {
      var noSuchEntry = {id: 123, name: 'Elmo Frazier', address: '4989 Proin Rd.'};

      expect(addressbook.update(noSuchEntry)).to.eventually.be.rejectedWith(/Not found/)

      $rootScope.$digest();
    });

    it('rejects the promise if the entry is not valid', function() {
      expect(addressbook.update(notValidEntry)).to.eventually.be.rejectedWith(/not valid/)

      $rootScope.$digest();
    });

    // TODO: Avoid three expectations
    it('returns the updated entry', function() {
      expect(addressbook.update(validEntry)).to.eventually.have.property('name', validEntry.name);
      expect(addressbook.update(validEntry)).to.eventually.have.property('address', validEntry.address);
      expect(addressbook.update(validEntry)).to.eventually.have.property('id', validEntry.id);

      $rootScope.$digest();
    });

    it('updates the entry inside the cached list', function(done) {
      addressbook.update(validEntry)
        .then(function() {
          return addressbook.find(validEntry.id);
        })
        .then(function(updatedEntry) {
          expect(updatedEntry).to.equal(validEntry);
          done();
        });

      $rootScope.$digest();
    });

    it('syncs a cached list with a storage', inject(function(localStorageService) {
      sinon.spy(localStorageService, 'set');

      addressbook.update(validEntry);

      expect(localStorageService.set).to.have.been.called;
    }));

  });
});
