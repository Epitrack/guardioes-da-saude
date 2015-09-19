'use strict';

describe('Service: healthTips', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var healthTips;
  beforeEach(inject(function (_healthTips_) {
    healthTips = _healthTips_;
  }));

  it('should do something', function () {
    expect(!!healthTips).toBe(true);
  });

});
