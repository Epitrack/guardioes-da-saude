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

    $scope.renewAccount = function() {
      // mandar um POST pra user/delete/ passando o email do usuário e o app_token via header.
      // var params = $scope.

      return console.log($scope);

      // UserApi.deActivateUser(params, function(data) {
      //   console.log('Retorno da API -> ', data);
      // });

    };

  }]);
