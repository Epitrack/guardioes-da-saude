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
    var userStorage = $rootScope.user;

    // register
    obj.createUser = function(data, callback) {
      data.app_token = app_token;
      data.platform = platform;
      data.client = client;

      data.lat = LocalStorage.getItem('userLocation').lat;
      data.lon = LocalStorage.getItem('userLocation').lon;

      console.warn(data);

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

    // get recent user info
    obj.updateUser = function(id) {
      $http.get(apiUrl + '/user/get/' + id, {headers: {'app_token': app_token}})
        .then(function(result){
          console.log('Success updateUser: ', result);
          LocalStorage.updateUser(result);
        }, function(error){
          console.warn('Error updateUser: ', error);
      });
    };

    obj.changePhoto = function(img, callback) {
      return console.log('img -> ', img);

      $http.post(apiUrl + '/user/upload-photo', img, {'app_token': app_token})
        .then(function(data){
          console.log('Success changePhoto: ', data);
          // LocalStorage.userLogin(data.data.user, data.data.token);
          callback(data)
        }, function(error){
          console.warn('Error changePhoto: ', error);
      });
    };

    // update user profile
    obj.updateProfile = function(params, callback) {
      params.client = client;
      params.id = userStorage.id;
      params.user_token = userStorage.user_token;

      $http.post(apiUrl + '/user/update', params, {headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
        .then(function(result){
          console.log('Success updateProfile: ', result);
          callback(result);
          obj.updateUser(params.id);
        }, function(error){
          console.warn('Error updateProfile: ', error);
      });
    };

    // get user surveys
    obj.getUserSurvey = function(callback) {
      $http.get(apiUrl + '/user/survey/summary', {headers: {'app_token': app_token, 'user_token': LocalStorage.getItem('userStorage').user_token}})
        .then(function(result){
          console.log('Success getUserSurvey: ', result);
          callback(result);
        }, function(error){
          console.warn('Error getUserSurvey: ', error);
      });
    };

    return obj;
  });
