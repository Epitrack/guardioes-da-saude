'use strict';

/**
 * @ngdoc overview
 * @name gdsApp
 * @description
 * # gdsApp
 *
 * Main module of the application.
 */

 angular
 .module('gdsApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'leaflet-directive',
  'toaster',
  'ChartAngular',
  'ngMask',
  'angularMoment',
  'ngFileUpload',
  'firebase',
  'ngMap'
  ])
 .run(['$rootScope', 'LocalStorage', 'amMoment', function($rootScope, LocalStorage, amMoment){
  // moment js
  amMoment.changeLocale('pt-br');
  // ====

  // check if user exist
  var u = LocalStorage.getItem('userStorage');

  if(u !== null) {
    $rootScope.user = u;
  }

  console.log('app.run: user', $rootScope.user);
  // ====

  // Helpers functions
  $rootScope.UTIL = {
    unConvertDate: function(date) {
      var newDob = date.split('-');
      return newDob[2] + '-' + newDob[1] + '-' + newDob[0];
    },

    convertDate: function(date, dateFormat) {
      return moment(date.substr(0,10)).utc().format(dateFormat);
    },

    checkAvatar: function(obj) {
      var gender, race, age;

      gender = obj.gender;
      race = obj.race;
      age = this.getAge(obj.dob);

      if (gender === 'M') {
        if (race === 'preto' || race === 'indigena' || race === 'pardo') {
          // $scope.houseHold.picture = 'avatar masculino preto';
          if (age <= 49) {
            return '4';
            // console.log('avatar masculino preto novinho');
          } else if (age >= 50) {
            return '11';
            // console.log('avatar masculino preto coroa');
          }
        } else if (race === 'branco'){
          // $scope.houseHold.picture = 'avatar masculino branco';
          if (age <= 49) {
            return '5';
            // console.log('avatar masculino branco novinho');
          } else if (age >= 50) {
            return '9';
            // console.log('avatar masculino branco coroa');
          }
        } else if(race === 'amarelo') {
          // $scope.houseHold.picture = 'avatar masculino amarelo';
          if (age <= 49) {
            return '14';
            // console.log('avatar masculino amarelo novinho');
          } else if (age >= 50) {
            return '';
            // console.log('avatar masculino amarelo coroa');
          }
        }
      } else {
        if (race === 'preto' || race === 'indigena' || race === 'pardo') {
          // $scope.houseHold.picture = 'avatar feminino preto';
          if (age <= 49) {
            return '1';
            // console.log('avatar feminino preto novinho');
          } else if (age >= 50) {
            return '12';
            // console.log('avatar feminino preto coroa');
          }
        } else if (race === 'branco'){
          // $scope.houseHold.picture = 'avatar feminino branco';
          if (age <= 49) {
            return '3';
            // console.log('avatar feminino branco novinho');
          } else if (age >= 50) {
            return '10';
            // console.log('avatar feminino branco coroa');
          }
        } else if(race === 'amarelo') {
          // $scope.houseHold.picture = 'avatar feminino amarelo';
          if (age <= 49) {
            return '13';
            // console.log('avatar feminino amarelo novinho');
          } else if (age >= 50) {
            return '';
            // console.log('avatar feminino amarelo coroa');
          }
        }
      }
    },

    getAge: function(dateString) {
      var today, birthDate, age, m;

      today = new Date();
      birthDate = new Date(dateString);
      age = today.getFullYear() - birthDate.getFullYear();
      m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      this.checkAge(age);
      return age;
    },

    checkAge: function(age) {
      // debugger;
      if (age > 13 && age < 120) {
        localStorage.setItem('dobValid', true);
      } else {
        localStorage.setItem('dobValid', false);
      }
    },

    getDaysArray: function(year, month) {
      var date = new Date(year, month-1, 1);
      var result = [];

      while (date.getMonth() === month-1) {
        result.push(date.getDate());
        date.setDate(date.getDate()+1);
      }

      return result;
    }
  };
  // ====
}])

.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .when('/cadastro', {
    templateUrl: 'views/cadastro.html',
    controller: 'CadastroCtrl',
    controllerAs: 'cadastro'
  })
  .when('/login/email', {
    templateUrl: 'views/login-email.html',
    controller: 'LoginEmailCtrl',
    controllerAs: 'loginEmail'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/profile/household/:id', {
    templateUrl: 'views/profile-internal.html',
    controller: 'ProfileInternalCtrl',
    controllerAs: 'profileInternal',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/health-daily', {
    templateUrl: 'views/health-daily.html',
    controller: 'HealthDailyCtrl',
    controllerAs: 'healthDaily',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/health-daily/household/:id', {
    templateUrl: 'views/health-daily-household.html',
    controller: 'HealthDailyHouseholdCtrl',
    controllerAs: 'healthDailyHousehold',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/health-tips', {
    templateUrl: 'views/health-tips.html',
    controller: 'HealthTipsCtrl',
    controllerAs: 'healthTips',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/news', {
    templateUrl: 'views/news.html',
    controller: 'NewsCtrl',
    controllerAs: 'news',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/profile/add', {
    templateUrl: 'views/add-profile.html',
    controller: 'AddProfileCtrl',
    controllerAs: 'addProfile',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/survey', {
    templateUrl: 'views/survey.html',
    controller: 'SurveyCtrl',
    controllerAs: 'survey',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/survey/:id/step-1', {
    templateUrl: 'views/how-are-you-feeling.html',
    controller: 'HowAreYouFeelingCtrl',
    controllerAs: 'howAreYouFeeling',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/survey/household/:id/step-1', {
    templateUrl: 'views/how-are-you-feeling.html',
    controller: 'HowAreYouFeelingCtrl',
    controllerAs: 'howAreYouFeeling',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/survey/:id/step-2', {
    templateUrl: 'views/choose-symptoms.html',
    controller: 'ChooseSymptomsCtrl',
    controllerAs: 'chooseSymptoms',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/survey/household/:id/step-2', {
    templateUrl: 'views/choose-symptoms.html',
    controller: 'ChooseSymptomsCtrl',
    controllerAs: 'chooseSymptoms',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/noticias', {
    templateUrl: 'views/noticias.html',
    controller: 'NoticiasCtrl',
    controllerAs: 'noticias'
  })
  .when('/profile/change-photo', {
    templateUrl: 'views/change-photo.html',
    controller: 'ChangePhotoCtrl',
    controllerAs: 'changePhoto',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/fale-conosco', {
    templateUrl: 'views/fale-conosco.html',
    controller: 'FaleConoscoCtrl',
    controllerAs: 'faleConosco'
  })
  .when('/sobre', {
    templateUrl: 'views/sobre.html',
    controller: 'SobreCtrl',
    controllerAs: 'sobre'
  })
  .when('/politica-de-privacidade', {
    templateUrl: 'views/politica-de-privacidade.html',
    controller: 'PoliticaDePrivacidadeCtrl',
    controllerAs: 'politicaDePrivacidade'
  })
  .when('/esqueceu-senha', {
    templateUrl: 'views/esqueceu-senha.html',
    controller: 'EsqueceuSenhaCtrl',
    controllerAs: 'esqueceuSenha'
  })
  .when('/health-map', {
    templateUrl: 'views/health-map.html',
    controller: 'HealthMapCtrl',
    controllerAs: 'healthMap'
  })
  .when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs: 'dashboard',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/dashboard/analysis', {
    templateUrl: 'views/data-analysis.html',
    controller: 'DataAnalysisCtrl',
    controllerAs: 'dataAnalysis',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/dashboard/analysis/result', {
    templateUrl: 'views/dashboard-result.html',
    controller: 'DashboardResultCtrl',
    controllerAs: 'dashboardResult',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/dashboard/map', {
    templateUrl: 'views/dashboard-map.html',
    controller: 'DashboardMapCtrl',
    controllerAs: 'dashboardMap',
        resolve: { loggedin: checkLoggedOut }
      })
  .when('/dashboard/download', {
    templateUrl: 'views/data-download.html',
    controller: 'DataDownloadCtrl',
    controllerAs: 'dataDownload',
        resolve: { loggedin: checkLoggedOut }
    })
  .when('/esqueci-minha-senha?:hash', {
    templateUrl: 'views/esqueci-minha-senha.html',
    controller: 'EsqueciMinhaSenhaCtrl',
  controllerAs: 'esqueciMinhaSenha'
  })
.when('/template/email/esqueci-senha', {
  templateUrl: 'views/template-email-esqueci-senha.html',
  controller: 'TemplateEmailEsqueciSenhaCtrl',
  controllerAs: 'templateEmailEsqueciSenha'
})
.when('/cadastro/email', {
  templateUrl: 'views/cadastro-email.html',
  controller: 'CadastroEmailCtrl',
  controllerAs: 'cadastroEmail'
})
.otherwise({
  redirectTo: '/'
});

      // use the HTML5 History API
      $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
      });
    });

var checkLoggedOut = function($q, $timeout, $location, $rootScope) {
  var deferred = $q.defer();

  if ($rootScope.user) {
    deferred.resolve();
  } else {
    $timeout(deferred.reject);
    return $location.url('/login');
  }

  return deferred.promise;
};
