'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardMapCtrl
 * @description
 * # DashboardMapCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('DashboardMapCtrl', ['$scope', 'LocalStorage', 'Surveyapi', '$http', '$rootScope', 'Notification',
        function($scope, LocalStorage, Surveyapi, $http, $rootScope, Notification) {

        $scope.mkrs = [];
        $scope.params = {};
        $scope.kernelmsg=true;
        var mcluster = null;
        $scope.datemin = "01/" + (moment().month() + 1) + "/" + moment().year();
        $scope.datemax = "30/" + (moment().month() + 1) + "/" + moment().year();
        $scope.periodo = $scope.datemin + " - " + $scope.datemax;
        $scope.userLocation = {
            lat: LocalStorage.getItem('userLocation').lat,
            lon: LocalStorage.getItem('userLocation').lon,
            title: 'Me',
            zoom: 12,
            icon: '/images/icon-user-location.png',
        };

        $scope.setDateMin = function(d) {
            $scope.datemin = d;
        };

        $scope.setDateMax = function(d) {
            $scope.datemax = d;
        };

        $scope.getLocation = function(val) {
            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false,
                    language: 'pt-BR'
                }
            }).then(function(response) {
                return response.data.results.map(function(item) {
                    return item.formatted_address;
                });
            });
        };


        $scope.surveyByCity = {};

        $scope.getMarkersByCity = function() {
            var params = $scope.surveyByCity.city;
        };

        $scope.markers = [];
        $scope.timeSelection = 'Esta semana';

        $scope.timeSelectionClick = function(selection) {
            $scope.timeSelection = selection;
            $scope.getMarkersByLocation()
        };

        $scope.activeClusters = function(params) {

            $scope.clearMakers();
            if (params) {
                Surveyapi.getCluster($scope.params, function(data) {
                    console.log(data);
                    console.log("Surveyapi.getCluster", data);
                    if (data.data !== null) {
                        /**/
                        var diarreica = data.data.diarreicas;
                        var exantematica = data.data.exantematicas;
                        var respiratoria = data.data.respiratorias;
                        /*
                         */
                        var totals = [];
                        var max = 0;
                        var objmax = {};
                        /**/
                        for (var i = 0; i < diarreica.length; i++) {
                            try {
                                if (diarreica[i].points.length > 1) {

                                    if (diarreica[i].points.length > max) {
                                        max = diarreica[i].points.length;
                                        objmax = diarreica[i];
                                        objmax.center = { lat: diarreica[i].centroid[1], lng: diarreica[i].centroid[0] };
                                    }

                                    var c = new google.maps.Circle({
                                        strokeColor: "#db1105",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: "#db1105",
                                        fillOpacity: 0.35,
                                        map: $scope.map,
                                        clickable: true,
                                        center: { lat: diarreica[i].centroid[1], lng: diarreica[i].centroid[0] },
                                        radius: Math.sqrt(diarreica[i].points.length) * 100
                                    });
                                    totals.push(diarreica[i].points.length);
                                    createClickableCircle($scope.map, c, "Diarreica " + diarreica[i].points.length); // + diarreica.surveys[i].cluster===undefined?'':diarreica.surveys[i].cluster);
                                    $scope.mkrs.push(c);
                                }
                            } catch (e) {}
                        }
                        /*
                         */
                        for (var i = 0; i < exantematica.length; i++) {
                            try {
                                if (exantematica[i].points.length > 1) {
                                    if (exantematica[i].points.length > max) {
                                        max = exantematica[i].points.length;
                                        objmax = exantematica[i];
                                        objmax.center = { lat: exantematica[i].centroid[1], lng: exantematica[i].centroid[0] };
                                    }
                                    var c = new google.maps.Circle({
                                        strokeColor: "#85001f",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: "#85001f",
                                        fillOpacity: 0.35,
                                        map: $scope.map,
                                        clickable: true,
                                        center: { lat: exantematica[i].centroid[1], lng: exantematica[i].centroid[0] },
                                        radius: Math.sqrt(exantematica[i].points.length) * 100
                                    });
                                    totals.push(exantematica[i].points.length);
                                    createClickableCircle($scope.map, c, "Exantemática " + exantematica[i].points.length); // + diarreica.surveys[i].cluster===undefined?'':diarreica.surveys[i].cluster);
                                    $scope.mkrs.push(c);
                                }
                            } catch (e) {}
                        }
                        /*
                         */
                        for (var i = 0; i < respiratoria.length; i++) {
                            try {
                                if (respiratoria[i].points.length > 1) {
                                    if (respiratoria[i].points.length > max) {
                                        max = respiratoria[i].points.length;
                                        objmax = respiratoria[i];
                                        objmax.center = { lat: respiratoria[i].centroid[1], lng: respiratoria[i].centroid[0] };
                                    }
                                    var c = new google.maps.Circle({
                                        strokeColor: "#f5a623",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: "#f5a623",
                                        fillOpacity: 0.35,
                                        map: $scope.map,
                                        clickable: true,
                                        center: { lat: respiratoria[i].centroid[1], lng: respiratoria[i].centroid[0] },
                                        radius: Math.sqrt(respiratoria[i].points.length) * 100
                                    });
                                    totals.push(respiratoria[i].points.length);
                                    createClickableCircle($scope.map, c, "Respiratória " + respiratoria[i].points.length); // + diarreica.surveys[i].cluster===undefined?'':diarreica.surveys[i].cluster);
                                    $scope.mkrs.push(c);
                                }
                            } catch (e) {}
                        }

                        if (max < 10) {
                            $scope.map.setZoom(14);
                        } else {
                            $scope.map.setZoom(15);
                            $scope.map.setCenter(new google.maps.LatLng(objmax.center.lat, objmax.center.lng));

                        }

                    }
                });
            } else {
                $scope.data.clusters = false;
                $scope.getMarkersByLocation();
            }

        };

        function createClickableCircle(map, circle, info) {
            var infowindow = new google.maps.InfoWindow({
                content: info
            });
            google.maps.event.addListener(circle, 'click', function(ev) {
                infowindow.setPosition(circle.getCenter());
                infowindow.open(map);
            });
        }

        $scope.getClustersVisible = function() {
            return (mcluster === null) ? false : true;
        };

        $scope.initMap = function() {
            var mapOptions = {
                center: new google.maps.LatLng($scope.userLocation.lat, $scope.userLocation.lon),
                zoom: $scope.userLocation.zoom,
                scrollwheel: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: true,
                maxZoom: 14,
                zoomControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.LEFT_TOP
                }
            };
            $scope.map = new google.maps.Map(document.getElementById('dashboard-map'), mapOptions);
            google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function() {
                // console.log($scope.map);
                $scope.data = {};

                $scope.getMarkersByLocation();
            });
        };

        $scope.getMarkersByLocation = function() {

            if ($scope.params.lat === undefined) {
                $scope.params.lat = LocalStorage.getItem('userLocation').lat;
                $scope.params.lon = LocalStorage.getItem('userLocation').lon;
            }
            /**/
            $scope.params.min = $scope.ajustaDatas($scope.datemin);
            $scope.params.max = $scope.ajustaDatas($scope.datemax);
            /**/
            Surveyapi.getCityByPosition($scope.params, function(data) {
                // console.log(data);
                //pega bairro, Cidade - UF, País
                $rootScope.city = data.data.results[1].formatted_address;
                // console.log("$rootScope.city ", $rootScope.city);
                $scope.getCityAutoComplete($rootScope.city);
            });
        };

        function getCoords(city, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': city }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    $scope.map.setCenter(results[0].geometry.location);

                    $scope.cityLatLng = {
                        lat: results[0].geometry.location.lat(),
                        lon: results[0].geometry.location.lng()
                    };
                    $scope.params.lat = $scope.cityLatLng.lat;
                    $scope.params.lon = $scope.cityLatLng.lon;
                    callback();
                    if ($rootScope.city) { delete $rootScope.city; }
                } else {}
            });
        }

        /*pega o endereco e converte para latitude e longitude*/
        $scope.getCityAutoComplete = function(city) {
            $scope.data.clusters = false;
            $scope.clearMakers();
            getCoords(city, function() {
                getSurvey();
                getSurveySummary();
            });
        };


        function getSurvey() {

            if ($scope.params.lat === undefined) {
                $scope.params.lat = LocalStorage.getItem('userLocation').lat;
                $scope.params.lon = LocalStorage.getItem('userLocation').lon;
            }
            /**/
            $scope.params.min = $scope.ajustaDatas($scope.datemin);
            $scope.params.max = $scope.ajustaDatas($scope.datemax);
            /**/
            Surveyapi.getPins($scope.params, function(data) {
                console.log(data)
                    // console.log(data.data.error)
                if (data.data.error === false) {
                    var newMs = [];
                    newMs = addToArray(data.data.data);
                    pushingMarkers(newMs);
                } else {
                    Notification.show('error', 'Atenção', data.data.message);
                }
            });
        };

        function addToArray(markers) {
            var t = [];
            angular.forEach(markers, function(p) {
                // console.log("addToArray", p);
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

        function pushingMarkers(datas) {
            for (var i in datas) {
                $scope.markers.push(datas[i]);
                createMarker({ 'lat': datas[i].position[0], 'lng': datas[i].position[1], 'title': datas[i].address }, datas[i].icon);
            }
        }

        function createMarker(info, img) {
            if (img === undefined) {
                img = {
                    url: info.icon.iconUrl,
                    size: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0]),
                    scaledSize: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0])
                };
            }
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                icon: img
            });
            marker.content = info.message;
            google.maps.event.addListener(marker, 'click', function() {});
            $scope.mkrs.push(marker);
            if (info.index) { marker.setZIndex(info.index); }
        }

        function getSurveySummary() {
            if ($scope.params.lat === undefined) {
                $scope.params.lat = LocalStorage.getItem('userLocation').lat;
                $scope.params.lon = LocalStorage.getItem('userLocation').lon;
            }
            /**/
            $scope.params.min = $scope.ajustaDatas($scope.datemin);
            $scope.params.max = $scope.ajustaDatas($scope.datemax);
            /**/
            var summary = {};
            Surveyapi.getSummary($scope.params, function(data) {
                console.log(data.data.data);
                if (data.data.error === false) {
                    summary.total_no_symptoms = Math.abs(data.data.data.total_no_symptoms);
                    summary.total_symptoms = Math.abs(data.data.data.total_symptoms);
                    summary.total_surveys = Math.abs(data.data.data.total_surveys);
                    summary.pct_no_symptoms = 0;
                    summary.pct_symptoms = 0;
                    summary.address = data.data.data.location.formattedAddress;
                    summary.diarreica = data.data.data.diseases.diarreica;
                    summary.exantematica = data.data.data.diseases.exantematica;
                    summary.respiratoria = data.data.data.diseases.respiratoria;
                    summary.semsindrome = (summary.total_symptoms - (summary.diarreica + summary.exantematica + summary.respiratoria));
                    /**/
                    var total = (summary.diarreica + summary.exantematica + summary.respiratoria + summary.semsindrome);
                    console.log(total, summary);
                    summary.semsindrome = ((summary.semsindrome / total) * 100).toFixed(2);
                    summary.diarreica = ((summary.diarreica / total) * 100).toFixed(2);
                    summary.exantematica = ((summary.exantematica / total) * 100).toFixed(2);
                    summary.respiratoria = ((summary.respiratoria / total) * 100).toFixed(2);
                    /**/
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
                } else {
                    Notification.show('error', 'Atenção', data.data.message);
                }
            });
        };

        $scope.buscar = function() {
            $scope.getMarkersByLocation();
        };

        $scope.clearMakers = function() {
            for (var i = 0; i < $scope.mkrs.length; i++) {
                $scope.mkrs[i].setMap(null);
            }
            $scope.markers = [];
            $scope.mkrs = [];

            $scope.map.setZoom(12);
        };

        $scope.ajustaDatas = function(d) {
            var result = d;
            /*if (d.indexOf('/') !== -1) {
                try {
                    result = moment(d).format("YYYY-DD-MM");
                    if (result === 'Invalid date') {*/
            var dd = d.split('/');
            result = dd[2] + "-" + dd[1] + "-" + dd[0];
            /* }
                } catch (e) {
                    var dd = d.split('/');
                    result = dd[2] + "-" + dd[1] + "-" + dd[0];
                }
            }*/
            return result;
        }

    }]);
