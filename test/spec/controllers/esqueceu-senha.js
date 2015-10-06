'use strict';

describe('Controller: EsqueceuSenhaCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var EsqueceuSenhaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EsqueceuSenhaCtrl = $controller('EsqueceuSenhaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EsqueceuSenhaCtrl.awesomeThings.length).toBe(3);
  });
});
