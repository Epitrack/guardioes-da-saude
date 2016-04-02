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
                    organizeGrathData($scope.dash);
                    setPercOps();
                    $scope.filterAgeByState();
                    $scope.filterRaceByState();
                }

            });
        };

        function setPercOps() {
            $scope.graphicOnePerc = ((($scope.dash.newRegisters / $scope.dash.lastWeekRegisters) - 1) * 100).toFixed(1);
            angular.element('.chart1').data('easyPieChart').update($scope.graphicOnePerc);
            angular.element('.chart1').attr('data-legend', $scope.graphicOnePerc + '%');
            //inverter a ordem do lastweek e new quando tiver os números dos descadastrados
            $scope.graphicTwoPerc = ((($scope.dash.lastWeekRegisters / $scope.dash.newRegisters) - 1) * 100).toFixed(1);
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

        function organizeGrathData(data) {
            var d = {};

            console.log('data', data);
            var dd = [];
            for (var i = 0; i < data.symptomatic.length; i++) {
                var t = parseInt(data.symptomatic[i].total) + parseInt(data.asymptomatic[i].total);
                dd.push({ y: data.symptomatic[i]._id, symptomatic: data.symptomatic[i].total, asymptomatic: data.asymptomatic[i].total, total: t });
            }
            Morris.Line({
                element: 'line-example',
                data: dd,
                lineColors: ['#76031c', '#b3b500', '#f5a623'],
                xkey: 'y',
                ykeys: ['symptomatic', 'asymptomatic', 'total'],
                labels: ['Sintomático', 'Assintomático', "Total"],
                xLabelFormat: function(x) {
                    return moment(x).format("DD/MM/YYYY");
                },
                hoverCallback: function(index, options, content, row) {
                    var c = "<div class='morris-hover-row-label'></div><div class='morris-hover-point' style='color: #76031c'>Sintomático: " + row.symptomatic + "</div><div class='morris-hover-point' style='color: #b3b500'>Assintomático: " + row.asymptomatic + "</div><div class='morris-hover-point' style='color: #f5a623'>Total: " + row.total + " </div>"
                    return c;
                }
            });

        }

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
            return (_c * 100 / count).toFixed(1);
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
                $scope._agesates.push({ id: o });
            }
            console.log($scope.agesates);
        };
        $scope.getAgeByStateStatsValue = function(uf, key, value, div) {
            if ($scope.agesates !== undefined && $scope.agesates[uf] !== undefined && $scope.agesates[uf][key] !== undefined) {
                if ($scope.agesates[uf][key][value] === undefined) {
                    return 0;
                } else {
                    console.log(uf, key, value);
                    if (div === 100) {
                        return (($scope.agesates[uf][key][value] / $scope.agesates[uf][key]['total']) * 100).toFixed(2);
                    } else {
                        return $scope.agesates[uf][key][value];
                    }
                }
            } else {
                return 0;
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
                $scope._racesates.push({ id: o });
            }
            console.log($scope.racesates);
        };

        $scope.getRaceByStateStatsValue = function(uf, key, value, div) {
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
        }

        // ====
        // Call functions
        $scope.getAllData();
        $scope.data = {};
        $scope.data.symptomatic = true;
        $scope.data.asymptomatic = true;
        $scope.data.total = true;

        $scope.$watch('data', function(newValue, oldValue) {
            console.log(newValue);
        });

    }]);
