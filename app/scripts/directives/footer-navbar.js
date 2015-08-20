'use strict';

/**
 * @ngdoc directive
 * @name guardioesDaSaudeApp.directive:footer
 * @description
 * # footer
 */
angular.module('guardioesDaSaudeApp')
  .directive('footerNavbar', function () {
    return {
      templateUrl: 'directives/footer-navbar.html',
      restrict: 'E'
    //   ,link: function postLink(scope, element, attrs) {
    //     element.text('this is the footer directive');
    //   }
    };
  });
