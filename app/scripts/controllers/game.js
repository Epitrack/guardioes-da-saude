'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('GameCtrl', ['$scope', '$location', 'Notification', function($scope, $location, Notification) {

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
        $scope.questions = {
            1: [{
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: true,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }, {
                question: "Qual tipo de micro-organismo é responsável pela dengue?",
                img1: "../images/game/btn_questao.svg",
                img2: "../images/game/quebracabeca/natacao1.svg",
                active: false,
                options: [{ label: "Virus", iscorrect: true }, { label: "Bactéria", iscorrect: false }, { label: "Fungo", iscorrect: false }]
            }]
        }

        $scope.setfase = function(val, $event) {
            $scope.current_fase = val;
            $scope.prepareQuestions();
            // $event.stopPropagation();
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
        $scope.escolher = function(k, k1) {
            $scope.questions_view[k][k1].active = !$scope.questions_view[k][k1].active;
            console.log(k, k1, $scope.questions_view[k][k1].active);
            console.log(k, k1, $scope.questions_view[k][k1]);
        }

    }]);
