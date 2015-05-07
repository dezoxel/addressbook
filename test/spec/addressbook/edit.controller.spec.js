describe('EditController', function () {
  'use strict';

  function fulfilledPromise(entry) {
    return sinon.stub().returns($q(function(resolve) {
      resolve(entry);
    }))
  }

  function rejectedPromise(entry) {
    return sinon.stub().returns($q(function(resolve, reject) {
      reject(entry);
    }))
  }

  function addController() {
    return $controller('EditController', {
      Entry: Entry,
      $routeParams: {},
      $location: $location
    });
  }

  function editController() {
    return $controller('EditController', {
      Entry: Entry,
      $routeParams: {id: 1},
      $location: $location
    });
  }

  function resolvePromises() {
    $rootScope.$digest();
  }

  var vm, $location, addressbook, $rootScope, $q, $controller, Entry;

  beforeEach(module('app.addressbook'));

  beforeEach(inject(function(_$q_, _$rootScope_, _$controller_, _Entry_) {
    $location = {path: sinon.spy()};
    $q = _$q_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    Entry = _Entry_;
  }));

  describe('when add', function() {

    var entry = null;

    beforeEach(function() {
      addressbook = {add: fulfilledPromise()};

      vm = addController();

      entry = new Entry({name: 'Elmo Leonard', address: '123-7745 Vehicula Road'});
    });

    it('inits the controller with an empty entry', function() {
      expect(vm.entry.isNew()).to.be.true;
    });

    it('adds entry to the list', function() {
      vm.entry = {$save: fulfilledPromise()};
      vm.save();

      expect(vm.entry.$save).to.have.been.called;
    });

    it('redirects to the list controller', function(done) {
      vm.entry = {$save: fulfilledPromise()};

      vm.save()
        .then(function() {
          expect($location.path).to.have.been.calledWith('/');
        })
        .then(done);

      resolvePromises();
    });
  });

  describe('when edit', function() {

    var entry = {};

    beforeEach(function () {

      entry = {id: 1, name: 'Elmo Leonard', address: '123-7745 Vehicula Road'};

      Entry = function() {};
      Entry.find = fulfilledPromise(entry);

      vm = editController();
      vm.entry = {$save: fulfilledPromise()};
    });

    it('fetches entry from the storage by id from the route params', function() {

      expect(Entry.find).to.have.been.called;
    });

    it('stores the entry in controller\'s member', function(done) {
      vm.fetchEntryBy(1)
        .then(function() {
          expect(vm.entry).to.deep.equal(entry);
        })
        .then(done);

        resolvePromises();
    });

    it('updates entry in the list', function() {
      vm.save();

      expect(vm.entry.$save).to.have.been.called;
    });

    it('redirects to the list controller', function(done) {
      vm.save()
        .then(function() {
          expect($location.path).to.have.been.calledWith('/');
        })
        .then(done);

        resolvePromises();
    });

    describe('when record is not found', function() {

      beforeEach(function() {
        vm = addController();
      });

      it('redirects to the list', function(done) {
        Entry.find = rejectedPromise();

        vm.fetchEntryBy(999)
          .then(function() {
            expect($location.path).to.have.been.calledWith('/');
          })
          .then(done);

        resolvePromises();
      });
    });
  });

  describe('when delete', function() {

    beforeEach(function () {
      vm = addController();
      vm.entry = {$delete: fulfilledPromise()};
    });

    it('deletes entry', function() {
      vm.delete();

      expect(vm.entry.$delete).to.have.been.called;
    });

    it('redirects to the list controller', function(done) {
      vm.delete()
        .then(function() {
          expect($location.path).to.have.been.calledWith('/');
        })
        .then(done);

        resolvePromises();
    });
  });

});