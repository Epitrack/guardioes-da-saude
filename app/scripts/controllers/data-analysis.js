'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DataAnalysisCtrl
 * @description
 * # DataAnalysisCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('DataAnalysisCtrl', function (Surveyapi, $scope) {

    // ====
    // Get all symptoms
    $scope.dash = {};

    Surveyapi.getSymptoms(function (data) {
      $scope.symptomsList = data.data.data;
    });
    // ====

    // ====
    // Graphic types carousel
    function _addSlide(){
      var slides = $scope.slides = [
        {
          image: '../../images/dashboard/icon_pizza.svg',
          text: 'Pizza',
          id: 0
        },
        {
          image: '../../images/dashboard/icon_histograma.svg',
          text: 'Barra',
          id: 1
        },
        {
          image: '../../images/dashboard/icon_coluna.svg',
          text: 'Histograma',
          id: 2
        },
        {
          image: '../../images/dashboard/icon_tabela.svg',
          text: 'Tabela',
          id: 3
        }
      ];
    };

    _addSlide();
    // ====

    // ====
    // Range
    $scope.range = {
      min: 1,
      max: 52
    };
    // ====

    // ====
    // Drag and drop
    $scope.getGraphic = function() {
      console.warn('Dashboard data -> ', $scope.dash)
    };
    // ====
  });
