'use strict';

describe('Controller: HealthTipsCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var HealthTipsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HealthTipsCtrl = $controller('HealthTipsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HealthTipsCtrl.awesomeThings.length).toBe(3);
  });
});
