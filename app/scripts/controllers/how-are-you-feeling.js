'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HowAreYouFeelingCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.pageClass = 'hayf-page'; // hayft === 'How Are You Feeling'

    $scope.iFeelGood = function() {
      console.log('I Feel Good');
    };

    $scope.iFeelBad = function() {
      console.log('I Feel Bad');

      var url = $location.path().replace('step-1', 'step-2');
      $location.path(url);
    };
  }]);
