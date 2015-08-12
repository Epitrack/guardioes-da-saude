'use strict';

describe('Controller: NoticiasCtrl', function () {

  // load the controller's module
  beforeEach(module('guardioesDaSaudeApp'));

  var NoticiasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoticiasCtrl = $controller('NoticiasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NoticiasCtrl.awesomeThings.length).toBe(3);
  });
});
