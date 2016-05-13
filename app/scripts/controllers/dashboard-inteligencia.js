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
        $scope.usersType = {};

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
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        if ($scope.alerts[data[i].regiao] === undefined) {
                            $scope.alerts[data[i].regiao] = [];
                        }
                        $scope.alerts[data[i].regiao].push(data[i]);
                    }
                    $scope.setColorAlerts();
                }, function(error) {
                    console.warn('Error getAllData: ', error);
                });
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
            try { $("#belohorizonte").css("background-color", $scope.alerts['Belo Horizonte'][0]['fcor']); 
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

    });
