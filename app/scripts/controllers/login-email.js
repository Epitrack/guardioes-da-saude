'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginEmailCtrl
 * @description
 * # LoginEmailCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginEmailCtrl', ['$scope', 'UserApi', 'toaster', '$location', '$rootScope', 'LocalStorage', function ($scope, UserApi, toaster, $location, $rootScope, LocalStorage) {

    $scope.pageClass = 'login-email-page';

    // login with email
    $scope.loginEmail = {};

    $scope.loginUserEmail = function() {
      UserApi.loginUser($scope.loginEmail, function(data) {
        if (data.data.error === true) {
          $scope.loginError = 'Email ou usuário inválidos.';
        } else {
          toaster.pop('success', data.data.message);
          $rootScope.user = data.data.user;
          LocalStorage.userLogin(data.data.user, data.data.token);
          $location.path('/health-daily');
        }
      });
    };
    // ====

  }]);
