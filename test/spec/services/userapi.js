'use strict';

describe('Service: UserApi', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var UserApi;
  beforeEach(inject(function (_UserApi_) {
    UserApi = _UserApi_;
  }));

  it('should do something', function () {
    expect(!!UserApi).toBe(true);
  });

});
