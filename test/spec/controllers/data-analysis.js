'use strict';

describe('Controller: DataAnalysisCtrl', function () {

  // load the controller's module
  beforeEach(module('gdsApp'));

  var DataAnalysisCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataAnalysisCtrl = $controller('DataAnalysisCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DataAnalysisCtrl.awesomeThings.length).toBe(3);
  });
});
