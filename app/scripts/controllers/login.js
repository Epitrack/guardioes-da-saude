'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginCtrl', ['$scope', 'UserApi', '$location', 'LocalStorage', 'Notification', function ($scope, UserApi, $location, LocalStorage, Notification) {


    $scope.facebookLogin = function () {
      UserApi.facebookLogin($scope);
    };

    $scope.googleLogin = function () {
      UserApi.googleLogin($scope);
    };

    $scope.twitterLogin = function () {
      UserApi.twitterLogin($scope);
    };

  }]);
