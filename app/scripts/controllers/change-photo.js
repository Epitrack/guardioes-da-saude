'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChangePhotoCtrl
 * @description
 * # ChangePhotoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChangePhotoCtrl', ['$scope', 'UserApi', 'LocalStorage', '$rootScope', '$location', '$timeout', '$filter', '$routeParams', 'HouseholdApi', 'Notification', 
    function ($scope, UserApi, LocalStorage, $rootScope, $location, $timeout, $filter, $routeParams, HouseholdApi, Notification) {

    $scope.avatar = {};
    $scope.vm = {};
    var userStorage = $rootScope.user;

    //TODO REAPROVEITAR ESSES DOIS METODOS NO CODIGO TODO ATRAVES DE SERVICOS

    $scope.getHousehold = function (household_id) {
      HouseholdApi.getHousehold(userStorage.id, function (data) {
        var householdData = $filter('filter')(data.data.data, {
          id: household_id
        })[0];
        $scope.vm.household = _buildObj(householdData);
        $scope.vm.profile = $scope.vm.household;
        $scope.setCurrentThumbnail();
      });
    };

    $scope.getUser = function (user_id) {
      UserApi.updateUser(user_id, function (data) {
        if (data.data.error === false) {
          var u = data.data.data[0];
          $scope.vm.user = {
            nick: u.nick,
            dob: $scope.UTIL.convertDate(u.dob, 'DD-MM-YYYY'),
            gender: u.gender,
            email: u.email,
            race: u.race,
            picture: u.picture,
            password: ""
          };
          $scope.vm.profile = $scope.vm.user;
          $scope.setCurrentThumbnail();
        } else {
          Notification.show('error', 'Atualizar imagem', data.data.message);
        }
      });
    };

    $scope.setCurrentThumbnail = function() {
      $scope.vm.tog = 'avatar-' + $scope.vm.profile.picture;

      var element = '.avatar-' + $scope.vm.profile.picture;

      $(element).addClass('photo-selected');
    };

    $scope.uploadPic = function () {
      // return console.warn($scope.avatar);

      if($scope.vm.context === 'user') {
        UserApi.changeAvatar($scope.avatar, function (data) {
          if (data.data.error === false) {
            // console.log(data.data.message);
            Notification.show('success', 'Atualizar imagem', data.data.message);
            $timeout(function () {
                $location.path('/profile');
              },
              400);
          } else {
            // console.log(data.data.message);
            Notification.show('error', 'Atualizar imagem', data.data.message);
          }
        });
      } else {
        HouseholdApi.changeAvatar($scope.vm.household.id, $scope.avatar.picture, function (data) {
          if (data.data.error === false) {
            // console.log(data.data.message);
            Notification.show('success', 'Atualizar imagem', data.data.message);

            $timeout(function () {
                $location.path('/profile/household/'+$scope.vm.household.id);
              },
              400);
          } else {
            // console.log(data.data.message);
            Notification.show('error', 'Atualizar imagem', data.data.message);
          }
        });
      }
    };

    $scope.chooseDefaultAvatar = function () {
      angular.element('label.radio-avatar').on('click', function () {
        var clickedAvatar = angular.element(this).find('i').css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');

        angular.element('.avatar-image').attr('src', clickedAvatar);
      });
    };

    var _buildObj = function (obj) {
      return {
        nick: obj.nick,
        dob: $scope.UTIL.unConvertDate(obj.dob),
        gender: obj.gender,
        email: obj.email,
        race: obj.race,
        id: obj.id,
        password: "",
        picture: obj.picture
      };
    };

    $scope.chooseDefaultAvatar();

    if($location.url().indexOf("household") > 0) {
      // console.log("get from household");
      $scope.getHousehold($routeParams.household_id);
      $scope.vm.context = 'household';
    } else {
     // console.log("get from user");
      $scope.getUser($routeParams.user_id);
      $scope.vm.context = 'user';
    }

    // ====
    $scope.changeAvatar = function(event) {
      $('.radio-avatar').removeClass('photo-selected');
      $(event.currentTarget).addClass('photo-selected');
    };

    $scope.myOtherNumber = 16;

    $scope.getNumber = function(num) {
        return new Array(num);
    }
    // ====
  }]);
