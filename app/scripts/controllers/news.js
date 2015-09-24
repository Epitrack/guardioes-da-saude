'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('NewsCtrl', ['$scope', 'noticias', function ($scope, noticias) {
    $scope.pageClass = 'news-page';

    noticias.getNoticias(function(data) {
      $scope.noticias = data;
    });

  }]);
