'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('CadastroCtrl', ['$scope', 'UserApi', function ($scope, UserApi) {

    // set page class to animations
    $scope.pageClass = 'cadastro-page';
    // ====

    // create new user
    $scope.createData = {};

    $scope.createUser = function() {
      UserApi.createUser($scope.createData);
    };
    // ====

  }]);
