'use strict';

/**
 * @ngdoc service
 * @name gdsApp.surveyapi
 * @description
 * # surveyapi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('Surveyapi', function ($http, $location, LocalStorage, ApiConfig, $rootScope, UserApi) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN
    var platform = ApiConfig.PLATFORM;
    var client = ApiConfig.CLIENT;

    // var userStorage = $rootScope.user;
    var userStorage = LocalStorage.getItem('userStorage');

    obj.getSymptoms = function(callback) {
      $http.get(apiUrl + '/symptoms', {headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success getSymptoms: ', data);
          callback(data);
        }, function(error){
          console.warn('Error getSymptoms: ', error);
      });
    };

    obj.submitSurvey = function(data, callback) {
      data.client = client;
      data.platform = platform;
      data.user_id = userStorage.id;
      data.app_token = app_token;

      $http.post(apiUrl + '/survey/create', data, { headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
        .then(function(data){
          console.log('Success submitSurvey ', data);
          callback(data);
          UserApi.updateUser(userStorage.id);
        }, function(error){
          console.warn('Error submitSurvey: ', error)
      });
    };

    obj.getMarkersByCity = function(city, callback) {
      $http.get(apiUrl + '/surveys/l?q=' + city, {headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success getMarkersByCity: ', data);
          callback(data);
        }, function(error){
          console.warn('Error getMarkersByCity: ', error);
      });
    };

    obj.getMarkersByCitySummary = function(city, callback) {
      $http.get(apiUrl + '/surveys/summary?q=' + city, {headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success getMarkersByCitySummary: ', data);
          callback(data);
        }, function(error){
          console.warn('Error getMarkersByCitySummary: ', error);
      });
    };

    return obj;
  });