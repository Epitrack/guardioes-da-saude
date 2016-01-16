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
      data.user_id = $rootScope.user.id;
      data.app_token = app_token;

      console.warn('Enviando...', data);

      $http.post(apiUrl + '/survey/create', data, { headers: {'app_token': app_token, 'user_token': $rootScope.user.user_token}})
        .then(function(data){
          console.log('Success submitSurvey ', data);
          callback(data);
          UserApi.updateUser($rootScope.user.id);
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

    obj.getMarkersByLocation = function(params, callback) {
      $http.get(apiUrl + '/surveys/l?lat=' + params.lat + '&lon=' + params.lon, {headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success getMarkersByLocation: ', data);
          callback(data);
        }, function(error){
          console.warn('Error getMarkersByLocation: ', error);
      });
    };

    obj.getSummaryByLocation = function(params, callback) {
      $http.get(apiUrl + '/surveys/summary?lat=' + params.lat + '&lon=' + params.lon, {headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success getSummaryByLocation: ', data);
          callback(data);
        }, function(error){
          console.warn('Error getSummaryByLocation: ', error);
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
