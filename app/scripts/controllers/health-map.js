'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthMapCtrl
 * @description
 * # HealthMapCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthMapCtrl', ['$scope', 'Surveyapi', '$rootScope', 'LocalStorage', 'NgMap', '$http', '$timeout', 'Notification', function ($scope, Surveyapi, $rootScope, LocalStorage, NgMap, $http, $timeout, Notification) {

    $scope.pageClass = 'health-map';

    //
    // Graphic
    //

    $scope.donutOptions = {
      data: [
        {label: "Bem", value: 77, participants: 10},
        {label: "Mal", value: 23, participants: 5}
      ],
      colors: ['#E0D433', '#C81204'],
      resize: true
    };
    // ====


    // ====
    // Configurações gerais do mapa
    $scope.userLocation = {
      coords: [LocalStorage.getItem('userLocation').lat, LocalStorage.getItem('userLocation').lon],
      icon: '/images/icon-user-location.png'
    };

    $scope.mapOptions = {
      zoom: 14
//      ,
//      center: new google.maps.LatLng($scope.userLocation.lat, $scope.userLocation.lng)
    };

    $scope.config = {
      styles: [
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [{'color': '#e9e9e9'}, {'lightness': 17}]
        },
        {
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [{'color': '#f5f5f5'}, {'lightness': 20}]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#ffffff'}, {'lightness': 17}]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [{'color': '#ffffff'}, {'lightness': 29}, {'weight': 0.2}]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [{'color': '#ffffff'}, {'lightness': 18}]
        },
        {
          'featureType': 'road.local',
          'elementType': 'geometry',
          'stylers': [{'color': '#ffffff'}, {'lightness': 16}]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [{'color': '#f5f5f5'}, {'lightness': 21}]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [{'color': '#dedede'}, {'lightness': 21}]
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'lightness': 16}]
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [{'saturation': 36}, {'color': '#333333'}, {'lightness': 40}]
        },
        {
          'elementType': 'labels.icon',
          'stylers': [{'visibility': 'off'}]
        },
        {
          'featureType': 'transit',
          'elementType': 'geometry',
          'stylers': [{'color': '#f2f2f2'}, {'lightness': 19}]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#fefefe'}, {'lightness': 20}]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [{'color': '#fefefe'}, {'lightness': 17}, {'weight': 1.2}]
        }
      ]
    };

    NgMap.getMap().then(function (map) {
      $scope.map = map;
      getCoords($rootScope.city);
      google.maps.event.addListener(map, 'idle', showMarkers);
    });

    $scope.openInfoWindow = function (params) {
      $scope.info = params;
      $scope.map.showInfoWindow('foo', this);
    };
    // ====


    // ====
    // obtém as informações depois que o usuário digita a cidade
    $scope.surveyByCity = {};

    $scope.getMarkersByCity = function () {
      var params = $scope.surveyByCity.city;

      getCoords(params);
      getSurveyByCity(params);
      getSurveyByCitySummary(params);
    };

    function getSurveyByCity(city) {
      Surveyapi.getMarkersByCity(city, function (data) {
        if (data.data.error === false) {
          $scope.markers = addToArray(data.data.data);
        } else {
         // console.warn(data.data.message);
          // toaster.pop('error', data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        }
      });
    }

    function getSurveyByCitySummary(city) {
      var summary = {};

      Surveyapi.getMarkersByCitySummary(city, function (data) {
        if (data.data.error === false) {

          summary.total_no_symptoms = data.data.data.total_no_symptoms;
          summary.total_symptoms = data.data.data.total_symptoms;
          summary.total_surveys = data.data.data.total_surveys;

          summary.pct_no_symptoms = 0;
          summary.pct_symptoms = 0;

          summary.address = data.data.data.location.formattedAddress;

          summary.diarreica = data.data.data.diseases.diarreica;
          summary.exantematica = data.data.data.diseases.exantematica;
          summary.respiratoria = data.data.data.diseases.respiratoria;

          if (summary.total_no_symptoms > 0) {
            summary.pct_no_symptoms = Math.round((((summary.total_no_symptoms / summary.total_surveys) * 100)));
          }

          if (summary.pct_no_symptoms % 1 !== 0) {
            summary.pct_no_symptoms = Math.round(summary.pct_no_symptoms.toFixed(2));
          }

          if (summary.total_symptoms > 0) {
            summary.pct_symptoms = Math.round((((summary.total_symptoms / summary.total_surveys) * 100)));
          }

          if (summary.pct_symptoms % 1 !== 0) {
            summary.pct_symptoms = Math.round(summary.pct_symptoms.toFixed(2));
          }

          $scope.summary = summary;
          // $rootScope.$broadcast('build_summary');
        } else {
         // console.warn(data.data.message);
          // toaster.pop('error', data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        }
      });
    }

    function getCoords(city) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': city}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            $scope.map.setCenter(results[0].geometry.location);
            if($rootScope.city) { delete $rootScope.city; }
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    // ====


    // ====
    // quando o usuário entra na tela sem digitar
    // pega a localização e mostra no mapa
    function addToArray(markers) {
      var t = [];

      angular.forEach(markers, function (p) {
        t.push({
          position: [p.lat, p.lon],
          address: p.formattedAddress,
          id: p.id,
          icon: '../../images/icon-health-daily-' + p.no_symptom + '.svg'
        });
      });

      return t;
    }

    function getSummaryByLocation(params) {
      var summary = {};

      Surveyapi.getSummaryByLocation(params, function (data) {
        if (data.data.error === false) {

          summary.total_no_symptoms = data.data.data.total_no_symptoms;
          summary.total_symptoms = data.data.data.total_symptoms;
          summary.total_surveys = data.data.data.total_surveys;

          summary.pct_no_symptoms = 0;
          summary.pct_symptoms = 0;

          summary.address = data.data.data.location.formattedAddress;

          summary.diarreica = data.data.data.diseases.diarreica;
          summary.exantematica = data.data.data.diseases.exantematica;
          summary.respiratoria = data.data.data.diseases.respiratoria;

          if (summary.total_no_symptoms > 0) {
            summary.pct_no_symptoms = Math.round((((summary.total_no_symptoms / summary.total_surveys) * 100)));
          }

          if (summary.pct_no_symptoms % 1 !== 0) {
            summary.pct_no_symptoms = Math.round(summary.pct_no_symptoms.toFixed(2));
          }

          if (summary.total_symptoms > 0) {
            summary.pct_symptoms = Math.round((((summary.total_symptoms / summary.total_surveys) * 100)));
          }

          if (summary.pct_symptoms % 1 !== 0) {
            summary.pct_symptoms = Math.round(summary.pct_symptoms.toFixed(2));
          }

          $scope.summary = summary;
        } else {
         // console.warn(data.data.message);
          // toaster.pop('error', data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        }
      });
    }

    $scope.getMarkersByLocation = function () {
      var params = {
        lat: LocalStorage.getItem('userLocation').lat,
        lon: LocalStorage.getItem('userLocation').lon
      };

      Surveyapi.getMarkersByLocation(params, function (data) {
        if (data.data.error === false) {
          $scope.markers = addToArray(data.data.data);
        } else {
         // console.warn(data.data.message);
          // toaster.pop('error', data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        }
      });

      getSummaryByLocation(params);
    };
    // ====


    //
    // autocomplete
    $scope.getLocation = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false,
          language: 'pt-BR'
        }
      }).then(function(response){
//        console.log(response);

        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };

    function showMarkers() {
      console.log("IT'S CHANGING")
    }

    $scope.getCityAutoComplete = function(city) {
//      $rootScope.city = city;
      getCoords(city);
      getSurveyByCity(city);
      getSurveyByCitySummary(city);
    }
    // ====


    if ($rootScope.city) {
      getSurveyByCity($rootScope.city);
      getSurveyByCitySummary($rootScope.city);
//      getCoords($rootScope.city);
//      return delete $rootScope.city;
    } else {
      $scope.getMarkersByLocation();
    }
//    google.maps.event.addListener(map, 'idle', showMarkers);
  }]);
