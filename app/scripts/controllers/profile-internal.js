'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileInternalCtrl
 * @description
 * # ProfileInternalCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ProfileInternalCtrl', ['$scope', '$routeParams', 'HouseholdApi', '$rootScope', 'toaster', '$filter', '$timeout', function ($scope, $routeParams, HouseholdApi, $rootScope, toaster, $filter, $timeout) {

    var meuFiltro = $filter;

    var userStorage = $rootScope.user;
    var userID = userStorage.id;

    $scope.getHousehold = function() {

      $scope.screen = {};

      HouseholdApi.getHousehold(userID, function(data) {
        $scope.screen.household = meuFiltro('filter')(data.data.data, {
          id: $routeParams.id
        })[0];

        var hh = $scope.screen.household;
        console.log('hh in getHousehold', hh);
        $scope.screen.household = {
          nick: hh.nick,
          dob: hh.dob,
          gender: hh.gender,
          email: hh.email,
          race: hh.race,
          id: hh.id,
          password: ""
        };

        return console.warn('$scope.screen.household in getHousehold ', $scope.screen.household);
      });
    };

    $scope.editProfile = function() {
      $scope.screen.household.dob = moment($scope.dt).tz("America/Sao_Paulo").utc().format('YYYY-MM-DD');

      if($scope.screen.household.password == "" || $scope.screen.household.password != $scope.screen.repeatPassword) {
        delete $scope.screen.household.password;
      }

      if ($scope.invalidbirth) {
        console.log('invalid birthdate!');
        return false;
      }

      HouseholdApi.updateProfile($scope.screen.household, function(data) {
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
        }
      });

      $scope.getHousehold();
    };

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

    // Disable weekend selection
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

    $timeout(function() {         
      $scope.convertDate = function() {
        console.log('testing', $scope.screen.household.dob);
        var convertedDate = moment($scope.screen.household.dob).tz("America/Sao_Paulo").utc().format('DD.MM.YYYY').replace(/-/g, ".");
        $scope.convertedBirthDate = convertedDate;
      }
      $scope.convertDate();
    }, 1000); 
      
    
    $scope.getHousehold();
    $scope.checkValidDate();
  }]);
