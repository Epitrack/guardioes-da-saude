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
      auth.$authWithOAuthPopup('twitter').then(function (authData) {
        console.log('Twitter authentication success:', authData);

        var userTwData = {};

        userTwData.oauth_token = authData.twitter.accessToken;
        userTwData.oauth_token_secret = authData.twitter.accessTokenSecret;
        userTwData.nick = authData.twitter.displayName;
        userTwData.tw = authData.twitter.id;

        $scope.userData = userTwData;

        UserApi.twLogin(userTwData, function (data) {
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
        console.log('Twitter authentication failed:', error);
      });
    };

    $scope.updateUserSocialData = function () {
      var params = $scope.userData;
      params.dob = $scope.UTIL.unConvertDate($scope.userData.dob);

      var age = $scope.UTIL.getAge(params.dob);

      $scope.invalid = '';

      if (LocalStorage.getItem('dobValid') !== true) {
        return $scope.invalid = true;
      }

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
