'use strict';

describe('EditCtrl', function () {

  var ctrl, $location, Addressbook;

  beforeEach(module('addressbookApp'));

  beforeEach(function() {
    $location = jasmine.createSpyObj('$location', ['path']);
  });

  describe('when add', function() {

    var entry = {};

    beforeEach(inject(function ($controller) {
      Addressbook = jasmine.createSpyObj('Addressbook', ['add']);

      ctrl = $controller('EditCtrl', {
        Addressbook: Addressbook,
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

      expect(Addressbook.add).toHaveBeenCalledWith(entry);
    });

    it('redirects to the list controller', function() {
      ctrl.add(entry);

      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

  describe('when edit', function() {

    var entry = {};

    beforeEach(inject(function ($controller, _Addressbook_) {
      Addressbook = _Addressbook_;

      spyOn(Addressbook, 'update');

      ctrl = $controller('EditCtrl', {
        Addressbook: Addressbook,
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

      expect(Addressbook.update).toHaveBeenCalledWith(entry);
    });

    it('redirects to the list controller', function() {
      ctrl.edit(entry);

      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

  describe('when destroy', function() {

    beforeEach(inject(function ($controller) {
      Addressbook = jasmine.createSpyObj('Addressbook', ['destroy']);

      ctrl = $controller('EditCtrl', {
        Addressbook: Addressbook,
        $routeParams: {},
        $location: $location
      });
    }));

    it('destroys entry', function() {
      ctrl.destroy(1);

      expect(Addressbook.destroy).toHaveBeenCalledWith(1);
    });

    it('redirects to the list controller', function() {
      ctrl.destroy(1);

      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

});