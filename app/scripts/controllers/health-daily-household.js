'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyHouseholdCtrl
 * @description
 * # HealthDailyHouseholdCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyHouseholdCtrl', ['$scope', '$rootScope', '$filter', 'HouseholdApi', '$routeParams', 'LocalStorage', 'Notification', 'moment', function ($scope, $rootScope, $filter, HouseholdApi, $routeParams, LocalStorage, Notification, moment) {

    var meuFiltro = $filter;
    var userStorage = $rootScope.user;
    var userID = userStorage.id;

    var singularSpelling = 'Participação';
    $scope.totalSpelling = $scope.goodSpelling = $scope.badSpelling = 'Participações';
    $scope.currentMonth = moment();
    $scope.vm = {};
    $scope.vm.currentDay = moment();

    if($scope.hhSurvey !== undefined) { $scope.hhSurvey = undefined; }
    if($scope.lineOptions !== undefined) { $scope.lineOptions = undefined; }

    // ====
    $scope.getHousehold = function () {
      HouseholdApi.getHousehold(userID, function (data) {
        $scope.household = meuFiltro('filter')(data.data.data, {
          id: $routeParams.id
        })[0];

        // return console.warn('$scope.household', $scope.household);

        $scope.$broadcast('hh_ok', $scope.household.id);
      });
    };
    // ====

    // ====
    $scope.getHouseholdSurvey = function () {
      var id = $scope.household.id;

      HouseholdApi.getHouseholdSurvey(id, function (data) {
        $scope.householdSurveys = data.data.data;

        // ----
        if ($scope.householdSurveys.total !== 0) {
          $scope.householdSurveys.pct_no_symptoms = ((($scope.householdSurveys.no_symptom / $scope.householdSurveys.total) * 100));
          $scope.householdSurveys.pct_symptoms = ((($scope.householdSurveys.symptom / $scope.householdSurveys.total) * 100));
          $scope.roundedGoodSymptoms = Math.round($scope.householdSurveys.pct_no_symptoms);
          $scope.roundedBadSymptoms = Math.round($scope.householdSurveys.pct_symptoms);
        } else {
          $scope.householdSurveys.pct_no_symptoms = $scope.householdSurveys.no_symptom;
          $scope.householdSurveys.pct_symptoms = $scope.householdSurveys.symptom;
        }
        // ----

        // ----
        if ($scope.householdSurveys.pct_no_symptoms % 1 !== 0) {
          $scope.householdSurveys.pct_no_symptoms = $scope.householdSurveys.pct_no_symptoms.toFixed(2);
        }

        if ($scope.householdSurveys.pct_symptoms % 1 !== 0) {
          $scope.householdSurveys.pct_symptoms = $scope.householdSurveys.pct_symptoms.toFixed(2);
        }
        // ----

        if ($scope.householdSurveys.total === 1) {
          $scope.totalSpelling = singularSpelling;
        }

        if ($scope.householdSurveys.no_symptom === 1) {
          $scope.goodSpelling = singularSpelling;
        }

        if ($scope.householdSurveys.symptom === 1) {
          $scope.badSpelling = singularSpelling;
        }


        $scope.hhSurvey = $scope.householdSurveys;
        $scope.$broadcast('hhSurvey_ok');
      });
    };
    // ====

    // ====
    $scope.getHouseholdCalendar = function (params) {
      $scope.day = moment();
      $scope.vm.currentDay = moment();

      if (!params) {
        params = {
          month: moment().month() + 1,
          year: moment().year(),
          hhId: $routeParams.id
        };
      } else {
        if (!params.hhId) {
          params.hhId = $routeParams.id;
        }
        if (!params.month) {
          params.month = $scope.currentMonth.month;
        }
        if (!params.year) {
          params.year = $scope.currentMonth.year;
        }
      }

      HouseholdApi.getHouseholdCalendar(params, function (data) {
        var householdCalendar = [];

        var params;

        for (var i = 0; i < data.data.data.length; i++) {
          params = {
            total: data.data.data[i].count,
            day: data.data.data[i]._id.day,
            year: data.data.data[i]._id.year,
            month: data.data.data[i]._id.month
          };

          if (data.data.data[i]._id.no_symptom === 'Y') {
            params.no_symptom = data.data.data[i]._id.no_symptom;
          } else {
            params.symptom = 'Y';
          }

          householdCalendar.push(params);
        }

        $scope.householdCalendar = householdCalendar;
        $scope.$broadcast('build_hhCalendar');
        $scope.calendarLoaded = true;
      });
    };
    // ====

    // ====
    $scope.getMonth = function (month) {
      $scope.hhAllDays = '';
      $scope.lineOptions = null;
      $scope.lineDataLoaded = false;

      var params = {
        month: month,
        year: new Date().getFullYear(),
        hh_id: $scope.household.id,
        user_token: $scope.household.user.user_token
      };

      $rootScope.frequencyMonth = month;

      HouseholdApi.getHouseholdSurveyByMonth(params, function (data) {
        $scope.lineDataLoaded = true;
        if (data.data.error === true) {
          // console.warn(data.data.message);
          Notification.show('error', 'Atenção', data.data.message);
        } else {
          $scope.hhAllDays = data.data.data;
          $scope.$broadcast('hhAllDays_ok');
        }
      });
    };

    $scope.graphicLine = function () {
      var days = [];

      $scope.hhAllDays.forEach(function (item) {
        days.push({
          y: "Dia " + item._id.day.toString(),
          total: item.count
        });
      });

      if(days.length > 0) {
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

    $scope.graphicDonuts = function () {
      $scope.hhDonutOptions = {
        data: [
        {label: "Bem", value: $scope.hhSurvey.no_symptom},
        {label: "Mal", value: $scope.hhSurvey.symptom}
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
        hh_id: $scope.household.id,
        user_token: LocalStorage.getItem('userStorage').user_token
      };

      HouseholdApi.getHouseholdSurveyByYear(params, function (data) {
        if (data.data.error === true) {
          Notification.show('error', 'Atenção', data.data.message);
        } else {
          $scope.monthReports = data.data.data;
        }
      });
    };
    // ====

    $scope.getHousehold();

    $scope.$on('hh_ok', function () {
      var hhId = $scope.household.id;

      $scope.getHouseholdSurvey(hhId);
      $scope.getHouseholdCalendar({
        household_id: hhId,
        year: $scope.currentMonth.year,
        month: $scope.currentMonth.month
      });
      $scope.getYear();
    });

    $scope.$on('hhSurvey_ok', function () {
      $scope.graphicDonuts();
      $scope.getMonth(new Date().getMonth() + 1);
    });

    $scope.$on('hhAllDays_ok', function () {
      $scope.lineOptions = null;
      $scope.graphicLine();
    });

    // ====
    $scope.vm.CalendarInterface = {
      getCalendarPopoverTitle: function (day) {
        return day.date.format('dddd, DD [de] MMMM [de] YYYY');
      },
      getCalendarPopoverContent: function (q, day) {
        var mal = 0;
        var bem = 0;
        var d = day.number;
        angular.forEach($scope.householdCalendar, function (item) {
          if (item.day === d) {
            if (item.no_symptom) {
              if (bem === 0) {bem = item.total;}
              else {bem += item.total;}
            } else {
              if (mal === 0) {mal = item.total;}
              else {mal += item.total;}
            }
          }
        });
        var content;
        if (q === 't') { content = (mal + bem); }
          else if (q === 'bem') {content = bem; }
          else { content = mal; }
        return content;
      },
      checkForSymptoms: function (day) {
        if ($scope.calendarLoaded) {
          var d = day.number;
          var r = false;
          angular.forEach($scope.householdCalendar, function (item) {
            if (item.day === d && (day.date._d.getMonth()+1) === $scope.currentMonth.month) {
              r = true;
            }
          });
          return r;
        } else { return false; }
      },
      onChange: function (params) {
        if (params.month !== $scope.currentMonth.month ||
          params.year !== $scope.currentMonth.year) {
          $scope.calendarLoaded = false;
          $scope.getHouseholdCalendar(params);
          $scope.currentMonth = params;
        }
      }
    };
    $scope.calendarLoaded = false;
    // ====
  }]);
