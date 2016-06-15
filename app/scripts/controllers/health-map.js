'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthMapCtrl
 * @description
 * # HealthMapCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('HealthMapCtrl', ['$scope', 'Surveyapi', '$rootScope', 'LocalStorage', '$http', '$timeout', 'Notification', 
    function($scope, Surveyapi, $rootScope, LocalStorage, $http, $timeout, Notification) {

        $scope.pageClass = 'health-map';
        $scope.markers = [];
        //
        // Graphic
        //
        $scope.donutOptions = {
            data: [
                { label: "Bem", value: 77, participants: 10 },
                { label: "Mal", value: 23, participants: 5 }
            ],
            colors: ['#E0D433', '#C81204'],
            resize: true
        };
        // ====

        function getPosition(position) {
            var lat, lon;
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            LocalStorage.saveLocation(lat, lon);

            $scope.userLocation = {
                lat: lat,
                lng: lon,
                title: 'Você está aqui',
                zoom: 12,
                icon: '/images/icon-user-location.png'
            };
        }

        function errorGeolocation(error) {
            // console.warn('errorGeolocation', error);
            Notification.show('error', 'Localização', error);
        }

        $scope.mapOptions = {
            zoom: 14,
            maxZoom: 16,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_TOP
            }
        };

        $scope.config = {
            styles: [{
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [{ 'color': '#e9e9e9' }, { 'lightness': 17 }]
            }, {
                'featureType': 'landscape',
                'elementType': 'geometry',
                'stylers': [{ 'color': '#f5f5f5' }, { 'lightness': 20 }]
            }, {
                'featureType': 'road.highway',
                'elementType': 'geometry.fill',
                'stylers': [{ 'color': '#ffffff' }, { 'lightness': 17 }]
            }, {
                'featureType': 'road.highway',
                'elementType': 'geometry.stroke',
                'stylers': [{ 'color': '#ffffff' }, { 'lightness': 29 }, { 'weight': 0.2 }]
            }, {
                'featureType': 'road.arterial',
                'elementType': 'geometry',
                'stylers': [{ 'color': '#ffffff' }, { 'lightness': 18 }]
            }, {
                'featureType': 'road.local',
                'elementType': 'geometry',
                'stylers': [{ 'color': '#ffffff' }, { 'lightness': 16 }]
            }, {
                'featureType': 'poi',
                'elementType': 'geometry',
                'stylers': [{ 'color': '#f5f5f5' }, { 'lightness': 21 }]
            }, {
                'featureType': 'poi.park',
                'elementType': 'geometry',
                'stylers': [{ 'color': '#dedede' }, { 'lightness': 21 }]
            }, {
                'elementType': 'labels.text.stroke',
                'stylers': [{ 'visibility': 'on' }, { 'color': '#ffffff' }, { 'lightness': 16 }]
            }, {
                'elementType': 'labels.text.fill',
                'stylers': [{ 'saturation': 36 }, { 'color': '#333333' }, { 'lightness': 40 }]
            }, {
                'elementType': 'labels.icon',
                'stylers': [{ 'visibility': 'off' }]
            }, {
                'featureType': 'transit',
                'elementType': 'geometry',
                'stylers': [{ 'color': '#f2f2f2' }, { 'lightness': 19 }]
            }, {
                'featureType': 'administrative',
                'elementType': 'geometry.fill',
                'stylers': [{ 'color': '#fefefe' }, { 'lightness': 20 }]
            }, {
                'featureType': 'administrative',
                'elementType': 'geometry.stroke',
                'stylers': [{ 'color': '#fefefe' }, { 'lightness': 17 }, { 'weight': 1.2 }]
            }]
        };

        var info;

        $scope.openInfoWindow = function(params) {
            $scope.info = params;
            $scope.map.showInfoWindow('foo', this);
        };
        // ====


        // ====
        // obtém as informações depois que o usuário digita a cidade
        $scope.surveyByCity = {};

        $scope.getMarkersByCity = function() {
            var params = $scope.surveyByCity.city;
            console.log(params);
            getCoords(params, function() {
                console.log($scope.cityLatLng);
                getSurveyByCity($scope.cityLatLng);
                getSurveyByCitySummary($scope.cityLatLng);
            });
        };

        function pushingMarkers(datas) {
            for (var i in datas) {
                // if (!checkIfExistMarker(datas[i].id)) {
                $scope.markers.push(datas[i]);
                $scope.$broadcast('createMarker', { 'img': datas[i].icon, 'location': { 'lat': datas[i].position[0], 'lng': datas[i].position[1] }, 'title': datas[i].address });
                // }
            }
        }

        function checkIfExistMarker(id) {
            for (var i in $scope.markers) {
                if ($scope.markers[i].id === id) {
                    return true;
                }
            }
            return false;
        }

        function getSurveyByCity(city) {
            Surveyapi.getMarkersByCity(city, function(data) {
                if (data.data.error === false) {
                    if ($scope.markers) {
                        var newMs = [];
                        newMs = addToArray(data.data.data);
                        pushingMarkers(newMs);
                    } else { $scope.markers = addToArray(data.data.data); }

                } else {
                    // console.warn(data.data.message);
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

            Surveyapi.getMarkersByCitySummary(params, function(data) {
                // console.log(data.data.data);
                data.data.summary = data.data.data;
                if (data.data.summary !== false) {

                    summary.total_no_symptoms = data.data.summary.total_no_symptoms;
                    summary.total_symptoms = data.data.summary.total_symptoms;
                    summary.total_surveys = data.data.summary.total_surveys;

                    summary.pct_no_symptoms = 0;
                    summary.pct_symptoms = 0;

                    summary.address = data.data.summary.location.formattedAddress;

                    summary.diarreica = data.data.summary.diseases.diarreica;
                    summary.exantematica = data.data.summary.diseases.exantematica;
                    summary.respiratoria = data.data.summary.diseases.respiratoria;

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
                    // console.log('$scope.summary', $scope.summary, params);
                    // $rootScope.$broadcast('build_summary');
                } else {
                    // console.warn(data.data.message);
                    Notification.show('error', 'Atenção', data.data.message);
                }
            });
        }

        function getCoords(city, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': city }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    $scope.map.setCenter(results[0].geometry.location);
                    $scope.cityLatLng = {
                        lat: results[0].geometry.location.lat(),
                        lon: results[0].geometry.location.lng()
                    };
                    // console.log($scope.cityLatLng);
                    callback();
                    if ($rootScope.city) { delete $rootScope.city; }
                } else {
                    // console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        // ====


        // ====
        // quando o usuário entra na tela sem digitar
        // pega a localização e mostra no mapa
        function addToArray(markers) {
            var t = [];
            angular.forEach(markers, function(p) {
                // console.log(p);
                t.push({
                    position: [p.lat, p.lon],
                    address: p.formattedAddress,
                    id: p.id,
                    icon: '../../images/icon-health-daily-' + p.no_symptom + '.svg',
                    zIndex: 0
                });
            });

            return t;
        }

        function getSummaryByLocation(params) {
            var summary = {};

            Surveyapi.getSummaryByLocation(params, function(data) {
                // console.log(data.data.summary);
                if (data.data.summary !== false) {

                    summary.total_no_symptoms = data.data.summary.total_no_symptoms;
                    summary.total_symptoms = data.data.summary.total_symptoms;
                    summary.total_surveys = data.data.summary.total_surveys;

                    summary.pct_no_symptoms = 0;
                    summary.pct_symptoms = 0;

                    summary.address = data.data.summary.location.formattedAddress;

                    summary.diarreica = data.data.summary.diseases.diarreica;
                    summary.exantematica = data.data.summary.diseases.exantematica;
                    summary.respiratoria = data.data.summary.diseases.respiratoria;

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
                    Notification.show('error', 'Atenção', data.data.message);
                }
            });
        }

        $scope.$on('mapLoaded', function(event, map) {
            try {
                $scope.map = map;

                getCoords($rootScope.city, function() {
                    getSurveyByCity($scope.cityLatLng);
                    getSurveyByCitySummary($scope.cityLatLng);
                });
                // console.log($scope.userLocation.lat, $scope.userLocation.lng);
                if ($scope.userLocation !== null) {
                    var position = new google.maps.LatLng($scope.userLocation.lat, $scope.userLocation.lng);
                    info = new google.maps.InfoWindow({
                        content: "<b>Você está aqui!</b>",
                        map: $scope.map,
                        position: position,
                        pixelOffset: new google.maps.Size(0, -20)
                    });
                    $scope.$broadcast('createMarker', {
                        'img': $scope.userLocation.icon,
                        'location': {
                            'lat': $scope.userLocation.lat,
                            'lng': $scope.userLocation.lng
                        },
                        'title': '',
                        index: 100000
                    });
                }
                // //TODO colocar aqui o "você está aqui"
                google.maps.event.addListener(map, 'idle', addNewMarkers);
            } catch (e) { console.log(e) }
        });

        $scope.getMarkersByLocation = function() {
            try {
                var params = {
                    lat: LocalStorage.getItem('userLocation').lat,
                    lon: LocalStorage.getItem('userLocation').lon
                };

                Surveyapi.getCityByPosition(params, function(data) {
                    $rootScope.city = data.data.results[1].formatted_address;
                });
            } catch (e) { console.log(e) }
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
            }).then(function(response) {
                // console.log(response);

                return response.data.results.map(function(item) {
                    return item.formatted_address;
                });
            });
        };

        function addNewMarkers() {
            // var bounds = $scope.map.getBounds();

            // var south = map.getBounds().getSouthWest();
            var south_lat = $scope.map.getBounds().getSouthWest().lat();
            var south_lng = $scope.map.getBounds().getSouthWest().lng();

            // var north = map.getBounds().getNorthEast();
            var north_lat = $scope.map.getBounds().getNorthEast().lat();
            var north_lng = $scope.map.getBounds().getNorthEast().lng();

            var center_lat = (south_lat + north_lat) / 2;
            var center_lng = (south_lng + north_lng) / 2;
            var params = { 'lat': center_lat, 'lon': center_lng };
            // console.log('addNewMarkers', params);
            // passa a cidade de acordo com a lat/lng
            getSurveyByCitySummary(params);
            Surveyapi.getCityByPosition(params, function(data) {
                try {
                    $scope.surveyByCity.city = data.data.results[2].formatted_address;
                } catch (e) {}
                try {
                    if (data.data.results[1].formatted_address) {
                        getSurveyByCity(params);
                    }
                } catch (E) {}
            });

            Surveyapi.getMarkersByLocation(params, function(data) {
                if (data.data.error === false) {
                    var newMs = [];
                    newMs = addToArray(data.data.data);
                    pushingMarkers(newMs);
                } else {
                    Notification.show('error', 'Atenção', data.data.message);
                }
            });
        }

        $scope.getCityAutoComplete = function(city) {
            getCoords(city, function() {

                getSurveyByCity($scope.cityLatLng);
                getSurveyByCitySummary($scope.cityLatLng);
            });
        };


        if (LocalStorage.getItem('userLocation') === null) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition, errorGeolocation);
            } else {
                $window.alert('Seu navegador não suporta geolocation');
            }
            if ($rootScope.city === undefined) { $scope.getMarkersByLocation(); }
        } else {
            $scope.userLocation = {
                lat: LocalStorage.getItem('userLocation').lat,
                lng: LocalStorage.getItem('userLocation').lon,
                title: 'Você está aqui',
                zoom: 12,
                icon: '/images/icon-user-location.png'
            };
            if ($rootScope.city === undefined) { $scope.getMarkersByLocation(); }
        }

    }]);
