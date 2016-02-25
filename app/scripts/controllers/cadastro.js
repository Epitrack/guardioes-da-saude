'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('CadastroCtrl', ['$scope', 'UserApi', 'toaster', '$location', 'LocalStorage', '$facebook', function ($scope, UserApi, toaster, $location, LocalStorage, $facebook) {
    // $scope.pageClass = 'login-page';

    $scope.userData = {};
    $scope.userData.gender = "M";


    $scope.facebookLogin = function () {
        UserApi.facebookLogin($scope, toaster);
    };

    $scope.googleLogin = function () {
      UserApi.googleLogin($scope, toaster);
    };

    $scope.twitterLogin = function () {
      UserApi.twitterLogin($scope, toaster);
    };

    $scope.updateUserSocialData = function () {
//      var params = $scope.userData;
      var params = {
        dob: $scope.userData.dob,
        email: $scope.userData.email,
        gender: $scope.userData.gender,
        nick: $scope.userData.nick,
        password: $scope.userData.password,
        race: $scope.userData.race,
        picture: $scope.UTIL.checkAvatar($scope.userData)
      };

      if($scope.userData.fb) params.fb = $scope.userData.fb;
      if($scope.userData.tw) params.tw = $scope.userData.tw;
      if($scope.userData.gl) params.gl = $scope.userData.gl;

      var dob = params.dob.toString();
      dob = $scope.UTIL.unConvertDate(dob);
      var age = $scope.UTIL.getAge(dob);

      $scope.invalid = '';
      $scope.invalidBirth = '';


      if (LocalStorage.getItem('dobValid') !== true) { $scope.invalid = true; return; }

      params.dob = dob;

      if(params.password===undefined){params.password = params.email;}

      $('#modal-complete-login').modal('hide');

      UserApi.createUser(params, function (data) {
        if (data.data.error === false) {
          toaster.pop('success', data.data.message);
          LocalStorage.userCreateData(data.data.user);
          $location.path('health-daily');
        } else {
          toaster.pop('error', data.data.message);
          console.warn(data.data.message);
        }
      });
    };
  }]);
