'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthMapCtrl
 * @description
 * # HealthMapCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthMapCtrl', ['$scope', 'Surveyapi', 'toaster', '$rootScope', 'LocalStorage', function ($scope, Surveyapi, toaster, $rootScope, LocalStorage) {

    $scope.pageClass = 'health-map';

    var addressPointsToMarkers = function(points) {
      for (var i = 0; i < points.length; i++) {
        return points.map(function(points) {
          return {
            lat: points.lat,
            lng: points.lon,
            zoom: 12,
            title: points.formattedAddress,
            icon: {
                iconUrl: '../../images/icon-health-daily-' +  points.no_symptom + '.svg',
                iconSize: [38, 95],
                iconAnchor: [22, 94]
            }
          };
        });
      }
    };

    $scope.markers = addressPointsToMarkers($rootScope.markersByCity);

    angular.extend($scope, {
      userLocation: {
        lat: LocalStorage.getItem('userLocation').lat,
        lng: LocalStorage.getItem('userLocation').lon,
        zoom: 12
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
        iconUrl: '../../images/icon-health-daily-bad.svg',
        // shadowUrl: 'img/leaf-shadow.png',
        iconSize:     [38, 95], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
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
