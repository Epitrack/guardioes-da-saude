'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('FaleConoscoCtrl', ['$scope', 'ContactApi', 'toaster', function ($scope, ContactApi, toaster) {

    $scope.contact = {};

    $scope.sendContact = function() {
      ContactApi.faleConosco($scope.contact, function(data) {
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
          $scope.contact = {};
        }
      });
    };

    $scope.esterEgg = function() {
      cheet('e p i t r a c k', function () {
        $('#modal-kc').modal({
          show: 'true'
        });
      });
    };

    $scope.esterEgg();

  }]);
