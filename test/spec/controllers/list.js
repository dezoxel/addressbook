'use strict';

describe('ListCtrl', function () {

  beforeEach(module('addressbookApp'));

  var listCtrl, Addressbook;

  beforeEach(inject(function ($controller, $rootScope, _Addressbook_) {
    Addressbook = _Addressbook_;

    listCtrl = $controller('ListCtrl', {Addressbook: Addressbook});
  }));

  it('sets search input to empty', function() {
    expect(listCtrl.searchInput).toBe('');
  });

  it('fetches the list of all addressbook entries', function() {
    expect(listCtrl.addressbook.length).toBe(9);
  });

  it('has ability to destroy entry', function() {
    spyOn(Addressbook, 'destroy');

    listCtrl.destroy(5);

    expect(Addressbook.destroy).toHaveBeenCalledWith(5);
  });
});
