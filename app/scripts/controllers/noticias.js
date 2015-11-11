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

    NewsApi.getNews(null, function(data) {
      $scope.news = data.data.statuses;
    });

  }]);
