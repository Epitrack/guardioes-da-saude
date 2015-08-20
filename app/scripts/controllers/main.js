'use strict';

/**
 * @ngdoc function
 * @name guardioesDaSaudeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the guardioesDaSaudeApp
 */
angular.module('guardioesDaSaudeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.screen = {
        showAbout: false
    };
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
