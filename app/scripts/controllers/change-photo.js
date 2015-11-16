'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChangePhotoCtrl
 * @description
 * # ChangePhotoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChangePhotoCtrl', ['$scope', '$rootScope', 'LocalStorage', function ($scope, $rootScope, LocalStorage) {

    // set user picture with $rootScope data
    $scope.getUserPicture = function() {
      var u = $rootScope.user;

      $scope.screen = {};

      $scope.screen.user = {
        picture: u.picture,
        id: u.id
      };

      if ($scope.screen.user.picture == undefined) {
        $scope.screen.user.picture = 'default';
      } else {
        $scope.screen.user.picture = u.picture;
      }

      LocalStorage.updateAvatar($scope.screen.user);
    };

    $scope.chooseAvatar = function(pictureId) {
      var userStorage = LocalStorage.getItem('userStorage');

      console.log($scope.screen.user, pictureId);
      console.log(userStorage);
    };

    // $scope.getUserPicture();

  }]);
