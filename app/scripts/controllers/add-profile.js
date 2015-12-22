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

    $scope.checkValidDate = function()  {
      // console.log('dob in editProfile', $scope.screen.household.dob);

      $('.birthdate').on('change', function(){
        if ( $('.birthdate').val().indexOf('.') === -1 || $('.birthdate').val() == '' ) {
          console.log('invalid birthdate!');
          $scope.invalidbirth = true;

        } else {
          delete $scope.invalidbirth;
          console.log('valid birthdate', $scope.invalidbirth);
        }
      });
    };

    $timeout(function() {
      $scope.convertDate = function() {
        console.log('testing', $scope.screen.household.dob);
        var convertedDate = moment($scope.screen.household.dob).tz("America/Sao_Paulo").utc().format('YYYY-MM-DD').replace(/-/g, ".");
        $scope.convertedBirthDate = convertedDate;
      }
      $scope.convertDate();
    }, 1000);

    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'dd.MM.yyyy';

    $scope.status = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);

    $scope.events =
      [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

    // $scope.checkValidDate();
  }]);
