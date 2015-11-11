'use strict';

describe('Service: surveyapi', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var surveyapi;
  beforeEach(inject(function (_surveyapi_) {
    surveyapi = _surveyapi_;
  }));

  it('should do something', function () {
    expect(!!surveyapi).toBe(true);
  });

});
