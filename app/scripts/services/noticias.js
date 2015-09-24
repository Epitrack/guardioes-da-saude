'use strict';

/**
 * @ngdoc service
 * @name gdsApp.noticias
 * @description
 * # noticias
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('noticias', ['$http', function ($http) {
    var obj = {};

    var noticias = [];

    obj.getNoticias = function(callback) {
      $http.get('http://localhost/epitrack/guardioes-da-saude/assets/noticias.json')
      .success(function(data) {
        noticias = data;
        callback(data);
        console.log('Success getNoticias: ', data);
      }).error(function(error) {
        console.log('Error getNoticias: ', error);
      })
    };

    return obj;
  }]);
