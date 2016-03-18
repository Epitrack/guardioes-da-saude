'use strict';
/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyCtrl
 * @description
 * # HealthDailyCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyCtrl', ['$scope', 'UserApi', '$rootScope', 'LocalStorage', 'Notification', 'moment', function ($scope, UserApi, $rootScope, LocalStorage, Notification, moment) {
    $scope.pageClass = 'health-daily-page';
    $scope.vm = {};
    $scope.currentMonth = moment();
    $scope.vm.currentDay = moment();
    var singularSpelling = 'Participação';
    $scope.totalSpelling = $scope.goodSpelling = $scope.badSpelling = 'Participações';
    if($scope.userSurvey !== undefined) {
      $scope.userSurvey = undefined;
    }

    // ====
    $scope.getUserSurvey = function () {
      UserApi.getUserSurvey(function (data) {
        $scope.userSurvey = data.data.data;

        if ($scope.userSurvey.total !== 0) {
          $scope.userSurvey.pct_no_symptoms = ((($scope.userSurvey.no_symptom / $scope.userSurvey.total) * 100));
          $scope.userSurvey.pct_symptoms = ((($scope.userSurvey.symptom / $scope.userSurvey.total) * 100));
          $scope.roundedGoodSymptoms = Math.round($scope.userSurvey.pct_no_symptoms);
          $scope.roundedBadSymptoms = Math.round($scope.userSurvey.pct_symptoms);
        } else {
          $scope.userSurvey.pct_no_symptoms = $scope.userSurvey.no_symptom;
          $scope.userSurvey.pct_symptoms = $scope.userSurvey.symptom;
          $scope.roundedGoodSymptoms = 0;
          $scope.roundedBadSymptoms = 0;
        }

        if ($scope.userSurvey.pct_no_symptoms % 1 !== 0) {
          $scope.userSurvey.pct_no_symptoms = $scope.userSurvey.pct_no_symptoms.toFixed(2);
        }

        if ($scope.userSurvey.pct_symptoms % 1 !== 0) {
          $scope.userSurvey.pct_symptoms = $scope.userSurvey.pct_symptoms.toFixed(2);
        }

        if ($scope.userSurvey.total === 1) {
          $scope.totalSpelling = singularSpelling;
        }

        if ($scope.userSurvey.no_symptom === 1) {
          $scope.goodSpelling = singularSpelling;
        }

        if ($scope.userSurvey.symptom === 1) {
          $scope.badSpelling = singularSpelling;
        }

        $rootScope.$broadcast('userSurvey_ok');
      });
    };
    // ====

    // ====
    $scope.getUserCalendar = function (params) {
      if (!$scope.calendarLoaded) {
        $scope.vm.currentDay = moment();
        // ----
        if (!params) {
          params = {
            month: moment().month() + 1,
            year: moment().year()
          };
        } else {
          //params.month = params.month +1;
        }
        UserApi.getUserCalendar(params, function (data) {
          var userCalendar = [];
          var k;
          for (var i = 0; i < data.data.data.length; i++) {
            k = {
              total: data.data.data[i].count,
              day: data.data.data[i]._id.day,
              month: data.data.data[i]._id.month,
              year: data.data.data[i]._id.year
            };

            if (data.data.data[i]._id.no_symptom === 'Y') {
              k.no_symptom = data.data.data[i]._id.no_symptom;
            } else {
              k.symptom = 'Y';
            }
            userCalendar.push(k);
          }
         // $rootScope.userCalendar = userCalendar;
          $scope.userCalendar = userCalendar;
          $scope.calendarLoaded = true;
        });
        // ----
      }
    };
    // ====

    // ====
    $scope.getSurveysByMonth = function (month) {
      $scope.allDays = '';
      $scope.lineOptions = null;
      $scope.lineDataLoaded = false;

      var params = {
        month: month,
        year: new Date().getFullYear(),
        user_token: LocalStorage.getItem('userStorage').user_token
      };

      $rootScope.frequencyMonth = month;

      UserApi.getUserSurveyByMonth(params, function (data) {
        $scope.lineDataLoaded = true;
        if (data.data.error === true) {
          // console.warn(data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        } else {
            if(data.data.data.length > 0){
              $scope.allDays = data.data.data;
              $scope.$broadcast('allDays_ok');
            }
        }
      });
    };
    // ====

    // ====
    $scope.graphicLine = function () {
      var days = [];

      $scope.allDays.forEach(function (item) {
        days.push({
          y: "Dia " + item._id.day.toString(),
          total: item.count
        });
      });

      if (days.length > 0) {
        $scope.lineOptions = {
          data: days.reverse(),
          xkey: 'y',
          ykeys: ['total'],
          labels: ['Participações'],
          lineColors: ['#1E88E5'],
          parseTime: false,
          resize: true,
          hoverCallback: function (index, options, content) {
            return (content);
          }
        };
      }

    };
    // ====

    // ====
    $scope.graphicDonuts = function () {
      $scope.donutOptions = {
        data: [
          {label: "Bem", value: $scope.userSurvey.no_symptom},
          {label: "Mal", value: $scope.userSurvey.symptom}
        ],
        colors: ['#E0D433', '#C81204'],
        resize: true
      };
    };
    // ====

    // ====
    $scope.getYear = function () {
      var params = {
        year: new Date().getFullYear(),
        user_token: LocalStorage.getItem('userStorage').user_token
      };

      UserApi.getUserSurveyByYear(params, function (data) {
        if (data.data.error === true) {
          // console.warn(data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        } else {
          if(data.data.data.length > 0){
            $scope.monthReports = data.data.data;
          }
        }
      });
    };
    // ====

    // ====
    $rootScope.$on('userSurvey_ok', function () {
      $scope.graphicDonuts();
      $scope.getSurveysByMonth(new Date().getMonth() + 1);
    });
    // ====

    // ====
    $scope.vm.CalendarInterface = {
      getCalendarPopoverTitle: function (day) {
        return day.date.format('dddd, DD [de] MMMM [de] YYYY');
      },
      getCalendarPopoverContent: function (q, day) {
        var mal = 0;
        var bem = 0;
        var d = day.number;
        angular.forEach($scope.userCalendar, function (item) {
          if (item.day === d) {
            if (item.no_symptom) {
              if (bem === 0) {bem = item.total;}
              else {bem += item.total;}
            } else {
              if (mal === 0) { mal = item.total; }
              else { mal += item.total; }
            }
          }
        });
        var content;
        if (q === 't') { content = (mal + bem); }
          else if (q === 'bem') { content = bem; }
          else { content = mal; }
        return content;
      },
      checkForSymptoms: function (day) {
        if ($scope.calendarLoaded) {
          var d = day.number;
          var r = false;
          angular.forEach($scope.userCalendar, function (item) {
            if (item.day === d && (day.date._d.getMonth()+1) === $scope.currentMonth.month) {
              r = true;
            }
          });
          return r;
        } else {
          return false;
        }
      },
      onChange: function (params) {
        if (params.month !== $scope.currentMonth.month || params.year !== $scope.currentMonth.year) {
          $scope.calendarLoaded = false;
          $scope.getUserCalendar(params);
          $scope.currentMonth = params;
        }
      }
    };

    $scope.calendarLoaded = false;
    // ====

    // ====
    $scope.$on('allDays_ok', function () {
      $scope.lineOptions = null;
      $scope.graphicLine();
    });
    // ====

    // ====
    $scope.getUserSurvey();
    $scope.getUserCalendar();
    $scope.getYear();
    // ====
  }]);
