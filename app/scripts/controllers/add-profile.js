'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:AddProfileCtrl
 * @description
 * # AddProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('AddProfileCtrl', ['$scope', 'HouseholdApi', 'Notification', '$timeout', '$location', function($scope, HouseholdApi, Notification, $timeout, $location) {
        $scope.pageClass = 'add-profile-page';

        // Add a new household member
        $scope.houseHold = {};
        $scope.checkF = {};

        $scope.addHousehold = function() {
            var params = {
                nick: $scope.houseHold.nick,
                gender: $scope.houseHold.gender,
                dob: $scope.houseHold.dob,
                race: $scope.houseHold.race,
                relationship: $scope.houseHold.relationship,
            };

            $scope.checkF = $scope.UTIL.checkForm(params);
            if ($scope.checkF.error === true) {
                return;
            }

            //checking optional email
            if ($scope.houseHold.email) {
                if ($scope.UTIL.checkEmail($scope.houseHold.email)) {
                    params.email = $scope.houseHold.email;
                } else {
                    $scope.checkF = { "error": true, "msg": "Email inválido." };
                    return;
                }
            }

            params.picture = $scope.UTIL.checkAvatar($scope.houseHold);
            params.dob = $scope.UTIL.convertDate(params.dob);

            HouseholdApi.createHousehold(params, function(data) {
                if (data.data.error === true) {
                    // console.warn(data.data.message);
                    Notification.show('error', 'Atenção', data.data.message);
                } else {
                    // console.log(data.data.message);
                    Notification.show('success', 'Atenção', data.data.message);

                    $timeout(function() {
                        $scope.params = {};
                        $location.path('/health-daily');

                    }, 400);
                }
            });
        };
        // ====

        // ====
        function hideModal() {
            angular.element('#modal-add-profile').modal('toggle');
        }
        // ====

        // ====
        $scope.addHouseholdFromSurvey = function() {
            var params = {
                nick: $scope.houseHold.nick,
                gender: $scope.houseHold.gender,
                dob: $scope.houseHold.dob,
                race: $scope.houseHold.race,
                relationship: $scope.houseHold.relationship,
            };

            $scope.checkF = $scope.UTIL.checkForm(params);
            if ($scope.checkF.error === true) {
                return;
            }

            //checking optional email
            if ($scope.houseHold.email) {
                if ($scope.UTIL.checkEmail($scope.houseHold.email)) {
                    params.email = $scope.houseHold.email;
                } else {
                    $scope.checkF = {
                        "error": true,
                        "msg": "Email inválido."
                    };
                    return;
                }
            }

            params.picture = $scope.UTIL.checkAvatar($scope.houseHold);
            params.dob = $scope.UTIL.convertDate(params.dob);

            HouseholdApi.createHousehold(params, function(data) {
                if (data.data.error === true) {
                    // console.warn(data.data.message);
                    Notification.show('error', 'Adicionar membro', data.data.message);
                } else {
                    // console.log(data.data.message);
                    hideModal();
                    Notification.show('success', 'Adicionar membro', data.data.message);
                }
            });
        };
        // ====

    }]);
