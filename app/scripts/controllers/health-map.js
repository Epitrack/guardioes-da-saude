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

    var myIcon = {
        iconUrl: 'https://cdn4.iconfinder.com/data/icons/miu/24/editor-flag-notification-glyph-64.png',
        iconSize: [38, 95]
    };

    angular.extend($scope, {
      userLocation: {
        lat: LocalStorage.getItem('userLocation').lat,
        lng: LocalStorage.getItem('userLocation').lon,
        zoom: 12,
        icon: myIcon,
        draggable: true,
        focus: true,
        title: 'ME'
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

    $scope.addMarkers = function() {
        var addressPointsToMarkers = function(points) {
          console.warn('points', points);
          var t = [$scope.userLocation];
          angular.forEach(points, function(p){
            t.push({
                lat: p.lat,
                lng: p.lon,
                zoom: 12,
                title: p.name, // upaTitle
                message: p.logradouro + ', ' + p.bairro + ' - ' + p.numero, // upaMessage
                icon: {
                  iconUrl: '../../images/icon-health-daily-' +  p.no_symptom + '.svg',
                  iconSize: [38, 95]
                }
              });
          });
          return t;
        };

        $scope.markers = addressPointsToMarkers($rootScope.markersByCity);
        // console.log('ul', $scope.markers);
      };

    // só adiciona os marcadores se existir no $rootScope
    // impede que apareça erro se entrar na url /health-map sem digitar um endereço
    if ($rootScope.markersByCity != undefined) {
      $scope.addMarkers();
    }

    // search by city /health-map
    $scope.surveyByCity = {};

    $scope.getSurveyByCity = function() {
      Surveyapi.getMarkersByCity($scope.surveyByCity.city, function(data) {
        if (data.data.error === false) {
          $rootScope.markersByCity = data.data.data;
          $scope.addMarkers();
        } else {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        }
      });

      // obtém os dados em summary
      $scope.getSurveyByCitySummary($scope.surveyByCity.city)
    };

    $scope.getSurveyByCitySummary = function(city) {
      Surveyapi.getMarkersByCitySummary(city, function(data) {
        if (data.data.error === false) {
          $scope.surveyByCitySummary = data.data.data;

          $scope.surveyByCitySummary.pct_no_symptoms = 0;
          $scope.surveyByCitySummary.pct_symptoms = 0;
          if($scope.surveyByCitySummary.total_no_symptoms > 0) {
            $scope.surveyByCitySummary.pct_no_symptoms = ((($scope.surveyByCitySummary.total_no_symptoms/$scope.surveyByCitySummary.total_surveys)*100));
          }
          if($scope.surveyByCitySummary.total_symptoms > 0) {
            $scope.surveyByCitySummary.pct_symptoms = ((($scope.surveyByCitySummary.total_symptoms/$scope.surveyByCitySummary.total_surveys)*100));
          }

          if($scope.surveyByCitySummary.pct_no_symptoms %1 !==0) {
              $scope.surveyByCitySummary.pct_no_symptoms = $scope.surveyByCitySummary.pct_no_symptoms.toFixed(2);
          }

          if($scope.surveyByCitySummary.pct_symptoms %1 !==0) {
              $scope.surveyByCitySummary.pct_symptoms = $scope.surveyByCitySummary.pct_symptoms.toFixed(2);
          }

          $rootScope.surveyByCitySummary = $scope.surveyByCitySummary;

          console.warn($rootScope.surveyByCitySummary);
        } else {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        }
      })
    };
    // ====

  }]);
