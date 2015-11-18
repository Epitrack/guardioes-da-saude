'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('FaleConoscoCtrl', ['$scope', function ($scope) {

    $scope.contact = {};

    $scope.sendContact = function() {
      console.log($scope.contact);
    };

    $scope.esterEgg = function() {
      cheet('e p i t r a c k', function () {
        $('#modal-kc').modal({
          show: 'true'
        });
      });
    };

    $scope.esterEgg();

  }]);
