'use strict';

describe('ListCtrl', function () {

  beforeEach(module('addressbookApp'));

  var ctrl, addressbook;

  beforeEach(inject(function ($controller, $rootScope, _addressbook_) {
    addressbook = _addressbook_;
    addressbook.reset();

    ctrl = $controller('ListCtrl', {addressbook: addressbook});
  }));

  it('sets search input to empty', function() {
    expect(ctrl.searchInput).toBe('');
  });

  it('fetches the list of all addressbook entries', function() {
    expect(ctrl.addressbook.length).toBe(9);
  });

  it('has ability to destroy entry', function() {
    spyOn(addressbook, 'destroy');

    ctrl.destroy(5);

    expect(addressbook.destroy).toHaveBeenCalledWith(5);
  });
});
