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

    $scope.openSubnav = function() {
      var myEl = angular.element(document.getElementById('profiles'));
          myEl.toggleClass('in');
    };

  }]);
