describe('LocalStorageAdapter', function () {
  'use strict';

  function resolvePromises() {
    $rootScope.$digest();
  }

  beforeEach(module('app.addressbook.storage.local'));

  var Entry, $rootScope, fakeLocalStorageList, entry, localStorageService;

  beforeEach(inject(function (_LocalStorageAdapter_, _$rootScope_, _localStorageService_) {
    Entry = _LocalStorageAdapter_;
    $rootScope = _$rootScope_;
    localStorageService = _localStorageService_;

    entry = {id: 1, name: 'Petya', address: 'Hey str. 123'};

    fakeLocalStorageList = [entry];
    sinon.stub(localStorageService, 'get').returns(fakeLocalStorageList);
  }));

  describe('when storage is empty', function() {

    beforeEach(inject(function(localStorageService) {
      localStorageService.get.restore();
      sinon.stub(localStorageService, 'get').returns([]);
    }));

    it('has ability to specify predefined list', function() {
      Entry.setPredefinedList([entry]);

      expect(Entry.all()).to.eventually.contain(new Entry(entry));

      resolvePromises();
    });

  });

  describe('when storage is not empty', function() {

    it('uses local storage as a backend', function() {
      expect(Entry.all()).to.eventually.be.deep.equal([new Entry(entry)]);

      resolvePromises();
    });
  });

  describe('.find', function() {

    it('rejects the promise if the entry is not found', function() {
      expect(Entry.find(999)).to.be.rejectedWith(/Not found/);

      resolvePromises();
    });

    it('returns Entry instance if found', function() {
      expect(Entry.find(1)).to.be.fulfilled.and.eventually.be.an.instanceof(Entry);

      resolvePromises();
    });

    it('accepts numbers inside string as an ID', function() {
      expect(Entry.find('1')).to.be.fulfilled.and.eventually.be.an.instanceof(Entry);

      resolvePromises();
    });

    it('doesnt use cached list', function(done) {
      Entry.find(1)
        .then(function() {
          expect(localStorageService.get).to.have.been.calledWith('list');
        })
        .then(done);

      resolvePromises();
    });
  });

  describe('#delete', function() {

    it('fulfills promise if entry was deleted', function(done) {
      Entry.find(1)
        .then(function(entry) {
          expect(entry.$delete()).to.be.fulfilled;
        })
        .then(done);

      resolvePromises();
    });

    it('rejects promise if entry was not deleted', function() {
      var entry = new Entry({id: 999, name: 'Test name', address: 'Test address'});
      expect(entry.$delete()).to.be.rejectedWith(/Unable to delete/);

      resolvePromises();
    });

    it('removes the entry', function(done) {
      var initialLength = 0;

      Entry.find(1)
        .then(function(entry) {
          return entry.$delete();
        })
        .then(function(entries) {
          expect(localStorageService.get).to.have.been.called;
        })
        .then(done);

      resolvePromises();
    });

    it('syncs a cached list with a storage', function(done) {
      sinon.spy(localStorageService, 'set');

      Entry.find(1)
        .then(function(entry) {
          return entry.$delete();
        })
        .then(function() {
          expect(localStorageService.set).to.have.been.called;
        })
        .then(done);

      resolvePromises();
    });
  });

  describe('when add', function() {

    var entry = null;

    beforeEach(function() {
      entry = new Entry({name: 'Elmo Frazier', address: '4989 Proin Rd.'});
    });

    it('rejects the promise if the entry is not valid', function() {
      entry = new Entry();

      expect(entry.$save()).to.be.rejectedWith(/not valid/);

      resolvePromises();
    });

    it('returns the added entry', function() {
      expect(entry.$save()).to.be.fulfilled.and.eventually.be.an.instanceof(Entry);

      resolvePromises();
    });

    it('syncs with a storage', function(done) {
      sinon.spy(localStorageService, 'set');

      entry.$save()
        .then(function(entry) {
          expect(localStorageService.set).to.have.been.called;
        })
        .then(done);

      resolvePromises();
    });
  });

  describe('when udpate', function() {

    var entry = null;

    beforeEach(function() {
      entry = new Entry({name: 'Elmo Frazier', address: '4989 Proin Rd.'});
    });

    it('rejects the promise if the entry is not found', function() {
      var noSuchEntry = new Entry({id: 123, name: 'Elmo Frazier', address: '4989 Proin Rd.'});

      expect(noSuchEntry.$save()).to.be.rejectedWith(/Not found/);

      resolvePromises();
    });

    it('rejects the promise if the entry is not valid', function() {

      Entry.find(1)
        .then(function(entry) {
          entry.name = '';

          expect(entry.$save()).to.eventually.be.rejectedWith(/not valid/);
        });

      resolvePromises();
    });

    it('returns the updated entry', function() {
      Entry.find(1)
        .then(function(entry) {
          expect(entry.$save()).to.be.fulfilled.and.eventually.be.an.instanceof(Entry);
        });

      resolvePromises();
    });

    it('syncs with a storage', function(done) {
      sinon.spy(localStorageService, 'set');

      Entry.find(1)
        .then(function(entry) {
          return entry.$save();
        })
        .then(function() {
          expect(localStorageService.set).to.have.been.called;
        })
        .then(done);

      resolvePromises();
    });

  });
});
