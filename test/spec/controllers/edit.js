describe('EditCtrl', function () {
  'use strict';

  var ctrl, $location, addressbook;

  beforeEach(module('addressbookApp'));

  beforeEach(function() {
    $location = jasmine.createSpyObj('$location', ['path']);
  });

  describe('when add', function() {

    var entry = {};

    beforeEach(inject(function ($controller) {
      addressbook = jasmine.createSpyObj('addressbook', ['add']);

      ctrl = $controller('EditCtrl', {
        addressbook: addressbook,
        $routeParams: {},
        $location: $location
      });

      entry = {name: 'Elmo Leonard', address: '123-7745 Vehicula Road'};
    }));

    it('inits the controller with empty hash entry', function() {
      expect(ctrl.entry).toEqual({});
    });

    it('adds entry to the list', function() {
      ctrl.add(entry);

      expect(addressbook.add).toHaveBeenCalledWith(entry);
    });

    it('redirects to the list controller', function() {
      ctrl.add(entry);

      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

  describe('when edit', function() {

    var entry = {};

    beforeEach(inject(function ($controller, _addressbook_) {
      addressbook = _addressbook_;

      spyOn(addressbook, 'update');

      ctrl = $controller('EditCtrl', {
        addressbook: addressbook,
        $routeParams: {id: 1},
        $location: $location
      });

      entry = {id: 5, name: 'Elmo Leonard', address: '123-7745 Vehicula Road'};
    }));

    it('fetches entry from the storage by id from the route params', function() {
      expect(ctrl.entry).toEqual({
        'id': 1,
        'name': 'Laura Morin',
        'address': 'P.O. Box 825, 7962 Ante, Ave'
      });
    });

    it('updates entry in the list', function() {
      ctrl.edit(entry);

      expect(addressbook.update).toHaveBeenCalledWith(entry);
    });

    it('redirects to the list controller', function() {
      ctrl.edit(entry);

      expect($location.path).toHaveBeenCalledWith('/');
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
        expect($location.path).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('when destroy', function() {

    beforeEach(inject(function ($controller) {
      addressbook = jasmine.createSpyObj('addressbook', ['destroy']);

      ctrl = $controller('EditCtrl', {
        addressbook: addressbook,
        $routeParams: {},
        $location: $location
      });
    }));

    it('destroys entry', function() {
      ctrl.destroy(1);

      expect(addressbook.destroy).toHaveBeenCalledWith(1);
    });

    it('redirects to the list controller', function() {
      ctrl.destroy(1);

      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

});