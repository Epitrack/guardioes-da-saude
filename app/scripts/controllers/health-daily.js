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
    $scope.getSurveyByMonth = function () {
      $scope.currentDay = moment();

      // ----
      var params = {
        month: moment().month() + 1,
        year: moment().year()
      };

      UserApi.getUserCalendar(params, function (data) {
        var userCalendar = [];

        var params;

        for (var i = 0; i < data.data.data.length; i++) {
          params = {
            total: data.data.data[i].count,
            day: data.data.data[i]._id.day,
            year: data.data.data[i]._id.year
          };

          if (data.data.data[i]._id.no_symptom === 'Y') {
            params.no_symptom = data.data.data[i]._id.no_symptom;
          } else {
            params.symptom = 'Y';
          }

          userCalendar.push(params);
        }

        $rootScope.userCalendar = userCalendar;
        //console.log("userCalendar", $rootScope.userCalendar);
        $rootScope.$broadcast('build_userCalendar');
      });

      // ----
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
    $scope.getCalendarPopoverTitle = function (day) {
      return day.date.format('dddd, DD [de] MMMM [de] YYYY');
    };
    $scope.getCalendarPopoverContent = function (q, day) {
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
      if(q == 't') {
        content = (mal + bem);
      } else if(q == 'bem') {
        content = bem;
      } else {
        content = mal
      }
      return content;
    };
    $scope.checkForSymptoms = function (day) {
      var d = day.number;
      var r = false;
      angular.forEach($rootScope.userCalendar, function (item, k) {
        if (item.day == d) {
          r = true;
        }
      });
      return r;
    };
  }]);
