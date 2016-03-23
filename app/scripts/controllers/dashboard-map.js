'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardMapCtrl
 * @description
 * # DashboardMapCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('DashboardMapCtrl', ['$scope', 'LocalStorage', 'Surveyapi', function ($scope, LocalStorage, Surveyapi) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.userLocation = {
//      coords: [LocalStorage.getItem('userLocation').lat, LocalStorage.getItem('userLocation').lon],
      lat: LocalStorage.getItem('userLocation').lat,
      lng: LocalStorage.getItem('userLocation').lon,
      title: 'Me',
      zoom: 12,
      icon: '/images/icon-user-location.png',

    };

    $scope.markers=[];

    Surveyapi.getMarkersByLocation({'lat':$scope.userLocation.lat, 'lon':$scope.userLocation.lng}, function (data) {
      console.log('markers', data.data.data);
      for(var i in data.data.data)
      {
         $scope.$broadcast('createMarker', {'img':'../../images/icon-health-daily-' + data.data.data[i].no_symptom + '.svg', 'location':{'lat':data.data.data[i].lat, 'lng':data.data.data[i].lon}, 'title':data.data.data[i].city});
        $scope.markers.push(data.data.data[i])
      }

//      $scope.$broadcast('createMarker', {'img':'../../images/icon-health-daily-' + data.data.data[i].no_symptom + '.svg', 'location':{'lat':data.data.data[i].lat, 'lng':data.data.data[i].lon}, 'title':data.data.data[i].city});
    });

  }]);
