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
      // return console.warn('$rootScope.user -> ', $rootScope.user);

      UserApi.updateUser(u.id, function(data){
        if (data.data.error == false) {
          u = data.data.data[0];

          $scope.screen = {};

          $scope.screen.user = {
            nick: u.nick,
            dob: _convertDate(u.dob, 'DD-MM-YYYY'),
            gender: u.gender,
            email: u.email,
            race: u.race,
            password: ""
          };

          console.warn($scope.screen.user); // formato dob ok
        } else {
          toaster.pop('error', data.data.message);
        }
      });
    };

    $scope.editProfile = function() {
      // create a object to manipulate date and send to api
      var params = {
        nick: $scope.screen.user.nick,
        dob: _unConvertDate($scope.screen.user.dob, 'YYYY-MM-DD'),
        gender: $scope.screen.user.gender,
        email: $scope.screen.user.email,
        race: $scope.screen.user.race
      };
      // ====

      // verify if user changes password
      if ($scope.screen.user.password == "" || $scope.screen.user.password != $scope.screen.repeatPassword) {
        delete $scope.screen.user.password;
      } else {
        params.password = $scope.screen.user.password;
      }
      // ====

      // ====
      UserApi.updateProfile(params, function(data) {
        if (data.data.error == false) {
          toaster.pop('success', data.data.message);
        } else {
          toaster.pop('error', data.data.message);
        }

        $scope.screen = false;
        $scope.getUser();
      });
      // ====
    };

    var _convertDate = function(date, dateFormat) {
      return moment(date.substr(0,10)).utc().format(dateFormat)
    };

    var _unConvertDate = function(date) {
      var newDob = date.split('-');

      return newDob[2] + '-' + newDob[1] + '-' + newDob[0];
    };

    $scope.getUser();
  }]);
