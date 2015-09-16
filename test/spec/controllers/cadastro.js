'use strict';

describe('Controller: CadastroCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var CadastroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CadastroCtrl = $controller('CadastroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CadastroCtrl.awesomeThings.length).toBe(3);
  });
});
