'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthTipsCtrl
 * @description
 * # HealthTipsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthTipsCtrl', ['$scope', 'healthTips', 'LocalStorage', '$rootScope', 'leafletMarkerEvents', function ($scope, healthTips, LocalStorage, $rootScope, leafletMarkerEvents) {

    $scope.pageClass = 'health-tips-page';

    var myIcon = {
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/miu/24/editor-flag-notification-glyph-16.png',
      iconSize: [16, 16],
      iconAnchor: [22, 94]
    };

    $scope.userLocation = {
      lat: LocalStorage.getItem('userLocation').lat,
      lng: LocalStorage.getItem('userLocation').lon,
      title: 'Me',
      zoom: 10,
      icon: myIcon
    };

    $scope.layers = {
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
    };

    $scope.addMarkers = function () {
      // upas
      var addressPointsToMarkers = function (points) {
        var t = [];

        angular.forEach(points, function (p) {
          t.push({
            lat: p.latitude,
            lng: p.longitude,
            title: p.name, // upaTitle
            message: p.logradouro + ', ' + p.bairro + ' - ' + p.numero, // upaMessage
            icon: {
              iconUrl: '../../images/icon-marker-upa.svg',
              iconSize: [38, 95]
            }
          });
        });

        return t;
      };

      // pharmacy
      var addressPointsToMarkersPharmacy = function (points) {
        var t = [];

        angular.forEach(points, function (p) {
          t.push({
            lat: p.geometry.location.lat,
            lng: p.geometry.location.lng,
            title: p.name, // pharmacyTitle
            message: p.vicinity, // pharmacyMessage
            icon: {
              iconUrl: '../../images/icon-marker-pharmacy.svg',
              iconSize: [38, 95]
            }
          });
        });

        return t;
      };

      $scope.markersUpa = addressPointsToMarkers($rootScope.markersUpa);
      $scope.markersPharmacy = addressPointsToMarkersPharmacy($rootScope.markersPharmacy);
    };


    var eventName = 'leafletDirectiveMarker.click';

    $scope.$on(eventName, function (event, args) {
      $scope.upaTitle = args.model.title;
      $scope.upaMessage = args.model.message;

      $scope.pharmacyTitle = args.model.title;
      $scope.pharmacyMessage = args.model.message;
    });

    $scope.events = {
      markers: {
        enable: leafletMarkerEvents.getAvailableEvents()
      }
    };

    // UPAS
    $scope.loadUpas = function () {
      healthTips.getUpas(function (data) {
        $rootScope.markersUpa = data;
        $scope.addMarkers();
      });
    };

    // FARMACIAS
    $scope.loadFarmacias = function () {
      healthTips.getFarmacias(function (data) {
        $rootScope.markersPharmacy = data;
        $scope.addMarkers();
      });
    };

  }]);
