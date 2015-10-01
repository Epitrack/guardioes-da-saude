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

    // get user location to init some things
    $scope.getLocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mapSuccess, mapError);
      } else {
        console.log('Seu navegador não suporta geolocation');
      }
    };

    function mapSuccess(position) {
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

    function mapError(msg) {
      console.log('Error geolocation:', msg);
    }
    // ====

    // UPAS
    $scope.loadUpas = function() {
      $scope.getLocation(); // get user location

      $scope.upas = [];

      // Use service
      healthTips.getUpas(function(data) {
        $scope.upas = data;
      });
    };

    // FARMACIAS
    $scope.loadFarmacias = function() {
      $scope.farmacias = [];

      // Use service
      healthTips.getFarmacias(function(data) {
        $scope.farmacias = data;
      });
    };

    // VACINAS
    $scope.loadVacinas = function() {
      $scope.vacinas = [];

      // Use service
      healthTips.getVacinas(function(data) {
        $scope.vacinas = data;
      });
    };

    // TELEFONES
    $scope.loadTelefones = function() {
      $scope.telefones = [];

      // Use service
      healthTips.getTelefones(function(data) {
        $scope.telefones = data;
      });
    };

    // CUIDADOS
    $scope.loadCuidados = function() {
      $scope.cuidados = [];

      // Use service
      healthTips.getCuidados(function(data) {
        $scope.cuidados = data;
      });
    };

    // PREVENCAO
    $scope.loadPrevencao = function() {
      $scope.prevencoes = [];

      // Use service
      healthTips.getPrevencoes(function(data) {
        $scope.prevencoes = data;
      });
    };

  }]);
