'use strict';

describe('Controller: SobreCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var SobreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SobreCtrl = $controller('SobreCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SobreCtrl.awesomeThings.length).toBe(3);
  });
});
