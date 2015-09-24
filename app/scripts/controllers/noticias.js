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

    noticias.getNoticias(function(data) {
      $scope.noticias = data;
    });

  }]);
