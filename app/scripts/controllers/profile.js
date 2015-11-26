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

    // set user with $rootScope data
    $scope.getUser = function() {
      var u = $rootScope.user;

      $scope.screen = {};

      $scope.screen.user = {
        nick: u.nick,
        dob: moment(u.dob).format('YYYY-DD-MM'), // change date format
        gender: u.gender,
        email: u.email,
        race: u.race,
        password: ""
      };
    };

    $scope.editProfile = function() {
      if($scope.screen.user.password == "" || $scope.screen.user.password != $scope.screen.repeatPassword) {
        delete $scope.screen.user.password;
      }

      UserApi.updateProfile($scope.screen.user, function(data) {
        console.log('editProfile: ', data);
        if (data.data.error === true) {
          toaster.pop('error', data.data.message);
        } else {
          toaster.pop('success', data.data.message);
        }

        $scope.getUser();
      });
    };

    $scope.openDatePicker = function(){
      $('.birthdate').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd"
      });
    };

    $scope.openForDataPicker = function() {
      $('.birthdate').focus();
    };

    $scope.getUser();
    $scope.openDatePicker();
  }]);
