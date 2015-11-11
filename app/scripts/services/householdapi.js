'use strict';

/**
 * @ngdoc service
 * @name gdsApp.HouseholdApi
 * @description
 * # HouseholdApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('HouseholdApi', function ($http, LocalStorage, ApiConfig, UserApi) {
    var obj = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN
    var platform = ApiConfig.PLATFORM;
    var client = ApiConfig.CLIENT;

    var userStorage = LocalStorage.getItem('userStorage');

    obj.createHousehold = function(data, callback) {
      data.client = client;
      data.user = userStorage.id;
      data.user_token = userStorage.user_token;

      $http.post(apiUrl + '/household/create', data, { headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
        .then(function(data){
          console.log('Success createHousehold ', data);
          callback(data);
          UserApi.updateUser(userStorage.id);
        }, function(error){
          console.warn('Error createHousehold: ', error)
      });
    };

    obj.getHousehold = function(userID, callback) {
      $http.get(apiUrl + '/user/household/' + userID, {headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
      .then(function(data){
        console.log('Success getHousehold: ', data);
        callback(data);
        }, function(error){
          console.warn('Error getHousehold: ', error);
        });
    };

    return obj;
  });
