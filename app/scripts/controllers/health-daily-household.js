'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyHouseholdCtrl
 * @description
 * # HealthDailyHouseholdCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyHouseholdCtrl', ['$scope', 'LocalStorage', '$filter', 'HouseholdApi', '$routeParams', function ($scope, LocalStorage, $filter, HouseholdApi, $routeParams) {

    var meuFiltro = $filter;

    var userStorage = LocalStorage.getItem('userStorage');
    var userID = userStorage.id;

    HouseholdApi.getHousehold(userID, function(data) {
      $scope.household = meuFiltro('filter')(data.data.data, {
        id: $routeParams.id
      })[0];
    });

  }]);
