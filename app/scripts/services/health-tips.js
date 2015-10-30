'use strict';

/**
 * @ngdoc service
 * @name gdsApp.healthTips
 * @description
 * # healthTips
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('healthTips', ['$http', function ($http) {
    var obj = {};

    var upas = [];

    obj.getUpas = function(callback) {
      $http.get('https://gist.githubusercontent.com/thulioph/035de62d0d40e0c7ac5a/raw/b5a305271af64205493677701a461962f14ec33a/upas.json')
        .success(function(data) {
          upas = data;
          callback(data);
          console.log('Success getUpas: ', upas);
        }).error(function(error) {
          console.log('Error getUpas: ', error);
        })
    };
    // ====

    var farmacias = [];

    obj.getFarmacias = function(callback) {
      var api_key = 'AIzaSyDYl7spN_NpAjAWL7Hi183SK2cApiIS3Eg';

      $http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=pharmacy&location=-8.0865589,-34.8918439&radius=800&key=' + api_key)
        .success(function(data) {
          farmacias = data;
          callback(data);
          console.log('Success getFarmacias: ', farmacias);
        }).error(function(error) {
          console.log('Error getFarmacias: ', error);
        })
    };
    // ====

    var vacinas = [];

    obj.getVacinas = function(callback) {
      $http.get('https://gist.githubusercontent.com/thulioph/b64fe40c683e5606d35c/raw/2d8395b0a969ccc48c2549b5563467ab677d67b5/vacinas.json')
        .success(function(data) {
          vacinas = data;
          callback(data);
          console.log('Success getVacinas: ', vacinas);
        }).error(function(error) {
          console.log('Error getVacinas: ', error);
        })
    };
    // ====

    var telefones = [];

    obj.getTelefones = function(callback) {
      $http.get('https://gist.githubusercontent.com/thulioph/a1ffc9d243d24077b8a6/raw/74c459e947ef6270f70e25af53630b7403fc1ca9/telefones-uteis.json')
        .success(function(data) {
          telefones = data;
          callback(data);
          console.log('Success getTelefonesUteis: ', telefones);
        }).error(function(error) {
          console.log('Error getTelefonesUteis: ', error);
        })
    };
    // ====

    var cuidados = [];

    obj.getCuidados = function(callback) {
      $http.get('https://gist.githubusercontent.com/thulioph/113a86a5abebc6204aad/raw/96613079e9333c1fe23e49bbc85fdbf4d489c847/cuidados.json')
        .success(function(data) {
          cuidados = data;
          callback(data);
          console.log('Success getCuidados: ', cuidados);
        }).error(function(error) {
          console.log('Error getCuidados: ', error);
        })
    };
    // ====

    var prevencoes = [];

    obj.getPrevencoes = function(callback) {
      $http.get('https://gist.githubusercontent.com/thulioph/ec5829dcfb6c2ca2e36d/raw/aced61c01ffa9cd9242c1d21d10b99917e66c249/prevencao.json')
        .success(function(data) {
          prevencoes = data;
          callback(data);
          console.log('Success getPrevencoes: ', prevencoes);
        }).error(function(error) {
          console.log('Error getPrevencoes: ', error);
        })
    };
    // ====

    return obj;
  }]);
