describe('ListCtrl', function () {
  'use strict';

  beforeEach(module('addressbookApp'));

  var ctrl, addressbook;

  beforeEach(inject(function ($controller, $rootScope, _addressbook_) {
    addressbook = _addressbook_;
    addressbook.reset();

    ctrl = $controller('ListCtrl', {addressbook: addressbook});
  }));

  it('sets search input to empty', function() {
    expect(ctrl.searchInput).to.equal('');
  });

  it('fetches the list of all addressbook entries', function() {
    expect(ctrl.addressbook.length).to.equal(9);
  });

  it('has ability to destroy entry', function() {
    sinon.spy(addressbook, 'destroy');

    ctrl.destroy(5);

    expect(addressbook.destroy).to.have.been.calledWith(5);
  });
});
