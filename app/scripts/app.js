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
  'firebase'
  ])
 .run(['$rootScope', 'LocalStorage', 'amMoment', function($rootScope, LocalStorage, amMoment){
  // moment js
  amMoment.changeLocale('pt-br');

  // check if user exist
  var u = LocalStorage.getItem('userStorage');
  if(u != null) {
    $rootScope.user = u;
  }
  console.log('app.run: user', $rootScope.user);
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
  .when('/login-email', {
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
      // .when('/components', {
      //   templateUrl: 'views/components.html',
      //   controller: 'ComponentCtrl',
      //   controllerAs: 'components'
      // })
      // .when('/help', {
      //   templateUrl: 'views/help.html',
      //   controller: 'HelpCtrl',
      //   controllerAs: 'help'
      // })
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
.when('/cadastro-email', {
  templateUrl: 'views/cadastro-email.html',
  controller: 'CadastroEmailCtrl',
  controllerAs: 'cadastroEmail'
})
.otherwise({
  redirectTo: '/'
});

      // use the HTML5 History API
      $locationProvider.html5Mode({
        enabled: true,
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
