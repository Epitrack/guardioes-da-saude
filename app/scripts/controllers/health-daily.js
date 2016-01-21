'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyCtrl
 * @description
 * # HealthDailyCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyCtrl', ['$scope', 'UserApi', '$rootScope', 'LocalStorage', 'toaster', function ($scope, UserApi, $rootScope, LocalStorage, toaster) {

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

        if ($scope.userSurvey.total === 1) {
          $scope.totalSpelling = singularSpelling;
        }

        if($scope.userSurvey.no_symptom === 1) {
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
    $scope.getUserCalendar = function() {
      $scope.currentDay = moment();

      // ----
      var params = {
        month: moment().month()+1,
        year: moment().year()
      };

      UserApi.getUserCalendar(params, function(data) {
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
        $rootScope.$broadcast('build_userCalendar');
      });

      // ----
    };
    // ====

    // ====
    $scope.getSurveysByMonth = function(month) {
      $rootScope.allDays = '';

      var params = {
        month: month,
        year: new Date().getFullYear(),
        user_token: LocalStorage.getItem('userStorage').user_token
      };

      UserApi.getUserSurveyByMonth(params, function(data) {
        if (data.data.error === true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          $rootScope.allDays = data.data.data;
          $rootScope.$broadcast('allDays_ok');
        }
      });
    };

    $scope.graphicLine = function() {
      var days = [];

      $rootScope.allDays.forEach(function(item, index, array) {
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
        hoverCallback: function(index, options, content) {
          return(content);
        }
      };
    };

    $scope.graphicDonuts = function() {
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

    // ====
    $scope.getYear = function() {
      var params = {
        year: new Date().getFullYear(),
        user_token: LocalStorage.getItem('userStorage').user_token
      };

      UserApi.getUserSurveyByYear(params, function(data) {
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

    $scope.getUserSurvey();
    $scope.getUserCalendar();
    $scope.getYear();

    $rootScope.$on('userSurvey_ok', function() {
      $scope.graphicDonuts();
      $scope.getSurveysByMonth(new Date().getMonth() + 1)
    });

    $rootScope.$on('allDays_ok', function() {
      $scope.graphicLine()
    });
  }]);
