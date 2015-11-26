'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('CadastroCtrl', ['$scope', 'UserApi', 'toaster', '$location', 'LocalStorage', function ($scope, UserApi, toaster, $location, LocalStorage) {

    // set page class to animations
    $scope.pageClass = 'cadastro-page';
    // ====

    // create new user
    $scope.createData = {};

    $scope.createUser = function() {
      UserApi.createUser($scope.createData, function(data) {
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
          $location.path('/health-daily');
        }
      });
    };
    // ====

  }]);
