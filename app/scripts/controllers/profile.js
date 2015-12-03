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

    // $scope.today = function() {
    //   $scope.dt = new Date();
    // };
    // $scope.today();

    // $scope.clear = function () {
    //   $scope.dt = null;
    // };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    // $scope.dateOptions = {
    //   formatYear: 'yy',
    //   startingDay: 1
    // };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'dd.MM.yyyy';

    $scope.status = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
      [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

    // $scope.getDayClass = function(date, mode) {
    //   if (mode === 'day') {
    //     var dayToCheck = new Date(date).setHours(0,0,0,0);

    //     for (var i=0;i<$scope.events.length;i++){
    //       var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

    //       if (dayToCheck === currentDay) {
    //         return $scope.events[i].status;
    //       }
    //     }
    //   }

    //   return '';
    // };

    $scope.convertDate = function() {
      var convertedDate = moment($scope.screen.user.dob).format('MM-DD-YYYY').replace(/-/g, ".");
      $scope.convertedBirthDate = convertedDate;
    }

    $scope.getUser();
  }]);
