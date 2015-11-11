'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginEmailCtrl
 * @description
 * # LoginEmailCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginEmailCtrl', ['$scope', 'UserApi', 'toaster', '$location', 'LocalStorage', '$rootScope', function ($scope, UserApi, toaster, $location, LocalStorage, $rootScope) {

    $scope.pageClass = 'login-email-page';

    var userStorage = LocalStorage.getItem('userStorage');

    // login with email
    $scope.loginEmail = {};

    $scope.loginUserEmail = function() {
      UserApi.loginUser($scope.loginEmail, function(data) {
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
          $rootScope.user = data;
          $location.path('/health-daily');
        }
      });
    };
    // ====

  }]);
