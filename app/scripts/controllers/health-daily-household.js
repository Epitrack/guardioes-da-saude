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

    $scope.getHousehold = function() {
      HouseholdApi.getHousehold(userID, function(data) {
        $scope.household = meuFiltro('filter')(data.data.data, {
          id: $routeParams.id
        })[0];

        $scope.getHouseholdSurvey($scope.household.id);
        $scope.getSurveyByMonth($scope.household.id);
      });
    };

    $scope.getHouseholdSurvey = function(hhId) {
      HouseholdApi.getHouseholdSurvey(hhId, function(data) {
        $scope.householdSurveys = data.data.data;

        if ($scope.householdSurveys.total == 1) {
          $scope.totalSpelling = singularSpelling;
        }

        if ($scope.householdSurveys.no_symptom == 1) {
          $scope.goodSpelling = singularSpelling;
        }

        if ($scope.householdSurveys.symptom == 1) {
          $scope.badSpelling = singularSpelling;
        }
      });
    };

    $scope.getHousehold();

    // graphic
    $scope.lineOptions = {
      data: [
        { y: '2006', a: 10, b: 90 },
        { y: '2007', a: 45,  b: 65 },
        { y: '2008', a: 30,  b: 40 },
        { y: '2009', a: 55,  b: 65 },
        { y: '2010', a: 10,  b: 40 },
        { y: '2011', a: 55,  b: 65 },
        { y: '2012', a: 45, b: 90 }
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Total'],
      lineColors: ['#1E88E5'],
      resize: true
    };

    $scope.donutOptions = {
      data: [
        {label: "Bem", value: 77, participants: 10},
        {label: "Mal", value: 23, participants: 5}
      ],
      colors: ['#E0D433', '#C81204'],
      resize: true
    };
    // ====

    $scope.getSurveyByMonth = function(hhID) {
      $scope.day = moment();

      var monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      // $scope.monthName = monthNames[moment().month()];

      var params = {
        month: moment().month()+1, // gambiarra detected
        year: moment().year(),
        hhId: hhID
      };

      HouseholdApi.getHouseholdCalendar(params, function(data) {
        var householdCalendar = [];

        for (var i = 0; i < data.data.data.length; i++) {
          $scope.total = data.data.data[i].count;
          $scope.days = data.data.data[i]._id.day;
          $scope.symptom = data.data.data[i]._id.no_symptom;

          var params = {
            total: $scope.total,
            report_day: $scope.days,
            symptom: $scope.symptom
          };

          householdCalendar.push(params)
        }

        $rootScope.householdCalendar = householdCalendar;

        console.log($rootScope.householdCalendar);
      });
    };
  }]);
