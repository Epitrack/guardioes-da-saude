'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:EsqueceuSenhaCtrl
 * @description
 * # EsqueceuSenhaCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('EsqueceuSenhaCtrl', ['$scope', 'UserApi', 'toaster', function ($scope, UserApi, toaster) {

    $scope.forgotPass = {};

    $scope.resetPass = function () {
      UserApi.forgotPassword($scope.forgotPass, function (data) {
        if (data.data.error === false) {
          $scope.message = data.data.message;
          toaster.pop('success', data.data.message);
        } else {
          $scope.messageError = data.data.message;
        }
      });
    };

  }]);
