'use strict';

describe('Filter: getMonth', function () {

  // load the filter's module
  beforeEach(module('gdsApp'));

  // initialize a new instance of the filter before each test
  var getMonth;
  beforeEach(inject(function ($filter) {
    getMonth = $filter('getMonth');
  }));

  it('should return the input prefixed with "getMonth filter:"', function () {
    var text = 'angularjs';
    expect(getMonth(text)).toBe('getMonth filter: ' + text);
  });

});
