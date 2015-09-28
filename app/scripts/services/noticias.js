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
      $http.get('https://gist.githubusercontent.com/thulioph/741469bf184b1d731ff2/raw/12d3297fe2bc49f15cb907c053e649148be3586b/noticias.json')
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
