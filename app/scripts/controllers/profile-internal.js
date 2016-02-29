'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileInternalCtrl
 * @description
 * # ProfileInternalCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ProfileInternalCtrl', ['$scope', '$routeParams', 'HouseholdApi', '$rootScope', 'toaster', '$filter', '$timeout', '$location', 'LocalStorage', function ($scope, $routeParams, HouseholdApi, $rootScope, toaster, $filter, $timeout, $location, LocalStorage) {

    var meuFiltro = $filter;

    var userStorage = $rootScope.user;

    // ====
    $scope.deleteHousehold = function (id) {
      HouseholdApi.deleteHousehold(id, function (data) {
        if (data.data.error === false) {
          toaster.pop('success', data.data.message);
          $timeout(function () {
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
    $scope.getHousehold = function () {
      $scope.screen = {};

      HouseholdApi.getHousehold(userStorage.id, function (data) {
        $scope.screen.householdData = meuFiltro('filter')(data.data.data, {
          id: $routeParams.id
        })[0];

        $scope.screen.household = _buildObj($scope.screen.householdData);
      });
    };
    // ====

    // ====
    $scope.editProfile = function () {
      // create a object to manipulate date and send to api
      var params = {
        nick: $scope.screen.household.nick,
        dob: $scope.screen.household.dob,
        gender: $scope.screen.household.gender,
        race: $scope.screen.household.race,
      };

      $scope.checkF = $scope.UTIL.checkForm(params);
      if($scope.checkF.error===true){return;}

      params.picture = $scope.screen.household.picture;
      if($scope.screen.household.email){ params.email = $scope.screen.household.email; }
      params.id = $scope.screen.household.id;
      params.dob = $scope.UTIL.convertDate(params.dob);

      // ====

      // return console.warn(params);

      HouseholdApi.updateProfile(params, function (data) {
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
//          console.warn('DATA SUCCESS -> ', data);
          toaster.pop('success', data.data.message);
          $scope.screen.household = _buildObj(data.data.user[0]);
        }
      });

      $scope.getHousehold();
    };
    // ====

    // Utils
    var _buildObj = function (obj) {
      return {
        nick: obj.nick,
        dob: obj.dob,
        gender: obj.gender,
        email: obj.email,
        race: obj.race,
        id: obj.id,
        picture: obj.picture
      };
    };
    // ====

    $scope.getHousehold();
  }]);
