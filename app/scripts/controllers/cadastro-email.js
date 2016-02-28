'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('CadastroEmailCtrl', ['$scope', '$firebaseAuth', 'UserApi', 'toaster', '$location', 'LocalStorage', function ($scope, $firebaseAuth, UserApi, toaster, $location, LocalStorage) {

    var href = new Firebase('https://popping-heat-8884.firebaseio.com');
    var auth = $firebaseAuth(href);

    // set page class to animations
    $scope.pageClass = 'cadastro-page';
    // ====

    $scope.facebookLogin = function () {
      auth.$authWithOAuthPopup('facebook').then(function (authData) {
        console.log('Facebook authentication success:', authData);

        var userFbData = {};

        userFbData.fb_token = authData.facebook.accessToken;
        userFbData.nick = authData.facebook.displayName;
        // userFbData.picture = authData.facebook.profileImageURL;
        userFbData.fb = authData.facebook.id;

        if (authData.facebook.cachedUserProfile.gender === 'male') {
          userFbData.gender = 'M';
        } else {
          userFbData.gender = 'F';
        }

        $scope.userData = userFbData;

        UserApi.fbLogin(userFbData.fb_token, function (data) {
          console.log('Data -> ', data);
          if (data.data.error === false) {
            console.log(data.data.message);
            LocalStorage.userCreateData(data.data.user, data.data.token);
            $location.path('health-daily');
          } else {
            console.log(data.data.message);
            $('#modal-complete-login').modal('show');
          }
        });
      }).catch(function (error) {
        toaster.pop('error', error);
        console.log('Facebook authentication failed:', error);
      });
    };

    $scope.googleLogin = function () {
      auth.$authWithOAuthPopup('google').then(function (authData) {
        console.log('Google authentication success:', authData);

        var userGlData = {};

        userGlData.access_token = authData.google.accessToken;
        userGlData.nick = authData.google.displayName;
        // userGlData.picture = authData.google.profileImageURL;
        userGlData.gl = authData.google.id;

        $scope.userData = userGlData;

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
        console.log("authData.twitter ");
        console.log(authData.twitter);

        var userTwData = {};
        
        userTwData.oauth_token = authData.twitter.accessToken;
        userTwData.oauth_token_secret = authData.twitter.accessTokenSecret;
        userTwData.nick = authData.twitter.displayName;
        // userTwData.picture = authData.twitter.profileImageURL;
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
        console.log('Facebook authentication failed:', error);
      });
    };

    // create new user
    $scope.createData = {};

    $scope.createUser = function () {
    var params = {
        dob: $scope.createData.dob,
        email: $scope.createData.email,
        gender: $scope.createData.gender,
        nick: $scope.createData.nick,
        password: $scope.createData.password,
        race: $scope.createData.race
    };
//      localStorage.setItem('dobValid', true);
      var dob = params.dob.toString();
      dob = $scope.UTIL.unConvertDate(dob);
      var age = $scope.UTIL.getAge(dob);
      $scope.invalid = '';
      $scope.invalidBirth = '';
      

      if (LocalStorage.getItem('dobValid') !== true || age <= 0) {
          $scope.invalid = true;
          return;
      } 

      params.dob=dob;
        
      UserApi.createUser(params, function (data) {
        if (data.data.error === true) {
            toaster.pop('error', data.data.message);
        } else {
            toaster.pop('success', data.data.message);
            $location.path('/health-daily');
        }
      });
    };
    // ====

    // create user using social network
    $scope.updateUserSocialData = function () {
      $('#modal-complete-login').modal('hide');
//      console.warn("======== passando aqui", $scope.userData)
      UserApi.createUser($scope.userData, function (data) {
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
    // ====
  }]);
