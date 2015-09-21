'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.openSubnav01 = function() {
      $scope.healthDaily.active = !$scope.healthDaily.active;
    };

  }]);
