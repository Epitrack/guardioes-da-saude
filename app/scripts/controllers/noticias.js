'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:NoticiasCtrl
 * @description
 * # NoticiasCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('NoticiasCtrl', ['$scope', 'NewsApi', function ($scope, NewsApi) {

    $scope.pageClass = 'noticias-page';

    $scope.news = {};

    NewsApi.getNews(null, function (data) {
      $scope.news = data.data.statuses;

      angular.forEach(data.data.statuses, function (i) {
        $scope.min_url = i.user.url;
        $scope.min_avatar = i.user.profile_image_url;
      });
    });

  }]);
