'use strict';

/**
 * @ngdoc overview
 * @name guardioesDaSaudeApp
 * @description
 * # guardioesDaSaudeApp
 *
 * Main module of the application.
 */
angular
  .module('guardioesDaSaudeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/index.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/noticias', {
        templateUrl: 'views/noticias.html',
        controller: 'NoticiasCtrl',
        controllerAs: 'noticias'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/survey', {
        templateUrl: 'views/survey.html',
        controller: 'SurveyCtrl',
        controllerAs: 'survey'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
