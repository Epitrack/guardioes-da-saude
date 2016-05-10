'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('ProfileCtrl', ['$scope', 'UserApi', '$timeout', '$location', '$rootScope', 'Notification', function($scope, UserApi, $timeout, $location, $rootScope, Notification) {

        $scope.pageClass = 'profile-page';

        $scope.deleteUser = function() {
            var u = $rootScope.user;
            UserApi.deleteUser(function(data) {
                window.localStorage.removeItem('userLocation');
                window.localStorage.removeItem('userStorage');
                delete $rootScope.user;
                Notification.show('success', 'Desativar usuário', "Usuário desativado com sucesso.");
                $timeout(function() {
                    $location.path('/');
                }, 1000);
            });
            /*if (data.data.error === false) {
                Notification.show('success', 'Deletar usuário', data.data.message);
                $timeout(function() {
                    $location.path('profile');
                }, 2000);
            } else {
                Notification.show('error', 'Deletar usuário', data.data.message);
            }*/

        };
        // set user with $rootScope data
        $scope.getUser = function() {
            var u = $rootScope.user;
            // return console.warn('$rootScope.user -> ', $rootScope.user);
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
                        picture: u.picture
                    };
                    // console.warn($scope.screen.user); // formato dob ok
                } else {
                    Notification.show('error', 'Atenção', data.data.message);
                }
            });
        };

        $scope.editProfile = function() {
            // create a object to manipulate date and send to api
            var params = {
                nick: $scope.screen.user.nick,
                dob: $scope.screen.user.dob,
                gender: $scope.screen.user.gender,
                email: $scope.screen.user.email,
                race: $scope.screen.user.race,
            };

            $scope.checkF = $scope.UTIL.checkForm(params, true);

            if ($scope.screen.user.password && $scope.screen.user.password.length > 0 && $scope.screen.user.password.length < 6) {
                $scope.checkF = { "error": true, "msg": "A senha precisa ter no mínimo 6 dígitos" };
            }
            if ($scope.screen.user.password && $scope.screen.user.password.length >= 6 && $scope.screen.user.password !== $scope.screen.user.repeatPassword) {
                $scope.checkF = { "error": true, "msg": "As senhas digitadas precisam ser iguais." };
            }

            if ($scope.checkF.error === true) {
                return;
            }

            params.picture = $scope.screen.user.picture;
            params.dob = $scope.UTIL.convertDate(params.dob);

            if ($scope.screen.user.password) {
                params.password = $scope.screen.user.password;
                delete $scope.screen.user.password;
            }
            // ====

            // ====
            UserApi.updateProfile(params, function(data) {
                if (data.data.error === false) {
                    Notification.show('success', 'Atualizar usuário', data.data.message);
                } else {
                    Notification.show('error', 'Atualizar usuário', data.data.message);
                }

                $scope.screen = false;
                $scope.getUser();
            });
            // ====
        };

        $scope.getUser();
    }]);
