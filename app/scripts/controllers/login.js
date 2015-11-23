'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginCtrl', ['$scope', '$firebaseAuth', 'UserApi', function ($scope, $firebaseAuth, UserApi) {
    $scope.pageClass = 'login-page';

    var href = new Firebase('https://popping-heat-8884.firebaseio.com');
    var auth = $firebaseAuth(href);

    $scope.facebookLogin = function() {
      auth.$authWithOAuthPopup('facebook').then(function(authData) {
        console.log('Facebook authentication success:', authData);
        // $scope.fb_token = authData.facebook.accessToken;
        // console.warn($scope.fb_token);

        // UserApi.fbLogin($scope.fb_token, function(data) {
        //   console.warn(data);
        // })
      }).catch(function(error) {
        // $scope.errorFacebook = error;
        console.log('Facebook authentication failed:', error);
      });
    };

    $scope.googleLogin = function() {
      auth.$authWithOAuthPopup('google').then(function(authData) {
        console.log('Google authentication success:', authData);
        // $scope.fb_token = authData.facebook.accessToken;
        // console.warn($scope.fb_token);

        // UserApi.fbLogin($scope.fb_token, function(data) {
        //   console.warn(data);
        // })
      }).catch(function(error) {
        // $scope.errorFacebook = error;
        console.log('Google authentication failed:', error);
      });
    };

    $scope.twitterLogin = function() {
      auth.$authWithOAuthPopup('twitter').then(function(authData) {
        console.log('Twitter authentication success:', authData);
        // $scope.fb_token = authData.facebook.accessToken;
        // console.warn($scope.fb_token);

        // UserApi.fbLogin($scope.fb_token, function(data) {
        //   console.warn(data);
        // })
      }).catch(function(error) {
        // $scope.errorFacebook = error;
        console.log('Twitter authentication failed:', error);
      });
    };
  }]);
