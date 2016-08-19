'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('GameCtrl', ['$scope', '$rootScope', '$timeout', '$translate', 'ApiConfig', '$location', '$http', 'Notification', 'LocalStorage', '$window',
        function($scope, $rootScope, $timeout, $translate, ApiConfig, $location, $http, Notification, LocalStorage, $window) {
        
        var url = window.location.href;
        $scope.language = $translate.use();

        console.log($scope.language);

        if (url.indexOf('tutorial') != -1) {
            $rootScope.routeClass = 'tutorial';    
            $rootScope.hiddenClass = 'hidden';    
        }else{
            $rootScope.routeClass = '';
            $rootScope.hiddenClass = '';
        }

        var app_token = ApiConfig.APP_TOKEN;

        var w = $("#img_bg").width();
        var firstLoad = true;
        $scope.loading = true;
        $scope.stars = 0;

        // Json get tropheus
        $scope.fasespics = [{
            "title_pt": "Ciclismo de Pista",
            "title_en": "Track Cycling",
            "title_es": "Ciclismo de Pista",
            "title_zh": "場地自行車",
            "title_ar": "ركوب الدراجات في المضمار",
            "title_ru": "Велотрек",
            "title_fr": "Cyclisme sur piste",
            "name": "ciclismo",
            "path": "/images/game/fases/ciclismo/",
            top: (1.0192 * w) + "px",
            left: "74.6%",
            "id": 44
        },{
            "title_pt": "Vitória",
            "title_en": "Vitória",
            "title_es": "Vitória",
            "title_zh": "Vitória",
            "title_ar": "Vitória",
            "title_ru": "Vitória",
            "title_fr": "Vitória",
            "name": "vitoria",
            "path": "/images/game/fases/vitoria/",
            top: (0.33 * w) + "px",
            left: "45.6%",
            "id": 43
        }, {
            "title_pt": "Aquáticas",
            "title_en": "Aquáticas",
            "title_es": "Aquáticas",
            "title_zh": "Aquáticas",
            "title_ar": "Aquáticas",
            "title_ru": "Aquáticas",
            "title_fr": "Aquáticas",
            "name": "aquaticas",
            "path": "/images/game/fases/aquaticas/",
            top: (0.3901 * w) + "px",
            left: "70.4%",
            "id": 42
        }, {
            "title_pt": "Atletismo",
            "title_en": "Athletics",
            "title_es": "Atletismo",
            "title_zh": "竞技",
            "title_ar": "الألعاب الرياضية ",
            "title_ru": "Легкая атлетика",
            "title_fr": "Athlétisme",
            "name": "atletismo",
            "path": "/images/game/fases/atletismo/",
            top: (0.53 * w) + "px",
            left: "37.2%",
            "id": 41
        }, {
            "title_pt": "Badminton",
            "title_en": "Badminton",
            "title_es": "Bádminton",
            "title_zh": "羽毛球",
            "title_ar": "تنس الريشة",
            "title_ru": "Бадминтон",
            "title_fr": "Badminton",
            "name": "badminton",
            "path": "/images/game/fases/badminton/",
            top: (0.5604 * w) + "px",
            left: "18.2%",
            "id": 40
        }, {
            "title_pt": "Basquetebol",
            "title_en": "Basketball",
            "title_es": "Baloncesto",
            "title_zh": "籃球",
            "title_ar": "كرة السلة",
            "title_ru": "Баскетбол",
            "title_fr": "Basketball",
            "name": "basquete",
            "path": "/images/game/fases/basquete/",
            top: (0.70 * w) + "px",
            left: "14.9%",
            "id": 39
        }, {
            "title_pt": "Boxe",
            "title_en": "Boxing",
            "title_es": "Box",
            "title_zh": "拳击",
            "title_ar": "الملاكمة",
            "title_ru": "Бокс",
            "title_fr": "Boxe",
            "name": "boxe",
            "path": "/images/game/fases/boxe/",
            top: (0.7404 * w) + "px",
            left: "34.1%",
            "id": 38
        }, {
            "title_pt": "Canoagem Velocidade",
            "title_en": "Canoe Sprint",
            "title_es": "Canotaje de velocidad",
            "title_zh": "獨木舟衝刺",
            "title_ar": "سباق القوارب",
            "title_ru": "Скоростная Гребля на каное",
            "title_fr": "Canoë-kayak vitesse",
            "name": "canoagem",
            "path": "/images/game/fases/canoagem/",
            top: (0.7744 * w) + "px",
            left: "63.1%",
            "id": 37
        }, {
            
            "title_pt": "Canoagem Slalom",
            "title_en": "Canoe Slalom",
            "title_es": "Piragüismo de Slalom",
            "title_zh": "皮划艇激流迴旋",
            "title_ar": "سباق التعرج المائي",
            "title_ru": "Гребной Слалом",
            "title_fr": "Slalom (canoë-kayak)",
            "name": "canoagemslalon",
            "path": "/images/game/fases/canoagemslalon/",
            top: (0.8704 * w) + "px",
            left: "77.29%",
            "id": 36
        }, {
            "title_pt": "Ciclismo de Mountain Bike",
            "title_en": "Mountain Bike Cycling",
            "title_es": "Ciclismo de Mountain Bike",
            "title_zh": "山地自行車",
            "title_ar": "ركوب الدراجات على الجبال",
            "title_ru": "Горный Велоспорт",
            "title_fr": "VTT",
            "name": "ciclismo",
            "path": "/images/game/fases/ciclismo/",
            top: (1.0192 * w) + "px",
            left: "74.6%",
            "id": 35
        }, {
            "title_pt": "Ciclismo BMX",
            "title_en": "BMX Cycling",
            "title_es": "Ciclismo BMX",
            "title_zh": "登山自行車",
            "title_ar": "سباق الدراجات الهوائية",
            "title_ru": "Велосипедный Мотокросс",
            "title_fr": "Cyclisme BMX",
            "name": "ciclismoBMX",
            "path": "/images/game/fases/ciclismoBMX/",
            top: (1.1492 * w) + "px",
            left: "21.8%",
            "id": 34
        }, {
            "title_pt": "Ciclismo de Estrada",
            "title_en": "Road Cycling",
            "title_es": "Ciclismo de Carretera",
            "title_zh": "公路自行車",
            "title_ar": "ركوب الدراجات على الطرق",
            "title_ru": "Дорожный Велоспорт",
            "title_fr": "Cyclisme sur route",
            "name": "ciclismoestrada",
            "path": "/images/game/fases/ciclismoestrada/",
            top: (1.2392 * w) + "px",
            left: "12.3%",
            "id": 33
        }, {
            "title_pt": "Esgrima",
            "title_en": "Fencing",
            "title_es": "Esgrima",
            "title_zh": "擊劍",
            "title_ar": "مبارزة",
            "title_ru": "Фехтование",
            "title_fr": "Escrime",
            "name": "esgrima",
            "path": "/images/game/fases/esgrima/",
            top: (1.3312 * w) + "px",
            left: "15.9%",
            "id": 32
        }, {
            "title_pt": "Futebol",
            "title_en": "Soccer",
            "title_es": "Fútbol",
            "title_zh": "足球",
            "title_ar": "كرة القدم",
            "title_ru": "Футбол",
            "title_fr": "Football",
            "name": "futebol",
            "path": "/images/game/fases/futebol/",
            top: (1.3652 * w) + "px",
            left: "28.9%",
            "id": 31
        }, {
            "title_pt": "Ginástica Artística",
            "title_en": "Gymnastics",
            "title_es": "Gimnasia Artística",
            "title_zh": "體操",
            "title_ar": "الجمباز",
            "title_ru": "Художественная Гимнастика",
            "title_fr": "Gymnastique artistique",
            "name": "ginasticaartistica",
            "path": "/images/game/fases/ginasticaartistica/",
            top: (1.3732 * w) + "px",
            left: "42.4%",
            "id": 30
        }, {
            "title_pt": "Ginástica de Trampolim",
            "title_en": "Trampoline Gymnastics",
            "title_es": "Gimnasia de Trampolín",
            "title_zh": "體操蹦床",
            "title_ar": "جمباز الترامبولين",
            "title_ru": "Прыжки на Батуте",
            "title_fr": "Trampoline",
            "name": "ginasticadetrampolim",
            "path": "/images/game/fases/ginasticadetrampolim/",
            top: (1.3772 * w) + "px",
            left: "55.8%",
            "id": 29
        }, {
            "title_pt": "Ginástica Rítmica  Rhythmic Gymnastics Gimnasia Rítmica    藝術體操    الجمباز الإيقاعي    Ритмическая Гимнастика  Gymnastique rythmique",
            "title_en": "Rhythmic Gymnastics",
            "title_es": "Gimnasia Rítmica",
            "title_zh": "藝術體操",
            "title_ar": "الجمباز الإيقاعي",
            "title_ru": "Ритмическая Гимнастика",
            "title_fr": "Gymnastique rythmique",
            "name": "ginasticaritmca",
            "path": "/images/game/fases/ginasticaritmca/",
            top: (1.3952 * w) + "px",
            left: "68.3%",
            "id": 28
        }, {
            "title_pt": "Golfe",
            "title_en": "Golfe",
            "title_es": "Golfe",
            "title_zh": "高爾夫",
            "title_ar": "لعب الجولف",
            "title_ru": "Гольф",
            "title_fr": "Golfe",
            "name": "golfe",
            "path": "/images/game/fases/golfe/",
            top: (1.4572 * w) + "px",
            left: "78.1%",
            "id": 27
        }, {
            "title_pt": "Handebol",
            "title_en": "Handball",
            "title_es": "Balonmano",
            "title_zh": "手球",
            "title_ar": "كرة اليد",
            "title_ru": "Гандбол",
            "title_fr": "Handball",
            "name": "handball",
            "path": "/images/game/fases/handball/",
            top: (1.5672 * w) + "px",
            left: "78.6%",
            "id": 26
        }, {
            "title_pt": "Hipismo Adestramento",
            "title_en": "Equestrian Dressage",
            "title_es": "Hipismo Adiestramiento",
            "title_zh": "馬術盛裝舞步賽",
            "title_ar": "ملابس الفروسية",
            "title_ru": "Конный Спорт (выездка)",
            "title_fr": "Dressage équestre",
            "name": "hipismo",
            "path": "/images/game/fases/hipismo/",
            top: (1.6412 * w) + "px",
            left: "70.6%",
            "id": 25
        }, {
            "title_pt": "Hipismo CCE",
            "title_en": "Equestrian",
            "title_es": "Eventing Hipismo CCE",
            "title_zh": "馬術三項賽",
            "title_ar": "سباق الفروسية",
            "title_ru": "Конное троеборье",
            "title_fr": "Concours complet d’équitation",
            "name": "hipismoCCE",
            "path": "/images/game/fases/hipismoCCE/",
            top: (1.6532 * w) + "px",
            left: "56.1%",
            "id": 24
        }, {
            "title_pt": "Hipismo Saltos",
            "title_en": "Equestrian Jumping",
            "title_es": "Hipismo Saltos",
            "title_zh": "馬術跳",
            "title_ar": "سباق القفز للفروسية",
            "title_ru": "Конку́р",
            "title_fr": "Sauts d’obstacles",
            "name": "hipismosalto",
            "path": "/images/game/fases/hipismosalto/",
            top: (1.6412 * w) + "px",
            left: "42%",
            "id": 23
        }, {
            "title_pt": "Hóquei Sobre Grama",
            "title_en": "Field Hockey",
            "title_es": "Hockey Sobre Césped",
            "title_zh": "曲棍球",
            "title_ar": "الهوكي الأرضي",
            "title_ru": "Хоккей на Траве",
            "title_fr": "Hockey sur gazon",
            "name": "hoqueidegrama",
            "path": "/images/game/fases/hoqueidegrama/",
            top: (1.6351999999999998 * w) + "px",
            left: "26.5%",
            "id": 22
        }, {
            "title_pt": "Judô",
            "title_en": "Judo",
            "title_es": "Judo",
            "title_zh": "柔道",
            "title_ar": "الجودو",
            "title_ru": "Дзюдо",
            "title_fr": "Judo",
            "name": "judo",
            "path": "/images/game/fases/judo/",
            top: (1.6712 * w) + "px",
            left: "13.9%",
            "id": 21
        }, {
            "title_pt": "Levantamento de Peso",
            "title_en": "Weightlifting",
            "title_es": "Levantamiento de Peso",
            "title_zh": "舉重",
            "title_ar": "رفع الأثقال",
            "title_ru": "Тяжелая атлетика",
            "title_fr": "Haltérophilie",
            "name": "levantamentodepeso",
            "path": "/images/game/fases/levantamentodepeso/",
            top: (1.7631999999999999 * w) + "px",
            left: "10.2%",
            "id": 20
        }, {
            "title_pt": "Luta Estilo Livre",
            "title_en": "Freestyle Wrestling",
            "title_es": "Lucha Estilo Libre",
            "title_zh": "自由式摔跤",
            "title_ar": "المصارعة الحرة",
            "title_ru": "Вольная борьба",
            "title_fr": "Lutte libre",
            "name": "lutalivre",
            "path": "/images/game/fases/lutalivre/",
            top: (1.8732 * w) + "px",
            left: "16.5%",
            "id": 19
        }, {
            "title_pt": "Nado Sincronizado",
            "title_en": "Synchronized Swimming",
            "title_es": "Nado Sincronizado",
            "title_zh": "花樣游泳",
            "title_ar": "السباحة المتزامنة",
            "title_ru": "Синхронное Плавание",
            "title_fr": "Natation synchronisée",
            "name": "nadosincronizado",
            "path": "/images/game/fases/nadosincronizado/",
            top: (1.9932000000000003 * w) + "px",
            left: "69.7%",
            "id": 18
        }, {
            "title_pt": "Natação",
            "title_en": "Swimming",
            "title_es": "Natación",
            "title_zh": "游泳",
            "title_ar": "سباحة",
            "title_ru": "Плавание",
            "title_fr": "Natation",
            "name": "natacao",
            top: (2.0658000000000003 * w) + "px",
            left: "77.8%",
            "id": 17
        }, {
            "title_pt": "Pentatlo Moderno",
            "title_en": "Modern Pentathlon",
            "title_es": "Pentatlón Moderno",
            "title_zh": "現代五項運動",
            "title_ar": "الخماسي الحديث",
            "title_ru": "Современное Пятиборье",
            "title_fr": "Pentathlon moderne",
            "name": "pentlatomoderno",
            "path": "/images/game/fases/pentlatomoderno/",
            top: (2.1718 * w) + "px",
            left: "76.8%",
            "id": 16
        }, { //aki
            "title_pt": "Polo Aquático",
            "title_en": "Water Polo",
            "title_es": "Polo Acuático",
            "title_zh": "水球運動",
            "title_ar": "كرة الماء",
            "title_ru": "Водное Поло",
            "title_fr": "Water-polo",
            "name": "poloaquatico",
            "path": "/images/game/fases/poloaquatico/",
            top: (2.2538 * w) + "px",
            left: "69%",
            "id": 15
        }, {
            "title_pt": "Remo",
            "title_en": "Rowing",
            "title_es": "Remo",
            "title_zh": "賽艇",
            "title_ar": "التجديف",
            "title_ru": "Гребля",
            "title_fr": "Aviron",
            "name": "remo",
            "path": "/images/game/fases/remo/",
            top: (2.2978000000000005 * w) + "px",
            left: "55.69%",
            "id": 14
        }, {
            "title_pt": "Rubgy",
            "title_en": "Rubgy",
            "title_es": "Rubgy",
            "title_zh": "橄欖球",
            "title_ar": "الرجبي",
            "title_ru": "Регби",
            "title_fr": "Rubgy",
            "name": "rugby",
            "path": "/images/game/fases/rugby/",
            top: (2.32 * w) + "px",
            left: "41.3%",
            "id": 13
        }, {
            "title_pt": "Saltos Ornamentais",
            "title_en": "Diving",
            "title_es": "Saltos Ornamentales",
            "title_zh": "跳水",
            "title_ar": "الغطس",
            "title_ru": "Прыжки в Воду",
            "title_fr": "Plongeon artistique",
            "name": "saltosornamentais",
            "path": "/images/game/fases/saltosornamentais/",
            top: (2.3480000000000003 * w) + "px",
            left: "27.8%",
            "id": 12
        }, {
            "title_pt": "Taekwondo",
            "title_en": "Taekwondo",
            "title_es": "Taekwondo",
            "title_zh": "跆拳道",
            "title_ar": "التايكوندو",
            "title_ru": "Тхэквондо",
            "title_fr": "Taekwondo",
            "name": "taekwondo",
            "path": "/images/game/fases/taekwondo/",
            top: (2.404 * w) + "px",
            left: "14.5%",
            "id": 11
        }, {
            "title_pt": "Tênis",
            "title_en": "Tennis",
            "title_es": "Tenis",
            "title_zh": "網球",
            "title_ar": "التنس",
            "title_ru": "Теннис",
            "title_fr": "Tennis",
            "name": "tenis",
            "path": "/images/game/fases/tenis/",
            top: (2.54 * w) + "px",
            left: "12.2%",
            "id": 10
        }, {
            "title_pt": "Luta Greco-Romana",
            "title_en": "Greco-Roman Wrestling",
            "title_es": "Lucha Greco-Romana",
            "title_zh": "古典式摔跤",
            "title_ar": "المصارعة اليونانية والرومانية",
            "title_ru": "Греко-римская борьба",
            "title_fr": "Lutte gréco-romaine",
            "name": "grecoromana",
            "path": "/images/game/fases/grecoromana/",
            top: (2.6319999999999997 * w) + "px",
            left: "20.9%",
            "id": 9
        }, {
            "title_pt": "Tiro com Arco",
            "title_en": "Archery",
            "title_es": "Tiro con Arco",
            "title_zh": "射箭",
            "title_ar": "الرماية",
            "title_ru": "Стрельба из Лука",
            "title_fr": "Tir à l'arc",
            "name": "tirocomarco",
            "path": "/images/game/fases/tirocomarco/",
            top: (2.674 * w) + "px",
            left: "34.9%",
            "id": 8
        }, {
            "title_pt": "Tiro Esportivo",
            "title_en": "Shooting",
            "title_es": "Tiro Deportivo",
            "title_zh": "射擊",
            "title_ar": "إطلاق النار",
            "title_ru": "Спортивная Стрельба",
            "title_fr": "Tir sportif",
            "name": "tiroesportivo",
            "path": "/images/game/fases/tiroesportivo/",
            top: (2.696 * w) + "px",
            left: "49.9%",
            "id": 7
        }, {
            "title_pt": "Triatlo",
            "title_en": "Triathlon",
            "title_es": "Triatlón",
            "title_zh": "鐵人三項",
            "title_ar": "سباق ثلاثي",
            "title_ru": "Троеборье",
            "title_fr": "Triathlon",
            "name": "triatlo",
            "path": "/images/game/fases/triatlo/",
            top: (2.7239999999999998 * w) + "px",
            left: "64.9%",
            "id": 6
        }, {
            "title_pt": "Vela",
            "title_en": "Sailing",
            "title_es": "Vela",
            "title_zh": "帆船",
            "title_ar": "الإبحار",
            "title_ru": "Парусный спорт",
            "title_fr": "Voile",
            "name": "vela",
            "path": "/images/game/fases/vela/",
            top: (2.7960000000000003 * w) + "px",
            left: "76.2%",
            "id": 5
        }, {
            "title_pt": "Voleibol",
            "title_en": "Volleyball",
            "title_es": "Voleibol",
            "title_zh": "排球",
            "title_ar": "الكرة الطائرة",
            "title_ru": "Волейбол",
            "title_fr": "Volley-ball",
            "name": "voleyball",
            "path": "/images/game/fases/voleyball/",
            top: (2.904 * w) + "px",
            left: "78.7%",
            "id": 4
        }, {
            "title_pt": "Vôlei de Praia",
            "title_en": "Beach Volleyball",
            "title_es": "Voleibol de Playa",
            "title_zh": "沙灘排球",
            "title_ar": "الكرة الطائرة الشاطئية",
            "title_ru": "Пляжный Волейбол",
            "title_fr": "Beach-volley",
            "name": "voleypraia",
            "path": "/images/game/fases/voleypraia/",
            top: (2.998 * w) + "px",
            left: "71.8%",
            "id": 3
        }, { //aki
            "title_pt": "Polo Aquático",
            "title_en": "Water Polo",
            "title_es": "Polo Acuático",
            "title_zh": "水球運動",
            "title_ar": "كرة الماء",
            "title_ru": "Водное Поло",
            "title_fr": "Water-polo",
            "name": "poloaquatico",
            "path": "/images/game/fases/poloaquatico/",
            top: (3.062 * w) + "px",
            left: "58.8%",
            "id": 2
        }, {
            "title_pt": "Tênis de Mesa",
            "title_en": "Table tennis",
            "title_es": "Tenis de Mesa",
            "title_zh": "乒乓球",
            "title_ar": "تنس الطاولة",
            "title_ru": "Настольный Теннис",
            "title_fr": "Tennis de table",
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
        
        var count_pin_venceu = 0;
        var ctd; //function counter down
        var title_sem_energia = "Você está <br/> sem energia!"; //00649
        var title_5pontos = "Você possui <br/> 5 pontos de energia!"; //00650 replace 10 por 5
        var content_5pontos = "Participe diariamente do Guardiões da Saúde para restaurá-las!"; //00457
        var content_amanha = "Participe amanhã do Guardiões da Saúde para jogar novamente!"; //00896
        $scope.participe_agora = "Participe agora!"; //00455
        var resposta_certa = "Resposta CORRETA!"; //00901

        $translate(['00649', '00650', '00457', '00896','00455','00901',]).then(function(translations) {
            title_sem_energia = translations['00649'];
            title_5pontos = translations['00650'].replace("10", "5");
            content_5pontos = translations['00457'];
            content_amanha = translations['00896'];
            $scope.participe_agora = translations['00455'];
            resposta_certa = translations['00901'];
        });

        // Click Info tutorial
        $scope.backTutorial = function(){
            localStorage.removeItem('tutorial');
            $window.location = '#/game/tutorial';
        }

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
                localStorage.setItem('tutorial',false);
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
            // if ($scope.points > 0) {
                $("#game-modal").modal("show");
                $scope.buildquestions(function() {
                    $scope.clean(key);
                    if (key === 'fase') {
                        $scope.prepareQuestions();
                    }
                });
            // } else {
            //     $scope.modalpoints();
            // }
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

        // Get Raking
        $scope.getRanking = function() {
            $http.get("http://rest.guardioesdasaude.org/game/ranking/", {
                headers: {
                    'app_token': app_token,
                    'user_token': LocalStorage.getItem('userStorage').user_token
                }
            }).success(function(data, status) {
                $scope.countrys = data;
            }).error(function(data, status){
                console.log(status);
            });
        };

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
                // console.log(e);
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
            } catch (e) {
                
            }
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
        }
    }]);
