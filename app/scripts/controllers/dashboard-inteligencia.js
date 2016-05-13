'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardInteligenciaCtrl
 * @description
 * # DashboardInteligenciaCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('DashboardInteligenciaCtrl', function($scope, $location, $rootScope, $http, $compile, ApiConfig) {
        /**/
        var apiUrl = ApiConfig.API_URL;
        var app_token = ApiConfig.APP_TOKEN;
        /**/
        $scope.alerts = {};

        $scope.findAlerts = function() {
            $http.get(apiUrl + '/ei/alerts/')
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

    });
