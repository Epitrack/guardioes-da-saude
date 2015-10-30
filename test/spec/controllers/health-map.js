'use strict';

describe('Controller: HealthMapCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var HealthMapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HealthMapCtrl = $controller('HealthMapCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HealthMapCtrl.awesomeThings.length).toBe(3);
  });
});
