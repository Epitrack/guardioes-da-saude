'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HelpCtrl', ['$scope', 'Upload', function ($scope, Upload) {
    $scope.pageClass = 'help-page';

    $scope.produto = {};

    $scope.uploadImage = function() {
      if ($scope.produto.image !== undefined) {
//        console.log('Existe imagem');
        $scope.uploadFile();
      } else {
        console.log($scope.produto.image);
      }
    };

    $scope.uploadFile = function() {
      var file = $scope.produto.image;

      Upload.send(file, function(data) {
        console.log(data);
      });
    };


  }]);
