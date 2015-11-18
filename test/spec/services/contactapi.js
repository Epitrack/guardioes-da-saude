'use strict';

describe('Service: ContactApi', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var ContactApi;
  beforeEach(inject(function (_ContactApi_) {
    ContactApi = _ContactApi_;
  }));

  it('should do something', function () {
    expect(!!ContactApi).toBe(true);
  });

});
