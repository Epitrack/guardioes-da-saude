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

      // angular.forEach($scope.news, function(value, key) {
      //   console.log(value, key);
      //   $scope.news.date = moment(value.created_at).format('DD MM YYYY');
      // });
    });

  }]);
