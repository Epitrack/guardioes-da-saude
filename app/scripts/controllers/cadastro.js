'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('CadastroCtrl', function ($scope, UserApi, $location, LocalStorage, $facebook, Notification) {
    // $scope.pageClass = 'login-page';

    $scope.userData = {};
    $scope.userData.gender = "M";


    $scope.facebookLogin = function () {
      UserApi.facebookLogin($scope);
    };

    $scope.googleLogin = function () {
      UserApi.googleLogin($scope);
    };

    $scope.twitterLogin = function () {
      UserApi.twitterLogin($scope);
    };

    $scope.updateUserSocialData = function () {
      var params = {
            nick: $scope.userData.nick,
            gender: $scope.userData.gender,
            dob: $scope.userData.dob,
            race: $scope.userData.race,
            email: $scope.userData.email,
      };


      $scope.checkF = $scope.UTIL.checkForm(params, true);
      if($scope.checkF.error===true){ return; }

      params.picture = $scope.UTIL.checkAvatar($scope.userData);
      params.password = $scope.userData.password;


      if($scope.userData.fb !== undefined) { params.fb = $scope.userData.fb; }
      if($scope.userData.tw !== undefined) { params.tw = $scope.userData.tw; }
      if($scope.userData.gl !== undefined) { params.gl = $scope.userData.gl; }


      if(params.password===undefined){params.password = params.email;}

      params.dob = $scope.UTIL.convertDate(params.dob);

      angular.element('#modal-complete-login').modal('hide');

      UserApi.createUser(params, function (data) {
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
  });
