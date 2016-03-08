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

    $scope.googleLogin = function () {
      UserApi.googleLogin($scope);
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
        if (data.data.error === true) {
            Notification.show('error', 'Cadastro por e-mail', data.data.message);
        } else {
            Notification.show('success', 'Cadastro por e-mail', data.data.message);
            $location.path('/health-daily');
        }
      });
    };
    // ====

    // create user using social network
    $scope.updateUserSocialData = function () {
      $('#modal-complete-login').modal('hide');
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
