'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('GameCtrl', ['$scope', '$location','$http', 'Notification', function($scope, $location, $http, Notification) {

        /*controle do slide - TUTORIAL*/

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.slide_active = 0;
        $scope.current = 0;
        $scope.slides = [{
            index: 0,
            image: '../../images/game/tutorial-step-1.svg',
            text: 'Bem-vindo à nossa pista de corrida! Arraste para saber mais sobre como jogar.'
        }, {
            index: 1,
            image: '../../images/game/tutorial-step-2.svg',
            text: 'Para jogar, é preciso ter pontos de energia. Participe diariamente do Guardiões da Saúde para ganhá-los!'
        }, {
            index: 2,
            image: '../../images/game/tutorial-step-3.svg',
            text: 'Nossa pista de corrida é formada por fases. Conclua cada fase para chegar mais longe na corrida!'
        }, {
            index: 3,
            image: '../../images/game/tutorial-step-4.svg',
            text: 'Cada fase contém um quebra-cabeça. Complete-o para passar de fase.'
        }, {
            index: 4,
            image: '../../images/game/tutorial-step-5.svg',
            text: 'Responda corretamente as perguntas sobre saúde para revelar peças.'
        }, {
            index: 5,
            image: '../../images/game/tutorial-step-6.svg',
            text: 'Colecione figurinhas dos esportes olímpicos após concluir cada fase!'
        }];


        $scope.next = function() {
            if ($scope.current < 6) {
                $(".carousel").carousel('next');
            } else {
                $location.path('/game/home');
            }
        }

        $scope.setcurrent = function(index) {
            $scope.current = index;
            console.log($scope.current);
        }


        $scope.updateslide = function() {
            $("#slideshow .carousel-control").css({
                'display': 'none'
            });
            $("#slideshow .carousel-indicators").css({
                'display': 'none'
            });
            $("#slideshow .carousel-indicators li.active").css({
                'border': '1px solid white'
            });
            $("#slideshow .carousel-indicators li").css({
                'border': '1px solid white'
            });
            $(".carousel").on('slid.bs.carousel', function() {
                var currentIndex = $('div.active').index() + 1;
                angular.element($(".game-tutorial")).scope().setcurrent(currentIndex);
            });
        };
        /*\controle do slide - TUTORIAL*/
        $scope.current_fase = 1;
        $scope.questions_view = [];
        $scope.k = 0;
        $scope.k1 = 0;
        $scope.questions = {
            1: [{
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "1Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "2Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "3Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "4Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "5Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "6Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "7Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "8Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }]
        }

        $scope.openmodal = function(key, val, $event) {
            $scope.clean(key);
            if (key === 'fase') {
                $scope.current_fase = val;
                $scope.prepareQuestions();
            } else if (key === 'points') {

            }
        }

        $scope.prepareQuestions = function() {
            var count = 0;
            var objs = [];
            $scope.questions_view = [];
            for (var i = 0; i < $scope.questions[$scope.current_fase].length; i++) {
                if (count < 3) {
                    objs.push($scope.questions[$scope.current_fase][i]);
                    count++;
                } else {
                    $scope.questions_view.push(objs);
                    objs = [];
                    count = 0;
                    //
                    objs.push($scope.questions[$scope.current_fase][i]);
                    count++;
                }
            }
            $scope.questions_view.push(objs);
        };

        $scope.clean = function(key) {
            $(".panel_internal_game").each(function() {
                $(this).hide();
            });
            $("#panel_header_game").show();
            if (key === 'fase') {
                $scope.show("panel_mosaico", true);
                $("#op1").attr("class", "game-resposta-neutro");
                $("#op2").attr("class", "game-resposta-neutro");
                $("#op3").attr("class", "game-resposta-neutro");
                $("#pergunta").attr("class", "game-card-neutro");
            } else if (key === 'points') {
                $scope.show("panel_resultado", true);
                $("#panel_header_game").hide();
            }
        };

        $scope.responder = function(op) {
            if ($scope.questions_view[$scope.k][$scope.k1].options[op].iscorrect) {
                $("#op" + (op + 1)).attr("class", "game-resposta-certa");
                $("#pergunta").attr("class", "game-card-certa");
                $("#pergunta").html("");
            } else {
                $("#op" + (op + 1)).attr("class", "game-resposta-errada");
            }
        };

        $scope.escolher = function(k, k1) {
            $scope.k = k;
            $scope.k1 = k1;
            $("#pergunta").html($scope.questions_view[k][k1].question);
            $("#op1").html($scope.questions_view[k][k1].options[0].label);
            $("#op2").html($scope.questions_view[k][k1].options[1].label);
            $("#op3").html($scope.questions_view[k][k1].options[2].label);
            $scope.show("panel_mosaico", false);
            $scope.show("panel_pergunta", true);
            setTimeout(function() { $scope.$apply(); });
        };

        $scope.show = function(key, flag) {
            if (flag) {
                $("#" + key).show();
            } else {
                $("#" + key).hide();
            }
        };

        $scope.getRanking = function() {
            $http.get("http://rest.guardioesdasaude.org/game/ranking/").then(function(result) {
                console.log(result);
            }, function(err) {
                console.log(err);
            });
        };
        $scope.getRanking();

    }]);
