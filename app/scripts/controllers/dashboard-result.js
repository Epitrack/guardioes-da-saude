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
                    data.push({ label: o, value: $scope.result[o], labelColor: 'white', labelFontSize: '16' });
                }
                var ctx = document.getElementById($scope.type).getContext("2d");
                var myNewChart = new Chart(ctx).Pie(data, options);
                document.getElementById('js-legend-' + $scope.type).innerHTML = myNewChart.generateLegend();
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
