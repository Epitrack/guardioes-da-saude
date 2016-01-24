'use strict';

/**
 * @ngdoc service
 * @name gdsApp.healthTips
 * @description
 * # healthTips
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('healthTips', ['$http', 'ApiConfig', 'LocalStorage', function ($http, ApiConfig, LocalStorage) {

    var obj = {};

    var apiUrl = ApiConfig.API_URL;

    // ====
    obj.getUpas = function (callback) {
      $http.get(apiUrl + '/content/upas.json')
        .success(function (data) {
          console.log('Success getUpas: ', data);
          callback(data);
        }).error(function (error) {
        console.log('Error getUpas: ', error);
      });
    };
    // ====

    // ====
    obj.getFarmacias = function (callback) {
      var lat = LocalStorage.getItem('userLocation').lat;
      var lng = LocalStorage.getItem('userLocation').lon;

      $http.get(apiUrl + '/content/places', {
        params: {
          lat: lat,
          lon: lng,
          type: 'pharmacy',
          radius: '1000'
        }
      }).success(function (data) {
        console.warn('Success getFarmacias: ', data);
        callback(data);
      }).error(function (error) {
        console.log('Error getFarmacias: ', error);
      });
    };
    // ====

    return obj;
  }]);
