'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('FaleConoscoCtrl', ['$scope', 'ContactApi', 'Notification', function ($scope, ContactApi, Notification) {

    $scope.contact = {};

    $scope.sendContact = function () {
      ContactApi.faleConosco($scope.contact, function (data) {
        if (data.data.error === true) {
          Notification.show('error', 'Contato', data.data.message);
        } else {
          Notification.show('success', 'Contato', data.data.message);
          $scope.contact = {};
        }
      });
    };

    $scope.esterEgg = function () {
      cheet('e p i t r a c k', function () {
        angular.element('#modal-kc').modal({
          show: 'true'
        });
      });
    };

    // $scope.esterEgg();

  }]);
