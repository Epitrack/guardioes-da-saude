'use strict';

/**
 * @ngdoc service
 * @name gdsApp.SearchCitiesApi
 * @description
 * # SearchCitiesApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('SearchCitiesApi', function ($http, ApiConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;

    var obj = {};

    obj.getCities = function (limit, callback) {
      $http.get(apiUrl + '/search/cities?limit=' + limit, {headers: {'app_token': app_token}})
        .success(function (data) {
          console.log('Success getCities: ', data);
          callback(data);
        }).error(function (error) {
        console.log('Error getCities: ', error);
      });
    };

    return obj;
  });
