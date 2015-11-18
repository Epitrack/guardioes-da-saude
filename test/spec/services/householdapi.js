'use strict';

describe('Service: HouseholdApi', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var HouseholdApi;
  beforeEach(inject(function (_HouseholdApi_) {
    HouseholdApi = _HouseholdApi_;
  }));

  it('should do something', function () {
    expect(!!HouseholdApi).toBe(true);
  });

});
