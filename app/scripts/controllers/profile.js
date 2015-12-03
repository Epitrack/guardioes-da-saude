'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ProfileCtrl', ['$scope', 'UserApi', '$rootScope', 'toaster', function ($scope, UserApi, $rootScope, toaster) {

    $scope.pageClass = 'profile-page';
    $scope.format = 'dd/MM/yyyy';
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    // set user with $rootScope data
    $scope.getUser = function() {
      var u = $rootScope.user;

      $scope.screen = {};

      $scope.screen.user = {
        nick: u.nick,
        dob: moment(u.dob).format('YYYY-MM-DD'), // change date format
        gender: u.gender,
        email: u.email,
        race: u.race,
        password: ""
      };

      return console.warn('$scope.screen.user in getUser ', $scope.screen.user);
    };

    $scope.editProfile = function() {
      $scope.screen.user.dob = moment($scope.dt).format('YYYY-MM-DD');
      
      // return console.warn('$scope.screen.user in editProfile', $scope.screen.user);

      if($scope.screen.user.password == "" || $scope.screen.user.password != $scope.screen.repeatPassword) {
        delete $scope.screen.user.password;
      }

      UserApi.updateProfile($scope.screen.user, function(data) {
        // return console.log('updateProfile in editProfile ', data);
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
        }

        $scope.getUser();
      });
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.convertDate = function() {
      var convertedDate = moment($scope.screen.user.dob).format('DD-MM-YYYY').replace(/-/g, "/");
      $scope.convertedBirthDate = convertedDate;
    }

    $scope.getUser();
  }]);
