'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('MainCtrl', ['$scope', 'LocalStorage', function ($scope, LocalStorage) {
    $scope.pageClass = 'main-page';

    // set user with locaStorage data
    $scope.user = LocalStorage.getItem('userStorage');

    if (LocalStorage.getItem('userStorage') != null) {
      $scope.household = $scope.user.household;
    }

    $scope.clearStorage = function() {
      localStorage.clear();
    };

  }]);
