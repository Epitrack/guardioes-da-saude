'use strict';

/**
* @ngdoc function
* @name gdsApp.controller:DashboardInteligenciaCtrl
* @description
* # DashboardInteligenciaCtrl
* Controller of the gdsApp
*/
angular.module('gdsApp').controller('DashboardInteligenciaCtrl', ['$scope','$filter', '$location', '$rootScope', '$http', '$compile', 'ApiConfig',
function($scope,$filter, $location, $rootScope, $http, $compile, ApiConfig) {

  // Init
  $scope.loadingGrafycs = true;
  $scope.datemin = "01/" + (moment().month() + 1) + "/" + moment().year();
  $scope.datemax = "30/" + (moment().month() + 1) + "/" + moment().year();
  $scope.periodo = $scope.datemin + " - " + $scope.datemax;
  $scope.filtros_age={};

  $scope.updateFiltrosAge=function(type){
    if(  $scope.filtros_age[type]===undefined){
        $scope.filtros_age[type]=true;
    }else{
        $scope.filtros_age[type]= !$scope.filtros_age[type];
    }
    $scope.createIdade();
    $scope.updateAge('#piramideetaria');
  }

  $scope.updateAge=function(target){
    $(target).html('');
    // SET UP DIMENSIONS
    var w = 325,
    h = 300;
    // margin.middle is distance from center line to each y-axis
    var margin = {
      top: 20,
      right: 20,
      bottom: 24,
      left: 20,
      middle: 28
    };
    // the width of each side of the chart
    var regionWidth = w/2 - margin.middle;
    // these are the x-coordinates of the y-axes
    var pointA = regionWidth,
    pointB = w - regionWidth;
    var exampleData = [
      {group: '>80', male: $scope.idades['>80']!==undefined?$scope.idades['>80'].length:0, female: $scope.idades['>80_F']!==undefined?$scope.idades['>80_F'].length:0},
      {group: '70-79', male: $scope.idades['70-79']!==undefined?$scope.idades['70-79'].length:0, female: $scope.idades['70-79_F']!==undefined?$scope.idades['70-79_F'].length:0},
      {group: '60-69', male: $scope.idades['60-69']!==undefined?$scope.idades['60-69'].length:0, female: $scope.idades['60-69_F']!==undefined?$scope.idades['60-69_F'].length:0},
      {group: '50-59', male: $scope.idades['50-59']!==undefined?$scope.idades['50-59'].length:0, female: $scope.idades['50-59_F']!==undefined?$scope.idades['50-59_F'].length:0},
      {group: '40-49', male: $scope.idades['40-49']!==undefined?$scope.idades['40-49'].length:0, female: $scope.idades['40-49_F']!==undefined?$scope.idades['40-49_F'].length:0},
      {group: '30-39', male: $scope.idades['30-39']!==undefined?$scope.idades['30-39'].length:0, female: $scope.idades['30-39_F']!==undefined?$scope.idades['30-39_F'].length:0}
    ];
    // GET THE TOTAL POPULATION SIZE AND CREATE A FUNCTION FOR RETURNING THE PERCENTAGE
    var totalPopulation = d3.sum(exampleData, function(d) { return d.male + d.female; }),
    percentage = function(d) { return d / totalPopulation; };
    // CREATE SVG
    var svg = d3.select(target).append('svg')
    .attr('width', w)
    .attr('height', margin.top + h + margin.bottom)
    // ADD A GROUP FOR THE SPACE WITHIN THE MARGINS
    .append('g')
    .attr('transform', translation(margin.left, margin.top));
    // find the maximum data value on either side
    //  since this will be shared by both of the x-axes
    var maxValue = Math.max(
      d3.max(exampleData, function(d) { return percentage(d.male); }),
      d3.max(exampleData, function(d) { return percentage(d.female); })
    );
    // SET UP SCALES
    // the xScale goes from 0 to the width of a region
    //  it will be reversed for the left x-axis
    var xScale = d3.scale.linear()
    .domain([0, maxValue])
    .range([0, regionWidth])
    .nice();

    var xScaleLeft = d3.scale.linear()
    .domain([0, maxValue])
    .range([regionWidth, 0]);

    var xScaleRight = d3.scale.linear()
    .domain([0, maxValue])
    .range([0, regionWidth]);

    var yScale = d3.scale.ordinal()
    .domain(exampleData.map(function(d) { return d.group; }))
    .rangeRoundBands([h,0], 0.1);
    // SET UP AXES
    var yAxisLeft = d3.svg.axis()
    .scale(yScale)
    .orient('right')
    .tickSize(4,0)
    .tickPadding(margin.middle-4);

    var yAxisRight = d3.svg.axis()
    .scale(yScale)
    .orient('right')
    .tickSize(4,0)
    .tickFormat(' ');

    var xAxisRight = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickFormat(d3.format('%'));

    var xAxisLeft = d3.svg.axis()
    // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
    .scale(xScale.copy().range([pointA, 0]))
    .orient('bottom')
    .tickFormat(d3.format('%'));

    // MAKE GROUPS FOR EACH SIDE OF CHART
    // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
    var leftBarGroup = svg.append('g')
    .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
    var rightBarGroup = svg.append('g')
    .attr('transform', translation(pointB, 0));

    // DRAW AXES
    svg.append('g')
    .attr('class', 'axis y left')
    .attr('transform', translation(pointA, 0))
    .call(yAxisLeft)
    .selectAll('text')
    .style('font-size', '2em')
    .style('text-anchor', 'middle');

    svg.append('g')
    .attr('class', 'axis y right')
    .attr('transform', translation(pointB, 0))
    .call(yAxisRight);

    svg.append('g')
    .attr('class', 'axis x left')
    .attr('transform', translation(0, h))
    .call(xAxisLeft);

    svg.append('g')
    .attr('class', 'axis x right')
    .attr('transform', translation(pointB, h))
    .call(xAxisRight);

    // DRAW BARS
    leftBarGroup.selectAll('.bar.left')
    .data(exampleData)
    .enter().append('rect')
    .attr('class', 'bar left')
    .attr('x', 0)
    .attr('y', function(d) { return yScale(d.group); })
    .attr('width', function(d) { return xScale(percentage(d.male)); })
    .attr('height', yScale.rangeBand());

    rightBarGroup.selectAll('.bar.right')
    .data(exampleData)
    .enter().append('rect')
    .attr('class', 'bar right')
    .attr('x', 0)
    .attr('y', function(d) { return yScale(d.group); })
    .attr('width', function(d) { return xScale(percentage(d.female)); })
    .attr('height', yScale.rangeBand());
    // so sick of string concatenation for translations
    function translation(x,y) {
      return 'translate(' + x + ',' + y + ')';
    }
  }
  /**/
  var apiUrl = ApiConfig.API_URL;
  var app_token = ApiConfig.APP_TOKEN;
  var classesColorScale = d3.scale.category10();
  /**/
  $scope.kernelmsg=true;
  $scope.setRegiao=function(regiao){
    $scope.regiao = regiao;
  }
  $scope.setSindrome=function(sindrome){
    $scope.sindrome = sindrome;
  }
  $scope.createKernel=function(){
    $scope.loadingGrafycs_kernel = true;
    $scope.kernelmsg=false;
    if($scope.sindrome!=="" && $scope.regiao!==undefined){
      var url = ApiConfig.API_KERNEL+"/"+$scope.regiao+"_"+$scope.sindrome+".html";

      $("#mkernel").attr('src',url);
      $("#mkernel").show();
      $("html, body").animate({
          scrollTop:  800
      }, 400);
      $scope.loadingGrafycs_kernel = false;
    }
  };

  $scope.setDateMin = function(d) {
    $scope.datemin = d;
  };

  $scope.setDateMax = function(d) {
    $scope.datemax = d;
  };

  $scope.buscar = function(){

  };
  $scope.usersByCity = {};

  $scope.searchUsers = function() {
    $http.get(apiUrl + '/ei/users/', { headers: { 'app_token': app_token } })
    .then(function(data) {
      $scope.usersByCity = {};
      $scope.usersByCity['Brasil'] = {};
      for (var i = 0; i < data.data.length; i++) {
        $scope.usersByCity[data.data[i]._id] = {};
        for (var j = 0; j < data.data[i].roles.length; j++) {
          $scope.usersByCity[data.data[i]._id][data.data[i].roles[j].role] = data.data[i].roles[j].total
          //
          if ($scope.usersByCity['Brasil'][data.data[i].roles[j].role] === undefined) {
            $scope.usersByCity['Brasil'][data.data[i].roles[j].role] = 0;
          }
          $scope.usersByCity['Brasil'][data.data[i].roles[j].role] += data.data[i].roles[j].total;
        }
      }
      console.log($scope.usersByCity);
    }, function(error) {
      console.warn('Error getAllData: ', error);
    });
  };
  $scope.searchUsers();
  //Object { Manaus: , Brasília: , São Paulo: , Belo Horizonte: , Rio de Janeiro: , Salvador:  }
  $scope.getUsersByCity = function(city, role) {
    try {
      return $scope.usersByCity[city][role] || 0;
    } catch (e) {
      return 0;
    }
  }

  $scope.alerts = {};
  $scope.usersType = {};
  $scope._symptoms = [];
  $scope.types = {
    sindrome: true,
    sintomas: false,
    customize: false
  };

  $scope.selectgraph = function(type) {
    for (var i in $scope.types) {
      if (i === type) {
        $scope.types[i] = true;
      } else {
        $scope.types[i] = false;
      }
    }
  }

  $scope.findAlerts = function() {
    $http.get(apiUrl + '/ei/alerts/')
    .then(function(data) {
      data = data.data;
      console.log("alerts", data);
      $scope.alerts = data;
      $scope.setColorAlerts();
    }, function(error) {
      console.warn('Error getAllData: ', error);
    });
  };

$scope.createIdade = function(){
  //console.log("$scope.syndromesCases",$scope.syndromesCases.length);
  var d = $scope.syndromesCases;
  d = _.filter(d, function(num){
      if($scope.filtros_age[num.syndrome]===undefined){
        return true;
      }else{
        return $scope.filtros_age[num.syndrome]
      }
  });
  //console.log("$scope.d",d.length);
  $scope.idades = _.groupBy(d, function(num){
    if(num.gender=="male"){
      if(num.age>13 && num.age<19){
        return "13-19";
      }else if(num.age>20 && num.age<29){
        return "20-29";
      }else if(num.age>30 && num.age<39){
        return "30-39";
      }else if(num.age>40 && num.age<49){
        return "40-49";
      }else if(num.age>50 && num.age<59){
        return "50-59";
      }else if(num.age>60 && num.age<69){
        return "60-69";
      }else if(num.age>70 && num.age<79){
        return "70-79";
      }else{
        return ">80";
      }
    }else{
      if(num.age>13 && num.age<19){
        return "13-19_F";
      }else if(num.age>20 && num.age<29){
        return "20-29_F";
      }else if(num.age>30 && num.age<39){
        return "30-39_F";
      }else if(num.age>40 && num.age<49){
        return "40-49_F";
      }else if(num.age>50 && num.age<59){
        return "50-59_F";
      }else if(num.age>60 && num.age<69){
        return "60-69_F";
      }else if(num.age>70 && num.age<79){
        return "70-79_F";
      }else{
        return ">80";
      }
    }
  });
}

$scope.getSyndrome = function() {
  $http.get(apiUrl + '/ei/syndrome/').success(function(data, status) {
    $scope.syndromesCases = data
    for(var i=0; i<$scope.syndromesCases.length; i++){
      if($scope.syndromesCases[i].symptoms[0]===""){
        $scope.syndromesCases[i].symptoms[0] = "Sem sintomas"
      }
      $scope.syndromesCases[i].symptom=$scope.syndromesCases[i].symptoms[0]
    }
    $scope.createIdade();
    $scope.createGrafyc($scope.syndromesCases, $scope.syndromesCases);
  });
}
var target_width = -1;
$scope.createGrafyc = function(symptomsCases, syndromesCases) {
  // console.log(symptomsCases);
  // console.log(syndromesCases);

  var ageSteps = [5, 10, 15, 20, 25, 30, 40, 50, 60];
  var maxDate,
  minDate,
  symptomsCases,
  syndromesCases,
  symptomsDataset,
  allSymptoms,
  syndromesDataset,
  allSyndromes,
  symptomsDimension,
  symptomsGroup,
  symptomsDateDimension,
  syndromesDimension,
  syndromesGroup,
  syndromesDateDimension,
  regions,
  regionsGroup;

  maxDate = _.max(syndromesCases, function(obj) {
    return new Date(obj.date_reported);
  });

  minDate = _.min(syndromesCases, function(obj) {
    return new Date(obj.date_reported);
  });

  maxDate = new Date(maxDate.date_reported);
  minDate = new Date(minDate.date_reported);

  symptomsCases.forEach(function(s) {
    s.ageGroup = Math.floor(s.age / 10) * 10;
  });
  syndromesCases.forEach(function(s) {
    s.ageGroup = Math.floor(s.age / 10) * 10;
  });
  symptomsDataset = crossfilter(symptomsCases);
  allSymptoms = symptomsDataset.groupAll();
  syndromesDataset = crossfilter(syndromesCases);
  allSyndromes = syndromesDataset.groupAll();
  symptomsDimension = symptomsDataset.dimension(function(d) {
    return d.symptom;
  });
  symptomsGroup = symptomsDimension.group();
  symptomsDateDimension = symptomsDataset.dimension(function(d) {
    return new Date(d.date_onset);
  });
  syndromesDimension = syndromesDataset.dimension(function(d) {
    return d.syndrome;
  });
  syndromesGroup = syndromesDimension.group();
  syndromesDateDimension = syndromesDataset.dimension(function(d) {
    return new Date(d.date_onset);
  });

  // Row charts
  var buildRowChart = function(target, dimension, group) {
    var chart = dc.rowChart(target)
    .width(260)
    .height(384)
    .margins({
      top: 40,
      left: 10,
      right: 10,
      bottom: 20
    })
    .colors(classesColorScale)
    .colorAccessor(function(d, i) {
      return i;
    })
    .group(group)
    .dimension(dimension)
    .label(function(d) {
      return d.key;
    })
    .title(function(d) {
      return d.value;
    })
    .elasticX(true);
    chart.on('filtered.monitor', function(chart, filter) {
      $scope.updateFiltrosAge(filter);
    });
    return chart;
  };

  // Maps
  function loadgeojson() {
    d3.json("scripts/util/rio_aps.geojson", function(geojson) {
      var buildMap = function(target, dataset) {
        regions = dataset.dimension(function(d) {
          return d.region;
        });
        regionsGroup = regions.group();

        var width = $(target).width(),
        height = 350;
        var projection = d3.geo.mercator()
        .center([-43.30, -23.00])
        .scale(45000);

        var chart = dc.geoChoroplethChart(target)
        .width(width)
        .height(height)
        .dimension(regions)
        .group(regionsGroup)
        .colorAccessor(function(d) {
          return d;
        })
        .overlayGeoJson(geojson.features, "region", function(d) {
          return d.properties.NOME;
        })
        .projection(projection)
        .title(function(d) {
          return "Region: " + d.key + "\nCount: " + (d.value || 0);
        });
        // setDefaultColors(chart, regionsGroup);
        return chart;
      }

      var syndromesMap = buildMap('#syndromesMap', syndromesDataset);
      var symptomsMap = buildMap('#symptomsMap', symptomsDataset);

      syndromesMap.render();
      symptomsMap.render();
    });
  };


  // Age group charts

  var buildTable = function(dateDimension, target,sympGroup){
    $scope.table_ie = dc.dataTable(target)
    .dimension(dateDimension)
    .group(function(d){
      return "";
    })
    .size(100000000)
    .columns([
      function(d) { return d.city; },
      function(d) { return d.age; },
      function(d) { return d.gender; },
      function(d) { return d.lat_reported; },
      function(d) { return d.lng_reported; },
      function(d) { return d.symptom; },
      function(d) { return $filter('date')(d.date_onset,'dd/MM/yyyy'); }
    ]);
    $scope.table_ie.sortBy(function(d) {
      return d.date_onset;
    });
    $scope.table_ie.order(d3.descending);
    //$scope.table_ie.showGroups(false);
    return $scope.table_ie;
  };

  // buildTable(syndromesDataset, 'syndrome', syndromesDateDimension, '#syndromesCaseList');

  var buildAgeChart = function(target, dataset) {

  };

  // Time series chart
  var buildTimeChart = function(dataset, group, accessor, target, navigation, dateDimension) {
    var precision = ['days', d3.time.days];
    var symptomsTimeChart = dc.compositeChart(target);
    var symptomsNavChart = dc.barChart(navigation);
    var volumeByHour = dateDimension;
    var volumeByHourGroup = volumeByHour.group(
      function(the_date) {
        return d3.time.day(the_date); // TODO make the granularity easier to see
      }
    );
    var symptomGroupsTimeSeries =
    volumeByHour
    .group(function(date) {
      return d3.time.day(date); // TODO make the granularity easier to see
    })
    .reduce(
      function(p, d) {
        p[d[accessor]] = (p[d[accessor]] || 0) + 1;
        return p;
      },
      function(p, d) {
        --p[d[accessor]];
        return p;
      },
      function() {
        return {};
      }
    );
    var observed_symptoms = group.all().map(function(obj) {
      return obj.key;
    });
    if(target_width===-1){
      target_width = $(target).width();
    }
    symptomsTimeChart
    .width(target_width)
    .height(300)
    .margins({
      top: 10,
      right: 120,
      bottom: 20,
      left: 40
    })
    .rangeChart(symptomsNavChart)
    .shareTitle(false)
    .transitionDuration(100)
    .elasticY(true)
    .x(d3.time.scale())
    .xUnits(d3.time.days)
    //.xAxisLabel('date (' + precision[0] + ')') // (optional) render an axis label below the x axis
    .yAxisLabel('Nº. de Casos')
    .xAxis();

    var theLines = [];
    observed_symptoms.forEach(function(field, i) {
      theLines.push(
        dc.lineChart(symptomsTimeChart)
        .dimension(volumeByHour)
        .colors(classesColorScale(i))
        .group(symptomGroupsTimeSeries, observed_symptoms[i], function(d) {
          return d.value[field] || null;
        })
        .defined(function(d) {
          return !isNaN(d.y)
        })
        .interpolate("monotone")
      );
    });

    symptomsTimeChart
    .compose(theLines)
    .brushOn(false);

    symptomsTimeChart
    .rangeChart(symptomsNavChart)
    .transitionDuration(100)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .xUnits(d3.time.days)
    .xAxis();

    symptomsNavChart.width(850)
    .height(60)
    .margins({
      top: 10,
      right: 20,
      bottom: 20,
      left: 50
    })
    .dimension(volumeByHour)
    .group(volumeByHourGroup)
    .centerBar(true)
    .gap(1)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .round(d3.time.days.round)
    .alwaysUseRounding(true)
    .xUnits(d3.time.days)
    .yAxis().ticks(0);

    return symptomsTimeChart;
  };

  function builds() {
    buildRowChart('#syndromesChart', syndromesDimension, syndromesGroup);
    buildRowChart('#symptomsChart', symptomsDimension, symptomsGroup);
    dc.dataCount('#syndromesCount').dimension(syndromesDataset).group(allSyndromes);
    dc.dataCount('#symptomsCount').dimension(symptomsDataset).group(allSymptoms);

    //buildAgeChart('#symptomsAgeChart', symptomsDataset);
    buildTable(syndromesDateDimension,"#table_ie",syndromesGroup);
    buildTimeChart(syndromesDataset, syndromesGroup, 'syndrome', '#syndromesTimeSeries', '#syndromesTimeNavigation', syndromesDateDimension);
    buildTimeChart(symptomsDataset, symptomsGroup, 'symptom', '#symptomsTimeSeries', '#symptomsTimeNavigation', symptomsDateDimension);
    $scope.updateAge('#piramideetaria');

  };

  builds();
  $scope.loadingGrafycs = false;
  dc.renderAll();
};


/*1- atleta 2- voluntario, 3- fa*/
$scope.findUsersType = function() {
  $http.get(apiUrl + '/ei/users/')
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      if ($scope.alerts[data[i].cidade] === undefined) {
        $scope.alerts[data[i].cidade] = [];
      }
      $scope.alerts[data[i].cidade].push(data[i]);
    }
    console.log($scope.alerts);
  }, function(error) {
    console.warn('Error getAllData: ', error);
  });
};
$scope.findAlerts();

$scope.setColorAlerts = function() {
  try { $("#brasil").css("background-color", $scope.alerts['Brasil'][0]['fcor']); } catch (e) {
    $("#brasil").css("background-color", "#68ba44");
  }
  try { $("#rio").css("background-color", $scope.alerts['Rio de Janeiro'][0]['fcor']); } catch (e) {
    $("#rio").css("background-color", "#68ba44");
  }
  try {
    $("#belohorizonte").css("background-color", $scope.alerts['Belo Horizonte'][0]['fcor']);
  } catch (e) {
    $("#belohorizonte").css("background-color", "#68ba44");
  }
  try { $("#brasilia").css("background-color", $scope.alerts['Brasília'][0]['fcor']); } catch (e) {
    $("#brasilia").css("background-color", "#68ba44");
  }
  try { $("#saopaulo").css("background-color", $scope.alerts['São Paulo'][0]['fcor']); } catch (e) {
    $("#saopaulo").css("background-color", "#68ba44");
  }
  try { $("#manaus").css("background-color", $scope.alerts['Manaus'][0]['fcor']); } catch (e) {
    $("#manaus").css("background-color", "#68ba44");
  }
  try { $("#salvador").css("background-color", $scope.alerts['Salvador'][0]['fcor']); } catch (e) {
    $("#salvador").css("background-color", "#68ba44");
  }
};

$scope.getSyndrome();

}

]);
