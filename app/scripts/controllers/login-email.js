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
          $rootScope.user = data.data.user;
          Notification.show('success', 'Login', data.data.message);

          var local_login = localStorage.getItem('userLastLogin_GDS');

          if (!local_login) {
            LocalStorage.setLastLogin(data.data.user.lastLogin);
            LocalStorage.userLogin(data.data.user, data.data.token);
            $location.path('/survey');
          } else {
            var last_login = moment(new Date(local_login).getTime());
            var current_login = moment(new Date(data.data.user.lastLogin).getTime());

            if (current_login.diff(last_login, 'days') > 0) {
              $rootScope.$on('userStorage_isOk', function() {
                $location.path('/survey');
              })
            } else {
              LocalStorage.userLogin(data.data.user, data.data.token);
              $location.path('/health-daily');
            }

            LocalStorage.setLastLogin(data.data.user.lastLogin);
          }

        }
      });
    };
    // ====

  }]);
