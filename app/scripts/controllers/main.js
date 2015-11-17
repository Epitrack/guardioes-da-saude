'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('MainCtrl', ['$scope', '$route', 'Surveyapi', '$location', 'toaster', '$rootScope', function ($scope, $route, Surveyapi, $location, toaster, $rootScope) {

    $scope.pageClass = 'main-page';

    console.log($route);

    // when user click in logout button
    $scope.clearStorage = function() {
      localStorage.removeItem('userStorage');
      localStorage.removeItem('userStorageUpdate');
    };
    // ====

    // search by city /index
    $scope.surveyByCity = {};

    $scope.getSurveyByCity = function() {
      Surveyapi.getMarkersByCity($scope.surveyByCity.city, function(data) {
        if (data.data.error === false) {
          $location.path('/health-map');
          $rootScope.markersByCity = data.data.data;
        } else {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        }
      })
    };
    // ====

  }]);
