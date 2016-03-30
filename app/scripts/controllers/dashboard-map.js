'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardMapCtrl
 * @description
 * # DashboardMapCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('DashboardMapCtrl', ['$scope', 'LocalStorage', 'Surveyapi', '$http', '$rootScope', 'Notification', function ($scope, LocalStorage, Surveyapi, $http, $rootScope, Notification) {

    $scope.userLocation = {
      lat: LocalStorage.getItem('userLocation').lat,
      lng: LocalStorage.getItem('userLocation').lon,
      title: 'Me',
      zoom: 12,
      icon: '/images/icon-user-location.png',
    };

    $scope.getLocation = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false,
          language: 'pt-BR'
        }
      }).then(function(response){
        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };

    $scope.getCityAutoComplete = function(city) {
      getCoords(city);

      if($scope.timeSelection === 'Esta semana'){
        getSurveyWeek();
      } else if($scope.timeSelection === 'Este mês'){
        getSurveyByCity(city);
      }

      getSurveyByCitySummary($scope.cityLatLng);
    };

    $scope.surveyByCity = {};

    $scope.getMarkersByCity = function () {
      var params = $scope.surveyByCity.city;
    };

    $scope.markers=[];
    $scope.timeSelection = 'Esta semana';

    $scope.timeSelectionClick = function(selection){
      $scope.timeSelection = selection;
      $scope.getMarkersByLocation()
    };

    function getCoords(city) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': city}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            $scope.map.setCenter(results[0].geometry.location);

            $scope.cityLatLng = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };

            if($rootScope.city) { delete $rootScope.city; }
        } else {
         // console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    function getSurveyByCity(city) {
      Surveyapi.getMarkersByCity(city, function (data) {
        if (data.data.error === false) {
          if($scope.markers){
            var newMs = [];
            newMs = addToArray(data.data.data);
            pushingMarkers(newMs);
          }
          else{ $scope.markers = addToArray(data.data.data); }

        } else {
         // console.warn(data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        }
      });
    }

    function getSurveyWeek(){
      Surveyapi.getMarkersByWeek(moment().day(1).format('YYYY-MM-DD'), function(data){
        if (data.data.error === false) {
          if (data.data.data.length === 0) {
            Notification.error('error', 'Atenção', 'Nenhum usuário.');
          } else {
            $scope.markers = addToArray(data.data.data);
          }
        } else {
          Notification.show('error', 'Atenção', data.data.message);
        }

      });
    }


    function getSurveyByCitySummary(params) {
      if (params === undefined) {
        return;
      }

      // console.warn('controller ->> ', params);

      var summary = {};

      Surveyapi.getMarkersByCitySummary(params, function (data) {
       // console.log('getMarkersByCitySummary', data);
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
          console.log('$scope.summary', $scope.summary);
          // $rootScope.$broadcast('build_summary');
        } else {
         // console.warn(data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        }
      });
    }

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
          icon: '../../images/icon-health-daily-' + p.no_symptom + '.svg',
          zIndex:0
        });
      });

      return t;
    }

    function pushingMarkers(datas) {
        for(var i in datas) {
          if(!checkIfExistMarker(datas[i].id)) {
            $scope.markers.push(datas[i]);
            createMarker({'lat':datas[i].position[0], 'lng':datas[i].position[1], 'title':datas[i].address}, datas[i].icon);
          }
        }
    }

    var mcluster = null;

    $scope.activeClusters = function(params){
      if (params != true) {
        return;
      }

      if(mcluster === null) {

        var options = {
          styles:[
            { url:"../../images/oval-102.svg", width:80, height:80 },
            { url:'../../images/oval-102-4.svg', width:52, height:52 },
            { url:'../../images/oval-102-8.svg', width:25, height:25 }
          ]
        };

        mcluster = new MarkerClusterer($scope.map, $scope.mkrs, options);

        mcluster.zoomOnClick_ = false;

        // console.log('mcluster', mcluster.getStyles())

        google.maps.event.addListener(mcluster, 'clusterclick', function(cluster) {
          // console.log('cluster', cluster)
          var content = '<div id="infoTitle">'+cluster.getMarkers().length+' Participações</div>';
         // '<div id="infoBody">Área: 900m<br>Período:2 semanas</div>';
          var infoWindow = new google.maps.InfoWindow({ content:content });
          infoWindow.setPosition(cluster.center_);
          infoWindow.open($scope.map);
        });

      } else {
        mcluster.setMaxZoom(1);
        mcluster.repaint();
        mcluster = null;
      }
    };

    $scope.getClustersVisible = function(){ return (mcluster===null)? false : true; };

    $scope.mkrs = [];

    function createMarker(info, img){
      if(img === undefined) {
        console.log('info.icon.iconUrl',info.icon.iconUrl);
          img = {
             url: info.icon.iconUrl,
             size: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0]),
             scaledSize: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0])
             // origin: new google.maps.Point(0, 0),
             // anchor: new google.maps.Point(0, info.icon.iconSize[1])
         };
      }
      console.log('img',img);
      var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(info.lat, info.lng),
          title: info.title,
          icon:img
      });
      marker.content = info.message;

      google.maps.event.addListener(marker, 'click', function(){

      });

      $scope.mkrs.push(marker);
      if(info.index) { marker.setZIndex(info.index); }
    }

    function checkIfExistMarker (id) {
      for(var i in $scope.markers) {
        if($scope.markers[i].id === id) { return true; }
      }
      return false;
    }

    $scope.getMarkersByLocation = function () {
      var params = {
        lat: LocalStorage.getItem('userLocation').lat,
        lng: LocalStorage.getItem('userLocation').lon
      };

      Surveyapi.getCityByPosition(params, function(data){
        $rootScope.city =  data.data.results[1].formatted_address;
        $scope.getCityAutoComplete($rootScope.city);
      });
    };

    $scope.initMap = function(){
      var mapOptions = {
         center: new google.maps.LatLng($scope.userLocation.lat, $scope.userLocation.lng),
         zoom: $scope.userLocation.zoom,
         scrollwheel: false,
         streetViewControl: false,
         mapTypeControl: false,
         zoomControl: true,
         zoomControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_TOP
         }
      };

      $scope.map = new google.maps.Map(document.getElementById('dashboard-map'), mapOptions);

      google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function(){
           $scope.getMarkersByLocation();
       });
    };

  }]);
