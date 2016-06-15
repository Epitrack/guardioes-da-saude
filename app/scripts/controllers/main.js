'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('MainCtrl', ['$scope', 'Surveyapi', '$location', '$rootScope', 'SearchCitiesApi', '$http', 
  function ($scope, Surveyapi, $location, $rootScope, SearchCitiesApi, $http) {

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
        $rootScope.$broadcast('getCities_ok');
      });
    };

    $scope.getMostCities(5);

    // Auto complete
    $scope.getLocation = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false,
          language: 'pt-BR'
        }
      }).then(function(response){
        // console.log(response);

        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };
    // ====
  }]);
