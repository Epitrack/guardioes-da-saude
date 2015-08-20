'use strict';

/**
 * @ngdoc directive
 * @name guardioesDaSaudeApp.directive:headerNavbar
 * @description
 * # headerNavbar
 */
angular.module('guardioesDaSaudeApp')
  .directive('headerNavbar', function () {
    return {
      templateUrl: 'directives/header-navbar.html',
      restrict: 'E'
    //   ,link: function postLink(scope, element, attrs) {
    //     element.text('this is the headerNavbar directive');
    //   }
    };
  });
