'use strict';

describe('Controller: ChooseSymptomsCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var ChooseSymptomsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChooseSymptomsCtrl = $controller('ChooseSymptomsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChooseSymptomsCtrl.awesomeThings.length).toBe(3);
  });
});
