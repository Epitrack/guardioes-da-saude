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
    $scope.getUser = function () {
      var u = $rootScope.user;
      // return console.warn('$rootScope.user -> ', $rootScope.user);

      UserApi.updateUser(u.id, function (data) {
        if (data.data.error === false) {
          u = data.data.data[0];

          $scope.screen = {};

          $scope.screen.user = {
            nick: u.nick,
            dob: $scope.UTIL.convertDate(u.dob, 'DD-MM-YYYY'),
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

    $scope.editProfile = function () {
      // create a object to manipulate date and send to api
      var params = {
        nick: $scope.screen.user.nick,
        dob: $scope.UTIL.unConvertDate($scope.screen.user.dob),
        gender: $scope.screen.user.gender,
        email: $scope.screen.user.email,
        race: $scope.screen.user.race
//          ,
//        password:''
      };
      // ====
      $scope.repeatPassFocus = false;
      $scope.repeatPassBlur = function () {
        if ($scope.screen.user.password === $scope.screen.repeatPassword) {
          $scope.repeatPassFocus = false;
        }
      };
      // verify if user changes password
      if ($scope.screen.user.password === undefined && $scope.screen.repeatPassword === undefined) {
        toaster.pop('error', "Sua senha precisa ter no mínimo 6 dígitos");
        return;
      }
      if ($scope.screen.user.password !== "" && ($scope.screen.user.password !== $scope.screen.repeatPassword)) {
        toaster.pop('error', "As senhas digitadas precisam ser iguais.");
        $scope.repeatPassFocus = true;
        return;
      }

      params.password = $scope.screen.user.password;
      delete $scope.screen.user.password;

//====== TODO this code should be removed
//      if ($scope.screen.user.password === "" || $scope.screen.user.password !== $scope.screen.repeatPassword) {
//          console.log("pass:"+$scope.screen.user.password+"    repeat:"+$scope.screen.repeatPassword)
//          delete $scope.screen.user.password;
//      } else {
//          console.log('entrou no else' )
//        params.password = $scope.screen.user.password;
//      }

//        return;
//====== TODO this code should be removed

      // ====

      // ====
      UserApi.updateProfile(params, function (data) {
        if (data.data.error === false) {
          toaster.pop('success', data.data.message);
        } else {
          toaster.pop('error', data.data.message);
        }

        $scope.screen = false;
        $scope.getUser();
      });
      // ====
    };

    $scope.getUser();
  }]);
