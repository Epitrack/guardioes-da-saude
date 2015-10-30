'use strict';

describe('Controller: DashboardMapCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var DashboardMapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardMapCtrl = $controller('DashboardMapCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashboardMapCtrl.awesomeThings.length).toBe(3);
  });
});
