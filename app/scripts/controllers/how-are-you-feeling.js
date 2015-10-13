'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HowAreYouFeelingCtrl', ['$scope', function ($scope) {
    $scope.pageClass = 'hayf-page'; // hayft === 'How Are You Feeling'

    $scope.iFeelGood = function() {
      console.log('I Feel Good');
    };

    $scope.iFeelBad = function() {
      console.log('I Feel Bad');
    };
  }]);
