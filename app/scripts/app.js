'use strict';

/**
 * @ngdoc overview
 * @name gdsApp
 * @description
 * # gdsApp
 *
 * Main module of the application.
 */
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

angular
    .module('gdsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ChartAngular',
        'ngMask',
        'angularMoment',
        'ngFileUpload',
        'ngMap',
        'ngFacebook',
        'ngMaterial',
        'ng-sortable'
    ])
    .config(function($facebookProvider, $mdGestureProvider) {
      $facebookProvider.setAppId('961547147258065');
      $mdGestureProvider.skipClickHijack();
    })
    .run(['$rootScope', 'LocalStorage', 'amMoment', '$location', 'ApiConfig', function($rootScope, LocalStorage, amMoment, $location, ApiConfig) {

        if ($location.$$host.indexOf('localhost') > -1 || $location.$$host.indexOf('dev') > -1) {
            ApiConfig.API_URL = 'http://rest.guardioesdasaude.org';
            ApiConfig.ANALYTICS_ID = 'UA-71659608-1';
        }

        // console.warn('ApiConfig -> ', ApiConfig);

        // moment js
        amMoment.changeLocale('pt-br');
        // ====

        // check if user exist
        var u = LocalStorage.getItem('userStorage');


        if (u !== null) {
            $rootScope.user = u;
        }

        // console.log('app.run: user', $rootScope.user);
        // ====

        // ====
        $rootScope.body_is_ok = false;

        $rootScope.onInit = function() {
            $rootScope.body_is_ok = true;
        };
        // ====

        // Helpers functions
        $rootScope.UTIL = {
            unConvertDate: function(date) {
                var md = date.substr(8, 2) + '-' + date.substr(5, 2) + '-' + date.substr(0, 4);
                return md;
            },

            convertDate: function(date) {
                var convert = new Date(parseInt(date.substr(6, 4)), parseInt(date.substr(3, 2)) - 1, parseInt(date.substr(0, 2)));
                return convert;
            },

            checkAvatar: function(obj) {
                var gender, race, age;
                gender = obj.gender;
                race = obj.race;
                age = this.getAge(obj.dob);
                if (gender === 'F') {
                    switch (race) {
                        case 'branco':
                        case 'indigena':
                            return 8;
                        case 'preto':
                            return 1;
                        case 'pardo':
                            return 2;
                        case 'amarelo':
                            return 7;
                        default:
                            return 0;
                    }
                } else if (gender === 'M') {

                    switch (race) {
                        case 'branco':
                            return 11;
                        case 'preto':
                            return 5;
                        case 'pardo':
                        case 'indigena':
                            return 4;
                        case 'amarelo':
                            return 10;
                        default:
                            return 0;
                    }
                }
            },

            getAge: function(dateString) {
                dateString = this.convertDate(dateString);
                var today, birthDate, age, m;
                today = new Date();
                birthDate = new Date(Date.parse(dateString));
                age = today.getFullYear() - birthDate.getFullYear();
                m = today.getMonth() - birthDate.getMonth();

                if (birthDate > today) {
                    return -1;
                }

                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                return age;
            },

            checkAge: function(age, canIcheckAge) {
                if ((age > 12 && age < 120) || (canIcheckAge === false)) {
                    localStorage.setItem('dobValid', true);
                } else {
                    localStorage.setItem('dobValid', false);
                }
            },

            checkForm: function(params, thirteenYears) {
                var ret = { "error": false, "msg": "" };
                var labels = {
                    dob: "Data de nascimento",
                    email: "Email",
                    gender: "Sexo",
                    nick: "Apelido",
                    race: "Raça/cor",
                    relationship: "Parentesco",
                    password: "Senha",
                    repeat_password: "Repita a senha"
                };

                for (var i in params) {
                    if (params[i] === undefined || params[i] === '') {
                        ret.error = true;
                        ret.msg = "O campo " + labels[i] + " está vázio!";
                        break;
                    } else {
                        //validating age
                        if (i === 'dob') {
                            var age = this.getAge(params[i]);
                            if (isNaN(age) || age < 0 || (thirteenYears && age < 13) || age > 120 || params[i].length < 10) {
                                ret.error = true;
                                ret.msg = "Data de nascimento inválida.";
                                break;
                            }
                        }
                        //validating email
                        if (i === 'email') {
                            if (this.checkEmail(params[i]) === false) {
                                ret.error = true;
                                ret.msg = "Email inválido.";
                                break;
                            }
                        }
                        //validating pass
                        if (i === 'password' && params[i].length < 6) {
                            ret.error = true;
                            ret.msg = "A senha precisa ter no mínimo 6 dígitos";
                            break;
                        }
                        if (i === 'repeat_password' && params[i] !== params.password) {
                            ret.error = true;
                            ret.msg = "As senhas digitadas precisam ser iguais.";
                            break;
                        }
                    }
                }
                return ret;
            },

            checkEmail: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },

            getDaysArray: function(year, month) {
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

.config(function($routeProvider, $locationProvider) {
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
            controller: 'NewsCtrl',
            controllerAs: 'news'
        })
        .when('/profile/change-photo/:user_id', {
            templateUrl: 'views/change-photo.html',
            controller: 'ChangePhotoCtrl',
            controllerAs: 'changePhoto',
            resolve: { loggedin: checkLoggedOut }
        })
        .when('/profile/household/change-photo/:household_id', {
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
        .when('/submit', {
            templateUrl: 'views/help.html',
            controller: 'HelpCtrl',
            controllerAs: 'help'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: false, // set false to development
        requireBase: false
    });
}).directive('onCarouselChange', function($parse) {
    return {
        require: 'carousel',
        link: function(scope, element, attrs, carouselCtrl) {
            var fn = $parse(attrs.onCarouselChange);
            var origSelect = carouselCtrl.select;
            carouselCtrl.select = function(nextSlide, direction) {
                if (nextSlide !== this.currentSlide) {
                    fn(scope, {
                        nextSlide: nextSlide,
                        direction: direction,
                    });
                }
                return origSelect.apply(this, arguments);
            };
        }
    };
});

_.groupByMulti = function(obj, values, context) {
    if (!values.length)
        return obj;
    var byFirst = _.groupBy(obj, values[0], context),
        rest = values.slice(1);
    for (var prop in byFirst) {
        byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
    /*var obj = {};*/
    /*for (var prop in byFirst) {
        if (byFirst[prop].length === undefined) {
            obj[prop] = byFirst[prop];
        } else {
            obj[prop] = byFirst[prop].length
        }
    }
    console.log(obj);*/
    return byFirst;
};


_.groupBygroup = function(data, key, index, delimiter) {
    var SIM = {};
    _.map(data, function(o) {
        if (o[key[0]] !== undefined) {
            var d = o[key[index]].split(delimiter);
            for (var i in d) {
                if (d[i] !== '') {
                    if (SIM[d[i]] === undefined) {
                        SIM[d[i]] = 0;
                    }
                    SIM[d[i]]++;
                }
                return o;
            }
        }
    });
    var keys = key;
    keys = keys.slice(1);
    /**/
    var obj = {};

    if (key[1] !== undefined) {
        for (var o in SIM) {
            var f = _.filter(data, function(obj) {
                return _.contains(obj[key[index]].split(delimiter), o)
            });
            var g = _.groupBy(f, function(obj) {
                return obj[key[1]]
            });
            obj[o] = g;
        }
    } else {
        obj = SIM;
    }

    console.log(SIM);
    console.log(obj);
    /**/
    return obj;
}
