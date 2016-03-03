'use strict';

describe('Directive: uploadFile', function () {

  // load the directive's module
  beforeEach(module('gdsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<upload-file></upload-file>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the uploadFile directive');
  }));
});
