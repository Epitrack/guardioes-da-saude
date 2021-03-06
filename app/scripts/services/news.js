'use strict';

/**
 * @ngdoc service
 * @name gdsApp.NewsApi
 * @description
 * # NewsApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('NewsApi', function ($http, ApiConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;

    var obj = {};

    obj.getNews = function (data, callback) {
      $http.get(apiUrl + '/news/get', {headers: {'app_token': app_token}})
        .success(function (data) {
          callback(data);
          // console.log('Success getNews: ', data);
        }).error(function (error) {
          callback(error);
        // console.warn('Error getNews: ', error);
      });
    };

    return obj;
  });
