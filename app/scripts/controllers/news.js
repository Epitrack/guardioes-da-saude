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

    var noticias = [];
    $scope.news = {};

    NewsApi.getNews(null, function (data) {
      var obj;
      var newsObj = data.data.statuses;

      angular.forEach(newsObj, function(i) {
        obj = {
          url: 'http://twitter.com/minsaude/status/' + i.id_str,
          created_at: i.created_at,
          text: i.text,
          favorite_count: i.favorite_count,
        };

        noticias.push(obj);
        $scope.news = noticias;
      });
    });

  }]);
