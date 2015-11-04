'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginEmailCtrl
 * @description
 * # LoginEmailCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('LoginEmailCtrl', ['$scope', 'UserApi', function ($scope, UserApi) {
    $scope.pageClass = 'login-email-page';

    // login with email
    $scope.loginEmail = {};

    $scope.loginUserEmail = function() {
      UserApi.loginUser($scope.loginEmail);
    };
    // ====

  }]);
