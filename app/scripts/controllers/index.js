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
    $scope.logged = LocalStorage.getItem('userLogged');;

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
      console.warn('errorGeolocation', error);

      // @TODO:
      // openAgain();
    };


    //@TODO:
    // function openAgain() {
    //   console.log('Again');

    //   $('#modal-location').modal({
    //     show: 'true'
    //   });
      
    //   $scope.getUserLocation();
    // };


    if (!localStorage.getItem('userStorage')) {
      $scope.getUserLocation();
    }
    // ====

    // when user click in logout button
    $scope.clearStorage = function() {
      delete $rootScope.user;

      localStorage.removeItem('userStorage');
    };
    // ====

  }]);
