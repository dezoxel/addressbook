describe('ListCtrl', function () {
  'use strict';

  function resolvePromises() {
    $rootScope.$digest();
  }

  function fulfilledPromise(args) {
    return sinon.stub().returns($q(function(resolve, reject) {
      resolve(args);
    }))
  }

  beforeEach(module('addressbookApp'));

  var ctrl, addressbook, $rootScope, $q;

  beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
    $rootScope = _$rootScope_;
    $q = _$q_;

    addressbook = {
      all: fulfilledPromise([1,2,3]),
      destroy: sinon.spy()
    };

    ctrl = $controller('ListCtrl', {addressbook: addressbook});
  }));

  it('sets search input to empty', function() {
    expect(ctrl.searchInput).to.equal('');
  });

  it('fetches the list of all addressbook entries', function() {
    expect(addressbook.all).to.have.been.called;
  });

  it('stores the list of entries in controller member', function(done) {

    ctrl.fetchList().then(function() {
      expect(ctrl.addressbook).to.deep.equal([1,2,3]);
    })
    .then(done);

    resolvePromises();
  });

  it('has ability to destroy entry', function() {
    ctrl.destroy(5);

    expect(addressbook.destroy).to.have.been.calledWith(5);
  });
});
