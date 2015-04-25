describe('EditCtrl', function () {
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
    return $controller('EditCtrl', {
      addressbook: addressbook,
      $routeParams: {},
      $location: $location
    });
  }

  function editController() {
    return $controller('EditCtrl', {
      addressbook: addressbook,
      $routeParams: {id: 1},
      $location: $location
    });
  }

  function resolvePromises() {
    $rootScope.$digest();
  }

  var ctrl, $location, addressbook, $rootScope, $q, $controller;

  beforeEach(module('addressbookApp'));

  beforeEach(inject(function(_$q_, _$rootScope_, _$controller_) {
    $location = {path: sinon.spy()};
    $q = _$q_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('when add', function() {

    var entry = {};

    beforeEach(function() {
      addressbook = {add: fulfilledPromise()};

      ctrl = addController();

      entry = {name: 'Elmo Leonard', address: '123-7745 Vehicula Road'};
    });

    it('inits the controller with empty hash entry', function() {
      expect(ctrl.entry).to.deep.equal({});
    });

    it('adds entry to the list', function() {
      ctrl.add(entry);

      expect(addressbook.add).to.have.been.calledWith(entry);
    });

    it('redirects to the list controller', function(done) {
      ctrl.add(entry)
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

      addressbook = {
        find: fulfilledPromise(entry),
        update: fulfilledPromise(entry)
      };

      ctrl = editController();
    });

    it('fetches entry from the storage by id from the route params', function() {
      expect(addressbook.find).to.have.been.called;
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
      ctrl.edit(entry);

      expect(addressbook.update).to.have.been.calledWith(entry);
    });

    it('redirects to the list controller', function(done) {
      ctrl.edit(entry)
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
        addressbook.find = rejectedPromise();

        ctrl.fetchEntryBy(999)
          .then(function() {
            expect($location.path).to.have.been.calledWith('/');
          })
          .then(done);

        resolvePromises();
      });
    });
  });

  describe('when destroy', function() {

    beforeEach(function () {
      addressbook = {destroy: fulfilledPromise()};

      ctrl = addController();
    });

    it('destroys entry', function() {
      ctrl.destroy(1);

      expect(addressbook.destroy).to.have.been.calledWith(1);
    });

    it('redirects to the list controller', function(done) {
      ctrl.destroy(1)
        .then(function() {
          expect($location.path).to.have.been.calledWith('/');
        })
        .then(done);

      resolvePromises();
    });
  });

});