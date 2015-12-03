'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:AddProfileCtrl
 * @description
 * # AddProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('AddProfileCtrl', ['$scope', 'HouseholdApi', 'toaster', '$timeout', '$location', function ($scope, HouseholdApi, toaster, $timeout, $location) {
    $scope.pageClass = 'add-profile-page';

    $scope.houseHold = {};

    $scope.addHousehold = function() {
      console.log($scope.houseHold);

      HouseholdApi.createHousehold($scope.houseHold, function(data) {
        // return console.log(data.data.member);

        if (data.data.error == true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);

          $timeout(function(){
            $location.path('/health-daily');
          },
          400);
        }
      });
    };

    // add household in survey page
    $scope.addHouseholdModal = function() {
      console.log($scope.houseHold);

      HouseholdApi.createHousehold($scope.houseHold, function(data) {
        // return console.log(data.data.member);

        if (data.data.error == true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);

          hideModal();
          // updateScope(data.data.member);
        }
      });
    };

    function hideModal() {
      $('#modal-add-profile').modal('toggle');
    };

    function updateScope(member) {
      $scope.$apply(function() {
        $scope.screen.user.household(member);
      });
    }



  }]);
