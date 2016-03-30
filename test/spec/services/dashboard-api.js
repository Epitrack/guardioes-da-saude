'use strict';

describe('Service: DashboardApi', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var DashboardApi;
  beforeEach(inject(function (_DashboardApi_) {
    DashboardApi = _DashboardApi_;
  }));

  it('should do something', function () {
    expect(!!DashboardApi).toBe(true);
  });

});
