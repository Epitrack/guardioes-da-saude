'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('SurveyCtrl', ['$scope', 'LocalStorage', function ($scope, LocalStorage) {
    $scope.pageClass = 'survey-page';

    var userStorage = LocalStorage.getItem('userStorage');

    $scope.user = userStorage;
    $scope.household = LocalStorage.getItem('userStorageUpdate').household;
  }]);
