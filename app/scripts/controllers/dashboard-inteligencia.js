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


        var apiUrl = ApiConfig.API_URL;
        var app_token = ApiConfig.APP_TOKEN;

        $http.get(apiUrl + '/ei/alerts/')
            .then(function(data) {
                console.log('Success getAllData: ', data);
            }, function(error) {
                console.warn('Error getAllData: ', error);
            });

    });
