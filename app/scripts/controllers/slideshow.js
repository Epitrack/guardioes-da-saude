'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:SlideshowCtrl
 * @description
 * # SlideshowCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('SlideshowCtrl', ['$scope', function ($scope) {

    // $scope.activeSlide = function() {
      $scope.kittens = [
        ['http://placekitten.com/g/1024/500','http://placekitten.com/g/1024/500','http://placekitten.com/g/1024/500'],
        ['http://placekitten.com/g/1024/500','http://placekitten.com/g/1024/500','http://placekitten.com/g/1024/500'],
        ['http://placekitten.com/g/1024/500','http://placekitten.com/g/1024/500','http://placekitten.com/g/1024/500']
      ];
    // };

    // $scope.activeSlide();

  }]);
