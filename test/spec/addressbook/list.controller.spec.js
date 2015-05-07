describe('ListController', function () {
  'use strict';

  function resolvePromises() {
    $rootScope.$digest();
  }

  function fulfilledPromise(args) {
    return sinon.stub().returns($q(function(resolve, reject) {
      resolve(args);
    }))
  }

  beforeEach(module('app.addressbook'));

  var ctrl, AddressbookEntry, $rootScope, $q;

  beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
    $rootScope = _$rootScope_;
    $q = _$q_;

    AddressbookEntry = function() {};
    AddressbookEntry.all = fulfilledPromise([1,2,3]);

    ctrl = $controller('ListController', {AddressbookEntry: AddressbookEntry});
  }));

  it('sets search input to empty', function() {
    expect(ctrl.searchInput).to.equal('');
  });

  it('fetches the list of all addressbook entries', function() {
    expect(AddressbookEntry.all).to.have.been.called;
  });

  it('stores the list of entries in controller member', function(done) {

    ctrl.fetchList().then(function() {
      expect(ctrl.entries).to.deep.equal([1,2,3]);
    })
    .then(done);

    resolvePromises();
  });

  it('has ability to delete entry', function() {
    var entry = {$delete: fulfilledPromise()};

    ctrl.delete(entry);

    expect(entry.$delete).to.have.been.called;
  });
});
