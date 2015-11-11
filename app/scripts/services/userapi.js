'use strict';

/**
 * @ngdoc service
 * @name gdsApp.UserApi
 * @description
 * # UserApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('UserApi', function ($http, $location, LocalStorage, ApiConfig, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN
    var platform = ApiConfig.PLATFORM;
    var client = ApiConfig.CLIENT;

    // obj with user data
    var user = {};

    // pego a localização do localStorage
    var userStorage = LocalStorage.getItem('userStorage');

    // register
    obj.createUser = function(data, callback) {
      data.app_token = app_token;
      data.platform = platform;
      data.client = client;

      data.lat = userStorage.lat;
      data.lon = userStorage.lon;

      $http.post(apiUrl + '/user/create', data, { headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success createUser ', data);
          LocalStorage.userCreateData(data.data.user);
          callback(data);
        }, function(error){
          console.warn('Error createUser: ', error);
      });
    };

    // login
    obj.loginUser = function(data, callback) {
      $http.post(apiUrl + '/user/login', data)
        .then(function(data){
          console.log('Success loginUser: ', data);
          LocalStorage.userLogin(data.data.user, data.data.token);
          callback(data)
        }, function(error){
          console.warn('Error loginUser: ', error);
      });
    };

    // update
    obj.updateUser = function(data) {
      $http.get(apiUrl + '/user/get/' + data, {headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success updateUser: ', data);
          LocalStorage.updateUser(data);
        }, function(error){
          console.warn('Error updateUser: ', error);
      });
    };

    return obj;
  });
