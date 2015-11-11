'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ProfileCtrl', ['$scope', 'LocalStorage', 'UserApi', '$rootScope', function ($scope, LocalStorage, UserApi, $rootScope) {
    $scope.pageClass = 'profile-page';

    // set user with locaStorage data
    $scope.user = LocalStorage.getItem('userStorage');

    $scope.editProfile = function() {
      console.log($scope.user); // add password to object
    };

  }]);
