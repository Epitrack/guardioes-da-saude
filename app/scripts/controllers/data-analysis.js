'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DataAnalysisCtrl
 * @description
 * # DataAnalysisCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('DataAnalysisCtrl', function(Surveyapi, $scope) {

        // ====
        // Get all symptoms
        $scope.dash = {};
        $scope.analytics = {};

        Surveyapi.getSymptoms(function(data) {
            $scope.symptomsList = data.data.data;
        });

        $scope.selecionarAnalytics = function(key, code) {
            if ($scope.analytics[key] == undefined) {
                $scope.analytics[key] = {};
            }
            if ($scope.analytics[key][code] === undefined) {
                $scope.analytics[key][code] = true;
            } else {
                $scope.analytics[key][code] = !$scope.analytics[key][code];
            }
            console.log($scope.analytics[key]);
        };
        // ====

        // ====
        // Graphic types carousel
        function _addSlide() {
            var slides = $scope.slides = [{
                tamplate: 'views/analysis/pizza.html',
                id: 0
            }, {
                image: '../../images/dashboard/icon_histograma.svg',
                text: 'Barra',
                id: 1
            }, {
                image: '../../images/dashboard/icon_coluna.svg',
                text: 'Histograma',
                id: 2
            }, {
                image: '../../images/dashboard/icon_tabela.svg',
                text: 'Tabela',
                id: 3
            }];
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
        // Drag and drop
        $scope.getGraphic = function() {
            console.warn('Dashboard data -> ', $scope.dash)
        };

        // ====
        $scope.opts = {
            group: 'todo',
            animation: 150
        };
        $scope.params = {};
        $scope.params.variaveis = [];
        $scope.params.filtros = [];
        $scope.params.eixox = [];
        $scope.params.eixoy = [];

        $scope.remove_params = function(index, key) {
          console.log($scope.params[key][index].c);
            $("#variaveis").append($scope.params[key][index].c);
            $scope.params[key].splice(index, 1);
        };

        $scope.dropaction = function(ev, key) {
            var data = ev.dataTransfer.getData("id");
            var comp = document.getElementById(data);
            console.log(comp);
            $scope.params[key].push({ label: $(comp).find("button").html(), c: comp });
            $(comp).parent().empty();
            ev.preventDefault();
        }

        $scope.drag = function(ev) {
            ev.dataTransfer.setData("id", ev.target.id);
        }

        $scope.clear = function() {
            for (var i = 0; i < $scope.params.variaveis.length; i++) {
                $scope.remove_params(i, 'variaveis');
            }
            for (var j = 0; j < $scope.params.filtros.length; j++) {
                $scope.remove_params(j, 'filtros');
            }
        };

    });
/**/
