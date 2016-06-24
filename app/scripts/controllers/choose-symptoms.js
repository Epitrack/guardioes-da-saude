'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:ChooseSymptomsCtrl
 * @description
 * # ChooseSymptomsCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('ChooseSymptomsCtrl', ['$scope', '$translate', 'Surveyapi', '$location', 'LocalStorage', '$timeout', '$window', '$facebook', 'Notification', '$rootScope', 'moment', function($scope, $translate, Surveyapi, $location, LocalStorage, $timeout, $window, $facebook, Notification, $rootScope, moment) {

        // get all symptoms
        Surveyapi.getSymptoms(function(data) {
            $scope.symptomsL = data.data.data;
            console.log($scope.symptomsList);
            $scope.symptomsList = [];
            for (var i = 0; i < $scope.symptomsL.length; i++) {
                $scope.getNames($scope.symptomsL[i], $scope.symptomsList);
            }
        });

        var DEPARA = {
            "Febre": "00231",
            "Manchas vermelhas no corpo": "00357",
            "Dor no corpo": "00175",
            "Dor nas juntas": "00174",
            "Dor de cabeça": "00172",
            "Coceira": "00113",
            "Olhos vermelhos": "00426",
            "Dor de garganta": "00173",
            "Tosse": "00620",
            "Falta de ar": "00229",
            "Náusea ou Vômito": "00395",
            "Diarreia": "00159",
            "Sangramento": "00529"
        };

        $scope.getNames = function(obj, arr) {
            var index = DEPARA[obj.name];
            $translate([index]).then(function(translations) {
                obj.name_translate = translations[index];
                arr.push(obj);
            });
        };

        // report survey
        $scope.symptoms = {};

        $scope.submitform = function() {
            var isvalid = false;
            angular.forEach($scope.symptoms, function(v, symptom) {
                if (v) {
                    isvalid = true;
                }
            });
            if (isvalid) {
                $("#confirm-send-survey").modal("show");
            }
        }

        $scope.submitSurvey = function() {
            var form = {};
            var country;

            if ($scope.symptoms.travelLocation) {
                country = $scope.symptoms.travelLocation;
            }
            var isvalid = false;
            angular.forEach($scope.symptoms, function(v, symptom) {
                if (v) {
                    isvalid = true;
                    form[symptom] = "Y";
                }
            });
            form.ill_date = moment().format('YYYY-MM-DD');
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
            if (isvalid) {
                Surveyapi.submitSurvey(form, function(data) {
                    // console.warn(data);
                    if (data.data.error === true) {
                        // console.warn(data.data.message);
                        Notification.show('error', 'Survey', data.data.message);
                    } else {
                        // console.log(data.data.message);
                        Notification.show('success', 'Survey', data.data.message);
                        if (data.data.respiratoria === true || data.data.diarreica === true) {
                            angular.element('#modal-sindromes').modal({ show: 'true' });
                        } else if (data.data.exantematica === true) {
                            angular.element('#modal-exantematica').modal({ show: 'true' });
                        } else {
                            angular.element('#modal-thanks').modal({ show: 'true' });
                        }
                    }
                });
            }
        };

        $scope.goToUpas = function() {
            $timeout(function() {
                    $location.path('/health-tips');
                },
                400);

            $rootScope.aside = 'upas';
        };

        $scope.goToHome = function() {
            $timeout(function() {
                    $location.path('/health-daily');
                },
                300);
        };

        $scope.share = function(social) {
            var text = 'Eu faço minha parte, faça sua parte também no combate ao mosquito Aedes aegypti #ZikaZero. Acesse: www.guardioesdasaude.org';

            $translate(['00223']).then(function(translations) {
                text = translations['00223'];

                var url = 'http://guardioesdasaude.org';

                if (social === 'facebook') {
                    $facebook.ui({
                        method: 'share',
                        href: url
                    }).then(function() {
                        Notification.show('success', 'Compartilhar', 'Obrigado por compartilhar');
                        angular.element('#modal-i-feel-good').modal('hide');
                    }, function(error) { console.warn("error -->", error); });
                } else {
                    $window.open('https://twitter.com/home?status=' + text);
                }
            });
        };

    }]);
