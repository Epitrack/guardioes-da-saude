'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginCtrl', ['$scope', '$firebaseAuth', 'UserApi', 'toaster', '$location', 'LocalStorage', '$facebook', function ($scope, $firebaseAuth, UserApi, toaster, $location, LocalStorage, $facebook) {
    $scope.pageClass = 'login-page';

    var href = new Firebase('https://popping-heat-8884.firebaseio.com');
    var auth = $firebaseAuth(href);

    $scope.facebookLogin = function () {
        var userFbData = {}
        UserApi.facebookLogin(userFbData, $scope, toaster);
    };

    $scope.googleLogin = function () {
      auth.$authWithOAuthPopup('google').then(function (authData) {
        console.log('Google authentication success:', authData);

        var userGlData = {};

        userGlData.access_token = authData.google.accessToken;
        userGlData.nick = authData.google.displayName;
        userGlData.gl = authData.google.id;

        $scope.userData = userGlData;

        // return console.warn($scope.userData);

        UserApi.glLogin(userGlData, function (data) {
          if (data.data.error === false) {
            console.log(data.data.message);
            LocalStorage.userLogin(data.data.user, data.data.token);
            $location.path('health-daily');
          } else {
            console.log(data.data.message);
            $('#modal-complete-login').modal('show');
          }
        });
      }).catch(function (error) {
        toaster.pop('error', error);
        console.log('Google authentication failed:', error);
      });
    };

    $scope.twitterLogin = function () {
        UserApi.twitterLogin($scope, toaster);
    };

    $scope.invalid = '';
    $scope.invalidRace = '';
    $scope.updateUserSocialData = function () {

      var params = {
            dob: $scope.userData.dob,
            email: $scope.userData.email,
            gender: $scope.userData.gender,
            nick: $scope.userData.nick,
            password: $scope.userData.password,
            race: $scope.userData.race,
            picture: $scope.UTIL.checkAvatar($scope.userData)
      };


      if($scope.userData.fb !== undefined) params.fb = $scope.userData.fb;
      if($scope.userData.tw !== undefined) params.tw = $scope.userData.tw;

      var dob = params.dob;
      dob = $scope.UTIL.unConvertDate(dob);
      var age = $scope.UTIL.getAge(dob);

      if(params.password===undefined){params.password = params.email;}
      if(params.race ===undefined) { $scope.invalidRace = true; return; }
      else{$scope.invalidRace = false;}



      if (LocalStorage.getItem('dobValid') !== true) { $scope.invalid = true; return; }
      params.dob = dob;

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
