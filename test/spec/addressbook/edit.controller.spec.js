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
      AddressbookEntry: AddressbookEntry,
      $routeParams: {},
      $location: $location
    });
  }

  function editController() {
    return $controller('EditController', {
      AddressbookEntry: AddressbookEntry,
      $routeParams: {id: 1},
      $location: $location
    });
  }

  function resolvePromises() {
    $rootScope.$digest();
  }

  var ctrl, $location, addressbook, $rootScope, $q, $controller, AddressbookEntry;

  beforeEach(module('app.addressbook'));

  beforeEach(inject(function(_$q_, _$rootScope_, _$controller_, _AddressbookEntry_) {
    $location = {path: sinon.spy()};
    $q = _$q_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    AddressbookEntry = _AddressbookEntry_;
  }));

  describe('when add', function() {

    var entry = null;

    beforeEach(function() {
      addressbook = {add: fulfilledPromise()};

      ctrl = addController();

      entry = new AddressbookEntry({name: 'Elmo Leonard', address: '123-7745 Vehicula Road'});
    });

    it('inits the controller with an empty entry', function() {
      expect(ctrl.entry.isNew()).to.be.true;
    });

    it('adds entry to the list', function() {
      ctrl.entry = {$save: fulfilledPromise()};
      ctrl.save();

      expect(ctrl.entry.$save).to.have.been.called;
    });

    it('redirects to the list controller', function(done) {
      ctrl.entry = {$save: fulfilledPromise()};

      ctrl.save()
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

      AddressbookEntry = function() {};
      AddressbookEntry.find = fulfilledPromise(entry);

      ctrl = editController();
      ctrl.entry = {$save: fulfilledPromise()};
    });

    it('fetches entry from the storage by id from the route params', function() {

      expect(AddressbookEntry.find).to.have.been.called;
    });

    it('stores the entry in controller\'s member', function(done) {
      ctrl.fetchEntryBy(1)
        .then(function() {
          expect(ctrl.entry).to.deep.equal(entry);
        })
        .then(done);

        resolvePromises();
    });

    it('updates entry in the list', function() {
      ctrl.save();

      expect(ctrl.entry.$save).to.have.been.called;
    });

    it('redirects to the list controller', function(done) {
      ctrl.save()
        .then(function() {
          expect($location.path).to.have.been.calledWith('/');
        })
        .then(done);

        resolvePromises();
    });

    describe('when record is not found', function() {

      beforeEach(function() {
        ctrl = addController();
      });

      it('redirects to the list', function(done) {
        AddressbookEntry.find = rejectedPromise();

        ctrl.fetchEntryBy(999)
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
      ctrl = addController();
      ctrl.entry = {$delete: fulfilledPromise()};
    });

    it('deletes entry', function() {
      ctrl.delete();

      expect(ctrl.entry.$delete).to.have.been.called;
    });

    it('redirects to the list controller', function(done) {
      ctrl.delete()
        .then(function() {
          expect($location.path).to.have.been.calledWith('/');
        })
        .then(done);

        resolvePromises();
    });
  });

});