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
      UserApi.changePhoto(file, function(data) {
        $scope.progress = data;

        if (typeof(data) === 'number') {
          $scope.progress = data;
        } else {
          $scope.progress = null;

          LocalStorage.updateAvatar(ApiConfig.API_URL + data.data.user[0].picture);
        }

      });
    };

    $scope.chooseDefaultAvatar = function() {
    	$('label.radio-avatar').on('click', function(){
			  var clickedAvatar = $(this).find('i').css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
			  $('.input-file-trigger').css('background-image', 'url(' + clickedAvatar + ')');
			});
    }

    $scope.uploadPic();

	}]);
