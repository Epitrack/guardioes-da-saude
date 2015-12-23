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

    $scope.houseHold = {};

    function changeDateFormat(time) {
      var r = time.match(/^\s*([0-9]+)\s*-\s*([0-9]+)\s*-\s*([0-9]+)(.*)$/);
      return $scope.houseHold.dob = r[3]+"-"+r[2]+"-"+r[1]+r[4];
    };

    function checkAvatar(obj) {
      console.warn(obj);

      var gender = obj.gender;
      var race = obj.race;
      var age = getAge(obj.dob);

      if (gender == 'M') {
        if (race == 'preto' || race == 'indigena' || race == 'pardo') {
          // $scope.houseHold.picture = 'avatar masculino preto';
          if (age <= 49) {
            $scope.houseHold.picture = '4';
            // console.log('avatar masculino preto novinho');
          } else if (age >= 50) {
            $scope.houseHold.picture = '11';
            // console.log('avatar masculino preto coroa');
          }
        } else if (race == 'branco'){
          // $scope.houseHold.picture = 'avatar masculino branco';
          if (age <= 49) {
            $scope.houseHold.picture = '5';
            // console.log('avatar masculino branco novinho');
          } else if (age >= 50) {
            $scope.houseHold.picture = '9';
            // console.log('avatar masculino branco coroa');
          }
        } else if(race == 'amarelo') {
          // $scope.houseHold.picture = 'avatar masculino amarelo';
          if (age <= 49) {
            $scope.houseHold.picture = '14';
            // console.log('avatar masculino amarelo novinho');
          } else if (age >= 50) {
            $scope.houseHold.picture = '';
            // console.log('avatar masculino amarelo coroa');
          }
        }
      } else {
        if (race == 'preto' || race == 'indigena' || race == 'pardo') {
          // $scope.houseHold.picture = 'avatar feminino preto';
          if (age <= 49) {
            $scope.houseHold.picture = '1';
            // console.log('avatar feminino preto novinho');
          } else if (age >= 50) {
            $scope.houseHold.picture = '12';
            // console.log('avatar feminino preto coroa');
          }
        } else if (race == 'branco'){
          // $scope.houseHold.picture = 'avatar feminino branco';
          if (age <= 49) {
            $scope.houseHold.picture = '3';
            // console.log('avatar feminino branco novinho');
          } else if (age >= 50) {
            $scope.houseHold.picture = '10';
            // console.log('avatar feminino branco coroa');
          }
        } else if(race == 'amarelo') {
          // $scope.houseHold.picture = 'avatar feminino amarelo';
          if (age <= 49) {
            $scope.houseHold.picture = '13';
            // console.log('avatar feminino amarelo novinho');
          } else if (age >= 50) {
            $scope.houseHold.picture = '';
            // console.log('avatar feminino amarelo coroa');
          }
        }
      }

      console.warn($scope.houseHold);
    };

    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    $scope.addHousehold = function() {
      changeDateFormat($scope.houseHold.dob);
      checkAvatar($scope.houseHold);

      HouseholdApi.createHousehold($scope.houseHold, function(data) {
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

    // add household in survey page
    $scope.addHouseholdModal = function() {
      changeDateFormat($scope.houseHold.dob);
      checkAvatar($scope.houseHold);

      HouseholdApi.createHousehold($scope.houseHold, function(data) {
        if (data.data.error == true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);

          hideModal();
          // updateScope(data.data.member);
        }
      });
    };

    function hideModal() {
      $('#modal-add-profile').modal('toggle');
    };

    function updateScope(member) {
      $scope.$apply(function() {
        $scope.screen.user.household(member);
      });
    }

    $scope.checkValidDate = function()  {
      // console.log('dob in editProfile', $scope.screen.household.dob);

      $('.birthdate').on('change', function(){
        if ( $('.birthdate').val().indexOf('.') === -1 || $('.birthdate').val() == '' ) {
          console.log('invalid birthdate!');
          $scope.invalidbirth = true;

        } else {
          delete $scope.invalidbirth;
          console.log('valid birthdate', $scope.invalidbirth);
        }
      });
    };

    // $timeout(function() {
    //   $scope.convertDate = function() {
    //     console.log('testing', $scope.screen.household.dob);
    //     var convertedDate = moment($scope.screen.household.dob).tz("America/Sao_Paulo").utc().format('YYYY-MM-DD').replace(/-/g, ".");
    //     $scope.convertedBirthDate = convertedDate;
    //   }
    //   $scope.convertDate();
    // }, 1000);

    // $scope.disabled = function(date, mode) {
    //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };

    // $scope.open = function($event) {
    //   $scope.status.opened = true;
    // };

    // $scope.setDate = function(year, month, day) {
    //   $scope.dt = new Date(year, month, day);
    // };

    // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    // $scope.format = 'dd.MM.yyyy';

    // $scope.status = { opened: false };

    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);

    // var afterTomorrow = new Date();
    // afterTomorrow.setDate(tomorrow.getDate() + 2);

    // $scope.events =
    // [
    //   {
    //     date: tomorrow,
    //     status: 'full'
    //   },
    //   {
    //     date: afterTomorrow,
    //     status: 'partially'
    //   }
    // ];

    // $scope.checkValidDate();
  }]);
