'use strict';

/**
 * @ngdoc service
 * @name gdsApp.surveyapi
 * @description
 * # surveyapi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
    .service('Surveyapi', function($http, $location, LocalStorage, ApiConfig, $rootScope, UserApi) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var obj = {};

        var apiUrl = ApiConfig.API_URL;
        var app_token = ApiConfig.APP_TOKEN;
        var platform = ApiConfig.PLATFORM;
        var client = ApiConfig.CLIENT;

        obj.getSymptoms = function(callback) {
            $http.get(apiUrl + '/symptoms', { headers: { 'app_token': app_token } })
                .then(function(data) {
                    // console.log('Success getSymptoms: ', data);
                    callback(data);
                }, function(error) {
                    callback(error);
                    // console.warn('Error getSymptoms: ', error);
                });
        };

        obj.submitSurvey = function(data, callback) {
            data.client = client;
            data.platform = platform;
            data.user_id = $rootScope.user.id;
            data.app_token = app_token;

            /*$http.get(apiUrl + "/user/lookup", {headers: {'app_token': app_token,'user_token': LocalStorage.getItem('userStorage').user_token}
                 }).then(function(result) {var o = result.data.data;console.log("/user/lookup", o);});*/

            // console.warn('Enviando...', data);
            /* /user/calendar/day */
            $http.get(apiUrl + '/user/calendar/day', {
                headers: {
                    'app_token': app_token,
                    'user_token': LocalStorage.getItem('userStorage').user_token
                }
            }).then(function(result) {
                console.log("result calendar/day", result.data.data.length);
                if (result.data.data.length === 0) {
                    $http.post(apiUrl + '/user/update', { "xp": 10 }, {
                        headers: { 'app_token': app_token, 'user_token': LocalStorage.getItem('userStorage').user_token }
                    }).then(function(result) {}, function(error) {});
                }
            }, function(error) {
                console.warn('Error getUserCalendar: ', error);
            });
            $http.post(apiUrl + '/survey/create', data, {
                    headers: {
                        'app_token': app_token,
                        'user_token': $rootScope.user.user_token
                    }
                })
                .then(function(data) {
                    callback(data);
                    UserApi.updateUser($rootScope.user.id, function(data) {
                        if (data.data.data[0].fb || data.data.data[0].tw || data.data.data[0].gl) {
                            var params = {
                                password: data.data.data[0].email,
                                picture: data.data.data[0].picture
                            };
                            UserApi.updateProfile(params);
                        }
                    });
                }, function(error) {
                    callback(error);
                });
        };

        obj.getMarkersByCity = function(params, callback) {
            //lat lon
            $http.get(apiUrl + '/charts/pins?lat=' + params.lat + '&lon=' + params.lon, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    // console.log('Success getMarkersByCity: ', data);
                    callback(data);
                }, function(error) {
                    callback(error);
                    // console.warn('Error getMarkersByCity: ', error);
                });
        };

        //pra nada
        obj.getMarkersByWeek = function(week, callback) {
            $http.get(apiUrl + '/surveys/w?week_of=' + week, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    callback(data);
                    // console.log('Success getMarkersByWeek: ', data);
                }, function(error) {
                    callback(error);
                    // console.warn('Error getMarkersByWeek: ', error);
                });
        };

        obj.getMarkersByLocation = function(params, callback) {
            $http.get(apiUrl + '/charts/pins?lat=' + params.lat + '&lon=' + params.lon, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    callback(data);
                    // console.log('Success getMarkersByLocation: ', data);
                }, function(error) {
                    callback(error);
                    // console.warn('Error getMarkersByLocation: ', error);
                });
        };

        obj.getSummaryByLocation = function(params, callback) {
            $http.get(apiUrl + '/charts/summary?lat=' + params.lat + '&lon=' + params.lon, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    callback(data);
                    // console.log('Success getSummaryByLocation: ', data);
                }, function(error) {
                    // console.warn('Error getSummaryByLocation: ', error);
                    callback(error);
                });
        };

        obj.getMarkersByCitySummary = function(params, callback) {
            // return console.warn('service -> ', params);

            var url = (params.time !== undefined) ? apiUrl + '/charts/summary?month=' + params.time + '&lat=' + params.lat + "&lon=" + params.lon : apiUrl + '/surveys/summary?lat=' + params.lat + "&lon=" + params.lon;


            $http.get(url, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    callback(data);
                    // console.log('Success getMarkersByCitySummary: ', data);
                }, function(error) {
                    callback(error);
                    // console.warn('Error getMarkersByCitySummary: ', error);
                });
        };

        obj.getCityByPosition = function(position, callback) {
            // console.log("position", position);
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.lat + "," + position.lon)
                .then(function(data) {
                    callback(data);
                    // console.warn('Success getCityByPosition: ', data);
                }, function(error) {
                    callback(error);
                    // console.warn('Error getCityByPosition: ', error);
                });
        };
        obj.getPins = function(params, callback) {
            $http.get(apiUrl + '/charts/pins?lat=' + params.lat + '&lon=' + params.lon + '&min=' + params.min + '&max=' + params.max, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    callback(data);
                    // console.log('Success getMarkersByLocation: ', data);
                }, function(error) {
                    callback(error);
                    // console.warn('Error getMarkersByLocation: ', error);
                });
        };
        obj.getSummary = function(params, callback) {
            $http.get(apiUrl + '/charts/summary?lat=' + params.lat + '&lon=' + params.lon + '&min=' + params.min + '&max=' + params.max, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    console.log('Success getSummary: ', data);
                    callback(data);
                }, function(error) {
                    // console.warn('Error getSummaryByLocation: ', error);
                    callback(error);
                });
        };
        //
        obj.getCluster = function(params, callback) {
            $http.get(apiUrl + '/charts/cluster?lat=' + params.lat + '&lon=' + params.lon + '&min=' + params.min + '&max=' + params.max, { headers: { 'app_token': app_token } })
                .then(function(data) {
                    console.log('Success getCluster: ', data);
                    callback(data);
                }, function(error) {
                    // console.warn('Error getSummaryByLocation: ', error);
                    callback(error);
                });
        };
        return obj;
    });
