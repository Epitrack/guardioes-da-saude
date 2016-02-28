'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:AddProfileCtrl
 * @description
 * # AddProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('AddProfileCtrl', ['$scope', 'HouseholdApi', 'toaster', '$timeout', '$location', '$rootScope', 'LocalStorage', function ($scope, HouseholdApi, toaster, $timeout, $location, $rootScope, LocalStorage) {
    $scope.pageClass = 'add-profile-page';

    // Add a new household member
    $scope.houseHold = {};

    $scope.addHousehold = function () {
      var params = {
        dob: $scope.UTIL.unConvertDate($scope.houseHold.dob),
        email: $scope.houseHold.email,
        gender: $scope.houseHold.gender,
        nick: $scope.houseHold.nick,
        race: $scope.houseHold.race,
        relationship: $scope.houseHold.relationship,
        picture: $scope.UTIL.checkAvatar($scope.houseHold)
      };
        console.log("====== picture", params.picture)
      var age = $scope.UTIL.getAge(params.dob, false);
      
      $scope.invalid = '';

      if (LocalStorage.getItem('dobValid') !== true || age < 0) {
            $scope.invalid = true;
            return;
      }

      HouseholdApi.createHousehold(params, function (data) {
        if (data.data.error === true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);

          $timeout(function () {
              $location.path('/health-daily');
            },
            400);
        }
      });
    };
    // ====

    // add a new household member in survey page
    $scope.addHouseholdModal = function () {
      var params = {
        dob: $scope.UTIL.unConvertDate($scope.houseHold.dob),
        email: $scope.houseHold.email,
        gender: $scope.houseHold.gender,
        nick: $scope.houseHold.nick,
        race: $scope.houseHold.race,
        relationship: $scope.houseHold.relationship,
        picture: $scope.UTIL.checkAvatar($scope.houseHold)
      };
        console.log("====== picture", params.picture)
      var age = $scope.UTIL.getAge(params.dob, false);

      $scope.invalid = '';
      if (LocalStorage.getItem('dobValid') !== true) {
          $scope.invalid = true;
          return;
      }

      HouseholdApi.createHousehold(params, function (data) {
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
          $scope.houseHold = {};

          hideModal();
        }
      });
    };

    function hideModal() {
      $('#modal-add-profile').modal('toggle');
    }

    // ====

  }]);
