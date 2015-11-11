'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('MainCtrl', ['$scope', 'LocalStorage', '$route', function ($scope, LocalStorage, $route) {
    $scope.pageClass = 'main-page';

    console.log($route);

    // set user with locaStorage data
    $scope.user = LocalStorage.getItem('userStorage');

    if ($scope.user != null) {
      $scope.household = $scope.user.household;
    }
    // ====

    // when user click in logout button
    $scope.clearStorage = function() {
      localStorage.removeItem('userStorage');
      localStorage.removeItem('userStorageUpdate');
    };
    // ====

  }]);
