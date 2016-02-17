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
    var app_token = ApiConfig.APP_TOKEN;
    var client = ApiConfig.CLIENT;

    var userStorage = LocalStorage.getItem('userStorage');

    obj.createHousehold = function(data, callback) {
      data.client = client;
      data.user = userStorage.id;
      data.user_token = userStorage.user_token;
      if(data.picture === undefined) data.picture = 0;
      data.dob = data.dob;

      $http.post(apiUrl + '/household/create', data, { headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
        .then(function(data){
          console.log('Success createHousehold ', data);
          callback(data);
          UserApi.updateUser(userStorage.id);
        }, function(error){
          console.warn('Error createHousehold: ', error);
      });
    };

    obj.changeAvatar = function (household_id, avatar, callback) {
      var params = {
        id:household_id,
        picture: avatar
      };
      $http.post(apiUrl + '/household/update', params, {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
          console.log('Success changeAvatar: ', result);
          callback(result);
          UserApi.updateUser(LocalStorage.getItem('userStorage').id);
        }, function (error) {
          console.warn('Error changeAvatar: ', error);
        });
    };

    obj.deleteHousehold = function(id, callback) {
      $http.get(apiUrl + '/household/delete/' + id + '?client=' + client, { headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
        .then(function(data){
          console.log('Success deleteHousehold ', data);
          callback(data);
          UserApi.updateUser(userStorage.id);
        }, function(error){
          console.warn('Error deleteHousehold: ', error);
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

    // get user surveys
    obj.getHouseholdSurvey = function(hhId, callback) {
      $http.get(apiUrl + '/household/survey/summary?household_id=' + hhId, {headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
        .then(function(result){
          console.log('Success getHouseholdSurvey: ', result);
          callback(result);
        }, function(error){
          console.warn('Error getHouseholdSurvey: ', error);
      });
    };

    // update household profile
    obj.updateProfile = function(params, callback) {
      params.client = client;
      params.user_token = userStorage.user_token;


      $http.post(apiUrl + '/household/update', params, {headers: {'app_token': app_token, 'user_token': userStorage.user_token}})
        .then(function(result){
          console.log('Success updateProfile: ', result);
          callback(result);
          UserApi.updateUser(userStorage.id);
        }, function(error){
          console.warn('Error updateProfile: ', error);
      });
    };

    // get calendar data
    obj.getHouseholdCalendar = function(params, callback) {
      var month = params.month,
          year = params.year,
          hhId = params.hhId;

      $http.get(apiUrl + '/household/calendar/month?month=' + month + '&year=' + year + '&household_id=' + hhId, {headers: {'app_token': app_token, 'user_token': LocalStorage.getItem('userStorage').user_token}})
        .then(function(result){
          console.log('Success getHouseholdCalendar: ', result);
          callback(result);
        }, function(error){
          console.warn('Error getHouseholdCalendar: ', error);
      });
    };

    // frequency calendar
    obj.getHouseholdSurveyByMonth = function(params, callback) {
      $http.get(apiUrl + '/user/chart/month?month=' + params.month + '&year=' + params.year + '&household_id=' + params.hh_id, {headers: {'app_token': app_token, 'user_token': params.user_token}})
        .then(function(result){
          console.log('Success getHouseholdSurveyByMonth: ', result);
          callback(result);
        }, function(error){
          console.warn('Error getHouseholdSurveyByMonth: ', error);
      });
    };

    obj.getHouseholdSurveyByYear = function(params, callback) {
      $http.get(apiUrl + '/household/calendar/year?year=' + params.year + '&household_id=' + params.hh_id, {headers: {'app_token': app_token, 'user_token': params.user_token}})
        .then(function(result){
          console.log('Success getHouseholdSurveyByYear: ', result);
          callback(result);
        }, function(error){
          console.warn('Error getHouseholdSurveyByYear: ', error);
      });
    };

    return obj;
  });
