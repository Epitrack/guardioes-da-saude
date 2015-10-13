'use strict';

describe('Controller: HowAreYouFeelingCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var HowAreYouFeelingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HowAreYouFeelingCtrl = $controller('HowAreYouFeelingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HowAreYouFeelingCtrl.awesomeThings.length).toBe(3);
  });
});
