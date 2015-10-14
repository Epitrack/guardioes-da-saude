'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChooseSymptomsCtrl', ['$scope', function ($scope) {

    $scope.symptomsList = [
      {name: 'Febre', id: 'febre'},
      {name: 'Tosse', id: 'tosse'}
    ];

    $scope.symptoms = {};

    $scope.getSymptoms = function() {
      angular.forEach($scope.symptoms, function(item, key) {
        $scope.symptoms[key] = 1;
      });

      console.log($scope.symptoms);
    };

  }]);
