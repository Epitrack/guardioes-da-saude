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
        templateUrl: 'views/cadastro.html',
        controller: 'CadastroCtrl',
        controllerAs: 'cadastro'
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
      .otherwise({
        redirectTo: '/'
      });
  });
