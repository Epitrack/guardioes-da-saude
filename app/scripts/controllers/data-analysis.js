'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DataAnalysisCtrl
 * @description
 * # DataAnalysisCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('DataAnalysisCtrl', function(Surveyapi, DashboardApi, $scope, $location, $rootScope, $compile) {
        $scope.slide_active = 0;

        $scope.DEPARALABELS = {
            "symptoms": "Sintomas",
            "syndromes": "Síndromes",
            "age": "Idade",
            "gender": "Sexo",
            "race": "Raça",
            "weeks": "Semana Epidemiológica",
            "monthyear": "Mês/Ano",
            "local": "Local"
        };
        $scope.DEPARA = {
            "age": "FE",
            "gender": "SEXO",
            "email": "EMAIL",
            "race": "COR",
            "local": "REGIAO",
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
            "symptoms": "SINTOMAS",
            "diarreica": "SIND_DIA",
            "respiratoria": "SIND_RES",
            "exantematica": "SIND_EXA",
            "syndromes": "SINDROME",
            "weeks": "SEN",
            "monthyear": "MESANO"
        };
        $scope.UFS = [
            "AC",
            "AL",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MA",
            "MT",
            "MS",
            "MG",
            "PR",
            "PB",
            "PA",
            "PE",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SE",
            "SP",
            "TO"
        ];
        // ====
        // Get all symptoms
        $scope.dash = {};
        $scope.analytics = {};

        $scope.goback = function() {
            $location.path('/dashboard/analysis');
        };

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

        $scope.filterUFS = function() {
            var u = [];
            for (var i in $scope.dash.usersByState) {
                if (_.contains($scope.UFS, $scope.dash.usersByState[i]._id)) {
                    u.push($scope.dash.usersByState[i]);
                }
            }
            u = _.sortBy(u, function(o) {
                return o._id;
            });
            return u;
        }

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
            /*console.log($scope.analytics);*/
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
            var el = $compile($scope.params[type][key][index].c)($scope);
            angular.element($("#variaveis")).append(el);
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
            if (window.sessionStorage.getItem('surveys') === null) {
                var psv = d3.dsv(";", "text/plain");
                psv("https://s3.amazonaws.com/gdsreports/surveys_dashboard.txt", function(data) {
                    window.sessionStorage.setItem('surveys', JSON.stringify(data));
                    callback(data);
                });
            } else {
                callback(JSON.parse(window.sessionStorage.getItem('surveys')));
            }
        };
        /**/
        $scope.prev = function() {
            console.log($scope.slides);
        };
        /**/
        $scope.first = 0;
        $scope.slides = [];
        $scope.is_histogram = false;
        $scope.ishistogram = function(nextSlide, direction) {
            $scope.slide_active += 1;
            if ($scope.first === 0) {
                $scope.first = nextSlide['$id'];
                $scope.slides.push($scope.first);
            } else {
                if (!_.contains($scope.slides, nextSlide['$id'])) {
                    $scope.slides.push(nextSlide['$id']);
                }
            }
            if (_.indexOf($scope.slides, nextSlide['$id']) === 1) {
                $scope.is_histogram = true;
                var comp = document.getElementById("weeks");
                $scope.params['histograma']['eixox'].push({ id: $(comp).attr("id"), label: $(comp).find("button").html(), c: comp });
                $("#variaveis").find("#weeks").remove();
                return true;
            } else {
                $scope.is_histogram = false;
                try {
                    var el = $compile($scope.params['histograma']['eixox'][0].c)($scope);
                    angular.element($("#variaveis")).append(el);
                    $scope.params['histograma']['eixox'].splice(0, 1);
                } catch (e) {}

                return false;
            }
        };
        /**/
        $scope.meses = [];
        $scope.anos = [];
        $scope.sem_min_max = {};
        $scope.getMesesAnos = function() {
            $scope.loadfile(function(data) {
                $scope.meses = _.keys(_.groupBy(data, function(obj) {
                    return obj['MES'];
                }));
                $scope.anos = _.keys(_.groupBy(data, function(obj) {
                    return obj['ANO'];
                }));
            });
        };

        $scope.getSemMinMax = function() {
            $scope.loadfile(function(data) {
                var g = _.keys(_.groupBy(data, function(o) {
                    return o['SEN'];
                }));
                $scope.sem_min_max['MAX'] = _.max(g, function(o) {
                    return parseInt(o)
                });
                $scope.sem_min_max['MIN'] = _.min(g, function(o) {
                    return parseInt(o)
                });
                $scope.range = $scope.sem_min_max['MIN'];
                $scope.semanaepidemiologica = {
                    minValue: parseInt($scope.sem_min_max['MIN']) + 1,
                    maxValue: parseInt($scope.sem_min_max['MAX']) + 1,
                    draggableRange: true,
                    options: {
                        floor: parseInt($scope.sem_min_max['MIN']) + 1,
                        ceil: parseInt($scope.sem_min_max['MAX']) + 1,
                        step: 1,
                        showTicksValues: true
                    }
                };

            });
        };

        $scope.getMesesAnos();
        $scope.getSemMinMax();
        /**/
        //Range slider config
        /**/
        $scope.t = function(r) {
            console.log(r);
        };
        $scope.getGraphic = function(type) {
            /* console.log($scope.params[type]);
             console.log($scope.variaveis);
             console.log($scope.analytics);*/
            var is_sintoma = false;
            var idsintoma = 0;
            var count = 0;
            var labels = [];
            var filtros = [];
            $scope.loadfile(function(data) {
                var groups = [];
                for (var o in $scope.params[type]) {
                    if (o !== 'filtros') {
                        for (var i in $scope.params[type][o]) {
                            if ($scope.DEPARA[$scope.params[type][o][i].id] === 'SINTOMAS') {
                                is_sintoma = true;
                                idsintoma = count;
                            }
                            labels.push($scope.DEPARALABELS[$scope.params[type][o][i].id]);
                            groups.push($scope.DEPARA[$scope.params[type][o][i].id]);
                            count++;
                        }
                    }
                }
                /*VERIFICA FILTRO DE SEMANA EPIDEMIOLOGICA*/
                if ($scope.semanaepidemiologica.minValue !== $scope.semanaepidemiologica.options.floor || $scope.semanaepidemiologica.maxValue !== $scope.semanaepidemiologica.options.ceil) {
                    data = _.filter(data, function(obj) {
                        return parseInt(obj['SEN']) >= $scope.semanaepidemiologica.minValue && parseInt(obj['SEN']) <= $scope.semanaepidemiologica.maxValue;
                    });
                    console.log("semanaepidemiologica - data", data);
                }
                /*\VERIFICA FILTRO DE SEMANA EPIDEMIOLOGICA*/

                var df = data;
                for (var key in $scope.analytics) {
                    var data_final = [];
                    for (var value in $scope.analytics[key]) {
                        var obj = {};
                        obj[$scope.DEPARA[key]] = value;
                        filtros[$scope.DEPARALABELS[key]] = value;
                        data_final.push(_.where(df, obj));
                    }
                    df = [];
                    for (var i in data_final) {
                        for (var ii in data_final[i]) {
                            df.push(data_final[i][ii]);
                        }
                    }
                }

                data = df;
                /**/
                window.localStorage.setItem('dadosfiltrados', JSON.stringify(data));
                /*Filtros*/
                var result = null;
                if (groups.length !== 0) {
                    /*Groups*/
                    console.log("is_sintoma", is_sintoma);
                    console.log("idsintoma", idsintoma);
                    if (is_sintoma) {
                        result = _.groupBygroup(data, groups, idsintoma, ",");
                    } else {
                        result = _.groupByMulti(data, groups);
                    }
                    /**/
                    window.localStorage.setItem('type', type);
                    window.localStorage.setItem('labels', JSON.stringify(labels));
                    window.localStorage.setItem('groups', JSON.stringify(groups));
                    window.localStorage.setItem('filters', JSON.stringify(_.keys(filtros)));
                    window.localStorage.setItem('result', JSON.stringify(result));
                    $location.path('/dashboard/analysis/result');
                    /**/
                }
            });
        };
    });
