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
    'ChartAngular',
    'ngFileUpload'
  ])
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
        controllerAs: 'profile'
      })
      .when('/health-daily', {
        templateUrl: 'views/health-daily.html',
        controller: 'HealthDailyCtrl',
        controllerAs: 'healthDaily'
      })
      .when('/health-tips', {
        templateUrl: 'views/health-tips.html',
        controller: 'HealthTipsCtrl',
        controllerAs: 'healthTips'
      })
      .when('/news', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl',
        controllerAs: 'news'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl',
        controllerAs: 'help'
      })
      .when('/add-profile', {
        templateUrl: 'views/add-profile.html',
        controller: 'AddProfileCtrl',
        controllerAs: 'addProfile'
      })
      .when('/survey', {
        templateUrl: 'views/survey.html',
        controller: 'SurveyCtrl',
        controllerAs: 'survey'
      })
      .when('/survey/:id/step-1', {
        templateUrl: 'views/how-are-you-feeling.html',
        controller: 'HowAreYouFeelingCtrl',
        controllerAs: 'howAreYouFeeling'
      })
      .when('/survey/:id/step-2', {
        templateUrl: 'views/choose-symptoms.html',
        controller: 'ChooseSymptomsCtrl',
        controllerAs: 'chooseSymptoms'
      })
      .when('/components', {
        templateUrl: 'views/components.html',
        controller: 'ComponentCtrl',
        controllerAs: 'components'
      })
      .when('/noticias', {
        templateUrl: 'views/noticias.html',
        controller: 'NoticiasCtrl',
        controllerAs: 'noticias'
      })
      .when('/change-photo', {
        templateUrl: 'views/change-photo.html',
        controller: 'ChangePhotoCtrl',
        controllerAs: 'changePhoto'
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
        controllerAs: 'dashboard'
      })
      .when('/dashboard/analysis', {
        templateUrl: 'views/data-analysis.html',
        controller: 'DataAnalysisCtrl',
        controllerAs: 'dataAnalysis'
      })
      .when('/dashboard/analysis/result', {
        templateUrl: 'views/dashboard-result.html',
        controller: 'DashboardResultCtrl',
        controllerAs: 'dashboardResult'
      })
      .when('/dashboard/map', {
        templateUrl: 'views/dashboard-map.html',
        controller: 'DashboardMapCtrl',
        controllerAs: 'dashboardMap'
      })
      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });
