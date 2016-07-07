'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('MainCtrl', ['$scope', 'Surveyapi', '$location', '$rootScope', 'SearchCitiesApi', '$http',
    function($scope, Surveyapi, $location, $rootScope, SearchCitiesApi, $http) {

        // Put url on the game button
        if (localStorage.getItem('tutorial')) {
            $rootScope.urlGame = 'game/home';
        }else{
            $rootScope.urlGame = 'game/tutorial';
        }
        
        $scope.pageClass = 'main-page';

        // when user click in logout button
        $scope.clearStorage = function() {
            localStorage.clear();
            delete $rootScope.user;
        };

        $scope.setRootCity = function(params) {
            if (params) {
                $rootScope.city = params;
            } else {
                $rootScope.city = $scope.city;
            }

            $location.path('/health-map');
        };

        $scope.getMostCities = function(limit) {
            $scope.cities = {};

            SearchCitiesApi.getCities(limit, function(data) {
                try {
                    $scope.cities = data.data;
                    $rootScope.$broadcast('getCities_ok');
                } catch (e) {}
            });
        };

        $scope.getMostCities(5);

        // Auto complete
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
        // ====
    }
]);
