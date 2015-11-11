'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChooseSymptomsCtrl', ['$scope', 'Surveyapi', 'toaster', function ($scope, Surveyapi, toaster) {

    // get all symptoms
    Surveyapi.getSymptoms(function(data) {
      $scope.symptomsList = data.data.data;
    });

    // report survey
    $scope.symptoms = {};

    $scope.submitSurvey = function() {
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
