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

        $scope.buildgraph = function() {
            if ($scope.type === 'pizza') {
                var options = {
                    segmentShowStroke: true,
                    segmentStrokeColor: "#fff",
                    segmentStrokeWidth: 2,
                    // percentageInnerCutout: 50,
                    tooltipTemplate: "<%= value %>",
                    animationSteps: 100,
                    animationEasing: "easeInOutQuart",
                    animateRotate: true,
                    animateScale: false,
                    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                }
                var data = [];
                // console.log($scope.result);
                for (var o in $scope.result) {
                    var v = 0;
                    if ($scope.result[o].length===undefined) {
                        v = $scope.result[o];
                    } else {
                        v = $scope.result[o].length;
                    }
                    data.push({ label: o, value: v, labelColor: 'white', labelFontSize: '16' });
                }
                var ctx = document.getElementById('chart').getContext("2d");
                var myNewChart = new Chart(ctx).Pie(data, options);
                document.getElementById('js-legend').innerHTML = myNewChart.generateLegend();
            } else if ($scope.type === 'histograma') {
                var options = {}
                var data1 = {
                    labels: [],
                    datasets: []
                };
                var data = [];
                console.log($scope.result);
                for (var o in $scope.result) {
                    data1.labels.push(o);
                    var count = 0;
                    for (var p in $scope.result[o]) {
                        count += $scope.result[o][p].length;
                    }
                    data.push(count);
                }
                data1.datasets.push({
                    label: "" + window.localStorage.getItem('groups'),
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: data
                });

                console.log(data);
                console.log(data1);
                var ctx = document.getElementById('chart').getContext("2d");
                var myNewChart = new Chart(ctx).Bar(data1, options);
                document.getElementById('js-legend').innerHTML = myNewChart.generateLegend();
            }
        };
        $scope.buildgraph();

        $scope.gettype = function(t) {
            return t === $scope.type;
        };

        $scope.goback = function() {
            $location.path('/dashboard/analysis');
        };

    });
