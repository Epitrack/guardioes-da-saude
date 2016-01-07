'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:AddProfileCtrl
 * @description
 * # AddProfileCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('AddProfileCtrl', ['$scope', 'HouseholdApi', 'toaster', '$timeout', '$location', function ($scope, HouseholdApi, toaster, $timeout, $location) {
    $scope.pageClass = 'add-profile-page';

    // Add a new household member
    $scope.houseHold = {};

    $scope.addHousehold = function() {
      var params = {
        dob: _unConvertDate($scope.houseHold.dob),
        email: $scope.houseHold.email,
        gender: $scope.houseHold.gender,
        nick: $scope.houseHold.nick,
        race: $scope.houseHold.race,
        relationship: $scope.houseHold.relationship,
        picture: _checkAvatar($scope.houseHold)
      };

      // return console.warn(params);

      HouseholdApi.createHousehold(params, function(data) {
        if (data.data.error == true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);

          $timeout(function(){
            $location.path('/health-daily');
          },
          400);
        }
      });
    };
    // ====

    // add a new household member in survey page
    $scope.addHouseholdModal = function() {
      var params = {
        dob: _unConvertDate($scope.houseHold.dob),
        email: $scope.houseHold.email,
        gender: $scope.houseHold.gender,
        nick: $scope.houseHold.nick,
        race: $scope.houseHold.race,
        relationship: $scope.houseHold.relationship,
        picture: _checkAvatar($scope.houseHold)
      };

      // return console.warn(params);

      HouseholdApi.createHousehold(params, function(data) {
        if (data.data.error == true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);

          hideModal();
        }
      });
    };

    function hideModal() {
      $('#modal-add-profile').modal('toggle');
    };
    // ====


    // Utils
    var _unConvertDate = function(date) {
      var newDob = date.split('-');

      return newDob[2] + '-' + newDob[1] + '-' + newDob[0];
    };

    function _checkAvatar(obj) {
      // console.warn(obj);

      var gender = obj.gender;
      var race = obj.race;
      var age = _getAge(obj.dob);

      if (gender == 'M') {
        if (race == 'preto' || race == 'indigena' || race == 'pardo') {
          // $scope.houseHold.picture = 'avatar masculino preto';
          if (age <= 49) {
            return '4';
            // console.log('avatar masculino preto novinho');
          } else if (age >= 50) {
            return '11';
            // console.log('avatar masculino preto coroa');
          }
        } else if (race == 'branco'){
          // $scope.houseHold.picture = 'avatar masculino branco';
          if (age <= 49) {
            return '5';
            // console.log('avatar masculino branco novinho');
          } else if (age >= 50) {
            return '9';
            // console.log('avatar masculino branco coroa');
          }
        } else if(race == 'amarelo') {
          // $scope.houseHold.picture = 'avatar masculino amarelo';
          if (age <= 49) {
            return '14';
            // console.log('avatar masculino amarelo novinho');
          } else if (age >= 50) {
            return '';
            // console.log('avatar masculino amarelo coroa');
          }
        }
      } else {
        if (race == 'preto' || race == 'indigena' || race == 'pardo') {
          // $scope.houseHold.picture = 'avatar feminino preto';
          if (age <= 49) {
            return '1';
            // console.log('avatar feminino preto novinho');
          } else if (age >= 50) {
            return '12';
            // console.log('avatar feminino preto coroa');
          }
        } else if (race == 'branco'){
          // $scope.houseHold.picture = 'avatar feminino branco';
          if (age <= 49) {
            return '3';
            // console.log('avatar feminino branco novinho');
          } else if (age >= 50) {
            return '10';
            // console.log('avatar feminino branco coroa');
          }
        } else if(race == 'amarelo') {
          // $scope.houseHold.picture = 'avatar feminino amarelo';
          if (age <= 49) {
            return '13';
            // console.log('avatar feminino amarelo novinho');
          } else if (age >= 50) {
            return '';
            // console.log('avatar feminino amarelo coroa');
          }
        }
      }

      // console.warn($scope.houseHold);
    };

    function _getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
    // ====

  }]);
