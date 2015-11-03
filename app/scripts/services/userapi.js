'use strict';

/**
 * @ngdoc service
 * @name gdsApp.UserApi
 * @description
 * # UserApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('UserApi', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};
    var apiUrl = 'http://52.20.162.21';
    var app_token = 'd41d8cd98f00b204e9800998ecf8427e';

    obj.createUser = function(data) {

      data.app_token = app_token;
      data.platform = 'web';
      data.client = 'api';
      data.lat = '-8.0464492';
      data.lon = '-34.9324883';

      // return console.log(data);

      $http.post(apiUrl + '/user/create', data, { headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success createUser ', data)
        }, function(error){
          console.log('Error createUser: ', error)
      });
    };

    return obj;
  });
