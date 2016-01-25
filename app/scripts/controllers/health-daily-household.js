'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyHouseholdCtrl
 * @description
 * # HealthDailyHouseholdCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyHouseholdCtrl', ['$scope', '$rootScope', '$filter', 'HouseholdApi', '$routeParams', 'LocalStorage', function ($scope, $rootScope, $filter, HouseholdApi, $routeParams, LocalStorage) {

    var meuFiltro = $filter;
    var userStorage = $rootScope.user;
    var userID = userStorage.id;

    var singularSpelling = 'Participação';
    $scope.totalSpelling = $scope.goodSpelling = $scope.badSpelling = 'Participações';
    $scope.currentMonth = moment();
    $scope.vm = {};
    $scope.vm.currentDay = moment();
    // ====
    $scope.getHousehold = function () {
      HouseholdApi.getHousehold(userID, function (data) {
        $scope.household = meuFiltro('filter')(data.data.data, {
          id: $routeParams.id
        })[0];

        $rootScope.$broadcast('hh_ok', $scope.household);
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

        $rootScope.hhSurvey = $scope.householdSurveys;
        $rootScope.$broadcast('hhSurvey_ok');
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

        $rootScope.householdCalendar = householdCalendar;
        $rootScope.$broadcast('build_hhCalendar');
        $scope.calendarLoaded = true;
      });
    };
    // ====

    // ====
    $scope.getMonth = function (month) {
      $rootScope.hhAllDays = '';

      var params = {
        month: month,
        year: new Date().getFullYear(),
        hh_id: $scope.household.id,
        user_token: $scope.household.user_token
      };

      HouseholdApi.getHouseholdSurveyByMonth(params, function (data) {
        if (data.data.error === true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          $rootScope.hhAllDays = data.data.data;
          $rootScope.$broadcast('hhAllDays_ok');
        }
      });
    };

    $scope.graphicLine = function () {
      var days = [];

      $rootScope.hhAllDays.forEach(function (item, index, array) {
        days.push({
          y: "Dia " + item._id.day.toString(),
          total: item.count
        });
      });

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
    };

    $scope.graphicDonuts = function () {
      $scope.donutOptions = {
        data: [
          {label: "Bem", value: $rootScope.hhSurvey.no_symptom},
          {label: "Mal", value: $rootScope.hhSurvey.symptom}
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
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.data);
          $scope.monthReports = data.data.data;
        }
      });
    };
    // ====

    $scope.getHousehold();

    $rootScope.$on('hh_ok', function (hhId) {
      $scope.getHouseholdSurvey(hhId);
      $scope.getHouseholdCalendar({
        household_id: hhId,
        year: $scope.currentMonth.year,
        month: $scope.currentMonth.month
      });
      $scope.getYear();
    });

    $rootScope.$on('hhSurvey_ok', function () {
      $scope.graphicDonuts();
      $scope.getMonth(new Date().getMonth() + 1);
    });

    $rootScope.$on('hhAllDays_ok', function () {
      $scope.graphicLine()
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
        angular.forEach($rootScope.householdCalendar, function (item, k) {
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
          angular.forEach($rootScope.householdCalendar, function (item, k) {
            //console.log("item.day", item.day, "x", d, item.month, "x", $scope.currentMonth.month);
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
          $scope.getHouseholdCalendar(params);
          $scope.currentMonth = params;
        }
      }
    };
    $scope.calendarLoaded = false;
    // ====
  }]);
