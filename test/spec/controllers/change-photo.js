'use strict';

describe('Controller: ChangePhotoCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var ChangePhotoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangePhotoCtrl = $controller('ChangePhotoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChangePhotoCtrl.awesomeThings.length).toBe(3);
  });
});
