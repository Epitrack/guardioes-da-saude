'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DataAnalysisCtrl
 * @description
 * # DataAnalysisCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('DataAnalysisCtrl', function(Surveyapi, DashboardApi, $scope, $location, $rootScope) {
        $scope.DEPARA = {
                "ID_REG_SEQ": "ID_REG_SEQ",
                "ID_REG_SEQ": "ID_REG_SEQ",
                "APELIDO": "APELIDO",
                "age": "IDADE",
                "gender": "SEXO",
                "email": "EMAIL",
                "race": "COR",
                "DT_CADASTRO": "DT_CADASTRO",
                "DT_REGISTRO_DIA": "DT_REGISTRO_DIA",
                "DT_REGISTRO_HORA": "DT_REGISTRO_HORA",
                "LOC_REGISTRO": "LOC_REGISTRO",
                "local": "REGIAO",
                "EQUIPAMENTO": "EQUIPAMENTO",
                "LAT": "LAT",
                "LONG": "LONG",
                "STATUS": "STATUS",
                "febre": "FEBRE",
                "manchas-vermelhas": "MANVERM",
                "dor-no-corpo": "DORCORPO",
                "dor-nas-juntas": "DORJUNTAS",
                "dor-de-cabeca": "DORCABECA",
                "coceira": "COCEIRA",
                "olhos-vermelhos": "OLHOSVERM",
                "dor-de-garganta": "DORGARGA",
                "tosse": "TOSSE",
                "falta-de-ar": "FALTAAR",
                "nausea-vomito": "NAUSVOM",
                "diarreia": "DIARREIA",
                "sangramento": "SANGRAME",
                "CONTATO": "CONTATO",
                "SERVSAUDE": "SERVSAUDE",
                "CADASTRO": "CADASTRO",
                "symptoms": "SINTOMA",
                "diarreica": "SIND_DIA",
                "respiratoria": "SIND_RES",
                "exantematica": "SIND_EXA",
                "NUMPART": "NUMPART",
                "TOTPART": "TOTPART",
                "MEMBROS": "MEMBROS",
                "TIPOUSUARIO": "TIPOUSUARIO",
                "FORAPAIS": "FORAPAIS",
            }
            // ====
            // Get all symptoms
        $scope.dash = {};
        $scope.analytics = {};

        $scope.goback = function() {
            $location.path('/dashboard/analysis');
        };

        Surveyapi.getSymptoms(function(data) {
            $scope.symptomsList = data.data.data;
            console.log($scope.symptomsList);
        });

        $scope.getAllData = function() {
            DashboardApi.getAllData(function(data) {
                var result = data.data;
                $scope.dash = result;

            });
        };
        $scope.getAllData();

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
            $scope.params[type][key].push({ id: $(comp).attr("id"), label: $(comp).find("button").html(), c: comp });
            $(comp).parent().empty();
            ev.preventDefault();
        }

        $scope.drag = function(ev) {
            $scope[ev.target.id] = false;
            // $("#"+ev.target.id).find("button").removeClass('active');
            ev.dataTransfer.setData("id", ev.target.id);
        }

        $scope.clear = function(key) {
            for (var o in $scope.params[key]) {
                for (var i = 0; i < $scope.params[key][o].length; i++) {
                    $scope.remove_params(i, key, o);
                }
            }
        };

        $scope.loadfile = function(callback) {
            if (window.localStorage.getItem('surveys') === null) {
                var psv = d3.dsv(";", "text/plain");
                psv("/scripts/util/surveys.csv", function(data) {
                    window.localStorage.setItem('surveys', JSON.stringify(data));
                    callback(data);
                });
            } else {
                callback(JSON.parse(window.localStorage.getItem('surveys')));
            }
        }
        $scope.getGraphic = function(type) {
            console.log($scope.params[type]);
            console.log($scope.variaveis);
            console.log($scope.analytics);

            var simtomas = ['febre', 'manchas-vermelhas', 'dor-no-corpo', 'dor-nas-juntas', 'dor-de-cabeca', 'coceira', 'olhos-vermelhos', 'dor-de-garganta', 'tosse', 'falta-de-ar', 'nausea-vomito', 'diarreia', 'sangramento'];

            $scope.loadfile(function(data) {
                var groups = [];
                var obj = {};
                for (var o in $scope.params[type]) {
                    if (o !== 'filtros') {
                        for (var i in $scope.params[type][o]) {
                            /*var s = $scope.DEPARA[$scope.params[type][o][i].id];
                            if (s === 'SINTOMA') {
                                for (var si = 0; si < simtomas.length; si++) {
                                    groups.push($scope.DEPARA[simtomas[si]]);
                                }
                            } else {*/
                            groups.push($scope.DEPARA[$scope.params[type][o][i].id]);
                        }
                    } else {
                        for (var i in $scope.params[type][o]) {
                            for (var key in $scope.analytics[$scope.params[type][o][i].id]) {
                                if ($scope.analytics[$scope.params[type][o][i].id][key]) {
                                    obj[$scope.DEPARA[$scope.params[type][o][i].id]] = key;
                                }
                            }
                        }
                    }
                }
                /*Filtros*/
                console.log(obj);
                console.log(groups);
                data = _.where(data, obj);
                if (groups.length !== 0) {
                    /*Groups*/
                    var result = _.groupByMulti(data, groups);
                    console.log(result);
                    window.localStorage.setItem('type', type);
                    window.localStorage.setItem('result', JSON.stringify(result));
                    // $location.path('/dashboard/analysis/result');
                    /*
                    $location.path("app/ipvaresult");
                    */
                }
            });
        };
    });
