describe('PREDEFINED_LIST', function () {
  'use strict';

  beforeEach(module('app.addressbook'));

  var PREDEFINED_LIST;
  beforeEach(inject(function (_PREDEFINED_LIST_) {
    PREDEFINED_LIST = _PREDEFINED_LIST_;
  }));

  it('has list with 9 entries by default', function() {
    expect(PREDEFINED_LIST).to.have.length(9);
  });
});
