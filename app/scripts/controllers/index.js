'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('IndexCtrl', ['$scope', '$location', 'LocalStorage', function ($scope, $location, LocalStorage) {

    // to hide menu
    $scope.$location = $location;

    // get user location
    $scope.getUserLocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, errorGeolocation);
      } else {
        alert('Seu navegador não suporta geolocation');
      }
    };

    function getPosition(position) {
      var lat, lon;
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      LocalStorage.saveLocation(lat, lon);
    };

    function errorGeolocation(error) {
      console.warn(error);
    };

    if (!localStorage.getItem('userStorage')) {
      $scope.getUserLocation();
    }
    // ====

  }]);
