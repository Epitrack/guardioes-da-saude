'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:HealthDailyCtrl
 * @description
 * # HealthDailyCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('HealthDailyCtrl', ['$scope', 'LocalStorage', function ($scope, LocalStorage) {
    $scope.pageClass = 'health-daily-page';
    $scope.day = moment();

    $scope.totalParticipants = {
    	data: [
    		{total: 162}
    	]
    };

    $scope.barOptions = {
	    data: [
	      { y: '2006', a: 100, b: 90 },
	      { y: '2007', a: 75,  b: 65 },
	      { y: '2008', a: 50,  b: 40 },
	      { y: '2009', a: 75,  b: 65 },
	      { y: '2010', a: 50,  b: 40 },
	      { y: '2011', a: 75,  b: 65 },
	      { y: '2012', a: 100, b: 90 }
	    ],
	    xkey: 'y',
	    ykeys: ['a', 'b'],
	    labels: ['Series A', 'Series B'],
	    resize: true
	  };

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

		$scope.areaOptions = {
			data: [
	      { y: '2006', a: 100, b: 90 },
	      { y: '2007', a: 75,  b: 65 },
	      { y: '2008', a: 50,  b: 40 },
	      { y: '2009', a: 75,  b: 65 },
	      { y: '2010', a: 50,  b: 40 },
	      { y: '2011', a: 75,  b: 65 },
	      { y: '2012', a: 100, b: 90 }
	    ],
	    xkey: 'y',
	    ykeys: ['a', 'b'],
	    labels: ['Series A', 'Series B'],
	    resize: true
		}

    // set user with locaStorage data
    $scope.user = LocalStorage.getItem('userStorage');
  }]);
