'use strict';

/**
 * @ngdoc service
 * @name gdsApp.DashboardApi
 * @description
 * # DashboardApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('DashboardApi', ['$http', 'ApiConfig', function ($http, ApiConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;

    obj.getAllData = function (callback) {
      $http.get(apiUrl + '/charts/home', {headers: {'app_token': app_token}})
        .then(function (data) {
          // console.log('Success getAllData: ', data);
          callback(data);
        }, function (error) {
          // console.warn('Error getAllData: ', error);
          callback(error);
        });
    };

    return obj;
  }]);
