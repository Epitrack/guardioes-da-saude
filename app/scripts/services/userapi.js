'use strict';

/**
 * @ngdoc service
 * @name gdsApp.UserApi
 * @description
 * # UserApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('UserApi', function ($http, toaster, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    var apiUrl = 'http://52.20.162.21';
    var app_token = 'd41d8cd98f00b204e9800998ecf8427e';
    var platform = 'web';
    var client = 'api';

    // obj with user data
    var user = {};

    // register
    obj.createUser = function(data) {

      data.app_token = app_token;
      data.platform = platform;
      data.client = client;
      // data.lat = '-8.0464492';
      // data.lon = '-34.9324883';

      $http.post(apiUrl + '/user/create', data, { headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success createUser ', data)
        }, function(error){
          console.warn('Error createUser: ', error)
      });
    };

    // login
    obj.loginUser = function(data) {
      $http.post(apiUrl + '/user/login', data)
        .then(function(data){
          console.log('Success loginUser: ', data);
          if (data.data.error === true) {
            toaster.pop('error', "Guardiões da Saúde", data.data.message);
          } else {
            toaster.pop('success', "Guardiões da Saúde", data.data.message);
            user.user_token = data.data.token; // add token in user obj
            user.data = data.data.user; // add user data in user obj
            $location.path('/health-daily'); // redirect user
          }
        }, function(error){
          // console.warn('Error loginUser: ', error);
          toaster.pop('error', "Guardiões da Saúde", error);
      });
    };

    return obj;
  });
