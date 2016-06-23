'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardInteligenciaCtrl
 * @description
 * # DashboardInteligenciaCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('DashboardInteligenciaCtrl', ['$scope', '$location', '$rootScope', '$http', '$compile', 'ApiConfig',
    function($scope, $location, $rootScope, $http, $compile, ApiConfig) {

        // Init
        $scope.loadingGrafycs = true;

        /**/
        var apiUrl = ApiConfig.API_URL;
        var app_token = ApiConfig.APP_TOKEN;
        var classesColorScale = d3.scale.category10();
        /**/
        $scope.usersByCity = {};

        $scope.searchUsers = function() {
            $http.get(apiUrl + '/ei/users/', { headers: { 'app_token': app_token } })
                .then(function(data) {
                    $scope.usersByCity = {};
                    $scope.usersByCity['Brasil'] = {};
                    for (var i = 0; i < data.data.length; i++) {
                        $scope.usersByCity[data.data[i]._id] = {};
                        for (var j = 0; j < data.data[i].roles.length; j++) {
                            $scope.usersByCity[data.data[i]._id][data.data[i].roles[j].role] = data.data[i].roles[j].total
                                //
                            if ($scope.usersByCity['Brasil'][data.data[i].roles[j].role] === undefined) {
                                $scope.usersByCity['Brasil'][data.data[i].roles[j].role] = 0;
                            }
                            $scope.usersByCity['Brasil'][data.data[i].roles[j].role] += data.data[i].roles[j].total;
                        }
                    }
                    console.log($scope.usersByCity);
                }, function(error) {
                    console.warn('Error getAllData: ', error);
                });
        };
        $scope.searchUsers();
        //Object { Manaus: , Brasília: , São Paulo: , Belo Horizonte: , Rio de Janeiro: , Salvador:  }
        $scope.getUsersByCity = function(city, role) {
            try {
                return $scope.usersByCity[city][role] || 0;
            } catch (e) {
                return 0;
            }
        }

        $scope.alerts = {};
        $scope.usersType = {};
        $scope._symptoms = [];
        $scope.types = {
            sindrome: true,
            sintomas: false,
            customize: false
        };

        $scope.selectgraph = function(type) {
            for (var i in $scope.types) {
                if (i === type) {
                    $scope.types[i] = true;
                } else {
                    $scope.types[i] = false;
                }
            }
        }

        $scope.findAlerts = function() {
            $http.get(apiUrl + '/ei/alerts/')
                .then(function(data) {
                    data = data.data;
                    console.log("alerts", data);
                    $scope.alerts = data;
                    // $scope.inputDadosFicticios();
                    $scope.setColorAlerts();
                }, function(error) {
                    console.warn('Error getAllData: ', error);
                });
        };


        $scope.inputDadosFicticios = function() {
            if ($scope.alerts['São Paulo'] === undefined) {
                $scope.alerts['São Paulo'] = [];
            }
            if ($scope.alerts['Rio de Janeiro'] === undefined) {
                $scope.alerts['Rio de Janeiro'] = [];
            }

            $scope.alerts['São Paulo'].push({
                "data": "2016-05-04",
                "regiao": "São Paulo",
                "sintoma": "dor-no-corpo",
                "ponto_corte": 1.45640486879533,
                "fcor": "#d0021b",
                "msg": "Pico de Casos"
            });
            $scope.alerts['São Paulo'].push({
                "data": "2016-05-04",
                "regiao": "São Paulo",
                "sintoma": "dor-no-corpo",
                "ponto_corte": 1.45640486879533,
                "fcor": "#f47821",
                "msg": "Aumento médio "
            });

            $scope.alerts['Rio de Janeiro'].push({
                "data": "2016-05-04",
                "regiao": "Rio de Janeiro",
                "sintoma": "dor-de-cabeça",
                "ponto_corte": 1.45640486879533,
                "fcor": "#d0021b",
                "msg": "Pico de Casos"
            });

            $scope.alerts['Rio de Janeiro'].push({
                "data": "2016-05-04",
                "regiao": "Rio de Janeiro",
                "sintoma": "dor-nas-juntas",
                "ponto_corte": 1.45640486879533,
                "fcor": "#f47821",
                "msg": "Aumento médio "
            });

        };

        $scope.getSymptoms = function() {
            $http.get(apiUrl + '/ei/symptoms/').success(function(data, status) {
                $scope.symptomsCases = data;
                for(var i=0; i<$scope.symptomsCases.length; i++){
                    if($scope.symptomsCases[i].symptom[0]===""){
                        $scope.symptomsCases[i].symptom[0] = "Sem sintomas"
                    }
                    $scope.symptomsCases[i].symptom=$scope.symptomsCases[i].symptom[0]
                }

                if (data) {
                    $scope.getSyndrome($scope.symptomsCases)
                };
            });
        };

        $scope.getSyndrome = function(symptomsCases) {
            $http.get(apiUrl + '/ei/syndrome/').success(function(data, status) {
                $scope.syndromesCases = data
                $scope.createGrafyc(symptomsCases, $scope.syndromesCases);
            });
        }
        var target_width = -1;
        $scope.createGrafyc = function(symptomsCases, syndromesCases) {
            // console.log(symptomsCases);
            // console.log(syndromesCases);

            var ageSteps = [5, 10, 15, 20, 25, 30, 40, 50, 60];
            var maxDate,
                minDate,
                symptomsCases,
                syndromesCases,
                symptomsDataset,
                allSymptoms,
                syndromesDataset,
                allSyndromes,
                symptomsDimension,
                symptomsGroup,
                symptomsDateDimension,
                syndromesDimension,
                syndromesGroup,
                syndromesDateDimension,
                regions,
                regionsGroup;

            maxDate = _.max(syndromesCases, function(obj) {
                return new Date(obj.date_reported);
            });

            minDate = _.min(syndromesCases, function(obj) {
                return new Date(obj.date_reported);
            });

            maxDate = new Date(maxDate.date_reported);
            minDate = new Date(minDate.date_reported);


            symptomsCases.forEach(function(s) {
                s.ageGroup = Math.floor(s.age / 10) * 10;
            });
            syndromesCases.forEach(function(s) {
                s.ageGroup = Math.floor(s.age / 10) * 10;
            });
            symptomsDataset = crossfilter(symptomsCases);
            allSymptoms = symptomsDataset.groupAll();
            syndromesDataset = crossfilter(syndromesCases);
            allSyndromes = syndromesDataset.groupAll();
            symptomsDimension = symptomsDataset.dimension(function(d) {
                return d.symptom;
            });
            symptomsGroup = symptomsDimension.group();
            symptomsDateDimension = symptomsDataset.dimension(function(d) {
                return new Date(d.date_onset);
            });
            syndromesDimension = syndromesDataset.dimension(function(d) {
                return d.syndrome;
            });
            syndromesGroup = syndromesDimension.group();
            syndromesDateDimension = syndromesDataset.dimension(function(d) {
                return new Date(d.date_onset);
            });

            // Row charts
            var buildRowChart = function(target, dimension, group) {
                var chart = dc.rowChart(target)
                    .width(260)
                    .height(384)
                    .margins({
                        top: 40,
                        left: 10,
                        right: 10,
                        bottom: 20
                    })
                    .colors(classesColorScale)
                    .colorAccessor(function(d, i) {
                        return i;
                    })
                    .group(group)
                    .dimension(dimension)
                    .label(function(d) {
                        return d.key;
                    })
                    .title(function(d) {
                        return d.value;
                    })
                    .elasticX(true);
                /**/
                return chart;
            };

            // Maps
            function loadgeojson() {
                d3.json("scripts/util/rio_aps.geojson", function(geojson) {
                    var buildMap = function(target, dataset) {
                        regions = dataset.dimension(function(d) {
                            return d.region;
                        });
                        regionsGroup = regions.group();

                        var width = $(target).width(),
                            height = 350;
                        var projection = d3.geo.mercator()
                            .center([-43.30, -23.00])
                            .scale(45000);

                        var chart = dc.geoChoroplethChart(target)
                            .width(width)
                            .height(height)
                            .dimension(regions)
                            .group(regionsGroup)
                            .colorAccessor(function(d) {
                                return d;
                            })
                            .overlayGeoJson(geojson.features, "region", function(d) {
                                return d.properties.NOME;
                            })
                            .projection(projection)
                            .title(function(d) {
                                return "Region: " + d.key + "\nCount: " + (d.value || 0);
                            });
                        // setDefaultColors(chart, regionsGroup);
                        return chart;
                    }

                    var syndromesMap = buildMap('#syndromesMap', syndromesDataset);
                    var symptomsMap = buildMap('#symptomsMap', symptomsDataset);

                    syndromesMap.render();
                    symptomsMap.render();
                });
            };


            // Age group charts

            var buildAgeChart = function(target, dataset) {
                var dimension = dataset.dimension(function(d) {
                    return d.ageGroup;
                });

                var group = dimension.group(function(d) {
                    return Math.floor(d / 10) * 10;
                });

                var chart = dc.rowChart(target)
                    .width($(target).width())
                    .height(300).margins({
                        top: 25,
                        right: 40,
                        bottom: 30,
                        left: 40
                    })
                    .dimension(dimension)
                    // .dimension(dimension2)
                    .colorAccessor(function(d) {
                        return d.value;
                    })
                    .group(group)
                    .label(function(d) {
                        return d.key + " - " + (d.key + 9);
                    });

                return chart;
            };

            // Time series chart
            var buildTimeChart = function(dataset, group, accessor, target, navigation, dateDimension) {
                var precision = ['days', d3.time.days];
                var symptomsTimeChart = dc.compositeChart(target);
                var symptomsNavChart = dc.barChart(navigation);
                var volumeByHour = dateDimension;
                var volumeByHourGroup = volumeByHour.group(
                    function(the_date) {
                        return d3.time.day(the_date); // TODO make the granularity easier to see
                    }
                );
                var symptomGroupsTimeSeries =
                    volumeByHour
                    .group(function(date) {
                        return d3.time.day(date); // TODO make the granularity easier to see
                    })
                    .reduce(
                        function(p, d) {
                            p[d[accessor]] = (p[d[accessor]] || 0) + 1;
                            return p;
                        },
                        function(p, d) {
                            --p[d[accessor]];
                            return p;
                        },
                        function() {
                            return {};
                        }
                    );
                var observed_symptoms = group.all().map(function(obj) {
                    return obj.key;
                });
                if(target_width===-1){
                    target_width = $(target).width();
                }
                symptomsTimeChart
                    .width(target_width)
                    .height(300)
                    .margins({
                        top: 10,
                        right: 120,
                        bottom: 20,
                        left: 40
                    })
                    .rangeChart(symptomsNavChart)
                    .shareTitle(false)
                    .transitionDuration(100)
                    .elasticY(true)
                    .x(d3.time.scale())
                    .xUnits(d3.time.days)
                    //.xAxisLabel('date (' + precision[0] + ')') // (optional) render an axis label below the x axis
                    .yAxisLabel('Nº. de Casos')
                    .xAxis();

                var theLines = [];
                observed_symptoms.forEach(function(field, i) {
                    theLines.push(
                        dc.lineChart(symptomsTimeChart)
                        .dimension(volumeByHour)
                        .colors(classesColorScale(i))
                        .group(symptomGroupsTimeSeries, observed_symptoms[i], function(d) {
                            return d.value[field] || null;
                        })
                        .defined(function(d) {
                            return !isNaN(d.y)
                        })
                        .interpolate("monotone")
                    );
                });

                symptomsTimeChart
                    .compose(theLines)
                    .brushOn(false);

                symptomsTimeChart
                    .rangeChart(symptomsNavChart)
                    .transitionDuration(100)
                    .x(d3.time.scale().domain([minDate, maxDate]))
                    .xUnits(d3.time.days)
                    .xAxis();

                symptomsNavChart.width(850)
                    .height(60)
                    .margins({
                        top: 10,
                        right: 20,
                        bottom: 20,
                        left: 50
                    })
                    .dimension(volumeByHour)
                    .group(volumeByHourGroup)
                    .centerBar(true)
                    .gap(1)
                    .x(d3.time.scale().domain([minDate, maxDate]))
                    .round(d3.time.days.round)
                    .alwaysUseRounding(true)
                    .xUnits(d3.time.days)
                    .yAxis().ticks(0);

                return symptomsTimeChart;
            };

            function builds() {
                buildRowChart('#syndromesChart', syndromesDimension, syndromesGroup);
                buildRowChart('#symptomsChart', symptomsDimension, symptomsGroup);
                dc.dataCount('#syndromesCount').dimension(syndromesDataset).group(allSyndromes);
                dc.dataCount('#symptomsCount').dimension(symptomsDataset).group(allSymptoms);
                buildAgeChart('#syndromesAgeChart', syndromesDataset);
                buildAgeChart('#symptomsAgeChart', symptomsDataset);
                buildTimeChart(syndromesDataset, syndromesGroup, 'syndrome', '#syndromesTimeSeries', '#syndromesTimeNavigation', syndromesDateDimension);
                buildTimeChart(symptomsDataset, symptomsGroup, 'symptom', '#symptomsTimeSeries', '#symptomsTimeNavigation', symptomsDateDimension);

            };

            loadgeojson();
            builds();
            $scope.loadingGrafycs = false;
            dc.renderAll();
        };


        /*1- atleta 2- voluntario, 3- fa*/
        $scope.findUsersType = function() {
            $http.get(apiUrl + '/ei/users/')
                .then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        if ($scope.alerts[data[i].cidade] === undefined) {
                            $scope.alerts[data[i].cidade] = [];
                        }
                        $scope.alerts[data[i].cidade].push(data[i]);
                    }
                    console.log($scope.alerts);
                }, function(error) {
                    console.warn('Error getAllData: ', error);
                });
        };
        $scope.findAlerts();

        $scope.setColorAlerts = function() {
            try { $("#brasil").css("background-color", $scope.alerts['Brasil'][0]['fcor']); } catch (e) {
                $("#brasil").css("background-color", "#68ba44");
            }
            try { $("#rio").css("background-color", $scope.alerts['Rio de Janeiro'][0]['fcor']); } catch (e) {
                $("#rio").css("background-color", "#68ba44");
            }
            try {
                $("#belohorizonte").css("background-color", $scope.alerts['Belo Horizonte'][0]['fcor']);
            } catch (e) {
                $("#belohorizonte").css("background-color", "#68ba44");
            }
            try { $("#brasilia").css("background-color", $scope.alerts['Brasília'][0]['fcor']); } catch (e) {
                $("#brasilia").css("background-color", "#68ba44");
            }
            try { $("#saopaulo").css("background-color", $scope.alerts['São Paulo'][0]['fcor']); } catch (e) {
                $("#saopaulo").css("background-color", "#68ba44");
            }
            try { $("#manaus").css("background-color", $scope.alerts['Manaus'][0]['fcor']); } catch (e) {
                $("#manaus").css("background-color", "#68ba44");
            }
            try { $("#salvador").css("background-color", $scope.alerts['Salvador'][0]['fcor']); } catch (e) {
                $("#salvador").css("background-color", "#68ba44");
            }
        };

        $scope.getSymptoms();
    }
]);
