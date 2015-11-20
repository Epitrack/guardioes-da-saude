'use strict';

describe('Controller: EsqueciMinhaSenhaCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var EsqueciMinhaSenhaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EsqueciMinhaSenhaCtrl = $controller('EsqueciMinhaSenhaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EsqueciMinhaSenhaCtrl.awesomeThings.length).toBe(3);
  });
});
