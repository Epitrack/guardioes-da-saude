'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('NewsCtrl', ['$scope', 'NewsApi', function ($scope, NewsApi) {

    $scope.pageClass = 'news-page';

    $scope.news = {};

    NewsApi.getNews(null, function(data) {
      $scope.news = data.data.statuses;
    });

  }]);
