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

    UserApi.getUserSurvey(function(data) {
      $scope.userSurvey = data.data.data;

      if ($scope.userSurvey.total !== 0) {
        $scope.userSurvey.pct_no_symptoms = ((($scope.userSurvey.no_symptom/$scope.userSurvey.total)*100));
        $scope.userSurvey.pct_symptoms = ((($scope.userSurvey.symptom/$scope.userSurvey.total)*100));
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
        $('.total-participants h1 span.text').text('Participação');
      }

      console.log('$scope.userSurvey.total >>>', $scope.userSurvey.total);
    });

    $scope.getSurveyByMonth = function() {
      $scope.day = moment();

      var monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      // $scope.monthName = monthNames[moment().month()];

      var params = {
        month: moment().month()+1, // gambiarra detected
        year: moment().year()
      };

      UserApi.getUserCalendar(params, function(data) {
        var userCalendar = [];

        for (var i = 0; i < data.data.data.length; i++) {
          $scope.total = data.data.data[i].count;
          $scope.days = data.data.data[i]._id.day;
          $scope.symptom = data.data.data[i]._id.no_symptom;

          var params = {
            total: $scope.total,
            report_day: $scope.days,
            symptom: $scope.symptom
          };

          userCalendar.push(params)

          console.log(params);
        }

        $rootScope.userCalendar = userCalendar;
        $rootScope.$broadcast('USER_CALENDAR_UPDATED');

        console.log($rootScope.userCalendar);
      });
    };

    $scope.getSurveyByMonth();


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
  }]);
