'use strict';

/**
 * @ngdoc service
 * @name gdsApp.Upload
 * @description
 * # Upload
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('Upload', function ($http, ApiConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;

    var obj = {};

    obj.send = function(file, callback) {
      var fd = new FormData();
      fd.append('image', file);

      $http.post('http://posttestserver.com/post.php', fd, { transformRequest: angular.identity, headers: {'Content-Type': undefined }})
        .then(function(data){
          console.log('Success upload image: ', data);
          callback(data);
        }, function(error){
          console.warn('Error upload image: ', error)
      })
    };

    return obj;
  });
