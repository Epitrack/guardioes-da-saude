'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChooseSymptomsCtrl', ['$scope', 'Surveyapi', 'toaster', '$location', 'LocalStorage', function ($scope, Surveyapi, toaster, $location, LocalStorage) {

    // get all symptoms
    Surveyapi.getSymptoms(function(data) {
      $scope.symptomsList = data.data.data;
    });

    // report survey
    $scope.symptoms = {};

    $scope.submitSurvey = function() {
      var url = $location.path().split('/');
      var household = url[url.length - 3];

      $scope.symptoms.ill_date = moment().format('YYYY/DD/MM');
      $scope.symptoms.lat = LocalStorage.getItem('userLocation').lat;
      $scope.symptoms.lon = LocalStorage.getItem('userLocation').lon;

      if (household == 'household') {
        // when submit survey to household
        $scope.symptoms.household_id = url[url.length - 2];
      }

      console.log($scope.symptoms);

      Surveyapi.submitSurvey($scope.symptoms, function(data) {
        console.log(data);
        // if (data.data.error != false) {
        //   toaster.pop('error', data.data.message);
        // } else {
        //   toaster.pop('success', data.data.message);
        // }
      });
    };

  }]);
