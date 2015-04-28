describe('addressbook', function() {
  var provider;

  beforeEach(module('addressbookApp', function(addressbookProvider) {
    provider = addressbookProvider;
  }));

  it('sets adapter name', inject(function() {
    provider.setAdapterName('myAdapter');

    expect(provider.getAdapterName()).to.equal('myAdapter');
  }));

  describe('$get', function() {

    it('throws an exception if adapter name is not specified', inject(function() {
      provider.setAdapterName(null);

      expect(function() { provider.$get(); }).to.throw(/not specified/);
    }));

    it('gets the instance of adapter from injector', inject(function() {
      var injector = {get: sinon.spy()};

      provider.$get(injector);

      expect(injector.get).to.have.been.calledWith(provider.getAdapterName());
    }));
  });
});




