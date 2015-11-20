'use strict';

describe('Service: SearchCitiesApi', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var SearchCitiesApi;
  beforeEach(inject(function (_SearchCitiesApi_) {
    SearchCitiesApi = _SearchCitiesApi_;
  }));

  it('should do something', function () {
    expect(!!SearchCitiesApi).toBe(true);
  });

});
