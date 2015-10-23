'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HowAreYouFeelingCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    $scope.pageClass = 'hayf-page'; // hayft === 'How Are You Feeling'

    $scope.iFeelGood = function() {
      console.log('I Feel Good');
    };

    $scope.iFeelBad = function() {
      console.log('I Feel Bad');

      var url = $location.path().replace('step-1', 'step-2');
      $location.path(url);
    };

    $scope.submitFellGood = function() {
      // redirect user to home
      $timeout(function(){
        $location.path('#/');
      },
      300);
    };
  }]);
