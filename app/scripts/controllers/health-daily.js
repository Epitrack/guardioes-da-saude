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
    $scope.getUserSurvey = function() {
      UserApi.getUserSurvey(function(data) {
        $scope.userSurvey = data.data.data;

        if ($scope.userSurvey.total !== 0) {
          $scope.userSurvey.pct_no_symptoms = ((($scope.userSurvey.no_symptom/$scope.userSurvey.total)*100));
          $scope.userSurvey.pct_symptoms = ((($scope.userSurvey.symptom/$scope.userSurvey.total)*100));

          $scope.roundedGoodSymptoms = Math.round($scope.userSurvey.pct_no_symptoms);
          $scope.roundedBadSymptoms = Math.round($scope.userSurvey.pct_symptoms);
        } else {
          $scope.userSurvey.pct_no_symptoms = $scope.userSurvey.no_symptom;
          $scope.userSurvey.pct_symptoms = $scope.userSurvey.symptom;
        }

        if($scope.userSurvey.pct_no_symptoms %1 !== 0) {
            $scope.userSurvey.pct_no_symptoms = $scope.userSurvey.pct_no_symptoms.toFixed(2);
        }

        if($scope.userSurvey.pct_symptoms %1 !== 0) {
          $scope.userSurvey.pct_symptoms = $scope.userSurvey.pct_symptoms.toFixed(2);
        }

        if ($scope.userSurvey.total == 1) {
          $scope.totalSpelling = singularSpelling;
        }

        if($scope.userSurvey.no_symptom == 1) {
          $scope.goodSpelling = singularSpelling;
        }

        if ($scope.userSurvey.symptom == 1) {
          $scope.badSpelling = singularSpelling;
        }
      });
    };

    $scope.getUserSurvey();
    // ====

    // ====
    $scope.getSurveyByMonth = function() {
      $scope.currentDay = moment();

      // ----
      var params = {
        month: moment().month()+1,
        year: moment().year()
      };

      UserApi.getUserCalendar(params, function(data) {
        var userCalendar = [];

        var params, total, day, no_symptom, symptom, year;

        for (var i = 0; i < data.data.data.length; i++) {
          params = {
            total: data.data.data[i].count,
            day: data.data.data[i]._id.day,
            year: data.data.data[i]._id.year
          }

          if (data.data.data[i]._id.no_symptom == 'Y') {
            params.no_symptom = data.data.data[i]._id.no_symptom
          } else {
            params.symptom = 'Y'
          }

          userCalendar.push(params)
        }

        $rootScope.userCalendar = userCalendar;
        $rootScope.$broadcast('build_userCalendar');
      });

      // ----
    };

    $scope.getSurveyByMonth();
    // ====

    // ====
    $scope.graphic = function() {
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
    };

    $scope.graphic();
    // ====
  }]);
