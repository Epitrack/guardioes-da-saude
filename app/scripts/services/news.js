'use strict';

/**
 * @ngdoc service
 * @name gdsApp.NewsApi
 * @description
 * # NewsApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('NewsApi', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    var apiUrl = 'http://52.20.162.21';
    var user_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NjM5MjIyNThhN2E3ZmIwNTczMGFhMWUiLCJleHAiOjE0NDY3NDcyNTV9.uVs6Ypsh0-4DYKiuZdbN8fp3B4OXt2T6sskqZ2D2Eno';
    var news = [];

    obj.getNews = function() {
      $http.get(apiUrl + '/news/get', { headers: {'user_token': user_token}})
        .success(function(data) {
          // news = data;
          console.log('Success getNews: ', data);
        }).error(function(error) {
          console.log('Error getNews: ', error);
        })
    };

    return obj;
  });
