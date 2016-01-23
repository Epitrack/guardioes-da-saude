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
    var app_token = ApiConfig.APP_TOKEN;
    var platform = ApiConfig.PLATFORM;
    var client = ApiConfig.CLIENT;

    // register
    obj.createUser = function (data, callback) {
      if (data.fb) {
        data.fb = data.fb;
      }

      data.app_token = app_token;
      data.platform = platform;
      data.client = client;

      data.lat = LocalStorage.getItem('userLocation').lat;
      data.lon = LocalStorage.getItem('userLocation').lon;

      // return console.warn('createUser -> ', data);

      $http.post(apiUrl + '/user/create', data, {headers: {'app_token': app_token}})
        .then(function (data) {
          console.log('Success createUser ', data);
          callback(data);
          LocalStorage.userCreateData(data.data.user);
        }, function (error) {
          console.warn('Error createUser: ', error);
        });
    };

    // login
    obj.loginUser = function (data, callback) {
      $http.post(apiUrl + '/user/login', data)
        .then(function (data) {
          console.log('Success loginUser: ', data);
          callback(data);
        }, function (error) {
          console.warn('Error loginUser: ', error);
        });
    };

    // get recent user info
    obj.updateUser = function (id, callback) {
      $http.get(apiUrl + '/user/get/' + id, {headers: {'app_token': app_token}})
        .then(function (result) {
          console.log('Success updateUser: ', result);
          LocalStorage.updateUser(result);
          if (callback) {
            callback(result);
          }
        }, function (error) {
          console.warn('Error updateUser: ', error);
        });
    };

    obj.changeAvatar = function (avatar, callback) {
      avatar.id = LocalStorage.getItem('userStorage').id;

      $http.post(apiUrl + '/user/update', avatar, {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
          console.log('Success changeAvatar: ', result);
          callback(result);
          obj.updateUser(LocalStorage.getItem('userStorage').id);
        }, function (error) {
          console.warn('Error changeAvatar: ', error);
        });
    };

    // update user profile
    obj.updateProfile = function (params, callback) {

      // console.warn('params 1 -> ', params);

      // Adds in params obj some data to validate request
      params.client = client;
      params.id = LocalStorage.getItem('userStorage').id;
      params.user_token = LocalStorage.getItem('userStorage').user_token;
      // ====

      // console.warn('params 2 -> ', params);

      $http.post(apiUrl + '/user/update', params, {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
          console.log('Success updateProfile: ', result);
          callback(result);
          obj.updateUser(params.id);
        }, function (error) {
          console.warn('Error updateProfile: ', error);
        });
    };

    // get user surveys
    obj.getUserSurvey = function (callback) {
      $http.get(apiUrl + '/user/survey/summary', {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
          //console.log('Success getUserSurvey: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error getUserSurvey: ', error);
        });
    };

    // get calendar data
    obj.getUserCalendar = function (params, callback) {
      $http.get(apiUrl + '/user/calendar/month?month=' + params.month + '&year=' + params.year, {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
          //console.log('Success getUserCalendar: ', result);
          callback(result);
        }, function (error) {
          //console.warn('Error getUserCalendar: ', error);
        });
    };

    // forgot password
    obj.forgotPassword = function (email, callback) {
      $http.post(apiUrl + '/user/forgot-password', email, {headers: {'app_token': app_token}})
        .then(function (result) {
          console.log('Success forgotPassword: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error forgotPassword: ', error);
        });
    };

    // check hash validation
    obj.validateHash = function (hash, callback) {
      $http.get(apiUrl + '/user/validate/hash?hash=' + hash, {headers: {'app_token': app_token}})
        .then(function (result) {
          console.log('Success validateHash: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error validateHash: ', error);
        });
    };

    // register
    obj.updateUserPassword = function (params, callback) {
      $http.post(apiUrl + '/user/update/password', params, {headers: {'app_token': app_token}})
        .then(function (data) {
          console.log('Success updateUserPassword ', data);
          // LocalStorage.userCreateData(data.data.user);
          callback(data);
        }, function (error) {
          console.warn('Error updateUserPassword: ', error);
        });
    };

    obj.getSavedCalendar = function () {
      return $rootScope.userCalendar;
    };

    obj.fbLogin = function (accessToken, callback) {
      $http.get(apiUrl + '/auth/facebook/callback?access_token=' + accessToken, {headers: {'app_token': app_token}})
        .then(function (result) {
          console.log('Success fbLogin: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error fbLogin: ', error);
        });
    };

    obj.twLogin = function (accessToken, callback) {
      $http.get(apiUrl + '/auth/twitter/callback?oauth_token=' + accessToken.oauth_token + '&oauth_token_secret=' + accessToken.oauth_token_secret, {headers: {'app_token': app_token}})
        .then(function (result) {
          console.log('Success twLogin: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error twLogin: ', error);
        });
    };

    obj.glLogin = function (accessToken, callback) {
      $http.get(apiUrl + '/auth/google/callback?access_token=' + accessToken.access_token, {headers: {'app_token': app_token}})
        .then(function (result) {
          console.log('Success glLogin: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error glLogin: ', error);
        });
    };

    obj.getUserEmail = function (email, callback) {
      $http.get(apiUrl + '/user/get?email=' + email, {headers: {'app_token': app_token}})
        .then(function (result) {
          console.log('Success getUserEmail: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error getUserEmail: ', error);
        });
    };

    return obj;
  });
