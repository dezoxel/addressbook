'use strict';

describe('ListCtrl', function () {

  beforeEach(module('addressbookApp'));

  var ctrl, Addressbook;

  beforeEach(inject(function ($controller, $rootScope, _Addressbook_) {
    Addressbook = _Addressbook_;
    Addressbook.reset();

    ctrl = $controller('ListCtrl', {Addressbook: Addressbook});
  }));

  it('sets search input to empty', function() {
    expect(ctrl.searchInput).toBe('');
  });

  it('fetches the list of all addressbook entries', function() {
    expect(ctrl.addressbook.length).toBe(9);
  });

  it('has ability to destroy entry', function() {
    spyOn(Addressbook, 'destroy');

    ctrl.destroy(5);

    expect(Addressbook.destroy).toHaveBeenCalledWith(5);
  });
});
