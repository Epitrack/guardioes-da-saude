'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:AddProfileCtrl
 * @description
 * # AddProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('AddProfileCtrl', ['$scope', 'HouseholdApi', 'toaster', function ($scope, HouseholdApi, toaster) {
    $scope.pageClass = 'add-profile-page';

    $scope.houseHold = {};

    $scope.addHousehold = function() {
      HouseholdApi.createHousehold($scope.houseHold, function(data) {
        if (data.data.error != false) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
        }
      });
    }

  }]);
