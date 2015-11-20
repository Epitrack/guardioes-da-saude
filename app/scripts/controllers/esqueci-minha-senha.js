'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:EsqueciMinhaSenhaCtrl
 * @description
 * # EsqueciMinhaSenhaCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('EsqueciMinhaSenhaCtrl', ['$scope', 'UserApi', 'toaster', '$location', function ($scope, UserApi, toaster, $location) {

    $scope.screen = {};

    $scope.checkHash = function() {
      console.log($scope.screen.user);

      var params = {
        password: $scope.screen.user.password,
        hash: $location.url().split('/')[2]
      };

      UserApi.validateHash(params.hash, function(data) {
        if (data.data.error == false) {
          $scope.message = data.data.message;
          console.log('success', data.data.message);
        } else {
          $scope.message = 'Esta url parece não ser válida, tente modificar sua senha novamente.';
          console.log('error', data.data.message);
        }2
      });
    };

  }]);
