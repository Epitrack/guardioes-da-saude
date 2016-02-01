'use strict';

describe('Controller: TestandoCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var TestandoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestandoCtrl = $controller('TestandoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TestandoCtrl.awesomeThings.length).toBe(3);
  });
});
