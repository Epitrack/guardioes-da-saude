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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
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
      .otherwise({
        redirectTo: '/'
      });
  });
