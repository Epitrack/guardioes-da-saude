'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChooseSymptomsCtrl', ['$scope', 'Surveyapi', 'toaster', '$location', 'LocalStorage', '$timeout', function ($scope, Surveyapi, toaster, $location, LocalStorage, $timeout) {

    // get all symptoms
    Surveyapi.getSymptoms(function(data) {
      $scope.symptomsList = data.data.data;
    });

    // report survey
    $scope.symptoms = {};

    $scope.submitSurvey = function() {
      var form = {};

      angular.forEach($scope.symptoms, function(v, symptom) {
        if(v) {
          form[symptom] = "Y";
        }
      });

      form.ill_date = moment(form.ill_date).format('YYYY-DD-MM');
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
          toaster.pop('success', data.data.message);
          console.log(data.data.message);
          $scope.goToHome();
        }
      });
    };

    $scope.goToHome = function() {
      $timeout(function(){
        $location.path('/health-daily');
      },
      300);
    };

  }]);
