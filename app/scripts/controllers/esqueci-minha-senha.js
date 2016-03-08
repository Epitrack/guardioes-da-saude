'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:EsqueciMinhaSenhaCtrl
 * @description
 * # EsqueciMinhaSenhaCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('EsqueciMinhaSenhaCtrl', ['$scope', 'UserApi', '$location', '$timeout', 'Notification', function ($scope, UserApi, $location, $timeout, Notification) {

    $scope.screen = {};

    $scope.checkHash = function () {
      // console.log($scope.screen.user);
      var hash = $location.url().split('/')[1].replace('esqueci-minha-senha?hash=', '');
      // var hash = $location.url().split('/')[1].replace('esqueci-minha-senha?hash=', '').replace('%2F', '/');

      var params = {
        password: $scope.screen.user.password,
        hash: decodeURIComponent(hash)
      };

      UserApi.validateHash(params.hash, function (data) {
        if (data.data.error === false) {
          params.id = data.data.user_id;

          UserApi.updateUserPassword(params, function (data) {
            if (data.data.error === false) {
              Notification.show('success', 'Resetar senha', data.data.message);
              $timeout(function () {
                $location.path('login-email');
                $location.search('hash', null);
              }, 3000);
            } else {
              Notification.show('error', 'Resetar senha', data.data.message);
            }
          });
        } else {
          $scope.message = 'Esta url parece não ser válida, tente modificar sua senha novamente.';
          // console.warn('error', data.data.message);
        }
      });
    };

  }]);
