'use strict';

/**
 * @ngdoc directive
 * @name gdsApp.directive:analytics
 * @description
 * # analytics
 */
angular.module('gdsApp').directive('analytics', function (helper) {
    return {
      restrict: 'A',
      link: function(scope, iElement, iAttrs) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        var id;

        scope.$watch(
          function() {
            ga('send', 'pageview');
            return id;
          },

          function(newId, oldId) {
            if (newId) {
              // console.log('watch is calling function');
              ga('create', newId, 'auto');
              // ga('create', newId, { 'cookieDomain': 'none' });
            }
          }
        );

        helper.getId().then(function(response) {
          id = response;

          // console.log('id set to ' +response);
        });
      }
    };
  });
