'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginCtrl', ['$scope', 'UserApi', '$location', 'LocalStorage', 'Notification', '$rootScope', function ($scope, UserApi, $location, LocalStorage, Notification, $rootScope) {


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

        var params = $rootScope.userEmail;

        if (params) {
          UserApi.deActivateUser(params, function (data) {
            if (data.status == 200) {
              Notification.show('success', 'Reativar Conta', 'Conta reativada com sucesso!');
              angular.element('#modal-conta-reativada').modal('toggle');
            } else {
              Notification.show('error', 'Reativar conta', 'Tente novamente em alguns instantes.');
            }
          });
        } else {
          Notification.show('info', 'Reativar Conta', 'Tente novamente em alguns instantes.');
        }
    };

  }]);
