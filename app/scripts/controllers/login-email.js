'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginEmailCtrl
 * @description
 * # LoginEmailCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginEmailCtrl', ['$scope', 'UserApi', '$location', '$rootScope', 'LocalStorage', 'Notification', function ($scope, UserApi, $location, $rootScope, LocalStorage, Notification) {

    $scope.pageClass = 'login-email-page';

    // login with email
    $scope.loginEmail = {};

    $scope.loginUserEmail = function () {
       // console.log("$scope.loginEmail", $scope.loginEmail)

      UserApi.loginUser($scope.loginEmail, function (data) {
        if (data.data.error === true) {
          $scope.loginError = 'Email ou usuário inválidos.';
        } else {
          // toaster.pop('success', data.data.message);
          $rootScope.user = data.data.user;
          Notification.show('success', 'Login', data.data.message);

          LocalStorage.userLogin(data.data.user, data.data.token);
          $location.path('/health-daily');
        }
      });
    };
    // ====

  }]);
