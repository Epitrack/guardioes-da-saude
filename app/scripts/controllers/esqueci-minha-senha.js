'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:EsqueciMinhaSenhaCtrl
 * @description
 * # EsqueciMinhaSenhaCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('EsqueciMinhaSenhaCtrl', ['$scope', 'UserApi', 'toaster', '$location', '$timeout', function ($scope, UserApi, toaster, $location, $timeout) {

    $scope.screen = {};

    $scope.checkHash = function() {
      console.log($scope.screen.user);
      var hash = $location.url().split('/')[1].replace('esqueci-minha-senha?hash=', '');
      // var hash = $location.url().split('/')[1].replace('esqueci-minha-senha?hash=', '').replace('%2F', '/');

      var params = {
        password: $scope.screen.user.password,
        hash: decodeURIComponent(hash)
      };

      UserApi.validateHash(params.hash, function(data) {
        if (data.data.error == false) {
          params.id = data.data.user_id;

          UserApi.updateUserPassword(params, function(data) {
            if (data.data.error == false) {
              toaster.pop('success', data.data.message)
              $timeout(function() {
                $location.path('login-email');
                $location.search('hash', null);
              }, 3000)
            } else {
              toaster.pop('error', data.data.message)
            }
          })
        } else {
          $scope.message = 'Esta url parece não ser válida, tente modificar sua senha novamente.';
          console.warn('error', data.data.message);
        }2
      });
    };

  }]);
