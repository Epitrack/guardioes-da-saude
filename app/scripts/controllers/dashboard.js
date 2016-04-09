'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('DashboardCtrl', ['$scope', 'DashboardApi', 'Notification', function($scope, DashboardApi, Notification) {
        $scope.pageClass = 'dashboard-page';

        $scope.data = {};
        $scope.data.symptomatic = true;
        $scope.data.asymptomatic = true;
        $scope.data.total = true;

        $scope.data1 = {};
        $scope.data1.symptomatic = true;
        $scope.data1.asymptomatic = true;
        $scope.data1.total = true;

        $scope.graficoparticipacoes = {};
        $scope.dadosGrafico = [];

        $scope.ykeys = ['symptomatic', 'asymptomatic', 'total'];
        $scope.labels = ['Sintomático', 'Assintomático', 'Total'];
        $scope.colorsgraph = ['#76031c', '#b3b500', '#f5a623'];
        /**/
        $scope._usersByState = {};

        $scope.readusersByState = function() {
            console.log($scope.dash.usersByState);
            for (var i in $scope.dash.usersByState) {
                $scope._usersByState[$scope.dash.usersByState[i]['_id']] = $scope.dash.usersByState[i]['count'];
            }
        };

        $scope.getUserbyLocation = function(uf) {
            return $scope._usersByState[(uf + '').toUpperCase()];
        };
        $scope.updateParticipacoes = function(key) {
            /**/
            $scope.ykeys = [];
            $scope.labels = [];
            $scope.colorsgraph = [];
            $scope.data[key] = !$scope.data[key];
            /**/
            if ($scope.data.symptomatic) {
                $scope.ykeys.push('symptomatic');
                $scope.labels.push('Sintomático');
                $scope.colorsgraph.push('#76031c');
            }
            if ($scope.data.asymptomatic) {
                $scope.ykeys.push('asymptomatic');
                $scope.labels.push('Assintomático');
                $scope.colorsgraph.push('#b3b500');
            }
            if ($scope.data.total) {
                $scope.ykeys.push('total');
                $scope.labels.push('Total');
                $scope.colorsgraph.push('#f5a623');
            }

            $scope.dado_grafico = [];
            for (var i = 0; i < $scope.dadosGrafico.symptomatic.length; i++) {
                try {
                    var t = parseInt($scope.dadosGrafico.symptomatic[i].total) + parseInt($scope.dadosGrafico.asymptomatic[i].total);
                    var obj = {};
                    obj['y'] = $scope.dadosGrafico.symptomatic[i]._id;
                    if ($scope.data.symptomatic) {
                        obj['symptomatic'] = $scope.dadosGrafico.symptomatic[i].total;
                    }
                    if ($scope.data.asymptomatic) {
                        obj['asymptomatic'] = $scope.dadosGrafico.asymptomatic[i].total;
                    }
                    if ($scope.data.total) {
                        obj['total'] = t;
                    }
                    $scope.dado_grafico.push(obj);
                } catch (e) {

                }
            }
            $("#line-example").empty();
            $scope.graficoparticipacoes = Morris.Line({
                element: 'line-example',
                data: $scope.dado_grafico,
                lineColors: $scope.colorsgraph,
                xkey: 'y',
                ykeys: $scope.ykeys,
                labels: $scope.labels,
                xLabelFormat: function(x) {
                    return moment(x).format("DD/MM/YYYY");
                },
                dateFormat: function(x) {
                    return moment(x).format("DD/MM/YYYY");
                },
                hoverCallback: function(index, options, content, row) {
                    var c = content; //"<div class='morris-hover-row-label'></div><div class='morris-hover-point' style='color: #76031c'>Sintomático: " + row.symptomatic + "</div><div class='morris-hover-point' style='color: #b3b500'>Assintomático: " + row.asymptomatic + "</div><div class='morris-hover-point' style='color: #f5a623'>Total: " + row.total + " </div>"
                    return c;
                }
            });

        };
        /**/
        $scope.loadMap = function() {
            var map, json_url;
            json_url = 'https://s3.amazonaws.com/epitrackgeojson/uf.json';

            function _initMap() {
                map = new google.maps.Map(document.getElementById('dash-map'), {
                    zoom: 4,
                    center: { lat: -10.1033312, lng: -46.6546215 }
                });
                map.data.loadGeoJson(json_url);
                /* google.load('visualization', '1', { packages: ['geochart'] });
                 google.setOnLoadCallback(drawVisualization);

                 function drawVisualization() {
                     var data = google.visualization.arrayToDataTable([
                         ['Região', 'Concentração de Usuários'],
                         ['Pará', 10]
                     ]);

                     var geochart = new google.visualization.GeoChart(document.getElementById('visualization'));

                     var options = {
                         region: 'BR',
                         resolution: 'provinces',
                         backgroundColor: 'white',
                         datalessRegionColor: 'white',
                         defaultColor: '#f5f5f5',

                         colorAxis: { minValue: 0, colors: ['white', '#074c95'] }
                     };
                     geochart.draw(data, options);
                 }*/
            }
            _initMap();
        };
        // mostra o mapa com o desenho
        // $scope.loadMap();
        // ====
        // Get all data from dashboard
        $scope.getAllData = function() {
            DashboardApi.getAllData(function(data) {
                console.log('getAllData', data)
                if (data.status !== 200) {
                    Notification.show('error', 'Atenção', data.statusText);
                } else {
                    Notification.show('success', 'Dashboard', data.statusText);
                    console.log('notification OK', data.data)
                    var result = data.data;
                    $scope.dash = result;
                    $scope.dadosGrafico = $scope.dash;
                    $scope.updateParticipacoes();
                    setPercOps();
                    $scope.filterAgeByState();
                    $scope.filterRaceByState();
                    $scope.readusersByState();
                }

            });
        };

        function setPercOps() {
            $scope.graphicOnePerc = ((($scope.dash.newRegisters - $scope.dash.lastWeekRegisters) / $scope.dash.lastWeekRegisters) * 100).toFixed(1);
            console.log($scope.graphicOnePerc);
            angular.element('.chart1').data('easyPieChart').update($scope.graphicOnePerc);
            angular.element('.chart1').attr('data-legend', $scope.graphicOnePerc + '%');
            //inverter a ordem do lastweek e new quando tiver os números dos descadastrados
            $scope.graphicTwoPerc = ((($scope.dash.lastWeekRegisters - $scope.dash.newRegisters) / $scope.dash.newRegisters) * 100).toFixed(1);
            angular.element('.chart2').data('easyPieChart').update($scope.graphicTwoPerc);
            angular.element('.chart2').attr('data-legend', $scope.graphicTwoPerc + '%');
        }

        $scope.seta = function(val) {
            return (val < 0) ? 'down' : 'up';
        }

        var chartOps = {
            scaleColor: "#9ebf00",
            lineWidth: 8,
            lineCap: 'butt',
            barColor: '#bf172c',
            size: 90,
            animate: 2000
        };

        angular.element('.chart1').easyPieChart(chartOps);
        angular.element('.chart2').easyPieChart(chartOps);
        $scope.graphicOnePerc = 10;

        $scope.graphicOptions = {
            animate: {
                duration: 0,
                enabled: false
            },
            barColor: '#9ebf00',
            scaleColor: false,
            lineWidth: 20,
            lineCap: 'butt'

        };



        $scope.graphlineOptions = {}
        $scope.graphicOptionsDown = {
            animate: {
                duration: 2000,
                enabled: true
            },
            barColor: '#bf172c',
            scaleColor: false,
            lineWidth: 6,
            size: 80,
            lineCap: 'butt'
        };
        $scope.platPercent = function(plat) {
            if (!$scope.dash) {
                return 0;
            }
            var count = 0;
            var _c = 0;
            for (var i in $scope.dash.platforms) {
                count += $scope.dash.platforms[i].count;
                if ($scope.dash.platforms[i]._id === plat) { _c = $scope.dash.platforms[i].count }
            }
            var decimal = 0;
            if (plat !== 'android') {
                decimal = 1;
            }
            return (_c * 100 / count).toFixed(decimal);
        };

        $scope.platVal = function(plat) {
            if (!$scope.dash) {
                return 0;
            }
            var val = 0;
            for (var i in $scope.dash.platforms) {
                if ($scope.dash.platforms[i]._id === plat) { val = $scope.dash.platforms[i].count }
            }
            // console.log(plat,val);
            return val;
        };

        // Filter by race or age
        function _filterByRace(uf) {
            var men, women, uf, objMen, objWomen;

            uf = uf;
            men = $scope.dash.menByRace;
            women = $scope.dash.womenByRace;

            objMen = {};
            objWomen = {};

            angular.forEach(men, function(m) {
                console.log('Raça dos homens -> ', m);
            })
        };

        $scope.filter = function(type, uf) {
            console.log('filter', type, uf)
            if (type === 'race') {
                _filterByRace(uf);
            } else if (type === 'age') {
                _filterByAge(uf);
            }
        };

        $scope.selectStateByAge = function(id) {
            $scope.s = id;
        };

        $scope.filterAgeByState = function() {
            $scope.agesates = {};
            for (var i = 0; i < $scope.dash.menByAge.length; i++) {
                if ($scope.agesates[$scope.dash.menByAge[i]._id] === undefined) {
                    $scope.agesates[$scope.dash.menByAge[i]._id] = {};
                }
                var count = 0;
                $scope.agesates[$scope.dash.menByAge[i]._id]['men'] = {};
                for (var o in $scope.dash.menByAge[i].groups) {
                    count += $scope.dash.menByAge[i].groups[o].total;
                    $scope.agesates[$scope.dash.menByAge[i]._id]['men'][$scope.dash.menByAge[i].groups[o].ageGroup] = $scope.dash.menByAge[i].groups[o].total;
                }
                $scope.agesates[$scope.dash.menByAge[i]._id]['men']['total'] = count;
            }
            for (var i = 0; i < $scope.dash.womenByAge.length; i++) {
                if ($scope.agesates[$scope.dash.womenByAge[i]._id] === undefined) {
                    $scope.agesates[$scope.dash.womenByAge[i]._id] = {};
                }
                var count = 0;
                $scope.agesates[$scope.dash.womenByAge[i]._id]['women'] = {};
                for (var o in $scope.dash.womenByAge[i].groups) {
                    count += $scope.dash.womenByAge[i].groups[o].total;
                    $scope.agesates[$scope.dash.womenByAge[i]._id]['women'][$scope.dash.womenByAge[i].groups[o].ageGroup] = $scope.dash.womenByAge[i].groups[o].total;
                }
                $scope.agesates[$scope.dash.womenByAge[i]._id]['women']['total'] = count;
            }
            $scope._agesates = [];
            for (var o in $scope.agesates) {
                if (_.contains($scope.UFS, o)) {
                    $scope._agesates.push({ id: o });
                }
            }
            $scope._agesates = _.sortBy($scope._agesates, function(o) {
                return o.id
            });
        };
        $scope.getAgeByStateStatsValue = function(uf, key, value, div) {
            // console.log(uf === '', key, value, div);
            if (uf !== '') {
                console.log($scope.agesates);
                if ($scope.agesates !== undefined && $scope.agesates[uf] !== undefined && $scope.agesates[uf][key] !== undefined) {
                    if ($scope.agesates[uf][key][value] === undefined) {
                        return 0;
                    } else {
                        // console.log(uf, key, value);
                        if (div === 100) {
                            return (($scope.agesates[uf][key][value] / $scope.agesates[uf][key]['total']) * 100).toFixed(2);
                        } else {
                            return $scope.agesates[uf][key][value];
                        }
                    }
                } else {
                    return 0;
                }
            } else {
                try {
                    $scope.totalmenByAgeFundedwomenByAgeFunded = 0
                    for (var i in $scope.dash.menByAgeFunded) {
                        $scope.totalmenByAgeFundedwomenByAgeFunded += $scope.dash.menByAgeFunded[i].total;
                    }
                    for (var i in $scope.dash.womenByAgeFunded) {
                        $scope.totalmenByAgeFundedwomenByAgeFunded += $scope.dash.womenByAgeFunded[i].total;
                    }
                    if (key === 'men') {
                        var totalmen = 0
                        for (var i in $scope.dash.menByAgeFunded) {
                            totalmen += $scope.dash.menByAgeFunded[i].total;
                        }
                        if (value !== 'total') {
                            var g = _.filter($scope.dash.menByAgeFunded, function(o) {
                                return o['_id']['ageGroup'] === value;
                            });
                            if (div === 100) {
                                return g.length === 0 ? 0 : ((g[0].total / totalmen) * 100).toFixed(2);
                            } else {
                                return g.length === 0 ? 0 : (g[0].total / totalmen).toFixed(2);
                            }
                        } else {

                            return (totalmen);
                        }
                    } else if (key === 'women') {
                        var totalmen = 0
                        for (var i in $scope.dash.womenByAgeFunded) {
                            totalmen += $scope.dash.womenByAgeFunded[i].total;
                        }
                        if (value !== 'total') {
                            var g = _.filter($scope.dash.womenByAgeFunded, function(o) {
                                return o['_id']['ageGroup'] === value;
                            });
                            if (div === 100) {
                                return g.length === 0 ? 0 : ((g[0].total / totalmen) * 100).toFixed(2);
                            } else {
                                return g.length === 0 ? 0 : (g[0].total / totalmen).toFixed(2);
                            }
                        } else {

                            return (totalmen);
                        }
                    }
                } catch (e) {}

            }
        }

        $scope.getRaceByStateStatsValue = function(uf, key, value, div) {
            if (uf !== '') {
                if ($scope.racesates !== undefined && $scope.racesates[uf] !== undefined && $scope.racesates[uf][key] !== undefined) {
                    if ($scope.racesates[uf][key][value] === undefined) {
                        return 0;
                    } else {
                        console.log(uf, key, value);
                        if (div === 100) {
                            return (($scope.racesates[uf][key][value] / $scope.racesates[uf][key]['total']) * 100).toFixed(2);
                        } else {
                            return $scope.racesates[uf][key][value];
                        }
                    }
                } else {
                    return 0;
                }
            } else {
                try {
                    //0 - M
                    $scope.totalMenWoman = 0
                    for (var i in $scope.dash.byRaceFunded[0]['races']) {
                        $scope.totalMenWoman += $scope.dash.byRaceFunded[0]['races'][i].total;
                    }
                    for (var i in $scope.dash.byRaceFunded[1]['races']) {
                        $scope.totalMenWoman += $scope.dash.byRaceFunded[1]['races'][i].total;
                    }
                    if (key === 'men') {
                        var totalmen = 0
                        for (var i in $scope.dash.byRaceFunded[0]['races']) {
                            totalmen += $scope.dash.byRaceFunded[0]['races'][i].total;
                        }
                        if (value !== 'total') {
                            var g = _.filter($scope.dash.byRaceFunded[0]['races'], function(o) {
                                return o['race'] === value;
                            });
                            if (div === 100) {
                                return g.length === 0 ? 0 : ((g[0].total / totalmen) * 100).toFixed(2);
                            } else {
                                return g.length === 0 ? 0 : (g[0].total / totalmen).toFixed(2);
                            }
                        } else {
                            return (totalmen);
                        }
                    } else {
                        var totalmen = 0
                        for (var i in $scope.dash.byRaceFunded[1]['races']) {
                            totalmen += $scope.dash.byRaceFunded[1]['races'][i].total;
                        }
                        if (value !== 'total') {
                            var g = _.filter($scope.dash.byRaceFunded[1]['races'], function(o) {
                                return o['race'] === value;
                            });
                            if (div === 100) {
                                return g.length === 0 ? 0 : ((g[0].total / totalmen) * 100).toFixed(2);
                            } else {
                                return g.length === 0 ? 0 : (g[0].total / totalmen).toFixed(2);
                            }
                        } else {
                            return (totalmen);
                        }
                    }
                } catch (e) {

                }
            }
        }

        $scope.filterRaceByState = function() {


            $scope.racesates = {};
            for (var i = 0; i < $scope.dash.menByRace.length; i++) {
                if ($scope.racesates[$scope.dash.menByRace[i]._id] === undefined) {
                    $scope.racesates[$scope.dash.menByRace[i]._id] = {};
                }
                var count = 0;
                $scope.racesates[$scope.dash.menByRace[i]._id]['men'] = {};
                for (var o in $scope.dash.menByRace[i].races) {
                    count += $scope.dash.menByRace[i].races[o].total;
                    $scope.racesates[$scope.dash.menByRace[i]._id]['men'][$scope.dash.menByRace[i].races[o].race] = $scope.dash.menByRace[i].races[o].total;
                }
                $scope.racesates[$scope.dash.menByRace[i]._id]['men']['total'] = count;
            }
            for (var i = 0; i < $scope.dash.womenByRace.length; i++) {
                if ($scope.racesates[$scope.dash.womenByRace[i]._id] === undefined) {
                    $scope.racesates[$scope.dash.womenByRace[i]._id] = {};
                }
                var count = 0;
                $scope.racesates[$scope.dash.womenByRace[i]._id]['women'] = {};
                for (var o in $scope.dash.womenByRace[i].races) {
                    count += $scope.dash.womenByRace[i].races[o].total;
                    $scope.racesates[$scope.dash.womenByRace[i]._id]['women'][$scope.dash.womenByRace[i].races[o].race] = $scope.dash.womenByRace[i].races[o].total;
                }
                $scope.racesates[$scope.dash.womenByRace[i]._id]['women']['total'] = count;
            }
            $scope._racesates = [];
            for (var o in $scope.racesates) {
                if (_.contains($scope.UFS, o)) {
                    $scope._racesates.push({ id: o });
                }
            }
            $scope._racesates = _.sortBy($scope._racesates, function(o) {
                return o.id
            });

        };



        $scope.getAllData();
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

    }]);
