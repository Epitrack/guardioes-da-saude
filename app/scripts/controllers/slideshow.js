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

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;

    var slides = $scope.slides = [];

    for (var i = 0; i < 4; i++) {
      slides.push({
        image: '../../images/slide/00-slide.png',
        text: 'Hey Judie'
      });
    }

  }]);
