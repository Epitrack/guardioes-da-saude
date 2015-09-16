'use strict';

describe('Controller: LoginEmailCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var LoginEmailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginEmailCtrl = $controller('LoginEmailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginEmailCtrl.awesomeThings.length).toBe(3);
  });
});
