'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('DashboardCtrl', ['$scope', function ($scope) {
    $scope.pageClass = 'dashboard-page';

    $scope.loadMap = function() {
      var map, json_url;

      json_url = 'https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/uf/geojson/uf.json';

      function _initMap() {
        map = new google.maps.Map(document.getElementById('dash-map'), {
          zoom: 4,
          center: { lat: -10.1033312, lng: -46.6546215 }
        });

        map.data.loadGeoJson(json_url);
      }

      _initMap();
    };

    // $scope.loadMap();

  }]);
