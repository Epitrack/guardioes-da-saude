'use strict';

describe('Controller: ProfileInternalCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var ProfileInternalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileInternalCtrl = $controller('ProfileInternalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileInternalCtrl.awesomeThings.length).toBe(3);
  });
});
