'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginCtrl', ['$scope', '$firebaseAuth', 'UserApi', 'toaster', '$location', 'LocalStorage', function ($scope, $firebaseAuth, UserApi, toaster, $location, LocalStorage) {
    $scope.pageClass = 'login-page';

    var href = new Firebase('https://popping-heat-8884.firebaseio.com');
    var auth = $firebaseAuth(href);

    $scope.facebookLogin = function() {
      auth.$authWithOAuthPopup('facebook').then(function(authData) {
        console.log('Facebook authentication success:', authData);

        var userFbData = {};

        userFbData.fb_token = authData.facebook.accessToken;
        userFbData.nick = authData.facebook.displayName;
        // userFbData.picture = authData.facebook.profileImageURL;
        userFbData.fb = authData.facebook.id;

        if (authData.facebook.cachedUserProfile.gender == 'male') {
          userFbData.gender = 'M';
        } else {
          userFbData.gender = 'F';
        }

        $scope.userData = userFbData;

        UserApi.fbLogin(userFbData.fb_token, function(data) {
          console.log('Data -> ', data);
          if (data.data.error == false) {
            console.log(data.data.message);
            LocalStorage.userCreateData(data.data.user, data.data.token);
            $location.path('health-daily');
          } else {
            console.log(data.data.message);
            $('#modal-complete-login').modal('show');
          }
        })
      }).catch(function(error) {
        toaster.pop('error', error);
        console.log('Facebook authentication failed:', error);
      });
    };

    $scope.googleLogin = function() {
      auth.$authWithOAuthPopup('google').then(function(authData) {
        console.log('Google authentication success:', authData);

        var userGlData = {};

        userGlData.access_token = authData.google.accessToken;
        userGlData.nick = authData.google.displayName;
        // userGlData.picture = authData.google.profileImageURL;
        userGlData.gl = authData.google.id;

        $scope.userData = userGlData;

        UserApi.glLogin(userGlData, function(data) {
          if (data.data.error == false) {
            console.log(data.data.message);
            LocalStorage.userLogin(data.data.user, data.data.token);
            $location.path('health-daily');
          } else {
            console.log(data.data.message);
            $('#modal-complete-login').modal('show');
          }
        })
      }).catch(function(error) {
        toaster.pop('error', error);
        console.log('Google authentication failed:', error);
      });
    };

    $scope.twitterLogin = function() {
      auth.$authWithOAuthPopup('twitter').then(function(authData) {
        console.log('Twitter authentication success:', authData);

        var userTwData = {};

        userTwData.oauth_token = authData.twitter.accessToken;
        userTwData.oauth_token_secret = authData.twitter.accessTokenSecret;
        userTwData.nick = authData.twitter.displayName;
        // userTwData.picture = authData.twitter.profileImageURL;
        userTwData.tw = authData.twitter.id;

        $scope.userData = userTwData;

        UserApi.twLogin(userTwData, function(data) {
          if (data.data.error == false) {
            console.log(data.data.message);
            LocalStorage.userLogin(data.data.user, data.data.token);
            $location.path('health-daily');
          } else {
            console.log(data.data.message);
            $('#modal-complete-login').modal('show');
          }
        })
      }).catch(function(error) {
        toaster.pop('error', error);
        console.log('Facebook authentication failed:', error);
      });
    };

    $scope.updateUserSocialData = function() {
      if ($scope.invalidbirth) {
        console.log('invalid birthdate!');
        // $('.birthdate').val() = $scope.screen.user.dob; 
        return false;
      }

      $('#modal-complete-login').modal('hide');

      UserApi.createUser($scope.userData, function(data) {
        if (data.data.error == false) {
          toaster.pop('success', data.data.message);
          LocalStorage.userCreateData(data.data.user);
          $location.path('health-daily');
        } else {
          toaster.pop('error', data.data.message);
          console.warn(data.data.message);
        }
      });
    };

    $scope.checkValidDate = function()  {
      // console.log('dob in editProfile', $scope.screen.user.dob);

      $('.birthdate').on('change', function(){
        if ( $('.birthdate').val().indexOf('.') === -1 || $('.birthdate').val() == '' ) {
          console.log('invalid birthdate!');
          $scope.invalidbirth = true;

        } else {
          delete $scope.invalidbirth;
          console.log('valid birthdate', $scope.invalidbirth);
        }
      });
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'dd.MM.yyyy';

    $scope.status = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
      [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

    $scope.convertDate = function() {
      var convertedDate = moment($scope.screen.user.dob).tz("America/Sao_Paulo").utc().format('DD.MM.YYYY').replace(/-/g, ".");
      $scope.convertedBirthDate = convertedDate;
    }

    $scope.checkValidDate();
  }]);
