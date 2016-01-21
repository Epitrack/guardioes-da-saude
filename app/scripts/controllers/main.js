'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('MainCtrl', ['$scope', 'Surveyapi', '$location', 'toaster', '$rootScope', 'SearchCitiesApi', function ($scope, Surveyapi, $location, toaster, $rootScope, SearchCitiesApi) {

    $scope.pageClass = 'main-page';

    // when user click in logout button
    $scope.clearStorage = function () {
      localStorage.clear();
      delete $rootScope.user;
    };

    $scope.setRootCity = function (params) {
      if (params) {
        $rootScope.city = params;
      } else {
        $rootScope.city = $scope.city;
      }

      $location.path('/health-map');
    };

    $scope.getMostCities = function (limit) {
      $scope.cities = {};

      SearchCitiesApi.getCities(limit, function (data) {
        $scope.cities = data.data;
      });
    };

    $scope.getMostCities(5);
  }]);
