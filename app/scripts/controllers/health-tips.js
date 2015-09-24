'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthTipsCtrl
 * @description
 * # HealthTipsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthTipsCtrl', ['$scope', 'healthTips', function ($scope, healthTips) {

    $scope.pageClass = 'health-tips-page';

    $scope.loadMap = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mapLeaFlet, errorGeolocation);
      } else {
        alert('not supported');
      }

      function mapLeaFlet(position) {
        var map, lat, lng;

        lat = position.coords.latitude, lng = position.coords.longitude;

        map = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
          maxZoom: 18,
          attribution: '<a href="http://www.epitrack.com.br" target="_blank">Epitrack</a> &copy;',
          id: 'mapbox.streets'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map).bindPopup("Você está aqui!").openPopup();
      };

      function errorGeolocation(msg) {
        alert('Error, geolocation: ', msg);
      }
    };

    // get user location and load map
    $scope.loadMap();

    $scope.sampleTips = function() {
      $scope.defaultTips = "";
    };

    $scope.loadUpas = function() {
      $scope.upas = [];

      // Use service
      healthTips.getUpas(function(data) {
        $scope.upas = data;
      });
    };

    $scope.loadFarmacias = function() {
      $scope.farmacias = [];

      // Use service
      healthTips.getFarmacias(function(data) {
        $scope.farmacias = data;
      });
    };

    $scope.loadVacinas = function() {
      $scope.vacinas = "";
    };

    $scope.loadTelefonesUteis = function() {
      $scope.telefones = "";
    };

    $scope.loadCuidadosBasicos = function() {
      $scope.cuidados = "";
    };

    $scope.loadPrevencoes = function() {
      $scope.prevencoes = "";
    };

  }]);
