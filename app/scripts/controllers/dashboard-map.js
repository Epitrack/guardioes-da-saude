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

//    $scope.markers;

    Surveyapi.getMarkersByLocation({'lat':$scope.userLocation.lat, 'lon':$scope.userLocation.lng}, function (data) {
        console.log('markers', data);

//      $scope.$broadcast('createMarker', {'img':datas[i].icon, 'location':{'lat':datas[i].position[0], 'lng':datas[i].position[1]}, 'title':datas[i].address});
    });

  }]);
