'use strict';

describe('Controller: DashboardResultCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var DashboardResultCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardResultCtrl = $controller('DashboardResultCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashboardResultCtrl.awesomeThings.length).toBe(3);
  });
});
