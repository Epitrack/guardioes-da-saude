'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HowAreYouFeelingCtrl', ['$scope', '$location', '$timeout', 'Surveyapi', 'LocalStorage', function ($scope, $location, $timeout, Surveyapi, LocalStorage) {

    $scope.pageClass = 'hayf-page'; // hayf === 'How Are You Feeling'

    $scope.iFeelGood = function() {
      var url = $location.path().split('/');
      var household = url[url.length - 3];

      $scope.iFeelGood = {};

      $scope.iFeelGood.no_symptom = 'Y';
      $scope.iFeelGood.ill_date = moment().format('YYYY/DD/MM');
      $scope.iFeelGood.lat = LocalStorage.getItem('userLocation').lat;
      $scope.iFeelGood.lon = LocalStorage.getItem('userLocation').lon;

      if (household == 'household') {
        // when submit survey to household
        $scope.iFeelGood.household_id = url[url.length - 2];
      }

      console.log($scope.iFeelGood);

      Surveyapi.submitSurvey($scope.iFeelGood, function(data) {
        if (data.data.error != false) {
          console.log('Obrigado')
        } else {
          console.warn('Alguma coisa deu errado, tente novamente depois :)')
        }
      });
    };

    $scope.iFeelBad = function() {
      var url = $location.path().replace('step-1', 'step-2');

      $location.path(url);
    };

    $scope.goToHome = function() {
      $timeout(function(){
        $location.path('/health-daily');
      },
      300);
    };
  }]);
