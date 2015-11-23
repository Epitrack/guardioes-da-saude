'use strict';

describe('Controller: TemplateEmailEsqueciSenhaCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var TemplateEmailEsqueciSenhaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TemplateEmailEsqueciSenhaCtrl = $controller('TemplateEmailEsqueciSenhaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TemplateEmailEsqueciSenhaCtrl.awesomeThings.length).toBe(3);
  });
});
