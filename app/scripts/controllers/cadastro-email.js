'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('CadastroEmailCtrl', ['$scope', 'UserApi', '$location', 'LocalStorage', 'Notification', function ($scope, UserApi, $location, LocalStorage, Notification) {

    // set page class to animations
    $scope.pageClass = 'cadastro-page';
    // ====

    $scope.facebookLogin = function () {
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

    $scope.twitterLogin = function () {
      UserApi.twitterLogin($scope);
    };

    // create new user
    $scope.createData = {};

    $scope.createUser = function () {
      var params = {
          nick: $scope.createData.nick,
          email: $scope.createData.email,
          dob: $scope.createData.dob,
          race: $scope.createData.race,
          gender: $scope.createData.gender,
          password: $scope.createData.password,
          repeat_password: $scope.createData.repeat_password,
      };

      $scope.checkF = $scope.UTIL.checkForm(params, true);
      if($scope.checkF.error===true){return;}

      params.dob = $scope.UTIL.convertDate(params.dob);
      params.picture = $scope.UTIL.checkAvatar($scope.createData);

      UserApi.createUser(params, function (data) {
        var userId = data.data.user.id;

        if (data.data.error === true) {
            Notification.show('error', 'Cadastro por e-mail', data.data.message);
        } else {
            Notification.show('success', 'Cadastro por e-mail', data.data.message);
            $location.path('/survey/' + userId +'/step-1');
        }
      });
    };
    // ====

    // create user using social network
    $scope.updateUserSocialData = function () {
      angular.element('#modal-complete-login').modal('hide');
     // console.warn("======== passando aqui", $scope.userData)
      UserApi.createUser($scope.userData, function (data) {
        if (data.data.error === false) {
          Notification.show('success', 'Cadastro', data.data.message);
          LocalStorage.userCreateData(data.data.user);
          $location.path('health-daily');
        } else {
          Notification.show('error', 'Cadastro', data.data.message);
          // console.warn(data.data.message);
        }
      });
    };
    // ====
  }]);
