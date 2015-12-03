'use strict';

describe('Controller: SlideshowCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var SlideshowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SlideshowCtrl = $controller('SlideshowCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SlideshowCtrl.awesomeThings.length).toBe(3);
  });
});
