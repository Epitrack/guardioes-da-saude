'use strict';

/**
 * @ngdoc directive
 * @name gdsApp.directive:uploadFile
 * @description
 * # uploadFile
 */
angular.module('gdsApp')
  .directive('uploadFile', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.uploadFile);
        var modelSetter = model.assign;

        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0])
          });
        });
      }
    };
  });
