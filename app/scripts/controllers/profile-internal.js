'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileInternalCtrl
 * @description
 * # ProfileInternalCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ProfileInternalCtrl', ['$scope', 'LocalStorage', '$filter', 'HouseholdApi', '$routeParams', function ($scope, LocalStorage, $filter, HouseholdApi, $routeParams) {

    var meuFiltro = $filter;

    var userStorage = LocalStorage.getItem('userStorage');
    var userID = userStorage.id;

    HouseholdApi.getHousehold(userID, function(data) {
      $scope.household = meuFiltro('filter')(data.data.data, {
        id: $routeParams.id
      })[0];
    });

  }]);
