'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyHouseholdCtrl
 * @description
 * # HealthDailyHouseholdCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyHouseholdCtrl', ['$scope', '$rootScope', '$filter', 'HouseholdApi', '$routeParams', function ($scope, $rootScope, $filter, HouseholdApi, $routeParams) {

    var meuFiltro = $filter;
    var userStorage = $rootScope.user;
    var userID = userStorage.id;

    var singularSpelling = 'Participação';
    $scope.totalSpelling = $scope.goodSpelling = $scope.badSpelling = 'Participações';

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
    $scope.getSurveyByMonth = function () {
      $scope.day = moment();

      var obj = {
        month: moment().month() + 1,
        year: moment().year(),
        hhId: $scope.household.id
      };

      HouseholdApi.getHouseholdCalendar(obj, function (data) {
        var householdCalendar = [];

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

          householdCalendar.push(params);
        }

        $rootScope.householdCalendar = householdCalendar;
        $rootScope.$broadcast('build_hhCalendar');
      });
    };
    // ====

    // ====
    $scope.getMonth = function (month) {
      $rootScope.hhAllDays = '';
      $rootScope.hhAllDays = $rootScope.UTIL.getDaysArray(new Date().getFullYear(), month);

      $scope.graphic();
    };

    $scope.graphic = function () {
      var days = [];

      $rootScope.hhAllDays.forEach(function (item, index, array) {
        days.push({
          dia: item,
          total: $rootScope.hhSurvey.total
        });
      });

      days.push({
        dia: 16, total: 43
      });

      days.push({
        dia: 20, total: 84
      });

      days.push({
        dia: 14, total: 45
      });

      $scope.days = days;

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
          {label: "Bem", value: $rootScope.hhSurvey.no_symptom},
          {label: "Mal", value: $rootScope.hhSurvey.symptom}
        ],
        colors: ['#E0D433', '#C81204'],
        resize: true
      };
    };
    // ====


    $scope.getHousehold();

    $rootScope.$on('hh_ok', function (hhId) {
      $scope.getHouseholdSurvey(hhId);
      $scope.getSurveyByMonth(hhId);
    });

    $rootScope.$on('hhSurvey_ok', function () {
      $scope.getMonth(new Date().getMonth() + 1);
    });

  }]);
