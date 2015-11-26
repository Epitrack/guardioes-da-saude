'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('MainCtrl', ['$scope', '$route', 'Surveyapi', '$location', 'toaster', '$rootScope', 'SearchCitiesApi', function ($scope, $route, Surveyapi, $location, toaster, $rootScope, SearchCitiesApi) {

    $scope.pageClass = 'main-page';

    // console.log($route);

    // when user click in logout button
    $scope.clearStorage = function() {
      delete $rootScope.user;

      localStorage.removeItem('userStorage');
      localStorage.removeItem('userLocation');
    };
    // ====

    // search by city /index
    $scope.surveyByCity = {};

    $scope.getSurveyByCity = function(params) {
      if (params) {
        $scope.surveyByCity.city = params;
      }

      Surveyapi.getMarkersByCity($scope.surveyByCity.city, function(data) {
        if (data.data.error === false) {
          $location.path('/health-map');
          // set into $rootScope to get data in /health-map screen
          $rootScope.markersByCity = data.data.data;
        } else {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        }
      });

      // obtém os dados em summary
      $scope.getSurveyByCitySummary($scope.surveyByCity.city)
    };

    $scope.getSurveyByCitySummary = function(city) {
      Surveyapi.getMarkersByCitySummary(city, function(data) {
        if (data.data.error === false) {
          $scope.surveyByCitySummary = data.data.data;
          $scope.surveyByCitySummary.pct_no_symptoms = 0;
          $scope.surveyByCitySummary.pct_symptoms = 0;
          if($scope.surveyByCitySummary.total_no_symptoms > 0) {
            $scope.surveyByCitySummary.pct_no_symptoms = ((($scope.surveyByCitySummary.total_no_symptoms/$scope.surveyByCitySummary.total_surveys)*100));
          }
          if($scope.surveyByCitySummary.total_symptoms > 0) {
            $scope.surveyByCitySummary.pct_symptoms = ((($scope.surveyByCitySummary.total_symptoms/$scope.surveyByCitySummary.total_surveys)*100));
          }

          if($scope.surveyByCitySummary.pct_no_symptoms %1 !==0) {
              $scope.surveyByCitySummary.pct_no_symptoms = $scope.surveyByCitySummary.pct_no_symptoms.toFixed(2);
          }

          if($scope.surveyByCitySummary.pct_symptoms %1 !==0) {
              $scope.surveyByCitySummary.pct_symptoms = $scope.surveyByCitySummary.pct_symptoms.toFixed(2);
          }
          $rootScope.surveyByCitySummary = $scope.surveyByCitySummary;

          console.warn($rootScope.surveyByCitySummary);
        } else {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        }
      })
    };

    $scope.getMostCities = function(limit) {
      $scope.cities = {};

      SearchCitiesApi.getCities(limit, function(data) {
        $scope.cities = data.data;
      });
    };

    $scope.getMostCities(5);

    // ====

    console.log($rootScope.user);

  }]);
