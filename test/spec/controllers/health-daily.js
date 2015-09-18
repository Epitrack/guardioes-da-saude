'use strict';

describe('Controller: HealthDailyCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var HealthDailyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HealthDailyCtrl = $controller('HealthDailyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HealthDailyCtrl.awesomeThings.length).toBe(3);
  });
});
