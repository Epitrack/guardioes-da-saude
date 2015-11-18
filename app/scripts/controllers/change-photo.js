'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChangePhotoCtrl
 * @description
 * # ChangePhotoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChangePhotoCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {

    $scope.uploadPic = function(file) {
	    file.upload = Upload.upload({
	      url: 'http://posttestserver.com/post.php',
	      data: {file: file},
	    });

	    file.upload.then(function (response) {
	    	console.log(response);
	      $timeout(function () {
	      	console.log(response);
	        file.result = response.data;
	      });
	    }, function (response) {

	      if (response.status > 0)
	        $scope.errorMsg = response.status + ': ' + response.data;
	    }, function (evt) {
	      // Math.min is to fix IE which reports 200% sometimes
	      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
    }

	}]);
