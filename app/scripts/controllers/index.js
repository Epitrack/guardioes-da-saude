'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('IndexCtrl', ['$scope', 'LocalStorage', '$rootScope', function ($scope, LocalStorage, $rootScope) {

    // to hide menu
    $scope.logged = LocalStorage.getItem('userLogged');

    // get user location
    $scope.getUserLocation = function () {
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
    }

    function errorGeolocation(error) {
      console.warn('errorGeolocation', error);
    }

    if (!localStorage.getItem('userStorage')) {
      $scope.getUserLocation();
    }
    // ====

    // when user click in logout button
    $scope.clearStorage = function () {
      delete $rootScope.user;
      console.log('clearStorage in index.js');
      localStorage.removeItem('userStorage');
      window.location.href = "/";
    };
    // ====

    // ====
    $scope.checkPlatform = function() {
      var ua, android, iphone;

      ua = navigator.userAgent.toLowerCase();
      android = ua.indexOf("android") > -1;
      iphone = ua.indexOf("iphone") > -1;
        console.warn("ua",ua)
        console.warn("android",android)
        console.warn("iphone",iphone)

      if (android) {
        $scope.downloadLink = 'http://www.google.com';
      } else if (iphone) {
        $scope.downloadLink = 'http://www.apple.com'
      }

      if(android || iphone) {
        $('#modal-app').modal({ show: 'true' });
      }
    };

    $rootScope.$on('getCities_ok', function() {
      $scope.checkPlatform();
    });
    // ====

  }]);
