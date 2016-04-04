'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DataAnalysisCtrl
 * @description
 * # DataAnalysisCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('DataAnalysisCtrl', function(Surveyapi, DashboardApi, $scope, $location) {

        // ====
        // Get all symptoms
        $scope.dash = {};
        $scope.analytics = {};

        Surveyapi.getSymptoms(function(data) {
            $scope.symptomsList = data.data.data;
        });

        $scope.getAllData = function() {
            DashboardApi.getAllData(function(data) {
                var result = data.data;
                $scope.dash = result;

            });
        };
        $scope.getAllData();
        /**/
        $scope.selecionarAnalytics = function(key, code) {
            if ($scope.analytics[key] == undefined) {
                $scope.analytics[key] = {};
            }
            if ($scope.analytics[key][code] === undefined) {
                $scope.analytics[key][code] = true;
            } else {
                $scope.analytics[key][code] = !$scope.analytics[key][code];
            }
            console.log($scope.analytics);
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
        /**/
        $scope.params = {};
        /**/
        $scope.variaveis = {};
        $scope.variaveis.symptoms = {};
        $scope.variaveis.syndromes = {};
        $scope.variaveis.age = {};
        $scope.variaveis.gender = {};
        $scope.variaveis.race = {};
        $scope.variaveis.weeks = {};
        $scope.variaveis.monthyear = {};
        $scope.variaveis.local = {};
        /**/
        $scope.initparams = function() {
            $scope.params['pizza'] = {};
            $scope.params['histograma'] = {};
            $scope.params['barras'] = {};
            $scope.params['tabela'] = {};
            $scope.params['pizza'].variaveis = [];
            $scope.params['pizza'].filtros = [];
            $scope.params['histograma'].eixox = [];
            $scope.params['histograma'].eixoy = [];
            $scope.params['histograma'].filtros = [];
            $scope.params['barras'].eixox = [];
            $scope.params['barras'].eixoy = [];
            $scope.params['barras'].filtros = [];
            $scope.params['tabela'].colunas = [];
            $scope.params['tabela'].linhas = [];
            $scope.params['tabela'].filtros = [];

        };
        /**/
        $scope.initparams();

        $scope.remove_params = function(index, type, key) {
            console.log($scope.params[type][key][index].c);
            $("#variaveis").append($scope.params[type][key][index].c);
            $scope.params[type][key].splice(index, 1);
        };

        $scope.dropaction = function(ev, type, key) {
            var data = ev.dataTransfer.getData("id");
            var comp = document.getElementById(data);
            console.log(comp);
            $scope.params[type][key].push({ label: $(comp).find("button").html(), c: comp });
            $(comp).parent().empty();
            ev.preventDefault();
        }

        $scope.drag = function(ev) {
            ev.dataTransfer.setData("id", ev.target.id);
        }

        $scope.clear = function(key) {
            for (var o in $scope.params[key]) {
                for (var i = 0; i < $scope.params[key][o].length; i++) {
                    $scope.remove_params(i, key, o);
                }
            }
        };

        $scope.getGraphic = function(type) {
            $location.path('/dashboard/analysis/result');
        };

    });
/**/
