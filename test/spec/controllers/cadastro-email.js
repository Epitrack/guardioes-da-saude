'use strict';

describe('Controller: CadastroEmailCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var CadastroEmailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CadastroEmailCtrl = $controller('CadastroEmailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CadastroEmailCtrl.awesomeThings.length).toBe(3);
  });
});
