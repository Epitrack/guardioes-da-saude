'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChangePhotoCtrl
 * @description
 * # ChangePhotoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChangePhotoCtrl', ['$scope', 'Upload', '$timeout', 'UserApi', 'LocalStorage', 'ApiConfig', '$rootScope', function ($scope, Upload, $timeout, UserApi, LocalStorage, ApiConfig, $rootScope) {

    $scope.screen = {};

    $scope.uploadPic = function(file) {
      return console.warn(file);

      UserApi.changePhoto(file, function(data) {
        console.log(data);
      });
    };

	}]);
