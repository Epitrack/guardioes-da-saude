'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyCtrl
 * @description
 * # HealthDailyCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyCtrl', ['$scope', 'UserApi', '$rootScope', function ($scope, UserApi, $rootScope) {
    $scope.pageClass = 'health-daily-page';
    $scope.currentMonth = {
      month: 0,
      year: 0
    };
    var singularSpelling = 'Participação';
    $scope.totalSpelling = $scope.goodSpelling = $scope.badSpelling = 'Participações';
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
        $rootScope.userSurvey = $scope.userSurvey;
        $rootScope.$broadcast('userSurvey_ok');
      });
    };
    // ====
    // ====
    $scope.getSurveyByMonth = function (params) {
      console.log('getSurveyByMonth');
      if (!$scope.calendarLoaded) {
        $scope.currentDay = moment();
        // ----
        if (!params) {
          params = {
            month: moment().month() + 1,
            year: moment().year()
          };
        } else {
          //params.month = params.month +1;
          //console.log("params", params);
        }
        UserApi.getUserCalendar(params, function (data) {
          var userCalendar = [];
          console.log("getUserCalendar", data);
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
          $rootScope.userCalendar = userCalendar;
          $scope.calendarLoaded = true;
        });
        // ----
      }
    };
    // ====
    // ====
    $scope.getMonth = function (month) {
      // console.log('MÊS -> ', month);

      $rootScope.allDays = '';
      $rootScope.allDays = $rootScope.UTIL.getDaysArray(new Date().getFullYear(), month);

      $scope.graphic();
    };

    $scope.graphic = function () {
      var days = [];
      //console.log("userSurvey", $rootScope.userSurvey);
      $rootScope.allDays.forEach(function (item, index, array) {
        days.push({
          dia: item,
          total: $rootScope.userSurvey.total // @guinetik, check this
        });
      });

      // adiciona alguns dias para fazer curva no gráfico
      days.push({
        dia: 16, total: 43
      });

      days.push({
        dia: 20, total: 84
      });

      days.push({
        dia: 14, total: 45
      });

      // console.warn($scope.days);

      $scope.days = days;

      // console.warn($scope.days);

      $scope.lineOptions = {
        data: $scope.days,
        xkey: 'dia',
        ykeys: ['total'],
        labels: ['Total'],
        lineColors: ['#1E88E5'],
        resize: true
      };

      $scope.donutOptions = {
        data: [
          {label: "Bem", value: $rootScope.userSurvey.no_symptom},
          {label: "Mal", value: $rootScope.userSurvey.symptom}
        ],
        colors: ['#E0D433', '#C81204'],
        resize: true
      };
    };
    // ====
    $scope.getUserSurvey();
    $scope.getSurveyByMonth();

    $rootScope.$on('userSurvey_ok', function () {
      $scope.getMonth(new Date().getMonth() + 1);
    });
    $scope.vm = {};
    $scope.vm.CalendarInterface = {
      getCalendarPopoverTitle: function (day) {
        return day.date.format('dddd, DD [de] MMMM [de] YYYY');
      },
      getCalendarPopoverContent: function (q, day) {
        var mal = 0;
        var bem = 0;
        var d = day.number;
        angular.forEach($rootScope.userCalendar, function (item, k) {
          if (item.day == d) {
            if (item.no_symptom) {
              if (bem == 0) bem = item.total;
              else bem += item.total;
            } else {
              if (mal == 0) mal = item.total;
              else mal += item.total;
            }
          }
        });
        var content;
        if (q == 't') {
          content = (mal + bem);
        } else if (q == 'bem') {
          content = bem;
        } else {
          content = mal
        }
        return content;
      },
      checkForSymptoms: function (day) {
        //console.log("checkForSymptoms", day);
        if ($scope.calendarLoaded) {
          var d = day.number;
          var r = false;
          angular.forEach($rootScope.userCalendar, function (item, k) {
            if (item.day == d && item.month == $scope.currentMonth.month) {
              r = true;
            }
          });
          return r;
        } else return false;
      },
      onChange: function (params) {
        console.log("onChange", params);
        console.log("currentMonth", $scope.currentMonth);
        if (params.month != $scope.currentMonth.month ||
          params.year != $scope.currentMonth.year) {
          $scope.calendarLoaded = false;
          $scope.getSurveyByMonth(params);
          $scope.currentMonth = params;
        }
      }
    };
    $scope.calendarLoaded = false;
  }]);
