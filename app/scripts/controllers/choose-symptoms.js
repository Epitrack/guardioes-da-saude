'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChooseSymptomsCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {

    $scope.symptomsList = [
      {name: 'Febre', id: 'febre'},
      {name: 'Tosse', id: 'tosse'},
      {name: 'Náusea ou Vômito', id: 'nausea-ou-vomito'},
      {name: 'Manchas vermelhas no corpo', id: 'mancha-vermelha'},
      {name: 'Dor nas juntas', id: 'dor-nas-juntas'},
      {name: 'Diarréia', id: 'diarreia'},
      {name: 'Dor no corpo', id: 'dor-no-corpo'},
      {name: 'Sangramento', id: 'sangramento'},
      {name: 'Falta de Ar', id: 'falta-de-ar'},
      {name: 'Urina ou olhos amarelados', id: 'urina-olhos-amarelados'},
      {name: 'Dor de cabeça', id: 'dor-de-cabeca'},
      {name: 'Olhos vermelhos', id: 'olhos-vermelhos'},
      {name: 'Coceira', id: 'coceira'}
    ];

    $scope.symptoms = {};

    $scope.submitSurvey = function() {
      angular.forEach($scope.symptoms, function(item, key) {
        $scope.symptoms[key] = 1;
      });

      // send symptoms
      console.log($scope.symptoms);

      // redirect user to home
      $timeout(function(){
        $location.path('/');
      },
      500);

    };

  }]);
