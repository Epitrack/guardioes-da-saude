'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('IndexCtrl', ['$scope', 'LocalStorage', '$rootScope', '$location', 'Notification', function ($scope, LocalStorage, $rootScope, $location, Notification) {

    // to hide menu
    $scope.logged = LocalStorage.getItem('userLogged');

    // ====
    function checkIsMobile() {
      if (!/Android|webOS|iPhone|iPad|Windows Phone|ZuneWP7|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        getBrowser();
        showLocationModal();
      }
    };

    function showLocationModal(){
      if (LocalStorage.getItem('userLocation') === null) {
        $('#modal-location').modal({
          backdrop: 'static',
          keyboard: false,
          show: 'true'
        });
      }
    };

    function getBrowser() {
      if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        $scope.url = 'chrome';
      } else if (navigator.userAgent.toLowerCase().indexOf('safari') > -1) {
        $scope.url = 'safari';
      } else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $scope.url = 'firefox';
      }
    };

    checkIsMobile();
    // ====

    // get user location
    $scope.getUserLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, errorGeolocation);
      } else {
        alert('Seu navegador não suporta geolocation');
      }
    };

    function getPosition(position) {
      var lat, lon;
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      LocalStorage.saveLocation(lat, lon);
    }

    function errorGeolocation(error) {
      // console.warn('errorGeolocation', error);
      Notification.show('error', 'Localização', error);
    }
    // ====

    // when user click in logout button
    $scope.clearStorage = function () {
      delete $rootScope.user;
      // console.log('clearStorage in index.js');
      localStorage.removeItem('userStorage');
      window.location.href = "/";
    };
    // ====

    // ====

    $scope.checkPlatform = function() {
      var GDSDownloadApp = LocalStorage.getItem('GDSDownloadApp');

      var ua, android, iphone;

      ua = navigator.userAgent.toLowerCase();
      android = ua.indexOf("android") > -1;
      iphone = ua.indexOf("iphone") > -1;

      if (android) {
        $scope.downloadLink = 'https://play.google.com/store/apps/details?id=com.epitrack.guardioes';
      } else if (iphone) {
        $scope.downloadLink = 'https://itunes.apple.com/us/app/guardioes-da-saude/id1060576766?ls=1&mt=8'
      }

      // console.log('GDSDownloadApp -> ', GDSDownloadApp);

      if (GDSDownloadApp == null) {
        if (android || iphone) {
          $('#modal-app').modal({ show: 'true' });
          localStorage.setItem('GDSDownloadApp', true);
        }
      }
    };

    $rootScope.$on('getCities_ok', function() {
      $scope.checkPlatform();
    });
    // ====

    // mobile navbar
    $scope.showNavbar = function(event) {
      $(event.currentTarget).toggleClass('js-active');
      $('#wrapper-body').toggleClass('st-menu-open');
    }

    var hMenu = document.body.clientHeight;
    $scope.hMenu = hMenu+'px';

    $scope.closeNav = function() {
      $('#btn-showNavbar').removeClass('js-active');
      $('#wrapper-body').removeClass('st-menu-open');
    }

    $scope.goToUrl = function(path) {
      $location.path(path);
    }
    // ====

  }]);
