'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:EsqueceuSenhaCtrl
 * @description
 * # EsqueceuSenhaCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('EsqueceuSenhaCtrl', ['$scope', 'UserApi', 'Notification', function ($scope, UserApi, Notification) {

    $scope.forgotPass = {};

    $scope.resetPass = function () {
      UserApi.forgotPassword($scope.forgotPass, function (data) {
        if (data.data.error === false) {
          $scope.message = data.data.message;
          Notification.show('success', 'Resetar senha', data.data.message);
        } else {
          $scope.messageError = data.data.message;
        }
      });
    };

  }]);
