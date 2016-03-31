'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('DashboardCtrl', ['$scope', 'DashboardApi', 'Notification', function ($scope, DashboardApi, Notification) {
    $scope.pageClass = 'dashboard-page';

    $scope.loadMap = function() {
      var map, json_url;

      json_url = 'https://s3.amazonaws.com/epitrackgeojson/uf.json';

      function _initMap() {
        map = new google.maps.Map(document.getElementById('dash-map'), {
          zoom: 4,
          center: { lat: -10.1033312, lng: -46.6546215 }
        });

        map.data.loadGeoJson(json_url);
      }

      _initMap();
    };

    // mostra o mapa com o desenho
    // $scope.loadMap();

    // ====
    // Get all data from dashboard
    $scope.getAllData = function() {
      DashboardApi.getAllData(function(data) {
        console.log('getAllData', data)
        if (data.status !== 200) {
          Notification.show('error', 'Atenção', data.statusText);
        } else {
          Notification.show('success', 'Dashboard', data.statusText);
          console.log('notification OK', data.data)
          var result = data.data;
          $scope.dash = result;

          organizeGrathData($scope.dash.symptomatic);

          setPercOps();

        }
      });
    };

    function setPercOps(){

      $scope.graphicOnePerc = ((($scope.dash.newRegisters/$scope.dash.lastWeekRegisters) - 1)*100).toFixed(1);

      angular.element('.chart1').data('easyPieChart').update($scope.graphicOnePerc);
      angular.element('.chart1').attr('data-legend', $scope.graphicOnePerc+'%');

      $scope.graphicTwoPerc = ((($scope.dash.lastWeekRegisters/$scope.dash.newRegisters) - 1)*100).toFixed(1);

      angular.element('.chart2').data('easyPieChart').update($scope.graphicTwoPerc);
      angular.element('.chart2').attr('data-legend', $scope.graphicTwoPerc+'%');

    }

    $scope.seta = function(val){
      return (val<0)? 'down' : 'up';
    }


    var chartOps = {
        scaleColor: "#9ebf00",
        lineWidth: 8,
        lineCap: 'butt',
        barColor: '#bf172c',
        size: 90,
        animate: 2000
    };

    angular.element('.chart1').easyPieChart(chartOps);
    angular.element('.chart2').easyPieChart(chartOps);
    $scope.graphicOnePerc = 10;//(($scope.dash.newRegisters/$scope.dash.lastWeekRegisters) - 1)*100;




    $scope.graphicOptions = {
      animate:{
        duration: 0,
        enabled: false
      },
      barColor: '#9ebf00',
      scaleColor: false,
      lineWidth: 20,
      lineCap: 'butt'

    };

    function organizeGrathData(data, sym) {
      var d = {};

      console.log('data',data)
      for(var i in data){
        console.log('ill_date', data[i].ill_date);
//        if(data[i].ill_date) { d.push({data[i].ill_date:{sym:}})}

      }
    }


//    $scope.dash.symptomatic
//    $scope.dash.asymptomatic

    $scope.graphlineOptions = {

    }

    $scope.graphicOptionsDown = {
      animate:{
        duration: 2000,
        enabled: true
      },
      barColor: '#bf172c',
      scaleColor: false,
      lineWidth: 6,
      size: 80,
      lineCap: 'butt'
    };

    $scope.platPercent = function(plat){
      if(!$scope.dash){return 0;}
      var count = 0;
      var _c = 0;
      for (var i in $scope.dash.platforms)
      {
          count += $scope.dash.platforms[i].count;
          if($scope.dash.platforms[i]._id === plat){_c = $scope.dash.platforms[i].count}
      }
      return (_c*100/count).toFixed(2);
    };

    $scope.platVal = function(plat){
      if(!$scope.dash){return 0;}
      var val = 0;
      for (var i in $scope.dash.platforms)
      {
        if($scope.dash.platforms[i]._id === plat){val = $scope.dash.platforms[i].count}
      }
      return val;
    };

//    $scope.template = "<div id='popUpDashPart'>{{title}}</div><div>{{content}}</div>"
    // ====

    // ====
    // Filter by race or age
    function _filterByRace(uf) {
      var men, women, uf, objMen, objWomen;

      uf = uf;
      men = $scope.dash.menByRace;
      women = $scope.dash.womenByRace;

      objMen = {};
      objWomen = {};

      angular.forEach(men, function(m) {
        console.log('Raça dos homens -> ', m);
        // angular.forEach(m.races, function(mr) {
        //   console.log('Homem -> ', mr);
        //   $scope.mr = mr;
        //   // objMen = mr;
        // })
      })

      // angular.forEach(women, function(w) {
      //   console.log('Raça das mulheres -> ', w);
      //   // angular.forEach(w.races, function(wr) {
      //     // console.log('Mulher -> ', wr)
      //     // $scope.wr = wr;
      //     // // objWomen = {
      //     // //   race: wr.race,
      //     // //   total: wr.total
      //     // // }
      //     // // objWomen = wr;
      //     // // objWomen.total = wr.total;
      //   // })
      // })

      // console.warn('objMen -> ', objMen);
      // console.warn('objWomen -> ', objWomen);
    };

    // function _filterByRace(uf) {
    // };

    $scope.filter = function(type, uf) {
      console.log('filter', type, uf)
      if (type === 'race') {
        _filterByRace(uf);
      } else if (type === 'age') {
        _filterByAge(uf);
      }
    };
    // ====

    // Call functions
    $scope.getAllData();

  }]);
