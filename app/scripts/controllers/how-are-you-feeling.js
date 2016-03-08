'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HowAreYouFeelingCtrl
 * @description
 * # HowAreYouFeelingCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HowAreYouFeelingCtrl', ['$scope', '$location', '$timeout', 'Surveyapi', 'LocalStorage', '$window', '$facebook', 'Notification', function ($scope, $location, $timeout, Surveyapi, LocalStorage, $window, $facebook, Notification) {

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
          try { Notification.show('error', 'Survey', data.data.message); }catch(e){}
        } else {
          // console.log(data.data.message);
          try { Notification.show('success', 'Survey', data.data.message); }catch(e){}
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
      var text = 'Acabei de participar do Guardiões da Saúde, participe você também! www.guardioesdasaude.org';
      // var title = 'Guardiões da Saúde';
      // var url = 'http%3A%2F%2Fguardioesdasaude.org';

      if (social === 'facebook') {
        $facebook.ui({
          method: 'share',
          href: 'www.guardioesdasaude.org'
        }).then(function (response) {
            try { Notification.show('success', 'Compartilhar', 'Obrigado por compartilhar'); }catch(e){}
            $('#modal-i-feel-good').modal('hide');
        }, function(error){
          // console.warn("error -->", error)
        });
      } else {
        $window.open('https://twitter.com/home?status=' + text);
      }
    };

  }]);
