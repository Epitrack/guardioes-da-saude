'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('LoginCtrl', ['$scope', '$http', 'UserApi', '$location', 'LocalStorage', 'Notification', '$rootScope', function($scope, $http, UserApi, $location, LocalStorage, Notification, $rootScope) {

        $scope.cangoogle = false;
        $scope.facebookLogin = function() {
            UserApi.facebookLogin($scope);
        };

        $scope.googleLogin = function() {
            $scope.$on('event:google-plus-signin-success', function(event, authResult) {
                console.log("google-plus-signin-success", event, authResult);
                gapi.client.load('plus', 'v1', function() {
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    request.execute(function(resp) {
                        try {
                            console.log('Retrieved profile for:', resp, resp.emails[0].value);
                            resp.email = resp.emails[0].value;
                            UserApi.googleLogin($scope, resp);
                        } catch (e) {
                            alert("Não foi possíel realizar o login: " + JSON.stringify(e));
                        }
                    });
                });

            });
            $scope.$on('event:google-plus-signin-failure', function(event, authResult) {
                alert("Não foi possíel realizar o login");
            });
        };

        $scope.twitterLogin = function() {
            UserApi.twitterLogin($scope);
        };



        $scope.renewAccount = function() {
            // mandar um POST pra user/delete/ passando o email do usuário e o app_token via header.

            var params = $rootScope.userEmail;

            if (params) {
                UserApi.deActivateUser(params, function(data) {
                    if (data.status == 200) {
                        Notification.show('success', 'Reativar Conta', 'Conta reativada com sucesso!');
                        angular.element('#modal-conta-reativada').modal('toggle');
                    } else {
                        Notification.show('error', 'Reativar conta', 'Tente novamente em alguns instantes.');
                    }
                });
            } else {
                Notification.show('info', 'Reativar Conta', 'Tente novamente em alguns instantes.');
            }
        };



    }]);
