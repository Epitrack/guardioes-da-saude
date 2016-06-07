'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('CadastroCtrl', function($scope, UserApi, $location, LocalStorage, $facebook, Notification) {
        // $scope.pageClass = 'login-page';

        $scope.userData = {};
        $scope.userData.gender = "M";


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

        $scope.updateUserSocialData = function() {
            var params = {
                nick: $scope.userData.nick,
                gender: $scope.userData.gender,
                dob: $scope.userData.dob,
                race: $scope.userData.race,
                email: $scope.userData.email,
            };

            console.log(params);
            $scope.checkF = $scope.UTIL.checkForm(params, true);
            if ($scope.checkF.error === true) {
                return; }

            params.picture = $scope.UTIL.checkAvatar($scope.userData);
            params.password = $scope.userData.password;


            if ($scope.userData.fb !== undefined) { params.fb = $scope.userData.fb; }
            if ($scope.userData.tw !== undefined) { params.tw = $scope.userData.tw; }
            if ($scope.userData.gl !== undefined) { params.gl = $scope.userData.gl; }


            if (params.password === undefined) { params.password = params.email; }

            params.dob = $scope.UTIL.convertDate(params.dob);

            angular.element('#modal-complete-login').modal('hide');

            UserApi.createUser(params, function(data) {
                if (data.data.error === false) {
                    Notification.show('success', 'Cadastro', data.data.message);
                    LocalStorage.userCreateData(data.data.user);
                    $location.path('survey');
                } else {
                    Notification.show('error', 'Cadastro', data.data.message);
                    // console.warn(data.data.message);
                }
            });
        };
    });
