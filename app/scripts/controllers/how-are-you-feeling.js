'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HowAreYouFeelingCtrl', ['$scope', '$location', '$timeout', 'Surveyapi', 'LocalStorage', 'toaster', '$window', '$facebook', function ($scope, $location, $timeout, Surveyapi, LocalStorage, toaster, $window, $facebook) {

    $scope.pageClass = 'hayf-page'; // hayf === 'How Are You Feeling'

    $scope.iFeelGood = function () {
      var form = {};

      form.no_symptom = 'Y';
      form.ill_date = moment().format('YYYY/DD/MM');
      form.lat = LocalStorage.getItem('userLocation').lat;
      form.lon = LocalStorage.getItem('userLocation').lon;

      // when submit survey to household
      var url = $location.path().split('/');
      var household = url[url.length - 3];

      if (household === 'household') {
        form.household_id = url[url.length - 2];
      }

      Surveyapi.submitSurvey(form, function (data) {
        if (data.data.error !== false) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);
        }
      });
    };

    $scope.iFeelBad = function () {
      var url = $location.path().replace('step-1', 'step-2');

      $location.path(url);
    };

    $scope.goToHome = function () {
      console.log('====== goToHome =======')
      $timeout(function () {
          $location.path('/health-daily');
        },
        300);
    };

    $scope.share = function (social) {
      var text = 'Acabei de participar do Guardiões da Saúde, participe você também! www.guardioesdasaude.org';
      var title = 'Guardiões da Saúde';
      var url = 'http%3A%2F%2Fdev.guardioesdasaude.org';
        
      if (social === 'facebook') {
        $facebook.ui({
          method: 'share',
          href: 'http://dev.guardioesdasaude.org'
        }).then(function (response) {
            toaster.pop('success', "Obrigado por compartilhar");
        }, function(error){console.warn("error -->", error)});
      } else {
        $window.open('https://twitter.com/home?status=' + url);
      }
    };

  }]);
