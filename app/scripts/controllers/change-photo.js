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

    $scope.uploadPic = function() {

      UserApi.changeAvatar($scope.avatar, function(data) {

        if (data.error){
          console.error('deu ruim');
        
        } else {
          console.log('rolou');
        }
      
        // LocalStorage.updateAvatar(ApiConfig.API_URL + data.data.user[0].picture);

      });
    };

    $scope.chooseDefaultAvatar = function() {
    	$('label.radio-avatar').on('click', function(){
			  var clickedAvatar = $(this).find('i').css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
			  $('.avatar-image').attr('src', clickedAvatar);
			});
    }

	}]);
