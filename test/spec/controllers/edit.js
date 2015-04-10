describe('EditCtrl', function () {
  'use strict';

  var ctrl, $location, addressbook;

  beforeEach(module('addressbookApp'));

  beforeEach(function() {
    $location = {path: sinon.spy()};
  });

  describe('when add', function() {

    var entry = {};

    beforeEach(inject(function ($controller) {
      addressbook = {add: sinon.spy()};

      ctrl = $controller('EditCtrl', {
        addressbook: addressbook,
        $routeParams: {},
        $location: $location
      });

      entry = {name: 'Elmo Leonard', address: '123-7745 Vehicula Road'};
    }));

    it('inits the controller with empty hash entry', function() {
      expect(ctrl.entry).to.deep.equal({});
    });

    it('adds entry to the list', function() {
      ctrl.add(entry);

      expect(addressbook.add).to.have.been.calledWith(entry);
    });

    it('redirects to the list controller', function() {
      ctrl.add(entry);

      expect($location.path).to.have.been.calledWith('/');
    });
  });

  describe('when edit', function() {

    var entry = {};

    beforeEach(inject(function ($controller, _addressbook_) {
      addressbook = _addressbook_;

      sinon.spy(addressbook, 'update');

      ctrl = $controller('EditCtrl', {
        addressbook: addressbook,
        $routeParams: {id: 1},
        $location: $location
      });

      entry = {id: 5, name: 'Elmo Leonard', address: '123-7745 Vehicula Road'};
    }));

    it('fetches entry from the storage by id from the route params', function() {
      expect(ctrl.entry).to.deep.equal({
        'id': 1,
        'name': 'Laura Morin',
        'address': 'P.O. Box 825, 7962 Ante, Ave'
      });
    });

    it('updates entry in the list', function() {
      ctrl.edit(entry);

      expect(addressbook.update).to.have.been.calledWith(entry);
    });

    it('redirects to the list controller', function() {
      ctrl.edit(entry);

      expect($location.path).to.have.been.calledWith('/');
    });

    describe('when record is not found', function() {

      beforeEach(inject(function($controller) {

        ctrl = $controller('EditCtrl', {
          addressbook: addressbook,
          $routeParams: {id: 999},
          $location: $location
        });
      }));

      it('redirects to the list', function() {
        expect($location.path).to.have.been.calledWith('/');
      });
    });
  });

  describe('when destroy', function() {

    beforeEach(inject(function ($controller) {
      addressbook = {destroy: sinon.spy()};

      ctrl = $controller('EditCtrl', {
        addressbook: addressbook,
        $routeParams: {},
        $location: $location
      });
    }));

    it('destroys entry', function() {
      ctrl.destroy(1);

      expect(addressbook.destroy).to.have.been.calledWith(1);
    });

    it('redirects to the list controller', function() {
      ctrl.destroy(1);

      expect($location.path).to.have.been.calledWith('/');
    });
  });

});