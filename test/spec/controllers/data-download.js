'use strict';

describe('Controller: DataDownloadCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var DataDownloadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataDownloadCtrl = $controller('DataDownloadCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DataDownloadCtrl.awesomeThings.length).toBe(3);
  });
});
