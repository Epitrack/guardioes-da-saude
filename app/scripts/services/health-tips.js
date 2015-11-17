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

      // var Maps = $resource('https://maps.googleapis.com/maps/api/place/textsearch/json',
      //     {
      //       query: 'pharmacy',
      //       location: lat + ',' +lng,
      //       radius: '10000',
      //       key: api_key
      //     });

      // Maps.get({}, function(data) {console.log(data)}, function(error) {console.log(error)});

      $http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=pharmacy&location=' + lat + ',' + lng + '&radius=10000&key=' + api_key)
        .success(function(data) {
          return console.log('Success getFarmacias: ', data.result);
          callback(data);
        }).error(function(error) {
          console.log('Error getFarmacias: ', error);
        })
    };
    // ====

    // ====
    obj.getVacinas = function(callback) {
      $http.get('https://gist.githubusercontent.com/thulioph/b64fe40c683e5606d35c/raw/2d8395b0a969ccc48c2549b5563467ab677d67b5/vacinas.json')
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
      $http.get('https://gist.githubusercontent.com/thulioph/a1ffc9d243d24077b8a6/raw/74c459e947ef6270f70e25af53630b7403fc1ca9/telefones-uteis.json')
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
      $http.get('https://gist.githubusercontent.com/thulioph/113a86a5abebc6204aad/raw/96613079e9333c1fe23e49bbc85fdbf4d489c847/cuidados.json')
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
