'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
  .controller('ChooseSymptomsCtrl', ['$scope', 'Surveyapi', 'toaster', '$location', 'LocalStorage', '$timeout', '$window', function ($scope, Surveyapi, toaster, $location, LocalStorage, $timeout, $window) {

    // get all symptoms
    Surveyapi.getSymptoms(function (data) {
      $scope.symptomsList = data.data.data;
    });

    // report survey
    $scope.symptoms = {};

    $scope.submitSurvey = function () {
      var form = {};

      if ($scope.symptoms.travelLocation) {
        var country = $scope.symptoms.travelLocation;
      }

      angular.forEach($scope.symptoms, function (v, symptom) {
        if (v) {
          form[symptom] = "Y";
        }
      });

      form.ill_date = $scope.UTIL.unConvertDate(moment(new Date()).utc().format('DD-MM-YYYY'));
      form.lat = LocalStorage.getItem('userLocation').lat;
      form.lon = LocalStorage.getItem('userLocation').lon;

      // when submit survey to household
      var url = $location.path().split('/');
      var household = url[url.length - 3];

      if (household === 'household') {
        form.household_id = url[3];
      }

      if (country !== undefined) {
        form.travelLocation = country;
      }

      Surveyapi.submitSurvey(form, function (data) {
        if (data.data.error === true) {
          console.warn(data.data.message);
          toaster.pop('error', data.data.message);
        } else {
          console.log(data.data.message);
          toaster.pop('success', data.data.message);

          if (data.data.exantematica === true) {
            openModalExantematica();
          } else {
            openModal();
          }
        }
      });
    };

    function openModal() {
      $('#modal-thanks').modal({
        show: 'true'
      });
    }

    function openModalExantematica() {
      $('#modal-exantematica').modal({
        show: 'true'
      });
    }

    $scope.goToUpas = function () {
      $timeout(function () {
          $location.path('/health-tips');
        },
        400);
    };

    $scope.goToHome = function () {
      $timeout(function () {
          $location.path('/health-daily');
        },
        300);
    };

    $scope.share = function (social) {
      var text;

      text = 'Acabei de participar do Guardiões da Saúde, participe você também! www.guardioesdasaude.org';
        
    var title = "guardiões"
    var url = 'https://guardioesdasaude.org'
      
      console.log(decodeURIComponent(text))
      if (social === 'facebook') {
        $window.open('https://www.facebook.com/sharer/sharer.php?u=' + decodeURIComponent(text));
//        $window.open('https://www.facebook.com/sharer/sharer.php?u='+decodeURIComponent(text), 'facebook-share-dialog', 'width=626,height=436');
//         $window.open( 'http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[url]=' + url + 'sharer', 'top=30,left=30,toolbar=0,status=0,width=520,height=350');
//        var winTop = (screen.height / 2) - (winHeight / 2);
//        var winLeft = (screen.width / 2) - (winWidth / 2);
        $window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + text + '&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=520,height=350');          
          console.log("++++++++++++++ facebook share ++++++++++++++");
          window.open('https://www.facebook.com/sharer/sharer.php')
      } else {
        $window.open('https://twitter.com/home?status=' + decodeURIComponent(text));
      }
    };

  }]);
