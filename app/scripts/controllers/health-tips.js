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

    // UPAS
    $scope.loadUpas = function() {
      healthTips.getUpas(function(data) {
        $rootScope.markersUpa = data;
        $scope.addMarkers();
      });

      var myIcon = L.icon({
        iconUrl: 'https://cdn4.iconfinder.com/data/icons/miu/24/editor-flag-notification-glyph-64.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94]
      });

      angular.extend($scope, {
        userLocation: {
          lat: LocalStorage.getItem('userLocation').lat,
          lng: LocalStorage.getItem('userLocation').lon,
          zoom: 5
          // icon: myIcon
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
        }
      });

      console.log($scope.userLocation);

      $scope.addMarkers = function() {
        var addressPointsToMarkers = function(points) {
          for (var i = 0; i < points.length; i++) {
            return points.map(function(points) {
              return {
                lat: points.latitude,
                lng: points.longitude,
                title: points.name, // upaTitle
                message: points.logradouro + ', ' + points.bairro + ' - ' + points.numero, // upaMessage
                icon: {
                  iconUrl: '../../images/icon-marker-upa.svg',
                  iconSize: [38, 95]
                }
              };
            });
          }
        };

        $scope.markers = addressPointsToMarkers($rootScope.markersUpa);
      };

      // adds events when click in marker
      var markerEvents = leafletMarkerEvents.getAvailableEvents();

      for (var k in markerEvents){
        var eventName = 'leafletDirectiveMarker.click';

        $scope.$on(eventName, function(event, args){
            $scope.upaTitle = args.model.title;
            $scope.upaMessage = args.model.message;
        });
      }

      $scope.events = {
        markers: {
          enable: leafletMarkerEvents.getAvailableEvents()
        }
      }
      // ====
    };

    // FARMACIAS
    $scope.loadFarmacias = function() {
      healthTips.getFarmacias(function(data) {
        console.log('data loadFarmacia -> ', data);
        $scope.farmacias = data;
      });
    };

    // VACINAS
    $scope.loadVacinas = function() {
      healthTips.getVacinas(function(data) {
        $scope.vacinas = data;
      });
    };

    // TELEFONES
    $scope.loadTelefones = function() {
      healthTips.getTelefones(function(data) {
        $scope.telefones = data;
      });
    };

    // CUIDADOS
    $scope.loadCuidados = function() {
      healthTips.getCuidados(function(data) {
        $scope.cuidados = data;
      });
    };

    // PREVENCAO
    $scope.loadPrevencao = function() {
      healthTips.getPrevencoes(function(data) {
        $scope.prevencoes = data;
      });
    };

  }]);
