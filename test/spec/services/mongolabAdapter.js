'use strict';

describe('Service: mongolabAdapter', function () {

  // load the service's module
  beforeEach(module('addressbookApp'));

  // instantiate service
  var mongolabAdapter;
  beforeEach(inject(function (_mongolabAdapter_) {
    mongolabAdapter = _mongolabAdapter_;
  }));

  it('should do something', function () {
    expect(!!mongolabAdapter).to.be.true;
  });

});
