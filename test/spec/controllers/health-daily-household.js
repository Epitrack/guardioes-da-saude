'use strict';

describe('Controller: HealthDailyHouseholdCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var HealthDailyHouseholdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HealthDailyHouseholdCtrl = $controller('HealthDailyHouseholdCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HealthDailyHouseholdCtrl.awesomeThings.length).toBe(3);
  });
});
