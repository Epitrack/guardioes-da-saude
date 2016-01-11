'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileInternalCtrl
 * @description
 * # ProfileInternalCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ProfileInternalCtrl', ['$scope', '$routeParams', 'HouseholdApi', '$rootScope', 'toaster', '$filter', '$timeout', '$location', function ($scope, $routeParams, HouseholdApi, $rootScope, toaster, $filter, $timeout, $location) {

    var meuFiltro = $filter;

    var userStorage = $rootScope.user;

    // ====
    $scope.deleteHousehold = function(id) {
      HouseholdApi.deleteHousehold(id, function(data) {
        if (data.data.error == false) {
          toaster.pop('success', data.data.message);
          $timeout(function() {
            $location.path('profile');
          }, 2000);
        } else {
          toaster.pop('error', data.data.message);
          console.warn('Error', data.data.message);
        }
      });
    };
    // ====

    // ====
    $scope.getHousehold = function() {
      $scope.screen = {};

      HouseholdApi.getHousehold(userStorage.id, function(data) {
        $scope.screen.householdData = meuFiltro('filter')(data.data.data, {
          id: $routeParams.id
        })[0];

        $scope.screen.household = _buildObj($scope.screen.householdData);
      });
    };
    // ====

    // ====
    $scope.editProfile = function() {

      // return console.warn($scope.screen.household);

      // create a object to manipulate date and send to api
      var params = {
        nick: $scope.screen.household.nick,
        dob: $scope.UTIL.unConvertDate($scope.screen.household.dob),
        gender: $scope.screen.household.gender,
        email: $scope.screen.household.email,
        race: $scope.screen.household.race,
        id: $scope.screen.household.id,
        password: "",
        picture: $scope.screen.household.picture
      };

      // verify is household changes password
      if($scope.screen.household.password == "" || $scope.screen.household.password != $scope.screen.repeatPassword) {
        delete $scope.screen.household.password;
      } else {
        params.password = $scope.screen.household.password;
      }
      // ====

      // return console.warn(params);

      HouseholdApi.updateProfile(params, function(data) {
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          console.warn('DATA SUCCESS -> ', data);
          toaster.pop('success', data.data.message);

          $scope.screen.household = _buildObj(data.data.user[0]);
        }
      });

      $scope.getHousehold();
    };
    // ====

    // Utils
    var _buildObj = function(obj) {
      return {
          nick: obj.nick,
          dob: $scope.UTIL.unConvertDate(obj.dob),
          gender: obj.gender,
          email: obj.email,
          race: obj.race,
          id: obj.id,
          password: "",
          picture: obj.picture
        }
    };
    // ====

    $scope.getHousehold();
  }]);
