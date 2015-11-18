'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('SurveyCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.pageClass = 'survey-page';

    $scope.getUser = function() {
      var u = $rootScope.user;

      $scope.screen = {};

      $scope.screen.user = u;
    }

    $scope.getUser();

  }]);
