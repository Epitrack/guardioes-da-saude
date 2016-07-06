'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileInternalCtrl
 * @description
 * # ProfileInternalCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('ProfileInternalCtrl', ['$scope', '$routeParams', 'HouseholdApi', '$rootScope', 'Notification', '$filter', '$timeout', '$location',
    function($scope, $routeParams, HouseholdApi, $rootScope, Notification, $filter, $timeout, $location) {

        var meuFiltro = $filter;

        var userStorage = $rootScope.user;

        // ====
        $scope.deleteHousehold = function(id) {
            HouseholdApi.deleteHousehold(id, function(data) {
                if (data.data.error === false) {
                    Notification.show('success', 'Deletar usuário', data.data.message);
                    $timeout(function() {
                        $location.path('profile');
                    }, 2000);
                } else {
                    Notification.show('error', 'Deletar usuário', data.data.message);
                    // console.warn('Error', data.data.message);
                }
            });
        };
        // ====

        // ====
        $scope.getHousehold = function() {
            $scope.screen = {};

            HouseholdApi.getHousehold(userStorage.id, function(data) {
                $scope.screen.householdData = meuFiltro('filter')(data.data.data, {
                    id: $routeParams.id
                })[0];

                $scope.screen.household = _buildObj($scope.screen.householdData);
            });
        };
        // ====

        // ====

        $scope.editProfile = function() {
            // create a object to manipulate date and send to api
            var params = {
                nick: $scope.screen.household.nick,
                dob: $scope.screen.household.dob,
                gender: $scope.screen.household.gender,
                race: $scope.screen.household.race,
                country: $scope.screen.household.country,
                profile: $scope.screen.household.profile,
                state: $scope.screen.household.state
            };

            $scope.checkF = $scope.UTIL.checkForm(params);
            if ($scope.checkF.error === true) {
                return;
            }

            params.picture = $scope.screen.household.picture;
            if ($scope.screen.household.email) { params.email = $scope.screen.household.email; }
            params.id = $scope.screen.household.id;
            params.dob = $scope.UTIL.convertDate(params.dob);

            // ====

            // return console.warn(params);

            HouseholdApi.updateProfile(params, function(data) {
                if (data.data.error === true) {
                    Notification.show('error', 'Atualizar usuário', data.data.message);
                } else {
                    // console.warn('DATA SUCCESS -> ', data);
                    Notification.show('success', 'Atualizar usuário', data.data.message);
                    $scope.screen.household = _buildObj(data.data.user[0]);
                    window.location = "#/health-daily/household/" + params.id;
                }
            });

            $scope.getHousehold();
        };
        // ====

        // Utils
        var _buildObj = function(obj) {
            try {
                $scope._isbrasil = (obj.country == 'Brazil');
            } catch (e) {}
            return {
                nick: obj.nick,
                dob: $scope.UTIL.unConvertDate(obj.dob),
                gender: obj.gender,
                email: obj.email,
                race: obj.race,
                id: obj.id,
                country: obj.country,
                profile: obj.profile,
                state: obj.state,
                picture: obj.picture
            };
        };
        // ====

        $scope.getHousehold();
    }
]);
