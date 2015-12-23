'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChangePhotoCtrl
 * @description
 * # ChangePhotoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChangePhotoCtrl', ['$scope', 'UserApi', 'LocalStorage', '$rootScope', 'toaster', '$location', '$timeout', function ($scope, UserApi, LocalStorage, $rootScope, toaster, $location, $timeout) {

    $scope.avatar = {};

    $scope.uploadPic = function() {
      UserApi.changeAvatar($scope.avatar, function(data) {
        if (data.data.error == false){
          console.log(data.data.message);
          toaster.pop('success', data.data.message, null);

          $timeout(function(){
            $location.path('/profile');
          },
          400);
        } else {
          console.log(data.data.message);
          toaster.pop('error', data.data.message);
        }
      });
    };

    $scope.chooseDefaultAvatar = function() {
    	$('label.radio-avatar').on('click', function(){
			  var clickedAvatar = $(this).find('i').css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');

			  $('.avatar-image').attr('src', clickedAvatar);
			});
    };

    $scope.chooseDefaultAvatar();
	}]);
