'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('HowAreYouFeelingCtrl', ['$scope', '$location', '$timeout', 'Surveyapi', 'LocalStorage', '$window', '$facebook', 'Notification', 'moment', 
  function ($scope, $location, $timeout, Surveyapi, LocalStorage, $window, $facebook, Notification, moment) {

    $scope.pageClass = 'hayf-page'; // hayf === 'How Are You Feeling'

    $scope.iFeelGood = function () {
      var form = {};

      form.no_symptom = 'Y';
      form.ill_date = moment().format('YYYY-MM-DD');
      form.lat = LocalStorage.getItem('userLocation').lat;
      form.lon = LocalStorage.getItem('userLocation').lon;

      // when submit survey to household
      var url = $location.path().split('/');
      var household = url[url.length - 3];

      if (household === 'household') {
        form.household_id = url[url.length - 2];
      }

      Surveyapi.submitSurvey(form, function (data) {
        console.log("submit survey ", data.data);
        if (data.data.error !== false) {
          // console.warn(data.data.message);
          Notification.show('error', 'Survey', data.data.message);
        } else {
          // console.log(data.data.message);
          Notification.show('success', 'Survey', data.data.message);
        }
      });
    };

    $scope.iFeelBad = function () {
      var url = $location.path().replace('step-1', 'step-2');
      $location.path(url);
    };

    $scope.goToHome = function () {
      // console.log('====== goToHome =======')
      $timeout(function () {
          $location.path('/health-daily');
        },
        300);
    };

    $scope.share = function (social) {
      var text = 'Eu faço minha parte, faça sua parte também no combate ao mosquito Aedes aegypti #ZikaZero. Acesse: www.guardioesdasaude.org';
      var url = 'http://guardioesdasaude.org';

      if (social === 'facebook') {
        $facebook.ui({
          method: 'share',
          href: url
        }).then(function () {
            Notification.show('success', 'Compartilhar', 'Obrigado por compartilhar');
            angular.element('#modal-i-feel-good').modal('hide');
        }, function(error){
           console.warn("error -->", error);
        });
      } else {
        $window.open('https://twitter.com/home?status=' + text);
      }
    };

  }]);
