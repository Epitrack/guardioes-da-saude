'use strict';

describe('Controller: FaleConoscoCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var FaleConoscoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FaleConoscoCtrl = $controller('FaleConoscoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FaleConoscoCtrl.awesomeThings.length).toBe(3);
  });
});
