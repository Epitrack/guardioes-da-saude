'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('GameCtrl', ['$scope', '$timeout', '$translate', 'ApiConfig', '$location', '$http', 'Notification', 'LocalStorage', function($scope, $timeout, $translate, ApiConfig, $location, $http, Notification, LocalStorage) {
        var app_token = ApiConfig.APP_TOKEN;

        var w = $("#img_bg").width();
        var firstLoad = true;
        $scope.loading = true;
        $scope.stars = 0;
        $scope.fasespics = [{
            "title": "Vitória",
            "name": "vitoria",
            "path": "/images/game/fases/vitoria/",
            top: (0.33 * w) + "px",
            left: "45.6%",
            "id": 43
        }, {
            "title": "Aquáticas",
            "name": "aquaticas",
            "path": "/images/game/fases/aquaticas/",
            top: (0.3901 * w) + "px",
            left: "70.4%",
            "id": 42
        }, {
            "title": "Atletismos",
            "name": "atletismo",
            "path": "/images/game/fases/atletismo/",
            top: (0.53 * w) + "px",
            left: "37.2%",
            "id": 41
        }, {
            "title": "Badminton",
            "name": "badminton",
            "path": "/images/game/fases/badminton/",
            top: (0.5604 * w) + "px",
            left: "18.2%",
            "id": 40
        }, {
            "title": "Basquete",
            "name": "basquete",
            "path": "/images/game/fases/basquete/",
            top: (0.70 * w) + "px",
            left: "14.9%",
            "id": 39
        }, {
            "title": "Boxe",
            "name": "boxe",
            "path": "/images/game/fases/boxe/",
            top: (0.7404 * w) + "px",
            left: "34.1%",
            "id": 38
        }, {
            "title": "Canoagem",
            "name": "canoagem",
            "path": "/images/game/fases/canoagem/",
            top: (0.7744 * w) + "px",
            left: "63.1%",
            "id": 37
        }, {
            "title": "Canoagem Slalon",
            "name": "canoagemslalon",
            "path": "/images/game/fases/canoagemslalon/",
            top: (0.8704 * w) + "px",
            left: "77.29%",
            "id": 36
        }, {
            "title": "Ciclismo",
            "name": "ciclismo",
            "path": "/images/game/fases/ciclismo/",
            top: (1.0192 * w) + "px",
            left: "74.6%",
            "id": 35
        }, {
            "title": "Ciclismo BMX",
            "name": "ciclismoBMX",
            "path": "/images/game/fases/ciclismoBMX/",
            top: (1.1492 * w) + "px",
            left: "21.8%",
            "id": 34
        }, {
            "title": "Ciclismo Estrada",
            "name": "ciclismoestrada",
            "path": "/images/game/fases/ciclismoestrada/",
            top: (1.2392 * w) + "px",
            left: "12.3%",
            "id": 33
        }, {
            "title": "Esgrima",
            "name": "esgrima",
            "path": "/images/game/fases/esgrima/",
            top: (1.3312 * w) + "px",
            left: "15.9%",
            "id": 32
        }, {
            "title": "Futebol",
            "name": "futebol",
            "path": "/images/game/fases/futebol/",
            top: (1.3652 * w) + "px",
            left: "28.9%",
            "id": 31
        }, {
            "title": "Ginástica Artística",
            "name": "ginasticaartistica",
            "path": "/images/game/fases/ginasticaartistica/",
            top: (1.3732 * w) + "px",
            left: "42.4%",
            "id": 30
        }, {
            "title": "Ginástica de Trampolim",
            "name": "ginasticadetrampolim",
            "path": "/images/game/fases/ginasticadetrampolim/",
            top: (1.3772 * w) + "px",
            left: "55.8%",
            "id": 29
        }, {
            "title": "Ginástica Rítmica",
            "name": "ginasticaritmca",
            "path": "/images/game/fases/ginasticaritmca/",
            top: (1.3952 * w) + "px",
            left: "68.3%",
            "id": 28
        }, {
            "title": "Golfe",
            "name": "golfe",
            "path": "/images/game/fases/golfe/",
            top: (1.4572 * w) + "px",
            left: "78.1%",
            "id": 27
        }, {
            "title": "Handball",
            "name": "handball",
            "path": "/images/game/fases/handball/",
            top: (1.5672 * w) + "px",
            left: "78.6%",
            "id": 26
        }, {
            "title": "Hipismo",
            "name": "hipismo",
            "path": "/images/game/fases/hipismo/",
            top: (1.6412 * w) + "px",
            left: "70.6%",
            "id": 25
        }, {
            "title": "Hipismo CCE",
            "name": "hipismoCCE",
            "path": "/images/game/fases/hipismoCCE/",
            top: (1.6532 * w) + "px",
            left: "56.1%",
            "id": 24
        }, {
            "title": "Hipismo Salto",
            "name": "hipismosalto",
            "path": "/images/game/fases/hipismosalto/",
            top: (1.6412 * w) + "px",
            left: "42%",
            "id": 23
        }, {
            "title": "Hoquei de Grama",
            "name": "hoqueidegrama",
            "path": "/images/game/fases/hoqueidegrama/",
            top: (1.6351999999999998 * w) + "px",
            left: "26.5%",
            "id": 22
        }, {
            "title": "Judô",
            "name": "judo",
            "path": "/images/game/fases/judo/",
            top: (1.6712 * w) + "px",
            left: "13.9%",
            "id": 21
        }, {
            "title": "Levantamento de Peso",
            "name": "levantamentodepeso",
            "path": "/images/game/fases/levantamentodepeso/",
            top: (1.7631999999999999 * w) + "px",
            left: "10.2%",
            "id": 20
        }, {
            "title": "Luta livre",
            "name": "lutalivre",
            "path": "/images/game/fases/lutalivre/",
            top: (1.8732 * w) + "px",
            left: "16.5%",
            "id": 19
        }, {
            "title": "Nado sincronizado",
            "name": "nadosincronizado",
            "path": "/images/game/fases/nadosincronizado/",
            top: (1.9932000000000003 * w) + "px",
            left: "69.7%",
            "id": 18
        }, {
            "title": "Natação",
            "name": "natacao",
            top: (2.0658000000000003 * w) + "px",
            left: "77.8%",
            "id": 17
        }, {
            "title": "Pentlato Moderno",
            "name": "pentlatomoderno",
            "path": "/images/game/fases/pentlatomoderno/",
            top: (2.1718 * w) + "px",
            left: "76.8%",
            "id": 16
        }, {
            "title": "Pólo Aquático",
            "name": "poloaquatico",
            "path": "/images/game/fases/poloaquatico/",
            top: (2.2538 * w) + "px",
            left: "69%",
            "id": 15
        }, {
            "title": "Remo",
            "name": "remo",
            "path": "/images/game/fases/remo/",
            top: (2.2978000000000005 * w) + "px",
            left: "55.69%",
            "id": 14
        }, {
            "title": "Rugby",
            "name": "rugby",
            "path": "/images/game/fases/rugby/",
            top: (2.32 * w) + "px",
            left: "41.3%",
            "id": 13
        }, {
            "title": "Saltos Ornamentais",
            "name": "saltosornamentais",
            "path": "/images/game/fases/saltosornamentais/",
            top: (2.3480000000000003 * w) + "px",
            left: "27.8%",
            "id": 12
        }, {
            "title": "Taekwondo",
            "name": "taekwondo",
            "path": "/images/game/fases/taekwondo/",
            top: (2.404 * w) + "px",
            left: "14.5%",
            "id": 11
        }, {
            "title": "Tênis",
            "name": "tenis",
            "path": "/images/game/fases/tenis/",
            top: (2.54 * w) + "px",
            left: "12.2%",
            "id": 10
        }, {
            "title": "Greco Romana",
            "name": "grecoromana",
            "path": "/images/game/fases/grecoromana/",
            top: (2.6319999999999997 * w) + "px",
            left: "20.9%",
            "id": 9
        }, {
            "title": "Tiro com Arco",
            "name": "tirocomarco",
            "path": "/images/game/fases/tirocomarco/",
            top: (2.674 * w) + "px",
            left: "34.9%",
            "id": 8
        }, {
            "title": "Tiro esportivo",
            "name": "tiroesportivo",
            "path": "/images/game/fases/tiroesportivo/",
            top: (2.696 * w) + "px",
            left: "49.9%",
            "id": 7
        }, {
            "title": "Triatlo",
            "name": "triatlo",
            "path": "/images/game/fases/triatlo/",
            top: (2.7239999999999998 * w) + "px",
            left: "64.9%",
            "id": 6
        }, {
            "title": "Vela",
            "name": "vela",
            "path": "/images/game/fases/vela/",
            top: (2.7960000000000003 * w) + "px",
            left: "76.2%",
            "id": 5
        }, {
            "title": "Voleyball",
            "name": "voleyball",
            "path": "/images/game/fases/voleyball/",
            top: (2.904 * w) + "px",
            left: "78.7%",
            "id": 4
        }, {
            "title": "Voley de Praia",
            "name": "voleypraia",
            "path": "/images/game/fases/voleypraia/",
            top: (2.998 * w) + "px",
            left: "71.8%",
            "id": 3
        }, {
            "title": "Pólo Aquático",
            "name": "poloaquatico",
            "path": "/images/game/fases/poloaquatico/",
            top: (3.062 * w) + "px",
            left: "58.8%",
            "id": 2
        }, {
            "title": "Tênis de mesa",
            "name": "tenisdemesa",
            "path": "/images/game/fases/tenisdemesa/",
            top: (3.096 * w) + "px",
            left: "41.8%",
            "id": 1
        }];

        $scope.language = $translate.use();
        $scope.fasespics = $scope.fasespics.reverse();
        /*controle do slide - TUTORIAL*/
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.slide_active = 0;
        $scope.current = 0;
        /*\controle do slide - TUTORIAL*/
        $scope.pontos_total = "";
        $scope.current_fase = 1;
        $scope.current_fase_obj = {};
        $scope.current_question_id = 1;
        $scope.questions_view = [];
        $scope.k = 0;
        $scope.k1 = 0;
        $scope.slides = [];
        // $scope.responses = [0, 0, 1, 1, 1, 1, 1, 1, 0];
        $scope.responses = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.imgs = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
        $scope.questions = [];
        $scope.trofeus = [];
        $scope.trofeusaux = [];
        // $scope.url = "http://rest.guardioesdasaude.org";
        $scope.points = 0;
        $scope.hasSurvey = false;
        $scope.url = ApiConfig.API_URL || "http://rest.guardioesdasaude.org";
        $scope.deparapuzzle = {
            "00": 0,
            "01": 1,
            "02": 2,
            "10": 3,
            "11": 4,
            "12": 5,
            "20": 6,
            "21": 7,
            "22": 8
        };
        $scope.ranking = [
            [{ "country": "Brasil", "flag": "01" }, { "country": "Brasil", "flag": "01" }],
            [{ "country": "Brasil", "flag": "01" }, { "country": "Brasil", "flag": "01" }],
            [{ "country": "Brasil", "flag": "01" }, { "country": "Brasil", "flag": "01" }],
            [{ "country": "Brasil", "flag": "01" }, { "country": "Brasil", "flag": "01" }],
            [{ "country": "Brasil", "flag": "01" }, { "country": "Brasil", "flag": "01" }]
        ];
        var count_pin_venceu = 0;
        var ctd; //function counter down
        var title_sem_energia = "Você está <br/> sem energia!"; //00649
        var title_5pontos = "Você possui <br/> 5 pontos de energia!"; //00650 replace 10 por 5
        var content_5pontos = "Participe diariamente do Guardiões da Saúde para restaurá-las!"; //00457
        var content_amanha = "Participe amanhã do Guardiões da Saúde para jogar novamente!"; //00896
        $scope.participe_agora = "Participe agora!"; //00455
        var resposta_certa = "Resposta CORRETA!"; //00897

        $translate(['00649', '00650', '00457', '00896','00455','00897',]).then(function(translations) {
            title_sem_energia = translations['00649'];
            title_5pontos = translations['00650'].replace("10", "5");
            content_5pontos = translations['00457'];
            content_amanha = translations['00896'];
            $scope.participe_agora = translations['00455'];
            resposta_certa = translations['00897'];
        });

        //salva a fase a questao e a matriz de dados que o usuario ja respondeu
        $scope.savestatus = function(level, puzzleMatriz, questionId) {
            console.log(level, puzzleMatriz, questionId);
            var obj = {
                "level": level,
                "puzzleMatriz": puzzleMatriz,
                "questionId": questionId
            }
            $http.post($scope.url + "/game/", obj, { headers: { 'app_token': app_token, 'user_token': LocalStorage.getItem('userStorage').user_token } }).then(function(result) {
                console.log("game ok ", result)
            }, function(error) {
                console.log("game error", error);
            });
        };

        $scope.getstatus = function() {
            $http.get($scope.url + "/user/lookup", { headers: { 'app_token': app_token, 'user_token': LocalStorage.getItem('userStorage').user_token } }).then(function(result) {
                var o = result.data.data;
                $scope.current_fase_obj = $scope.fasespics[0];
                if (o['level'] === undefined) {
                    $scope.current_fase_obj = $scope.fasespics[0];
                } else {
                    $scope.current_fase_obj = $scope.fasespics[(o['level'] - 1)];
                }
                if (o['answers'] !== undefined) {
                    $scope.responses = o['answers'];
                }
                $scope.points = o['xp'] || 0;
                $scope.modalpoints($scope.points);
                try {
                    $scope.current_fase = $scope.current_fase_obj.id;
                    $("#img_pin").css('top', $scope.fasespics[($scope.current_fase - 1)].top);
                    $("#img_pin").css('left', $scope.fasespics[($scope.current_fase - 1)].left);
                    $("html, body").animate({
                        scrollTop: parseInt($scope.fasespics[($scope.current_fase - 1)].top) - 180
                    }, 400);
                } catch (e) {
                    $scope.current_fase = ($scope.fasespics.length - 1);
                    $("html, body").animate({
                        scrollTop: parseInt($scope.fasespics[$scope.fasespics.length - 1].top) - 180
                    }, 400);
                    $("#img_pin").hide();
                }
                /*insercao */
                if (firstLoad) {
                    for (var i = 0; i < $scope.current_fase - 1; i++) {
                        $scope.addVencido($scope.fasespics[i]);
                    }
                    firstLoad = false;
                }
                console.log("$scope.current_fase", $scope.current_fase);
                console.log("getstatus ok ", result, $scope.current_fase_obj);
            }, function(error) {
                console.log("getstatus error", error);
            });
        };
        $scope.getstatus();


        $translate(['00650']).then(function(translations) {
            $scope.pontos_total = translations['00650'].replace("10", "5");
        });
        $translate(['00066', '00448', '00406', '00088', '00509', '00114']).then(function(translations) {
            $scope.slides = [{
                index: 0,
                image: '../../images/game/tutorial-step-1_'+$scope.language+'.png',
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
                image: '../../images/game/tutorial-step-5_'+$scope.language+'.png',
                text: translations['00509']
            }, {
                index: 5,
                image: '../../images/game/tutorial-step-6.svg',
                text: translations['00114']
            }];
        });

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
            $scope.loading = true;
            $http.get($scope.url + "/game/questions/?lang=" + $scope.getLanguage()).then(function(result) {
                $scope.questions = result.data;
                for (var i = 0; i < $scope.questions.length; i++) {
                    console.log($scope.questions[i]);
                    $scope.questions[i].img1 = "../images/game/btn_questao.svg";
                    $scope.questions[i].img2 = ".." + $scope.fasespics[$scope.current_fase].path + "puzzle/" + $scope.imgs[i] + ".png";
                    if ($scope.responses[i]) {
                        $scope.questions[i].active = true;
                    }
                }
                $scope.loading = false;
                callback();
            }, function(err) {
                console.log(err);
            });
        };

        $scope.finalizou = function() {
            var r = true;
            for (var i = 0; i < $scope.responses.length; i++) {
                if ($scope.responses[i] === 0) {
                    r = false;
                }
            }
            return r;
        };

        $scope.openmodal = function(key, val, $event) {
            // $scope.modalpoints
            if ($scope.points > 0) {
                $("#game-modal").modal("show");
                $scope.buildquestions(function() {
                    $scope.clean(key);
                    if (key === 'fase') {
                        $scope.prepareQuestions();
                    }
                });
            } else {
                $scope.modalpoints();
            }
        };

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
        };

        $scope.clean = function(key) {
            $(".panel_internal_game").each(function() {
                $(this).hide();
            });
            $("#panel_header_game").show();
            if (key === 'fase') {
                $scope.show("nivel_label", true);
                $scope.show("panel_mosaico", true);
                $("#op1").attr("class", "game-resposta-neutro");
                $("#op2").attr("class", "game-resposta-neutro");
                $("#op3").attr("class", "game-resposta-neutro");
                $("#pergunta").attr("class", "game-card-neutro");
            } else if (key === 'points') {
                $scope.show("panel_resultado", true);
                $("#panel_header_game").hide();
            } else if (key === "card") {
                $("#panel_card_img").attr("src", $scope.current_fase_obj.path + "card.png");
                $('#game_modal_panel_card').modal('show');
                $('#game-modal').modal('hide');
            } else if (key === 'pergunta') {
                $scope.show("nivel_label", true);
                $scope.show("panel_pergunta", true);
            } else if (key === 'respostacerta') {
                $scope.show("panel_resposta_certa", true);
                $("#nivel_label").hide();
                $("#parabens_label").show();
            }
        };

        $scope.repetirPergunta = function() {
            $scope.stars = 0;
            $scope.clean('fase');
            $scope.escolher($scope.k, $scope.k1);
        };

        $scope.proximaPergunta = function() {
            $scope.stars = 0;
            $scope.clean('fase');
            if ($scope.k1 < 2) {
                $scope.k1++;
            } else {
                $scope.k++;
                $scope.k1 = 0;
            }
            $scope.escolher($scope.k, $scope.k1);
        };

        $scope.responder = function(op) {
            if ($scope.questions_view[$scope.k][$scope.k1].alternatives[op].correct) {
                //para cronometro
                clearInterval(ctd);
                //
                $("#op" + (op + 1)).attr("class", "game-resposta-certa");
                $("#pergunta").attr("class", "game-card-certa");
                $("#pergunta").html('<div style="width: 190px; color: white; font-weight: bold; font-size: 1.8em; line-height: 45px;">'+resposta_certa+'</div>');
                $scope.questions_view[$scope.k][$scope.k1].active = true;
                var indice = $scope.deparapuzzle['' + $scope.k + '' + $scope.k1];
                if (indice === -1) {
                    indice = 0;
                }
                $scope.responses[indice] = 1;
                $scope.current_question_id = $scope.questions_view[$scope.k][$scope.k1].id;
                $scope.savestatus($scope.current_fase, $scope.responses, $scope.current_question_id);
                $scope.decrementa();
                $timeout(function() {
                    $scope.clean('respostacerta');
                    console.log("STARS", $scope.stars);
                }, 1000);
                $timeout(function() {
                    if ($scope.finalizou()) {
                        $scope.clean('card');
                        $scope.nextPin();
                    }
                }, 1000);

            } else {
                $scope.stars++;
                var _class = $("#op" + (op + 1)).attr("class");
                $("#op" + (op + 1)).attr("class", "game-resposta-errada");
                if (_class !== "game-resposta-errada") {
                    $scope.decrementa();
                }
            }
        };

        $scope.decrementa = function() {
            if ($scope.points > 0) {
                $scope.points--;
            }
            $scope.modalpoints();
            $http.post($scope.url + '/user/update', { "xp": $scope.points }, {
                headers: { 'app_token': app_token, 'user_token': LocalStorage.getItem('userStorage').user_token }
            }).then(function(result) {}, function(error) {});
        };

        $scope.escolher = function(k, k1) {
            console.log("k, k1", k, k1);
            $scope.k = k;
            $scope.k1 = k1;
            $("#pergunta").html($scope.questions_view[k][k1].title);
            $("#op1").html($scope.questions_view[k][k1].alternatives[0].option);
            $("#op2").html($scope.questions_view[k][k1].alternatives[1].option);
            $("#op3").html($scope.questions_view[k][k1].alternatives[2].option);
            $scope.clean("pergunta");
            $scope.counterdown();
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
                console.log("$scope.ranking", result.data);
                $scope.ranking = $scope.montaRanking(result);
                console.log("$scope.ranking", $scope.ranking);
            }, function(err) {
                console.log(err);
            });
        };
        $scope.getRanking();

        $scope.nextPin = function() {
            $scope.stars = 0;
            try {
                $scope.current_fase++;
                $scope.responses = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                $scope.savestatus($scope.current_fase, $scope.responses, "");
                if ($scope.fasespics.length > $scope.current_fase) {
                    $scope.current_fase_obj = $scope.fasespics[$scope.current_fase - 1];
                    $("#img_pin").css('top', $scope.fasespics[$scope.current_fase - 1].top);
                    $("#img_pin").css('left', $scope.fasespics[$scope.current_fase - 1].left);
                    $("html, body").animate({
                        scrollTop: parseInt($scope.fasespics[$scope.current_fase - 1].top) - 180
                    }, 400);
                    var index = $scope.current_fase - 2;
                    $scope.addVencido($scope.fasespics[index]);
                } else {
                    var index = $scope.current_fase - 1;
                    $("#img_pin").hide();
                    $scope.addVencido($scope.fasespics[index]);
                    $scope.addVencido($scope.fasespics[index - 1]);
                }
            } catch (e) {
                console.log(e);
            }
        };

        $scope.addVencido = function(obj) {
            try {
                $scope.trofeusaux.push(obj);
                $scope.montatrofeus();
            } catch (e) {}
            try{
                var elem = document.createElement("img");
                elem.setAttribute("src", "../images/game/pin-venceu.png");
                elem.setAttribute("id", "img_pin" + (count_pin_venceu++));
                elem.style.cssText = 'width:10%; position:absolute;top:' + obj.top + ';left:' + obj.left + ';';
                document.getElementById("div_game").appendChild(elem);
            }catch(e){
                console.log(e);
            }
           
        };

        $scope.getLanguage = function() {

            var ln = "";
            if ($translate.use() === 'pt') {
                ln = 'pt_BR';
            } else {
                ln = $translate.use();
            }
            return ln;
        };

        $scope.montatrofeus = function() {
            try {
                var aux = [];
                var count = 0;
                var objs = [];
                for (var i = 0; i < $scope.trofeusaux.length; i++) {
                    if (count < 2) {
                        objs.push($scope.trofeusaux[i]);
                        count++;
                    } else {
                        aux.push(objs);
                        objs = [];
                        count = 0;
                        objs.push($scope.trofeusaux[i]);
                        count++;
                    }
                }
                aux.push(objs);
                $scope.trofeus = [];
                $scope.trofeus = aux;
                console.log($scope.trofeus);
            } catch (e) {}
        };

        $scope.montaRanking = function(rankings) {
            var _ranking = [];
            var count = 0;
            var objs = [];
            for (var i = 0; i < rankings.length; i++) {
                if (count < 2) {
                    objs.push(rankings[i]);
                    count++;
                } else {
                    _ranking.push(objs);
                    objs = [];
                    count = 0;
                    objs.push(rankings[i]);
                    count++;
                }
            }
            _ranking.push(objs);
            console.log("_ranking",_ranking);
            return _ranking;
        };

        $timeout(function() {
            $("html, body").animate({
                scrollTop: parseInt($scope.fasespics[$scope.current_fase].top) - 180
            }, 400);
            $scope.$apply();
        }, 500);

        $scope.counterdown = function() {
            var _limit = 15;
            $("#counter > span").html(_limit);
            var _class = "p100";
            $("#counter").addClass(_class)
            ctd = setInterval(function() {
                _limit--;
                $("#counter > span").html(_limit);
                $("#counter").removeClass(_class);
                //calc class
                var y = parseInt((100 * _limit) / 15);
                _class = "p" + y;
                $("#counter").addClass(_class);
                if (_limit === 0) {
                    $scope.decrementa();
                    clearInterval(ctd);
                    $scope.clean('fase');
                }

                if(_limit<0){
                    _limit=0;
                    clearInterval(ctd);
                }

            }, 1000);
        };

        $scope.goToUrl = function(path) {
            $("#game_modal_panel_sem_pontos").modal("hide");
            window.location = "/#" + path;
        };

        $scope.verificaSurvey = function() {
            $http.get($scope.url + '/user/calendar/day', {
                headers: {
                    'app_token': app_token,
                    'user_token': LocalStorage.getItem('userStorage').user_token
                }
            }).then(function(result) {
                console.log("result calendar/day", result.data.data.length);
                if (result.data.data.length !== 0) {
                    $scope.hasSurvey = true;
                }
            });
        };
        $scope.verificaSurvey();

        $scope.modalpoints = function() {

            var type;
            if ($scope.points !== undefined) {
                if ($scope.points === 0) {
                    type = 0;
                } else if ($scope.points === 5) {
                    type = 1;
                }
            } else {
                type = 0;
            }

            var fundo_sem_pontos = "../images/game/fundo_sem_pontos.png";
            var fundo_5pontos = "../images/game/fundo_ponto.png";

            //sem energia
            if (type === 0) {
                $("#game_modal_panel_sem_pontos_bg").attr("src", fundo_sem_pontos);
                if ($scope.hasSurvey) {
                    $("#game_modal_panel_sem_pontos_content").html(content_amanha);
                } else {
                    $("#game_modal_panel_sem_pontos_content").html(content_5pontos);
                }
                $("#game_modal_panel_sem_pontos_title").html(title_sem_energia);
                $("#game-modal").modal("hide");
                $("#game_modal_panel_sem_pontos").modal("show");
            } 
            /*else if (type === 1) {
                $("#game_modal_panel_sem_pontos_title").html(title_5pontos);
                $("#game_modal_panel_sem_pontos_content").html(content_5pontos);
                $("#game-modal").modal("hide");
                $("#game_modal_panel_sem_pontos").modal("show");
            }*/
            /*else {
                $("#game_modal_panel_sem_pontos_title").html(title_sem_energia);
                $("#game_modal_panel_sem_pontos_content").html(content_amanha);
            }*/
        }
    }]);
