'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('DashboardCtrl', ['$scope', 'DashboardApi', 'Notification', function ($scope, DashboardApi, Notification) {
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
      }

      _initMap();
    };

    // mostra o mapa com o desenho
    // $scope.loadMap();


    // ====
    // Dashboard api
    DashboardApi.getAllData(function(data) {
      if (data.status != 200) {
        Notification.show('error', 'Atenção', data.statusText);
      } else {
        Notification.show('success', 'Dashboard', data.statusText);

        var result = data.data;
        $scope.dash = result;
      }
    });

    $scope.graphicOptions = {
      animate:{
        duration: 2000,
        enabled: true
      },
      barColor: '#9ebf00',
      scaleColor: false,
      lineWidth: 6,
      size: 80,
      lineCap: 'butt'
    };

    $scope.graphicOptionsDown = {
      animate:{
        duration: 2000,
        enabled: true
      },
      barColor: '#bf172c',
      scaleColor: false,
      lineWidth: 6,
      size: 80,
      lineCap: 'butt'
    };
    // ====

  }]);
