'use strict';

/**
 * @ngdoc service
 * @name gdsApp.ContactApi
 * @description
 * # ContactApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('ContactApi', ['$http', 'ApiConfig', function ($http, ApiConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;

    obj.faleConosco = function(data, callback) {
      $http.post(apiUrl + '/email/contact', data, { headers: {'app_token': app_token}})
        .then(function(data){
          console.log('Success faleConosco: ', data);
          callback(data);
        }, function(error){
          console.warn('Error faleConosco: ', error);
      });
    };

    return obj;

  }]);
