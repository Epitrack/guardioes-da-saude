'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('IndexCtrl', ['$scope', '$translate', 'LocalStorage', '$rootScope', '$location', 'Notification', '$window',
    function($scope, $translate, LocalStorage, $rootScope, $location, Notification, $window) {

        // to hide menu
        $scope.logged = LocalStorage.getItem('userLogged');
        $scope.lang = {};
        if ($translate.use() === undefined) {
            $translate.use('pt');
        }
        $scope.lang.current = $translate.use();

        if (window.sessionStorage.getItem('lang') !== null) {
            $scope.lang.current = window.sessionStorage.getItem('lang');
        }

        $scope.changeLanguage = function() {
            window.sessionStorage.setItem('lang', $scope.lang.current);
            $translate.use($scope.lang.current);
            window.location.reload();
        };

        // ====
        function checkIsMobile() {
            if (!/Android|webOS|iPhone|iPad|Windows Phone|ZuneWP7|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                getBrowser();
                showLocationModal();
            }
        }

        function showLocationModal() {
            if (LocalStorage.getItem('userLocation') === null) {
                angular.element('#modal-location').modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: 'true'
                });
            }
        }

        function getBrowser() {
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                $scope.url = 'chrome';
            } else if (navigator.userAgent.toLowerCase().indexOf('safari') > -1) {
                $scope.url = 'safari';
            } else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $scope.url = 'firefox';
            }
        }

        checkIsMobile();
        // ====

        // get user location
        $scope.getUserLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition, errorGeolocation);
            } else {
                $window.alert('Seu navegador não suporta geolocation');
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
        $scope.clearStorage = function() {
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
                $scope.downloadLink = 'https://itunes.apple.com/us/app/guardioes-da-saude/id1060576766?ls=1&mt=8';
            }

            // console.log('GDSDownloadApp -> ', GDSDownloadApp);

            if (GDSDownloadApp === null) {
                if (android || iphone) {
                    angular.element('#modal-app').modal({ show: 'true' });
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
            angular.element(event.currentTarget).toggleClass('js-active');
            angular.element('#wrapper-body').toggleClass('st-menu-open');
        };

        var hMenu = document.body.clientHeight;
        $scope.hMenu = hMenu + 'px';

        $scope.closeNav = function() {
            angular.element('#btn-showNavbar').removeClass('js-active');
            angular.element('#wrapper-body').removeClass('st-menu-open');
        };

        $scope.goToUrl = function(path) {
            $location.path(path);
        };

        $scope.getUser = function() {
            try {
                var u = $rootScope.user;
                UserApi.updateUser(u.id, function(data) {
                    if (data.data.error === false) {
                        u = data.data.data[0];
                        $scope.screen = {};
                        $scope.screen.user = {
                            nick: u.nick,
                            dob: $scope.UTIL.unConvertDate(u.dob),
                            gender: u.gender,
                            email: u.email,
                            race: u.race,
                            picture: u.picture,
                            profile: u.profile,
                            state: u.state,
                            country: u.country
                        };
                    }
                });
            } catch (e) {}
        };
        $scope.getUser();

    }
]);
