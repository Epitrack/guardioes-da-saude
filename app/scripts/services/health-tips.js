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

    return obj;
  }]);
