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
      $http.get('assets/upas.json')
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
      $http.get('https://gist.githubusercontent.com/thulioph/035de62d0d40e0c7ac5a/raw/3f011b92fbcb0da22c12ab15e6852e50401097c9/upas.json')
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
      $http.get('https://gist.githubusercontent.com/thulioph/b64fe40c683e5606d35c/raw/931b5c5e56d1a4afabaa44a0f9b7e733b60d3f2b/vacinas.json')
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

    return obj;
  }]);
