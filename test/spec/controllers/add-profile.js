'use strict';

describe('Controller: AddProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var AddProfileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddProfileCtrl = $controller('AddProfileCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddProfileCtrl.awesomeThings.length).toBe(3);
  });
});
