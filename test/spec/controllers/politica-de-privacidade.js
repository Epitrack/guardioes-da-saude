'use strict';

describe('Controller: PoliticaDePrivacidadeCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var PoliticaDePrivacidadeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PoliticaDePrivacidadeCtrl = $controller('PoliticaDePrivacidadeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PoliticaDePrivacidadeCtrl.awesomeThings.length).toBe(3);
  });
});
