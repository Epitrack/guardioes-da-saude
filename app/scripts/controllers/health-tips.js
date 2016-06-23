'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthTipsCtrl
 * @description
 * # HealthTipsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('HealthTipsCtrl', ['$scope', 'healthTips', 'LocalStorage', 
  function ($scope, healthTips, LocalStorage) {

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
      zoom: 12,
      icon: myIcon
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

      $scope.markersUpa = addressPointsToMarkers($scope._markersUpa);
      $scope.markersPharmacy = addressPointsToMarkersPharmacy($scope._markersPharmacy);
    };

    $scope.openModal = function(){
      angular.element('#modal-all-drugstores-cant-shown').modal({
        show: 'true'
      });
    };

    $scope.$on('clickMarker.click', function (event, args) {
        $scope.markTitle = args.title;
        $scope.markMessage = args.message;

        $scope.showInfo = true;

        $scope.$apply();
    });

    $scope.removeInfo = function(){delete $scope.showInfo;};

    function clearMap(){
        delete $scope._markersPharmacy;
        delete $scope.markersPharmacy;
        delete $scope._markersUpa;
        delete $scope.markersUpa;
        delete $scope.showInfo;
        $scope.markTitle = '';
        $scope.markMessage = '';
    }

    $scope.markTitle = '';
    $scope.markMessage = '';

    // UPAS
    $scope.loadUpas = function () {
      clearMap();
      healthTips.getUpas(function (data) {
        $scope._markersUpa = data;
        $scope.addMarkers();
      });
    };

    // FARMACIAS

    $scope.loadFarmacias = function () {
      clearMap();
      healthTips.getFarmacias(function (data) {
        $scope._markersPharmacy = data;
        $scope.addMarkers();
      });
    };

  }]);
