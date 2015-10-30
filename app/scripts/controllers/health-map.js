'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthMapCtrl
 * @description
 * # HealthMapCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthMapCtrl', ['$scope', function ($scope) {

    $scope.pageClass = 'health-map';

    angular.extend($scope, {
      location: {
        lat: 41.85,
        lng: -87.65,
        zoom: 8
      },

      markers: {
        m1: {
          lat: 41.85,
          lng: -87.65,
          message: "I'm a static marker with defaultIcon",
          focus: false,
          icon: {}
        }
      },

      layers: {
        baselayers: {
          mapbox_light: {
            name: 'Guardiões da Saúde',
            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            layerOptions: {
              apikey: 'pk.eyJ1IjoidGh1bGlvcGgiLCJhIjoiNGZhZmI1ZTA5NTNlNDUwMzZhOGQ2NDkyNWQ2OTM4MWYifQ.P1pvnlNNlrvyhLOJM2xX-g',
              mapid: 'thulioph.wix561or'
            }
          }
        }
      },

      leafIcon: {
        iconUrl: 'img/leaf-green.png',
        shadowUrl: 'img/leaf-shadow.png',
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      },

      orangeLeafIcon: {
        iconUrl: 'img/leaf-orange.png',
        shadowUrl: 'img/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }
    });
  }]);
