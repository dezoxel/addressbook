'use strict';

describe('Service: localstorageAdapter', function () {

  // load the service's module
  beforeEach(module('addressbookApp'));

  // instantiate service
  var localstorageAdapter;
  beforeEach(inject(function (_localstorageAdapter_) {
    localstorageAdapter = _localstorageAdapter_;
  }));

  it('should do something', function () {
    expect(!!localstorageAdapter).toBe(true);
  });

});
