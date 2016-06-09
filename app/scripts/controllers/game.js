'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('GameCtrl', ['$scope', '$timeout', '$translate', '$location', '$http', 'Notification', function($scope, $timeout, $translate, $location, $http, Notification) {



        var w = $("#img_bg").width();
        $scope.fasespics = [{
            "name": "vitoria",
            "path": "/images/game/fases/aquaticas/",
            top: (0.33 * w) + "px",
            left: "45.6%"
        }, {
            "name": "aquaticas",
            "path": "/images/game/fases/aquaticas/",
            top: (0.3901 * w) + "px",
            left: "70.4%"
        }, {
            "name": "atletismo",
            "path": "/images/game/fases/atletismo/",
            top: (0.53 * w) + "px",
            left: "37.2%"
        }, {
            "name": "badminton",
            "path": "/images/game/fases/badminton/",
            top: (0.5604 * w) + "px",
            left: "18.2%"
        }, {
            "name": "basquete",
            "path": "/images/game/fases/basquete/",
            top: (0.70 * w) + "px",
            left: "14.9%"
        }, {
            "name": "boxe",
            "path": "/images/game/fases/boxe/",
            top: (0.7404 * w) + "px",
            left: "34.1%"
        }, {
            "name": "canoagem",
            "path": "/images/game/fases/canoagem/",
            top: (0.7744 * w) + "px",
            left: "63.1%"
        }, {
            "name": "canoagemslalon",
            "path": "/images/game/fases/canoagemslalon/",
            top: (0.8704 * w) + "px",
            left: "77.29%"
        }, {
            "name": "ciclismo",
            "path": "/images/game/fases/ciclismo/",
            top: (1.0192 * w) + "px",
            left: "74.6%"
        }, {
            "name": "ciclismoBMX",
            "path": "/images/game/fases/ciclismoBMX/",
            top: (1.1492 * w) + "px",
            left: "21.8%"
        }, {
            "name": "ciclismoestrada",
            "path": "/images/game/fases/ciclismoestrada/",
            top: (1.2392 * w) + "px",
            left: "12.3%"
        }, {
            "name": "esgrima",
            "path": "/images/game/fases/esgrima/",
            top: (1.3312 * w) + "px",
            left: "15.9%"
        }, {
            "name": "futebol",
            "path": "/images/game/fases/futebol/",
            top: (1.3652 * w) + "px",
            left: "28.9%"
        }, {
            "name": "ginasticaartistica",
            "path": "/images/game/fases/ginasticaartistica/",
            top: (1.3732 * w) + "px",
            left: "42.4%"
        }, {
            "name": "ginasticadetrampolim",
            "path": "/images/game/fases/ginasticadetrampolim/",
            top: (1.3772 * w) + "px",
            left: "55.8%"
        }, {
            "name": "ginasticaritmca",
            "path": "/images/game/fases/ginasticaritmca/",
            top: (1.3952 * w) + "px",
            left: "68.3%"
        }, {
            "name": "golfe",
            "path": "/images/game/fases/golfe/",
            top: (1.4572 * w) + "px",
            left: "78.1%"
        }, {
            "name": "grecoromana",
            "path": "/images/game/fases/grecoromana/",
            top: (1.4572 * w) + "px",
            left: "78.1%"
        }, {
            "name": "handball",
            "path": "/images/game/fases/handball/",
            top: (1.5672 * w) + "px",
            left: "78.6%"
        }, {
            "name": "hipismo",
            "path": "/images/game/fases/hipismo/",
            top: (1.6412 * w) + "px",
            left: "70.6%"
        }, {
            "name": "hipismoCCE",
            "path": "/images/game/fases/hipismoCCE/",
            top: (1.6532 * w) + "px",
            left: "56.1%"
        }, {
            "name": "hipismosalto",
            "path": "/images/game/fases/hipismosalto/",
            top: (1.6412 * w) + "px",
            left: "42%"
        }, {
            "name": "hoqueidegrama",
            "path": "/images/game/fases/hoqueidegrama/",
            top: (1.6351999999999998 * w) + "px",
            left: "26.5%"
        }, {
            "name": "judo",
            "path": "/images/game/fases/judo/",
            top: (1.6712 * w) + "px",
            left: "13.9%"
        }, {
            "name": "levantamentodepeso",
            "path": "/images/game/fases/levantamentodepeso/",
            top: (1.7631999999999999 * w) + "px",
            left: "10.2%"
        }, {
            "name": "lutalivre",
            "path": "/images/game/fases/lutalivre/",
            top: (1.8732 * w) + "px",
            left: "16.5%"
        }, {
            "name": "nadosincronizado",
            "path": "/images/game/fases/nadosincronizado/",
            top: (1.9932000000000003 * w) + "px",
            left: "69.7%"
        }, {
            "name": "natacao",
            top: (2.0658000000000003 * w) + "px",
            left: "77.8%"
        }, {
            "name": "pentlatomoderno",
            "path": "/images/game/fases/pentlatomoderno/",
            top: (2.1718 * w) + "px",
            left: "76.8%"
        }, {
            "name": "poloaquatico",
            "path": "/images/game/fases/poloaquatico/",
            top: (2.2538 * w) + "px",
            left: "69%"
        }, {
            "name": "remo",
            "path": "/images/game/fases/remo/",
            top: (2.2978000000000005 * w) + "px",
            left: "55.69%"
        }, {
            "name": "rugby",
            "path": "/images/game/fases/rugby/",
            top: (2.32 * w) + "px",
            left: "41.3%"
        }, {
            "name": "saltosornamentais",
            "path": "/images/game/fases/saltosornamentais/",
            top: (2.3480000000000003 * w) + "px",
            left: "27.8%"
        }, {
            "name": "taekwondo",
            "path": "/images/game/fases/taekwondo/",
            top: (2.404 * w) + "px",
            left: "14.5%"
        }, {
            "name": "tenis",
            "path": "/images/game/fases/tenis/",
            top: (2.54 * w) + "px",
            left: "12.2%"
        }, {
            "name": "tenisdemesa",
            "path": "/images/game/fases/tenisdemesa/",
            top: (2.6319999999999997 * w) + "px",
            left: "20.9%"
        }, {
            "name": "tirocomarco",
            "path": "/images/game/fases/tirocomarco/",
            top: (2.674 * w) + "px",
            left: "34.9%"
        }, {
            "name": "tiroesportivo",
            "path": "/images/game/fases/tiroesportivo/",
            top: (2.696 * w) + "px",
            left: "49.9%"
        }, {
            "name": "triatlo",
            "path": "/images/game/fases/triatlo/",
            top: (2.7239999999999998 * w) + "px",
            left: "64.9%"
        }, {
            "name": "vela",
            "path": "/images/game/fases/vela/",
            top: (2.7960000000000003 * w) + "px",
            left: "76.2%"
        }, {
            "name": "voleyball",
            "path": "/images/game/fases/voleyball/",
            top: (2.904 * w) + "px",
            left: "78.7%"
        }, {
            "name": "voleypraia",
            "path": "/images/game/fases/voleypraia/",
            top: (2.998 * w) + "px",
            left: "71.8%"
        }, {
            "name": "voleypraia",
            "path": "/images/game/fases/voleypraia/",
            top: (3.062 * w) + "px",
            left: "58.8%"
        }, {
            "name": "voleypraia",
            "path": "/images/game/fases/voleypraia/",
            top: (3.096 * w) + "px",
            left: "41.8%"
        }];

        $scope.pontos_total="";
        $translate(['00650']).then(function(translations) {
            $scope.pontos_total=translations['00650'].replace("10","5");
        });
        $translate(['00066', '00448', '00406', '00088', '00509', '00114']).then(function(translations) {
            $scope.slides = [{
                index: 0,
                image: '../../images/game/tutorial-step-1.svg',
                text: translations['00066']
            }, {
                index: 1,
                image: '../../images/game/tutorial-step-2.svg',
                text: translations['00448']
            }, {
                index: 2,
                image: '../../images/game/tutorial-step-3.svg',
                text: translations['00406']
            }, {
                index: 3,
                image: '../../images/game/tutorial-step-4.svg',
                text: translations['00088']
            }, {
                index: 4,
                image: '../../images/game/tutorial-step-5.svg',
                text: translations['00509']
            }, {
                index: 5,
                image: '../../images/game/tutorial-step-6.svg',
                text: translations['00114']
            }];
        });

        /*controle do slide - TUTORIAL*/
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.slide_active = 0;
        $scope.current = 0;
        /*\controle do slide - TUTORIAL*/
        $scope.current_fase = 1;
        $scope.questions_view = [];
        $scope.k = 0;
        $scope.k1 = 0;
        $scope.slides = [];
        $scope.responses = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.imgs = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

        $scope.setstage = function() {

        };

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


        $scope.buildquestions = function(callback) {
            /*
            rest.guardioesdasaude.org/game/questions/?lang=pt_BR
            */
            $http.get("http://rest.guardioesdasaude.org/game/questions/?lang=pt_BR").then(function(result) {
                $scope.questions = result.data;
                for (var i = 0; i < $scope.questions.length; i++) {
                    $scope.questions[i].img1 = "../images/game/btn_questao.svg";
                    $scope.questions[i].img2 = ".." + $scope.fasespics[$scope.current_fase].path + "puzzle/" + $scope.imgs[i] + ".png";
                }
                console.log($scope.questions);
                callback();
            }, function(err) {
                console.log(err);
            });
        };

        $scope.questions = [];

        $scope.openmodal = function(key, val, $event) {
            $scope.current_fase = val;
            $scope.buildquestions(function() {
                $scope.clean(key);
                if (key === 'fase') {
                    $scope.prepareQuestions();
                } else if (key === 'points') {

                }
            });
        }

        $scope.prepareQuestions = function() {
            var count = 0;
            var objs = [];
            $scope.questions_view = [];
            console.log($scope.questions.length);
            for (var i = 0; i < $scope.questions.length; i++) {
                if (count < 3) {
                    objs.push($scope.questions[i]);
                    count++;
                } else {
                    $scope.questions_view.push(objs);
                    objs = [];
                    count = 0;
                    //
                    objs.push($scope.questions[i]);
                    count++;
                }
            }
            $scope.questions_view.push(objs);
            console.log($scope.questions_view);
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
            if ($scope.questions_view[$scope.k][$scope.k1].alternatives[op].correct) {
                $("#op" + (op + 1)).attr("class", "game-resposta-certa");
                $("#pergunta").attr("class", "game-card-certa");
                $("#pergunta").html('<div style="width: 190px; color: white; font-weight: bold; font-size: 1.8em; line-height: 45px;"> Resposta CORRETA!</div>');
                $scope.questions_view[$scope.k][$scope.k1].active = true;
                $scope.responses[(($scope.k * (7 / 2)) + ($scope.k1 * (3 / 2))) - 1] = 1;
                console.log($scope.responses);
                $timeout(function() {
                    $scope.clean('fase');
                }, 1000);

            } else {
                $("#op" + (op + 1)).attr("class", "game-resposta-errada");
            }
        };

        $scope.escolher = function(k, k1) {
            console.log("k, k1", k, k1);
            $scope.k = k;
            $scope.k1 = k1;
            $("#pergunta").html($scope.questions_view[k][k1].title);
            $("#op1").html($scope.questions_view[k][k1].alternatives[0].option);
            $("#op2").html($scope.questions_view[k][k1].alternatives[1].option);
            $("#op3").html($scope.questions_view[k][k1].alternatives[2].option);
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
