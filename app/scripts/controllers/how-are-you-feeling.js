'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HowAreYouFeelingCtrl', ['$scope', '$location', '$timeout', 'Surveyapi', 'LocalStorage', 'toaster', '$window', function ($scope, $location, $timeout, Surveyapi, LocalStorage, toaster, $window) {

    $scope.pageClass = 'hayf-page'; // hayf === 'How Are You Feeling'

    $scope.iFeelGood = function() {
      var form = {};

      form.no_symptom = 'Y';
      form.ill_date = moment().format('YYYY/DD/MM');
      form.lat = LocalStorage.getItem('userLocation').lat;
      form.lon = LocalStorage.getItem('userLocation').lon;

      // when submit survey to household
      var url = $location.path().split('/');
      var household = url[url.length - 3];

      if (household == 'household') {
        form.household_id = url[url.length - 2];
      }

      Surveyapi.submitSurvey(form, function(data) {
        if (data.data.error != false) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);
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

    $scope.share = function(social) {
      var text, social;

      text = 'Acabei de participar do Guardiões da Saúde, participe você também! www.guardioesdasaude.org';
      social = social;

      if (social == 'facebook') {
        $window.open('https://www.facebook.com/sharer/sharer.php?u='+ text)
      } else {
        $window.open('https://twitter.com/home?status='+ text)
      }
    };

  }]);
