'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChangePhotoCtrl
 * @description
 * # ChangePhotoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChangePhotoCtrl', ['$scope', 'Upload', '$timeout', 'UserApi', 'LocalStorage', 'ApiConfig', function ($scope, Upload, $timeout, UserApi, LocalStorage, ApiConfig) {

    $scope.uploadPic = function(file) {
      // console.log('file -> ', file);
      // console.log('file.$ngfDataUrl -> ', file.$ngfDataUrl);

      // $scope.uploadFile = file;

      // UserApi.changePhoto($scope.uploadFile, function(data) {
      //   return console.log(data);
      // });

	    file.upload = Upload.upload({
	      url: 'http://52.20.162.21/user/upload-photo',
        headers : {
          'user_token': LocalStorage.getItem('userStorage').user_token,
          'app_token': ApiConfig.APP_TOKEN,
        },
	      data: { uploadFile: file }
	    });

	    file.upload.then(function (response) {
	    	console.log('Response 01 -> ', response);
	      $timeout(function () {
          console.log('Response 02 -> ', response);
          // file.result = response.data;
	      	// console.log('file.result -> ', file.result);
	      });
	    }, function (response) {
	      if (response.status > 0)
	        $scope.errorMsg = response.status + ': ' + response.data;
	    }, function (evt) {
	      // Math.min is to fix IE which reports 200% sometimes
	      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
    };

	}]);
