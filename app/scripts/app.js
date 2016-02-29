'use strict';

/**
 * @ngdoc overview
 * @name gdsApp
 * @description
 * # gdsApp
 *
 * Main module of the application.
 */
var checkLoggedOut = function ($q, $timeout, $location, $rootScope) {
  var deferred = $q.defer();

  if ($rootScope.user) {
    deferred.resolve();
  } else {
    $timeout(deferred.reject);
    return $location.url('/login');
  }

  return deferred.promise;
};

angular
  .module('gdsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'toaster',
    'ChartAngular',
    'ngMask',
    'angularMoment',
    'ngFileUpload',
    'ngMap',
    'angular-repeat-n',
    'ngFacebook'
  ])
  .config( function( $facebookProvider ) {
    $facebookProvider.setAppId('961547147258065');//961547147258065  179676235701655
  })
  .run(['$rootScope', 'LocalStorage', 'amMoment', function ($rootScope, LocalStorage, amMoment) {

    // moment js
    amMoment.changeLocale('pt-br');
    // ====

    // check if user exist
    var u = LocalStorage.getItem('userStorage');


    if (u !== null) {
      $rootScope.user = u;
    }

//    console.log('app.run: user', $rootScope.user);
    // ====


    $rootScope.onInit = function(){
        document.body.style.display = "block";
    };

    // Helpers functions
    $rootScope.UTIL = {
      unConvertDate: function (date) {
        var md = date.substr(8,2)+'-'+date.substr(5,2)+'-'+date.substr(0,4);
        return md;
      },

      convertDate: function (date) {
//        var convert = date.substr(6,4)+'-'+date.substr(3,2)+'-'+date.substr(0,2);
        var convert = new Date(parseInt(date.substr(6,4)), parseInt(date.substr(3,2))-1, parseInt(date.substr(0,2)));
        return convert;
      },

      checkAvatar: function (obj) {
        var gender, race, age;

        gender = obj.gender;
        race = obj.race;
        age = this.getAge(obj.dob);
        if (gender === 'F') {
          if (race === 'preto' || race === 'indigena' || race === 'pardo') {
              if(age>49) { return 3; }
              else if(age>25) { return 2; }
              else { return 1; }
          }
          else if(race === 'amarelo')
          {
              if(age>49) { return 9; }
              else if(age>25) { return 8; }
              else { return 7; }

          }
          else if(race === 'branco')
          {
              if(age>49) { return 14; }
              else if(age>25) { return 8; }
              else { return 13; }

          }
        }
        else if (gender === 'M') {
          if (race === 'preto' || race === 'indigena' || race === 'pardo') {
              if(age>49) { return 6; }
              else if(age>25) { return 5; }
              else { return 4; }
          }
          else if(race === 'amarelo')
          {
              if(age>49) { return 12; }
              else if(age>25) { return 11; }
              else { return 10; }

          }
          else if(race === 'branco')
          {
              if(age>49) { return 16; }
              else if(age>25) { return 11; }
              else { return 15; }
          }
        }
      },

      getAge: function (dateString, canIcheckAge) {
        dateString = this.convertDate(dateString);
        var today, birthDate, age, m;
        today = new Date();
        birthDate = new Date(Date.parse(dateString));
        age = today.getFullYear() - birthDate.getFullYear();
        m = today.getMonth() - birthDate.getMonth();

        if (birthDate> today) { return -1 }

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age;
      },

      checkAge: function (age, canIcheckAge) {
        if ((age > 12 && age < 120) || (canIcheckAge === false)) {
            localStorage.setItem('dobValid', true);
        } else {
            localStorage.setItem('dobValid', false);
        }
      },

      checkForm:function(params, thirteenYears){
        var ret = {"error":false, "msg":""};
        var labels = {
          dob: "Data de nascimento",
          email: "Email",
          gender: "Sexo",
          nick: "Apelido",
          race: "Raça/cor",
          relationship: "Parentesco",
          password:"Senha",
        }

        for(var i in params)
        {
          if(params[i]===undefined||params[i]==='')
          {
            ret.error=true;
            ret.msg = "O campo "+labels[i]+" está vázio!";
            break;
          } else {
            //validating age
            if(i==='dob')
            {
              var age = this.getAge(params[i]);
              if (isNaN(age) || age<0 || (thirteenYears && age < 13)){ ret.error = true; ret.msg = "Data de nascimento inválida."; break; }
            }
            //validating email
            if(i==='email')
            {
              if(this.checkEmail(params[i])===false){ ret.error = true; ret.msg = "Email inválido."; break; }
            }
            //validating pass
            if(i==='password' && params[i].length<6){ ret.error = true; ret.msg = "A senha precisa ter no mínimo 6 dígitos"; break; }
          }
        }
        return ret;
      },

      checkEmail:function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      getDaysArray: function (year, month) {
        var date = new Date(year, month - 1, 1);
        var result = [];

        while (date.getMonth() === month - 1) {
          result.push(date.getDate());
          date.setDate(date.getDate() + 1);
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
        controller: 'CadastroCtrl',
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
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/profile/household/:id', {
        templateUrl: 'views/profile-internal.html',
        controller: 'ProfileInternalCtrl',
        controllerAs: 'profileInternal',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/health-daily', {
        templateUrl: 'views/health-daily.html',
        controller: 'HealthDailyCtrl',
        controllerAs: 'healthDaily',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/health-daily/household/:id', {
        templateUrl: 'views/health-daily-household.html',
        controller: 'HealthDailyHouseholdCtrl',
        controllerAs: 'healthDailyHousehold',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/health-tips', {
        templateUrl: 'views/health-tips.html',
        controller: 'HealthTipsCtrl',
        controllerAs: 'healthTips',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/news', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl',
        controllerAs: 'news',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/profile/add', {
        templateUrl: 'views/add-profile.html',
        controller: 'AddProfileCtrl',
        controllerAs: 'addProfile',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/survey', {
        templateUrl: 'views/survey.html',
        controller: 'SurveyCtrl',
        controllerAs: 'survey',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/survey/:id/step-1', {
        templateUrl: 'views/how-are-you-feeling.html',
        controller: 'HowAreYouFeelingCtrl',
        controllerAs: 'howAreYouFeeling',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/survey/household/:id/step-1', {
        templateUrl: 'views/how-are-you-feeling.html',
        controller: 'HowAreYouFeelingCtrl',
        controllerAs: 'howAreYouFeeling',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/survey/:id/step-2', {
        templateUrl: 'views/choose-symptoms.html',
        controller: 'ChooseSymptomsCtrl',
        controllerAs: 'chooseSymptoms',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/survey/household/:id/step-2', {
        templateUrl: 'views/choose-symptoms.html',
        controller: 'ChooseSymptomsCtrl',
        controllerAs: 'chooseSymptoms',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/noticias', {
        templateUrl: 'views/noticias.html',
        controller: 'NoticiasCtrl',
        controllerAs: 'noticias'
      })
      .when('/profile/change-photo/:user_id', {
        templateUrl: 'views/change-photo.html',
        controller: 'ChangePhotoCtrl',
        controllerAs: 'changePhoto',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/profile/household/change-photo/:household_id', {
        templateUrl: 'views/change-photo.html',
        controller: 'ChangePhotoCtrl',
        controllerAs: 'changePhoto',
        resolve: {loggedin: checkLoggedOut}
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
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/dashboard/analysis', {
        templateUrl: 'views/data-analysis.html',
        controller: 'DataAnalysisCtrl',
        controllerAs: 'dataAnalysis',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/dashboard/analysis/result', {
        templateUrl: 'views/dashboard-result.html',
        controller: 'DashboardResultCtrl',
        controllerAs: 'dashboardResult',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/dashboard/map', {
        templateUrl: 'views/dashboard-map.html',
        controller: 'DashboardMapCtrl',
        controllerAs: 'dashboardMap',
        resolve: {loggedin: checkLoggedOut}
      })
      .when('/dashboard/download', {
        templateUrl: 'views/data-download.html',
      controller: 'DataDownloadCtrl',
        controllerAs: 'dataDownload',
        resolve: {loggedin: checkLoggedOut}
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
      enabled: true,// set false to development
      requireBase: false
    });
  });
