'use strict';

/**
 * @ngdoc directive
 * @name gdsApp.directive:calendar
 * @description
 * # calendar
 */
angular.module('gdsApp')
  .directive('calendar', ['$rootScope', 'UserApi', function ($rootScope, UserApi) {
    return {
      templateUrl: "views/partials/calendar.html",
      restrict: 'E',
      scope: {
        selected: "="
      },
      link: function($scope) {
        $rootScope.$on('USER_CALENDAR_UPDATED', function(){
          $scope.userCalendar = UserApi.getSavedCalendar();
          console.log("USER_CALENDAR_UPDATED");
        });
        $scope.userCalendar = UserApi.getSavedCalendar();
        $scope.selected = _removeTime($scope.selected || moment());
        $scope.month = $scope.selected.clone();
        
        $scope.checkForSymptoms = function(day) {
          var calendar = $scope.userCalendar;
          var status = false;
          angular.forEach(calendar, function(item){
            if(day.number == item.report_day) {
              day.symptoms = item.total;
              status = true;
            }
          });
          return status;
        };

        var start = $scope.selected.clone();
          start.date(1);
          _removeTime(start.day(0));
          _buildMonth($scope, start, $scope.month);

        $scope.select = function(day) {
          $scope.selected = day.date;
          $('.with-symptoms div .popover-inner .popover-content').addClass('bad');
        };

        $scope.next = function() {
          var next = $scope.month.clone();
          _removeTime(next.month(next.month()+1).date(1));
          $scope.month.month($scope.month.month()+1);
          _buildMonth($scope, next, $scope.month);
        };

        $scope.previous = function() {
          var previous = $scope.month.clone();
          _removeTime(previous.month(previous.month()-1).date(1));
          $scope.month.month($scope.month.month()-1);
          _buildMonth($scope, previous, $scope.month);
        };
      }
    };

    function _removeTime(date) {
      return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth($scope, start, month) {
      $scope.weeks = [];
      var done = false, date = start.clone(), monthIndex = date.month(), count = 0;

      while (!done) {
        $scope.weeks.push({ days: _buildWeek(date.clone(), month) });
        date.add(1, "w");
        done = count++ > 2 && monthIndex !== date.month();
        monthIndex = date.month();
      }
    }

    function _buildWeek(date, month) {
      var days = [];
      for (var i = 0; i < 7; i++) {
        days.push({
          name: date.format("dddd"),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), "day"),
          date: date
        });

        date = date.clone();
        date.add(1, "d");
      }

      return days;
    }
  }]);
