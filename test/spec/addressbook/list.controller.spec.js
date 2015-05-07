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

  var vm, Entry, $rootScope, $q;

  beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
    $rootScope = _$rootScope_;
    $q = _$q_;

    Entry = function() {};
    Entry.all = fulfilledPromise([1,2,3]);

    vm = $controller('ListController', {Entry: Entry});
  }));

  it('sets search input to empty', function() {
    expect(vm.searchInput).to.equal('');
  });

  it('fetches the list of all addressbook entries', function() {
    expect(Entry.all).to.have.been.called;
  });

  it('stores the list of entries in controller member', function(done) {

    vm.fetchList().then(function() {
      expect(vm.entries).to.deep.equal([1,2,3]);
    })
    .then(done);

    resolvePromises();
  });

  it('has ability to delete entry', function() {
    var entry = {$delete: fulfilledPromise()};

    vm.delete(entry);

    expect(entry.$delete).to.have.been.called;
  });
});
