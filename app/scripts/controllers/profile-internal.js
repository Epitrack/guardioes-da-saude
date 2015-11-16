'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileInternalCtrl
 * @description
 * # ProfileInternalCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ProfileInternalCtrl', ['$scope', '$rootScope', '$filter', 'HouseholdApi', '$routeParams', 'toaster', function ($scope, $rootScope, $filter, HouseholdApi, $routeParams, toaster) {

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

        $scope.screen.household = {
          nick: hh.nick,
          dob: hh.dob,
          gender: hh.gender,
          email: hh.email,
          race: hh.race,
          id: hh.id,
          password: ""
        };
      });
    };

    $scope.editProfile = function() {
      if($scope.screen.household.password == "" || $scope.screen.household.password != $scope.screen.repeatPassword) {
        delete $scope.screen.household.password;
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

    $scope.getHousehold();
  }]);
