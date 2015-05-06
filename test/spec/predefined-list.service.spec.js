describe('predefinedList', function () {
  'use strict';

  beforeEach(module('addressbookApp'));

  var predefinedList;
  beforeEach(inject(function (_predefinedList_) {
    predefinedList = _predefinedList_;
  }));

  it('has list with 9 entries by default', function() {
    expect(predefinedList).to.have.length(9);
  });
});
