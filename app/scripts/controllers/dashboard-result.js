'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardResultCtrl
 * @description
 * # DashboardResultCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('DashboardResultCtrl', function($rootScope, $scope, $location) {
        $scope.type = window.localStorage.getItem('type');
        $scope.result = JSON.parse(window.localStorage.getItem('result'));
        $scope.labels = JSON.parse(window.localStorage.getItem('labels'));
        $scope.groups = JSON.parse(window.localStorage.getItem('groups'));
        $scope.filters = JSON.parse(window.localStorage.getItem('filters'));
        $scope.istable = false;
        /**/
        $scope.buildgraph = function() {
            if ($scope.type === 'pizza') {

                var data = [];
                for (var o in $scope.result) {
                    var v = 0;
                    if ($scope.result[o].length === undefined) {
                        v = $scope.result[o];
                    } else {
                        v = $scope.result[o].length;
                    }
                    data.push({ name: o, y: v });
                }
                data = _.sortBy(data, function(obj) {
                    return obj.y; });
                data = data.reverse();

                Highcharts.getOptions().plotOptions.pie.colors = (function() {
                    var colors = [],
                        base = Highcharts.getOptions().colors[0],
                        i;

                    for (i = 0; i < 10; i += 1) {
                        colors.push(Highcharts.Color(base).brighten((i - 4) / 7).get());
                    }
                    return colors;
                }());
                $('#container').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: {point.percentage:.1f}'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f}',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: '' + window.localStorage.getItem('groups'),
                        data: data
                    }]
                });


            } else if ($scope.type === 'histograma') {
                var data = {};
                var keys = [];
                var categories = [];
                for (var o in $scope.result) {
                    categories.push(o);
                    keys = _.union(keys, _.keys($scope.result[o]))
                }
                var dados = [];
                for (var o in $scope.result) {
                    for (var j in keys) {
                        if (data[keys[j]] === undefined) {
                            data[keys[j]] = {};
                            data[keys[j]]['name'] = keys[j];
                            data[keys[j]]['data'] = [];
                        }
                        $scope.result[o][keys[j]] !== undefined ? data[keys[j]]['data'].push($scope.result[o][keys[j]].length) : data[keys[j]]['data'].push(0);
                    }
                }
                for (var o in data) {
                    dados.push(data[o]);
                }
                /**/
                $('#container').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: categories,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0,
                            borderWidth: 0,
                            groupPadding: 0,
                            borderWidth: 1
                        }
                    },
                    series: dados
                });
            } else if ($scope.type === 'barras') {
                var data = {};
                var keys = [];
                var categories = [];
                for (var o in $scope.result) {
                    categories.push(o);
                    keys = _.union(keys, _.keys($scope.result[o]))
                }
                var dados = [];
                for (var o in $scope.result) {
                    for (var j in keys) {
                        if (data[keys[j]] === undefined) {
                            data[keys[j]] = {};
                            data[keys[j]]['name'] = keys[j];
                            data[keys[j]]['data'] = [];
                        }
                        $scope.result[o][keys[j]] !== undefined ? data[keys[j]]['data'].push($scope.result[o][keys[j]].length) : data[keys[j]]['data'].push(0);
                    }
                }
                for (var o in data) {
                    dados.push(data[o]);
                }
                /**/
                $('#container').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: categories,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0,
                            borderWidth: 0
                        }
                    },
                    series: dados
                });
            } else {
                $scope.istable = true;
                var data = {};
                $scope.keys = [];
                $scope.categories = [];
                var dados = [];
                /**/
                for (var o in $scope.result) {
                    $scope.categories.push(o);
                    $scope.keys = _.union(keys, _.keys($scope.result[o]))
                }
                /**/
                for (var o in $scope.result) {
                    for (var j in $scope.keys) {
                        if (data[$scope.keys[j]] === undefined) {
                            data[$scope.keys[j]] = {};
                            data[$scope.keys[j]]['name'] = $scope.keys[j];
                            data[$scope.keys[j]]['data'] = [];
                        }
                        $scope.result[o][$scope.keys[j]] !== undefined ? data[$scope.keys[j]]['data'].push($scope.result[o][$scope.keys[j]].length) : data[$scope.keys[j]]['data'].push(0);
                    }
                }
                /**/
                for (var o in data) {
                    dados.push(data[o]);
                }
                /**/
                console.log($scope.result);
                console.log($scope.keys);
                console.log($scope.categories);

            }
            try { $("#container").find("text").last().empty(); } catch (e) {}
        };
        $scope.download = function() {
            window.open('https://s3.amazonaws.com/gdsreports/surveys_dashboard.txt', '_blank');
        };
        $scope.getdados = function(key1, value) {
            try {
                return $scope.result[key1][value].length;
            } catch (e) {
                return 0;
            }
        };
        /**/
        $scope.buildgraph();
        /**/
        $scope.gettype = function(t) {
            return t === $scope.type;
        };
        /**/
        $scope.goback = function() {
            $location.path('/dashboard/analysis');
        };

    });
