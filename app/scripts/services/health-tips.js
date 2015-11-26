'use strict';

/**
 * @ngdoc service
 * @name gdsApp.healthTips
 * @description
 * # healthTips
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('healthTips', ['$http', 'ApiConfig', 'LocalStorage', '$resource', function ($http, ApiConfig, LocalStorage, $resource) {

    var obj = {};

    var apiUrl = ApiConfig.API_URL;

    // ====
    obj.getUpas = function(callback) {
      $http.get(apiUrl + '/content/upas.json')
        .success(function(data) {
          console.log('Success getUpas: ', data);
          callback(data);
        }).error(function(error) {
          console.log('Error getUpas: ', error);
        })
    };
    // ====

    // ====
    obj.getFarmacias = function(callback) {
      var api_key = 'AIzaSyDYl7spN_NpAjAWL7Hi183SK2cApiIS3Eg';
      var lat = LocalStorage.getItem('userLocation').lat;
      var lng = LocalStorage.getItem('userLocation').lon;

      $http.get(apiUrl + '/content/places', {
        params: {
          lat: lat,
          lon: lng,
          type: 'pharmacy',
          radius: '1000'
        }
      }).success(function(data) {
         console.warn('Success getFarmacias: ', data);
          callback(data);
        }).error(function(error) {
          console.log('Error getFarmacias: ', error);
        })
    };
    // ====

    // ====
    obj.getVacinas = function(callback) {
      $http.get('../../assets/vacinas.json')
        .success(function(data) {
          console.log('Success getVacinas: ', data);
          callback(data);
        }).error(function(error) {
          console.log('Error getVacinas: ', error);
        })
    };
    // ====

    // ====
    obj.getTelefones = function(callback) {
      $http.get('../../assets/telefones-uteis.json')
        .success(function(data) {
          console.log('Success getTelefonesUteis: ', data);
          callback(data);
        }).error(function(error) {
          console.log('Error getTelefonesUteis: ', error);
        })
    };
    // ====

    // ====
    obj.getCuidados = function(callback) {
      $http.get('../../assets/cuidados.json')
        .success(function(data) {
          console.log('Success getCuidados: ', data);
          callback(data);
        }).error(function(error) {
          console.log('Error getCuidados: ', error);
        })
    };
    // ====

    // ====
    obj.getPrevencoes = function(callback) {
      $http.get('https://gist.githubusercontent.com/thulioph/ec5829dcfb6c2ca2e36d/raw/aced61c01ffa9cd9242c1d21d10b99917e66c249/prevencao.json')
        .success(function(data) {
          console.log('Success getPrevencoes: ', data);
          callback(data);
        }).error(function(error) {
          console.log('Error getPrevencoes: ', error);
        })
    };
    // ====

    return obj;
  }]);
