'use strict';

describe('Controller: Component01Ctrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var Component01Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Component01Ctrl = $controller('Component01Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Component01Ctrl.awesomeThings.length).toBe(3);
  });
});
