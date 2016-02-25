'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('CadastroEmailCtrl', ['$scope', 'UserApi', 'toaster', '$location', 'LocalStorage', function ($scope, UserApi, toaster, $location, LocalStorage) {

    // set page class to animations
    $scope.pageClass = 'cadastro-page';
    // ====

    $scope.facebookLogin = function () {
      UserApi.facebookLogin($scope, toaster);
      return;
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
      UserApi.googleLogin($scope, toaster);
    };

    $scope.twitterLogin = function () {
      UserApi.twitterLogin($scope, toaster);
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
        race: $scope.createData.race,
        picture: $scope.UTIL.checkAvatar($scope.createData)
    };

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
