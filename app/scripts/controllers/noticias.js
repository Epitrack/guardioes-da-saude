'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:NoticiasCtrl
 * @description
 * # NoticiasCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('NoticiasCtrl', ['$scope', 'noticias', function ($scope, noticias) {

    $scope.pageClass = 'noticias-page';

    noticias.getNoticias(function(data) {
      $scope.noticias = data;
    });

  }]);
