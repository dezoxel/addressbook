describe('MongoLabAdapter', function () {
  'use strict';

  beforeEach(module('addressbookApp'));

  // instantiate service
  var MongoLabAdapter;
  beforeEach(inject(function (_MongoLabAdapter_) {
    MongoLabAdapter = _MongoLabAdapter_;
  }));

  it('should do something', function () {
    expect(!!MongoLabAdapter).to.be.true;
  });

});
