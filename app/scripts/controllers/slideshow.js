'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:SlideshowCtrl
 * @description
 * # SlideshowCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('SlideshowCtrl', ['$scope','$translate', function ($scope,$translate) {

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.lang = $translate.use();
    if($translate.use()===undefined){
       $translate.use('pt');
       $scope.lang = $translate.use();
    }
    var slides = $scope.slides = [];

    for (var i = 1; i < 4; i++) {
      slides.push({
        image: '../../images/slide/'+$scope.lang+'/gds-slides0' + i + '.png',
        text: 'Hey Judie'
      });
    }

  }]);
