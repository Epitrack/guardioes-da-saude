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

    for (var i = 1; i < 4; i++) {
      slides.push({
        image: '../../images/slide/gds-slides0' + i + '.png',
        text: 'Hey Judie'
      });
    }

  }]);
