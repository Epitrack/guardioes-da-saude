'use strict';

describe('Service: noticias', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var noticias;
  beforeEach(inject(function (_noticias_) {
    noticias = _noticias_;
  }));

  it('should do something', function () {
    expect(!!noticias).toBe(true);
  });

});
