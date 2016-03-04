'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChooseSymptomsCtrl', ['$scope', 'Surveyapi', '$location', 'LocalStorage', '$timeout', '$window', '$facebook', 'Notification', '$rootScope', function ($scope, Surveyapi, $location, LocalStorage, $timeout, $window, $facebook, Notification, $rootScope) {

    // get all symptoms
    Surveyapi.getSymptoms(function (data) {
      $scope.symptomsList = data.data.data;
    });

    // report survey
    $scope.symptoms = {};

    $scope.submitSurvey = function () {
      var form = {};

      if ($scope.symptoms.travelLocation) {
        var country = $scope.symptoms.travelLocation;
      }

      angular.forEach($scope.symptoms, function (v, symptom) {
        if (v) {
          form[symptom] = "Y";
        }
      });
      form.ill_date =  moment().format('YYYY-MM-DD');
      form.lat = LocalStorage.getItem('userLocation').lat;
      form.lon = LocalStorage.getItem('userLocation').lon;

      // when submit survey to household
      var url = $location.path().split('/');
      var household = url[url.length - 3];

      if (household === 'household') {
        form.household_id = url[3];
      }

      if (country !== undefined) {
        form.travelLocation = country;
      }

      Surveyapi.submitSurvey(form, function (data) {
        if (data.data.error === true) {
          // console.warn(data.data.message);
          Notification.show('error', 'Survey', data.data.message);
        } else {
          // console.log(data.data.message);
          Notification.show('success', 'Survey', data.data.message);

          if (data.data.exantematica === true) {
            openModalExantematica();
          } else {
            openModal();
          }
        }
      });
    };

    function openModal() {
      $('#modal-thanks').modal({
        show: 'true'
      });
    }

    function openModalExantematica() {
      $('#modal-exantematica').modal({
        show: 'true'
      });
    }

    $scope.goToUpas = function () {
      $timeout(function () {
          $location.path('/health-tips');
        },
        400);

      $rootScope.aside = 'upas';
    };

    $scope.goToHome = function () {
      $timeout(function () {
          $location.path('/health-daily');
        },
        300);
    };

    $scope.share = function (social) {
      var text = 'Acabei de participar do Guardiões da Saúde, participe você também! www.guardioesdasaude.org';
      var title = 'Guardiões da Saúde';
      var url = 'http%3A%2F%2Fguardioesdasaude.org';

      if (social === 'facebook') {
        $facebook.ui({
          method: 'share',
          href: 'http://guardioesdasaude.org'
        }).then(function (response) {
            Notification.show('success', 'Compartilhar', 'Obrigado por compartilhar');
            $('#modal-i-feel-good').modal('hide');
        }, function(error){console.warn("error -->", error)});
      } else {
        $window.open('https://twitter.com/home?status=' + text);
      }
    };

  }]);
