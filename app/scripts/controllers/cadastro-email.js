'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('CadastroEmailCtrl', ['$scope', '$http', 'UserApi', '$location', 'LocalStorage', 'Notification', '$translate',
    function($scope, $http, UserApi, $location, LocalStorage, Notification, $translate) {

        // set page class to animations
        $scope.pageClass = 'cadastro-page';
        // ====
        $scope.countries = [];
        $scope.states = [];
        $scope.email_uso = false;

        $scope.facebookLogin = function() {
            UserApi.facebookLogin($scope);
        };

        $scope.googleLogin = function() {
            $scope.$on('event:google-plus-signin-success', function(event, authResult) {
                console.log("google-plus-signin-success", event, authResult);
                gapi.client.load('plus', 'v1', function() {
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    request.execute(function(resp) {
                        try {
                            console.log('Retrieved profile for:', resp, resp.emails[0].value);
                            resp.email = resp.emails[0].value;
                            UserApi.googleLogin($scope, resp);
                        } catch (e) {
                            alert("Não foi possíel realizar o login: " + JSON.stringify(e));
                        }
                    });
                });

            });
            $scope.$on('event:google-plus-signin-failure', function(event, authResult) {
                alert("Não foi possíel realizar o login");
            });
        };

        $scope.twitterLogin = function() {
            UserApi.twitterLogin($scope);
        };

        // create new user
        $scope.createData = {};
        $scope.createData.state = "Selecione";

        if (sessionStorage.getItem('lang') == 'en') {
            $scope.createData.country = 'Country of origin';
        } else if (sessionStorage.getItem('lang') == 'pt') {
            $scope.createData.country = 'País de origem';
        } else if (sessionStorage.getItem('lang') == 'es') {
            $scope.createData.country = 'País de origen';
        } else if (sessionStorage.getItem('lang') == 'zh') {
            $scope.createData.country = '原籍國';
        } else if (sessionStorage.getItem('lang') == 'ar') {
            $scope.createData.country = 'بلد المنشأ';
        } else if (sessionStorage.getItem('lang') == 'ru') {
            $scope.createData.country = 'Страна происхождения';
        } else if (sessionStorage.getItem('lang') == 'fr') {
            $scope.createData.country = "Pays d'origine";
        };

        $scope.fr = false;
        $scope.whatCountry = function(country) {
            // console.log(country);
            if (country == 'France') {
                $scope.fr = false;
                $('.drop-rece').addClass('ng-hide');
            } else {
                $scope.fr = true;
                $scope.isBrasil = false
                $('.drop-rece').removeClass('ng-hide');

                if (country == 'Brazil') {
                    $scope.isBrasil = true
                    $('.drop-origem, .drop-rece').removeClass('ng-hide');
                }else{
                    $scope.isBrasil = false
                    $('.drop-origem').addClass('ng-hide');
                }
            }
        };

        
        $scope.createUser = function() {
            var params = {
                nick: $scope.createData.nick,
                email: $scope.createData.email,
                dob: $scope.createData.dob,
                gender: $scope.createData.gender,
                password: $scope.createData.password,
                country: $scope.createData.country,
                state: $scope.createData.state,
                role: $scope.createData.profile
            };

            if (!$scope.fr) {
                params['race'] = $scope.createData.race;
            }

            if ($scope.createData.country == 'France') {
                params.race = 'france';
            } else {
                params.race = $scope.createData.race;
            }

            $scope.checkF = $scope.UTIL.checkForm(params, true);
            if ($scope.checkF.error === true) {
                return;
            }

            params.dob = $scope.UTIL.convertDate(params.dob);
            params.picture = $scope.UTIL.checkAvatar($scope.createData);

            // console.log(params);

            UserApi.createUser(params, function(data) {
                // console.log(data);
                var userId;
                if (data.status == 409) {
                    $scope.email_uso = true;
                    Notification.show('error', 'Cadastro por e-mail', 'E-mail existente!');
                } else if (data.status == 200) {
                    userId = data.data.user.id;
                    Notification.show('success', 'Cadastro por e-mail', data.data.message);
                    $location.path('/survey/' + userId + '/step-1');
                } else {
                    console.log(data.data.status);
                }
            });
        };
        // ====

        // create user using social network
        $scope.updateUserSocialData = function() {
            angular.element('#modal-complete-login').modal('hide');
            // console.warn("======== passando aqui", $scope.userData)
            UserApi.createUser($scope.userData, function(data) {
                if (data.data.error === false) {
                    Notification.show('success', 'Cadastro', data.data.message);
                    LocalStorage.userCreateData(data.data.user);
                    $location.path('health-daily');
                } else {
                    Notification.show('error', 'Cadastro', data.data.message);
                    // console.warn(data.data.message);
                }
            });
        };
        
        $scope.language = $translate.use();

        // console.log($scope.language);

        $scope.countries = [
            {
              "nome_pais": "País de origem",
              "nome_pais_init": "Country of origin",
              "nome_pais_es": "País de origen",
              "nome_pais_ch": "原產國",
              "nome_pais_ar": "بلد المنشأ",
              "nome_pais_ru": "Страна происхождения",
              "nome_pais_fr": "Pays d'origine"
            },
            {
              "nome_pais": "Afeganistão",
              "nome_pais_init": "Afghanistan",
              "nome_pais_es": "Afganistán",
              "nome_pais_ch": "阿富汗",
              "nome_pais_ar": "أفغانستان",
              "nome_pais_ru": "Афганистан",
              "nome_pais_fr": "Afghanistan"
            },
            {
              "nome_pais": "África do Sul",
              "nome_pais_init": "South Africa",
              "nome_pais_es": "Sudáfrica",
              "nome_pais_ch": "南非",
              "nome_pais_ar": "جنوب أفريقيا",
              "nome_pais_ru": "Южная Африка",
              "nome_pais_fr": "Afrique du Sud"
            },
            {
              "nome_pais": "Albânia",
              "nome_pais_init": "Albania",
              "nome_pais_es": "Albania",
              "nome_pais_ch": "阿爾巴尼亞",
              "nome_pais_ar": "ألبانيا",
              "nome_pais_ru": "Албания",
              "nome_pais_fr": "Albanie"
            },
            {
              "nome_pais": "Alemanha",
              "nome_pais_init": "Germany",
              "nome_pais_es": "Alemania",
              "nome_pais_ch": "德國",
              "nome_pais_ar": "ألمانيا",
              "nome_pais_ru": "Германия",
              "nome_pais_fr": "Allemagne"
            },
            {
              "nome_pais": "Andorra",
              "nome_pais_init": "Andorra",
              "nome_pais_es": "Andorra",
              "nome_pais_ch": "安道爾",
              "nome_pais_ar": "أندورا",
              "nome_pais_ru": "Андорра",
              "nome_pais_fr": "Andorre"
            },
            {
              "nome_pais": "Angola",
              "nome_pais_init": "Angola",
              "nome_pais_es": "Angola",
              "nome_pais_ch": "安哥拉",
              "nome_pais_ar": "أنغوﻻ",
              "nome_pais_ru": "Ангола",
              "nome_pais_fr": "Angola"
            },
            {
              "nome_pais": "Anguilla",
              "nome_pais_init": "Anguilla",
              "nome_pais_es": "Anguila",
              "nome_pais_ch": "安圭拉",
              "nome_pais_ar": "أنغويلا",
              "nome_pais_ru": "Ангилья",
              "nome_pais_fr": "Anguilla"
            },
            {
              "nome_pais": "Antártida",
              "nome_pais_init": "Antarctica",
              "nome_pais_es": "Antártida",
              "nome_pais_ch": "南極洲",
              "nome_pais_ar": "القارة القطبية الجنوبية",
              "nome_pais_ru": "Антарктида",
              "nome_pais_fr": "Antarctique"
            },
            {
              "nome_pais": "Antígua e Barbuda",
              "nome_pais_init": "Antigua and Barbuda",
              "nome_pais_es": "Antigua y Barbuda",
              "nome_pais_ch": "安地卡及巴布達",
              "nome_pais_ar": "أنتيغوا وباربودا",
              "nome_pais_ru": "Антигуа и Барбуда",
              "nome_pais_fr": "Antigua et Barbuda"
            },
            {
              "nome_pais": "Arábia Saudita",
              "nome_pais_init": "Saudi Arabia",
              "nome_pais_es": "Arabia Saudita",
              "nome_pais_ch": "沙烏地阿拉伯",
              "nome_pais_ar": "السعودية",
              "nome_pais_ru": "Саудовская Аравия",
              "nome_pais_fr": "Arabie Saoudite"
            },
            {
              "nome_pais": "Argélia",
              "nome_pais_init": "Algeria",
              "nome_pais_es": "Argelia",
              "nome_pais_ch": "阿爾及利亞",
              "nome_pais_ar": "الجزائر",
              "nome_pais_ru": "Алжир",
              "nome_pais_fr": "Algérie"
            },
            {
              "nome_pais": "Argentina",
              "nome_pais_init": "Argentina",
              "nome_pais_es": "Argentina",
              "nome_pais_ch": "阿根廷",
              "nome_pais_ar": "الأرجنتين",
              "nome_pais_ru": "Аргентина",
              "nome_pais_fr": "Argentine"
            },
            {
              "nome_pais": "Armênia",
              "nome_pais_init": "Armenia",
              "nome_pais_es": "Armenia",
              "nome_pais_ch": "亞美尼亞",
              "nome_pais_ar": "أرمينيا",
              "nome_pais_ru": "Армения",
              "nome_pais_fr": "Arménie"
            },
            {
              "nome_pais": "Aruba",
              "nome_pais_init": "Aruba",
              "nome_pais_es": "Aruba",
              "nome_pais_ch": "阿路巴",
              "nome_pais_ar": "أروبا",
              "nome_pais_ru": "Aruba",
              "nome_pais_fr": "Aruba"
            },
            {
              "nome_pais": "Austrália",
              "nome_pais_init": "Australia",
              "nome_pais_es": "Australia",
              "nome_pais_ch": "澳大利亞",
              "nome_pais_ar": "أستراليا",
              "nome_pais_ru": "Австралия",
              "nome_pais_fr": "Australie"
            },
            {
              "nome_pais": "Áustria",
              "nome_pais_init": "Austria",
              "nome_pais_es": "Austria",
              "nome_pais_ch": "奧地利",
              "nome_pais_ar": "النمسا",
              "nome_pais_ru": "Австрия",
              "nome_pais_fr": "Autriche"
            },
            {
              "nome_pais": "Azerbaijão",
              "nome_pais_init": "Azerbaijan",
              "nome_pais_es": "Azerbaiyán",
              "nome_pais_ch": "亞塞拜然",
              "nome_pais_ar": "أذربيجان",
              "nome_pais_ru": "Азербайджан ",
              "nome_pais_fr": "Azerbaïdjan"
            },
            {
              "nome_pais": "Bahamas",
              "nome_pais_init": "Bahamas",
              "nome_pais_es": "Bahamas",
              "nome_pais_ch": "巴哈馬",
              "nome_pais_ar": "جزر البهاما",
              "nome_pais_ru": "Багамские Острова",
              "nome_pais_fr": "Bahamas"
            },
            {
              "nome_pais": "Bahrein",
              "nome_pais_init": "Bahrain",
              "nome_pais_es": "Bahréin",
              "nome_pais_ch": "巴林",
              "nome_pais_ar": "البحرين",
              "nome_pais_ru": "Бахрейн",
              "nome_pais_fr": "Bahreïn"
            },
            {
              "nome_pais": "Bangladesh",
              "nome_pais_init": "Bangladesh",
              "nome_pais_es": "Bangladesh",
              "nome_pais_ch": "孟加拉國",
              "nome_pais_ar": "بنغلاديش",
              "nome_pais_ru": "Бангладеш",
              "nome_pais_fr": "Bangladesh"
            },
            {
              "nome_pais": "Barbados",
              "nome_pais_init": "Barbados",
              "nome_pais_es": "Barbados",
              "nome_pais_ch": "巴巴多斯",
              "nome_pais_ar": "باربادوس",
              "nome_pais_ru": "Барбадос",
              "nome_pais_fr": "Barbade"
            },
            {
              "nome_pais": "Bélgica",
              "nome_pais_init": "Belgium",
              "nome_pais_es": "Bélgica",
              "nome_pais_ch": "比利時",
              "nome_pais_ar": "بلجيكا",
              "nome_pais_ru": "Бельгия",
              "nome_pais_fr": "Belgique"
            },
            {
              "nome_pais": "Belize",
              "nome_pais_init": "Belize",
              "nome_pais_es": "Belice",
              "nome_pais_ch": "貝里斯",
              "nome_pais_ar": "بليز",
              "nome_pais_ru": "Белиз",
              "nome_pais_fr": "Belize"
            },
            {
              "nome_pais": "Benin",
              "nome_pais_init": "Benin",
              "nome_pais_es": "Benín",
              "nome_pais_ch": "貝寧",
              "nome_pais_ar": "بنين",
              "nome_pais_ru": "Бенин",
              "nome_pais_fr": "Bénin"
            },
            {
              "nome_pais": "Bermudas",
              "nome_pais_init": "Bermuda",
              "nome_pais_es": "Bermudas",
              "nome_pais_ch": "百慕達",
              "nome_pais_ar": "برمودا",
              "nome_pais_ru": "Бермудские острова",
              "nome_pais_fr": "Bermudes"
            },
            {
              "nome_pais": "Bielorrússia",
              "nome_pais_init": "Belarus",
              "nome_pais_es": "Bielorrusia",
              "nome_pais_ch": "白俄羅斯",
              "nome_pais_ar": "روسيا البيضاء",
              "nome_pais_ru": "Беларусь",
              "nome_pais_fr": "Biélorussie"
            },
            {
              "nome_pais": "Bolívia",
              "nome_pais_init": "Bolivia",
              "nome_pais_es": "Bolivia",
              "nome_pais_ch": "玻利維亞",
              "nome_pais_ar": "بوليفيا",
              "nome_pais_ru": "Боливия",
              "nome_pais_fr": "Bolivie"
            },
            {
              "nome_pais": "Bósnia e Herzegovina",
              "nome_pais_init": "Bosnia and Herzegovina",
              "nome_pais_es": "Bosnia y Herzegovina",
              "nome_pais_ch": "波士尼亞和黑塞哥維那",
              "nome_pais_ar": "البوسنة والهرسك",
              "nome_pais_ru": "Босния и Герцеговина",
              "nome_pais_fr": "Bosnie-Herzégovine"
            },
            {
              "nome_pais": "Botsuana",
              "nome_pais_init": "Botswana",
              "nome_pais_es": "Botsuana",
              "nome_pais_ch": "博茨瓦納",
              "nome_pais_ar": "بوتسوانا",
              "nome_pais_ru": "Ботсвана",
              "nome_pais_fr": "Botswana"
            },
            {
              "nome_pais": "Brasil",
              "nome_pais_init": "Brazil",
              "nome_pais_es": "Brasil",
              "nome_pais_ch": "巴西",
              "nome_pais_ar": "البرازيل",
              "nome_pais_ru": "Бразилия",
              "nome_pais_fr": "Brésil"
            },
            {
              "nome_pais": "Brunei",
              "nome_pais_init": "Brunei",
              "nome_pais_es": "Brunei",
              "nome_pais_ch": "汶萊",
              "nome_pais_ar": "بروناي",
              "nome_pais_ru": "Бруней",
              "nome_pais_fr": "Brunei"
            },
            {
              "nome_pais": "Bulgária",
              "nome_pais_init": "Bulgaria",
              "nome_pais_es": "Bulgaria",
              "nome_pais_ch": "保加利亞",
              "nome_pais_ar": "بلغاريا",
              "nome_pais_ru": "Болгария",
              "nome_pais_fr": "Bulgarie"
            },
            {
              "nome_pais": "Burquina Faso",
              "nome_pais_init": "Burkina Faso",
              "nome_pais_es": "Burquina Faso",
              "nome_pais_ch": "布吉納法索",
              "nome_pais_ar": "بوركينا فاسو",
              "nome_pais_ru": "Буркина-Фасо",
              "nome_pais_fr": "Burkina Faso"
            },
            {
              "nome_pais": "Burundi",
              "nome_pais_init": "Burundi",
              "nome_pais_es": "Burundi",
              "nome_pais_ch": "蒲隆地",
              "nome_pais_ar": "بروناي",
              "nome_pais_ru": "Бурунди",
              "nome_pais_fr": "Burundi"
            },
            {
              "nome_pais": "Butão",
              "nome_pais_init": "Bhutan",
              "nome_pais_es": "Bután",
              "nome_pais_ch": "不丹",
              "nome_pais_ar": "بوتان",
              "nome_pais_ru": "Бутан",
              "nome_pais_fr": "Bhoutan"
            },
            {
              "nome_pais": "Cabo Verde",
              "nome_pais_init": "Cape Verde",
              "nome_pais_es": "Cabo Verde",
              "nome_pais_ch": "維德角",
              "nome_pais_ar": "جمهورية الرأس الأخضر",
              "nome_pais_ru": "Кабо-Верде",
              "nome_pais_fr": "Cap-Vert"
            },
            {
              "nome_pais": "Camboja",
              "nome_pais_init": "Cambodia",
              "nome_pais_es": "Camboya",
              "nome_pais_ch": "柬埔寨",
              "nome_pais_ar": "كمبوديا",
              "nome_pais_ru": "Камбоджа",
              "nome_pais_fr": "Cambodge"
            },
            {
              "nome_pais": "Canadá",
              "nome_pais_init": "Canada",
              "nome_pais_es": "Canadá",
              "nome_pais_ch": "加拿大",
              "nome_pais_ar": "كندا",
              "nome_pais_ru": "Канада",
              "nome_pais_fr": "Canada"
            },
            {
              "nome_pais": "Catar",
              "nome_pais_init": "Qatar",
              "nome_pais_es": "Qatar",
              "nome_pais_ch": "卡塔爾",
              "nome_pais_ar": "قطر",
              "nome_pais_ru": "Катар",
              "nome_pais_fr": "Qatar"
            },
            {
              "nome_pais": "Cazaquistão",
              "nome_pais_init": "Kazakhstan",
              "nome_pais_es": "Kazajstán",
              "nome_pais_ch": "哈薩克斯坦",
              "nome_pais_ar": "كازاخستان",
              "nome_pais_ru": "Казахстан",
              "nome_pais_fr": "Kazakhstan"
            },
            {
              "nome_pais": "Chade",
              "nome_pais_init": "Chad",
              "nome_pais_es": "Chad",
              "nome_pais_ch": "乍得",
              "nome_pais_ar": "تشاد",
              "nome_pais_ru": "Чад",
              "nome_pais_fr": "Tchad"
            },
            {
              "nome_pais": "Chile",
              "nome_pais_init": "Chile",
              "nome_pais_es": "Chile",
              "nome_pais_ch": "智利",
              "nome_pais_ar": "شيلي",
              "nome_pais_ru": "Чили",
              "nome_pais_fr": "Chili"
            },
            {
              "nome_pais": "China",
              "nome_pais_init": "China",
              "nome_pais_es": "China",
              "nome_pais_ch": "中國",
              "nome_pais_ar": "الصين",
              "nome_pais_ru": "Китай",
              "nome_pais_fr": "Chine"
            },
            {
              "nome_pais": "Chipre",
              "nome_pais_init": "Cyprus",
              "nome_pais_es": "Chipre",
              "nome_pais_ch": "賽普勒斯",
              "nome_pais_ar": "قبرص",
              "nome_pais_ru": "Кипр",
              "nome_pais_fr": "Chypre"
            },
            {
              "nome_pais": "Cidade do Vaticano",
              "nome_pais_init": "Vatican City",
              "nome_pais_es": "Ciudad del Vaticano",
              "nome_pais_ch": "梵蒂岡城",
              "nome_pais_ar": "مدينة الفاتيكان",
              "nome_pais_ru": "Ватикан",
              "nome_pais_fr": "Cité du Vatican"
            },
            {
              "nome_pais": "Cingapura",
              "nome_pais_init": "Singapore",
              "nome_pais_es": "Singapur",
              "nome_pais_ch": "新加坡",
              "nome_pais_ar": "سنغافورة",
              "nome_pais_ru": "Сингапур",
              "nome_pais_fr": "Singapour"
            },
            {
              "nome_pais": "Colômbia",
              "nome_pais_init": "Colombia",
              "nome_pais_es": "Colombia",
              "nome_pais_ch": "哥倫比亞",
              "nome_pais_ar": "كولومبيا",
              "nome_pais_ru": "Колумбия ",
              "nome_pais_fr": "Colombie"
            },
            {
              "nome_pais": "Comores",
              "nome_pais_init": "Comoros",
              "nome_pais_es": "Comoras",
              "nome_pais_ch": "科摩羅",
              "nome_pais_ar": "جزر القمر",
              "nome_pais_ru": "Коморские острова",
              "nome_pais_fr": "Comores"
            },
            {
              "nome_pais": "Congo - Brazzaville",
              "nome_pais_init": "Congo - Brazzaville",
              "nome_pais_es": "Congo - Brazzaville",
              "nome_pais_ch": "剛果-布拉柴維爾",
              "nome_pais_ar": "الكونغو - برازافيل",
              "nome_pais_ru": "Конго - Браззавиль",
              "nome_pais_fr": "Congo-Brazzaville"
            },
            {
              "nome_pais": "Congo - Kinshasa",
              "nome_pais_init": "Congo - Kinshasa",
              "nome_pais_es": "Congo - Kinshasa",
              "nome_pais_ch": "剛果-金夏沙",
              "nome_pais_ar": "الكونغو - كينشاسا",
              "nome_pais_ru": "Конго - Киншаса",
              "nome_pais_fr": "Congo-Kinshasa"
            },
            {
              "nome_pais": "Coreia do Norte",
              "nome_pais_init": "North Korea",
              "nome_pais_es": "Corea del Norte",
              "nome_pais_ch": "北朝鲜",
              "nome_pais_ar": "كوريا الشمالية",
              "nome_pais_ru": "Северная Корея",
              "nome_pais_fr": "Corée du Nord"
            },
            {
              "nome_pais": "Coreia do Sul",
              "nome_pais_init": "South Korea",
              "nome_pais_es": "Corea del Sur",
              "nome_pais_ch": "韓國",
              "nome_pais_ar": "كوريا الجنوبية",
              "nome_pais_ru": "Южная Корея",
              "nome_pais_fr": "Corée du Sud"
            },
            {
              "nome_pais": "Costa do Marfim",
              "nome_pais_init": "Ivory Coast",
              "nome_pais_es": "Costa de Marfil",
              "nome_pais_ch": "象牙海岸",
              "nome_pais_ar": "ساحل العاج",
              "nome_pais_ru": "Берег Слоновой Кости",
              "nome_pais_fr": "Côte d'Ivoire"
            },
            {
              "nome_pais": "Costa Rica",
              "nome_pais_init": "Costa Rica",
              "nome_pais_es": "Costa Rica",
              "nome_pais_ch": "哥斯大黎加",
              "nome_pais_ar": "كوستاريكا",
              "nome_pais_ru": "Коста-Рика",
              "nome_pais_fr": "Costa Rica"
            },
            {
              "nome_pais": "Croácia",
              "nome_pais_init": "Croatia",
              "nome_pais_es": "Croacia",
              "nome_pais_ch": "克羅地亞",
              "nome_pais_ar": "كرواتيا",
              "nome_pais_ru": "Хорватия",
              "nome_pais_fr": "Croatie"
            },
            {
              "nome_pais": "Cuba",
              "nome_pais_init": "Cuba",
              "nome_pais_es": "Cuba",
              "nome_pais_ch": "古巴",
              "nome_pais_ar": "كوبا",
              "nome_pais_ru": "Куба",
              "nome_pais_fr": "Cuba"
            },
            {
              "nome_pais": "Curaçau",
              "nome_pais_init": "Curaçao",
              "nome_pais_es": "Curazao",
              "nome_pais_ch": "古拉梳島",
              "nome_pais_ar": "كوراساو",
              "nome_pais_ru": "Кюрасао ",
              "nome_pais_fr": "Curaçao"
            },
            {
              "nome_pais": "Dinamarca",
              "nome_pais_init": "Denmark",
              "nome_pais_es": "Dinamarca",
              "nome_pais_ch": "丹麥",
              "nome_pais_ar": "الدانمارك",
              "nome_pais_ru": "Дания",
              "nome_pais_fr": "Danemark"
            },
            {
              "nome_pais": "Djibuti",
              "nome_pais_init": "Djibouti",
              "nome_pais_es": "Yibuti",
              "nome_pais_ch": "吉布地",
              "nome_pais_ar": "جيبوتي",
              "nome_pais_ru": "Джибути",
              "nome_pais_fr": "Djibouti"
            },
            {
              "nome_pais": "Dominica",
              "nome_pais_init": "Dominica",
              "nome_pais_es": "Dominica",
              "nome_pais_ch": "多米尼克",
              "nome_pais_ar": "دومينيكا",
              "nome_pais_ru": "Доминика",
              "nome_pais_fr": "Dominique"
            },
            {
              "nome_pais": "Egito",
              "nome_pais_init": "Egypt",
              "nome_pais_es": "Egipto",
              "nome_pais_ch": "埃及",
              "nome_pais_ar": "مصر",
              "nome_pais_ru": "Египет",
              "nome_pais_fr": "Égypte"
            },
            {
              "nome_pais": "El Salvador",
              "nome_pais_init": "El Salvador",
              "nome_pais_es": "El Salvador",
              "nome_pais_ch": "薩爾瓦多",
              "nome_pais_ar": "السلفادور",
              "nome_pais_ru": "Сальвадор",
              "nome_pais_fr": "Salvador"
            },
            {
              "nome_pais": "Emirados Árabes Unidos",
              "nome_pais_init": "United Arab Emirates",
              "nome_pais_es": "Emiratos Árabes Unidos",
              "nome_pais_ch": "阿拉伯聯合大公國",
              "nome_pais_ar": "الإمارات العربية المتحدة",
              "nome_pais_ru": "Объединенные Арабские Эмираты",
              "nome_pais_fr": "Émirats Arabes Unis"
            },
            {
              "nome_pais": "Equador",
              "nome_pais_init": "Ecuador",
              "nome_pais_es": "Ecuador",
              "nome_pais_ch": "厄瓜多爾",
              "nome_pais_ar": "الإكوادور",
              "nome_pais_ru": "Эквадор",
              "nome_pais_fr": "Équateur"
            },
            {
              "nome_pais": "Eritreia",
              "nome_pais_init": "Eritrea",
              "nome_pais_es": "Eritrea",
              "nome_pais_ch": "厄立特里亞",
              "nome_pais_ar": "إريتريا",
              "nome_pais_ru": "Эритрея",
              "nome_pais_fr": "Érythrée"
            },
            {
              "nome_pais": "Eslováquia",
              "nome_pais_init": "Slovakia",
              "nome_pais_es": "Eslovaquia",
              "nome_pais_ch": "斯洛伐克",
              "nome_pais_ar": "سلوفاكيا",
              "nome_pais_ru": "Словакия",
              "nome_pais_fr": "Slovaquie"
            },
            {
              "nome_pais": "Eslovênia",
              "nome_pais_init": "Slovenia",
              "nome_pais_es": "Eslovenia",
              "nome_pais_ch": "斯洛維尼亞",
              "nome_pais_ar": "سلوفينيا",
              "nome_pais_ru": "Словения",
              "nome_pais_fr": "Slovénie"
            },
            {
              "nome_pais": "Espanha",
              "nome_pais_init": "Spain",
              "nome_pais_es": "España",
              "nome_pais_ch": "西班牙",
              "nome_pais_ar": "إسبانيا",
              "nome_pais_ru": "Испания",
              "nome_pais_fr": "Espagne"
            },
            {
              "nome_pais": "Estados Unidos",
              "nome_pais_init": "United States",
              "nome_pais_es": "Estados Unidos",
              "nome_pais_ch": "美國",
              "nome_pais_ar": "الولايات المتحدة",
              "nome_pais_ru": "США",
              "nome_pais_fr": "États-Unis"
            },
            {
              "nome_pais": "Estônia",
              "nome_pais_init": "Estonia",
              "nome_pais_es": "Estonia",
              "nome_pais_ch": "愛沙尼亞",
              "nome_pais_ar": "إستونيا",
              "nome_pais_ru": "Эстония",
              "nome_pais_fr": "Estonie"
            },
            {
              "nome_pais": "Etiópia",
              "nome_pais_init": "Ethiopia",
              "nome_pais_es": "Etiopía",
              "nome_pais_ch": "埃塞俄比亞",
              "nome_pais_ar": "إثيوبيا",
              "nome_pais_ru": "Эфиопия",
              "nome_pais_fr": "Éthiopie"
            },
            {
              "nome_pais": "Fiji",
              "nome_pais_init": "Fiji",
              "nome_pais_es": "Fiji",
              "nome_pais_ch": "斐濟",
              "nome_pais_ar": "فيجي",
              "nome_pais_ru": "Фиджи",
              "nome_pais_fr": "Fidji"
            },
            {
              "nome_pais": "Filipinas",
              "nome_pais_init": "Philippines",
              "nome_pais_es": "Filipinas",
              "nome_pais_ch": "菲律賓",
              "nome_pais_ar": "الفلبين",
              "nome_pais_ru": "Филиппины",
              "nome_pais_fr": "Philippines"
            },
            {
              "nome_pais": "Finlândia",
              "nome_pais_init": "Finland",
              "nome_pais_es": "Finlandia",
              "nome_pais_ch": "芬蘭",
              "nome_pais_ar": "فنلندا",
              "nome_pais_ru": "Финляндия",
              "nome_pais_fr": "Finlande"
            },
            {
              "nome_pais": "França",
              "nome_pais_init": "France",
              "nome_pais_es": "Francia",
              "nome_pais_ch": "法國",
              "nome_pais_ar": "فرنسا",
              "nome_pais_ru": "Франция",
              "nome_pais_fr": "France"
            },
            {
              "nome_pais": "Gabão",
              "nome_pais_init": "Gabon",
              "nome_pais_es": "Gabón",
              "nome_pais_ch": "加蓬",
              "nome_pais_ar": "الغابون",
              "nome_pais_ru": "Габон",
              "nome_pais_fr": "Gabon"
            },
            {
              "nome_pais": "Gâmbia",
              "nome_pais_init": "Gambia",
              "nome_pais_es": "Gambia",
              "nome_pais_ch": "岡比亞",
              "nome_pais_ar": "غامبيا",
              "nome_pais_ru": "Гамбия",
              "nome_pais_fr": "Gambie"
            },
            {
              "nome_pais": "Gana",
              "nome_pais_init": "Ghana",
              "nome_pais_es": "Ghana",
              "nome_pais_ch": "加納",
              "nome_pais_ar": "غانا",
              "nome_pais_ru": "Гана",
              "nome_pais_fr": "Ghana"
            },
            {
              "nome_pais": "Geórgia",
              "nome_pais_init": "Georgia",
              "nome_pais_es": "Georgia",
              "nome_pais_ch": "格魯吉亞",
              "nome_pais_ar": "جورجيا",
              "nome_pais_ru": "Грузия",
              "nome_pais_fr": "Géorgie"
            },
            {
              "nome_pais": "Gibraltar",
              "nome_pais_init": "Gibraltar",
              "nome_pais_es": "Gibraltar",
              "nome_pais_ch": "直布羅陀",
              "nome_pais_ar": "جبل طارق",
              "nome_pais_ru": "Гибралтар",
              "nome_pais_fr": "Gibraltar"
            },
            {
              "nome_pais": "Granada",
              "nome_pais_init": "Granada",
              "nome_pais_es": "Granada",
              "nome_pais_ch": "格蘭納達",
              "nome_pais_ar": "غرناطة",
              "nome_pais_ru": "Гранада",
              "nome_pais_fr": "Granada"
            },
            {
              "nome_pais": "Grécia",
              "nome_pais_init": "Greece",
              "nome_pais_es": "Grecia",
              "nome_pais_ch": "希臘",
              "nome_pais_ar": "اليونان",
              "nome_pais_ru": "Греция",
              "nome_pais_fr": "Grèce"
            },
            {
              "nome_pais": "Groenlândia",
              "nome_pais_init": "Greenland",
              "nome_pais_es": "Groenlandia",
              "nome_pais_ch": "格陵蘭島",
              "nome_pais_ar": "جرينلاند",
              "nome_pais_ru": "Гренландия",
              "nome_pais_fr": "Groenland"
            },
            {
              "nome_pais": "Guadalupe",
              "nome_pais_init": "Guadalupe",
              "nome_pais_es": "Guadalupe",
              "nome_pais_ch": "瓜達羅佩",
              "nome_pais_ar": "غوادلوبي",
              "nome_pais_ru": "Гваделупа",
              "nome_pais_fr": "Guadalupe"
            },
            {
              "nome_pais": "Guam",
              "nome_pais_init": "Guam",
              "nome_pais_es": "Guam",
              "nome_pais_ch": "關島",
              "nome_pais_ar": "غوام",
              "nome_pais_ru": "Гуам",
              "nome_pais_fr": "Guam"
            },
            {
              "nome_pais": "Guatemala",
              "nome_pais_init": "Guatemala",
              "nome_pais_es": "Guatemala",
              "nome_pais_ch": "瓜地馬拉",
              "nome_pais_ar": "غواتيمالا",
              "nome_pais_ru": "Гватемала",
              "nome_pais_fr": "Guatemala"
            },
            {
              "nome_pais": "Guernsey",
              "nome_pais_init": "Guernsey",
              "nome_pais_es": "Guernsey",
              "nome_pais_ch": "根西島",
              "nome_pais_ar": "غيرنزي",
              "nome_pais_ru": "острова Гернси",
              "nome_pais_fr": "Guernesey"
            },
            {
              "nome_pais": "Guiana",
              "nome_pais_init": "Guyana",
              "nome_pais_es": "Guyana",
              "nome_pais_ch": "蓋亞納",
              "nome_pais_ar": "غيانا",
              "nome_pais_ru": "Гайана",
              "nome_pais_fr": "Guyana"
            },
            {
              "nome_pais": "Guiana Francesa",
              "nome_pais_init": "French Guiana",
              "nome_pais_es": "Guayana Francesa",
              "nome_pais_ch": "法屬圭亞那",
              "nome_pais_ar": "غويانا الفرنسية",
              "nome_pais_ru": "Французская Гвиана",
              "nome_pais_fr": "Guyane française"
            },
            {
              "nome_pais": "Guiné",
              "nome_pais_init": "Guinea",
              "nome_pais_es": "Guinea",
              "nome_pais_ch": "幾內亞",
              "nome_pais_ar": "غينيا",
              "nome_pais_ru": "Гвинея",
              "nome_pais_fr": "Guinée"
            },
            {
              "nome_pais": "Guiné Equatorial",
              "nome_pais_init": "Equatorial Guinea",
              "nome_pais_es": "Guinea Ecuatorial",
              "nome_pais_ch": "赤道幾內亞",
              "nome_pais_ar": "غينيا الاستوائية",
              "nome_pais_ru": "Экваториальная Гвинея",
              "nome_pais_fr": "Guinée équatoriale"
            },
            {
              "nome_pais": "Guiné-Bissau",
              "nome_pais_init": "Guinea-Bissau",
              "nome_pais_es": "Guinea Bissau",
              "nome_pais_ch": "幾內亞比索",
              "nome_pais_ar": "غينيا بيساو",
              "nome_pais_ru": "Гвинея-Бисау",
              "nome_pais_fr": "Guinée-Bissau"
            },
            {
              "nome_pais": "Haiti",
              "nome_pais_init": "Haiti",
              "nome_pais_es": "Haití",
              "nome_pais_ch": "海地",
              "nome_pais_ar": "هايتي",
              "nome_pais_ru": "Гаити",
              "nome_pais_fr": "Haïti"
            },
            {
              "nome_pais": "Holanda",
              "nome_pais_init": "Netherlands",
              "nome_pais_es": "Holanda",
              "nome_pais_ch": "荷蘭",
              "nome_pais_ar": "هولندا",
              "nome_pais_ru": "Нидерланды",
              "nome_pais_fr": "Pays-Bas"
            },
            {
              "nome_pais": "Honduras",
              "nome_pais_init": "Honduras",
              "nome_pais_es": "Honduras",
              "nome_pais_ch": "宏都拉斯",
              "nome_pais_ar": "هندوراس",
              "nome_pais_ru": "Гондурас",
              "nome_pais_fr": "Honduras"
            },
            {
              "nome_pais": "Hong Kong, RAE da China",
              "nome_pais_init": "Hong Kong, SAR of China",
              "nome_pais_es": "Hong Kong, RAE de China",
              "nome_pais_ch": "中國香港特別行政區",
              "nome_pais_ar": "هونغ كونغ، جمهورية الصين الشعبية",
              "nome_pais_ru": "Гонконг",
              "nome_pais_fr": "Hong Kong, RAS de Chine"
            },
            {
              "nome_pais": "Hungria",
              "nome_pais_init": "Hungary",
              "nome_pais_es": "Hungría",
              "nome_pais_ch": "匈牙利",
              "nome_pais_ar": "المجر",
              "nome_pais_ru": "Венгрия",
              "nome_pais_fr": "Hongrie"
            },
            {
              "nome_pais": "Iêmen",
              "nome_pais_init": "Yemen",
              "nome_pais_es": "Yemen",
              "nome_pais_ch": "葉門",
              "nome_pais_ar": "اليمن",
              "nome_pais_ru": "Йемен",
              "nome_pais_fr": "Yémen"
            },
            {
              "nome_pais": "Ilha Bouvet",
              "nome_pais_init": "Bouvet Island",
              "nome_pais_es": "Isla Bouvet",
              "nome_pais_ch": "布維島",
              "nome_pais_ar": "جزيرة بوفيت",
              "nome_pais_ru": "Остров Буве",
              "nome_pais_fr": "Île Bouvet"
            },
            {
              "nome_pais": "Ilha Christmas",
              "nome_pais_init": "Christmas Island",
              "nome_pais_es": "Isla de Navidad",
              "nome_pais_ch": "聖誕島",
              "nome_pais_ar": "جزيرة عيد الميلاد",
              "nome_pais_ru": "Остров Рождества",
              "nome_pais_fr": "Île Christmas"
            },
            {
              "nome_pais": "Ilha de Man",
              "nome_pais_init": "Isle of Man",
              "nome_pais_es": "Isla de Man",
              "nome_pais_ch": "曼城島",
              "nome_pais_ar": "جزيرة مان",
              "nome_pais_ru": "Остров Мэн",
              "nome_pais_fr": "Île de Man"
            },
            {
              "nome_pais": "Ilha Norfolk",
              "nome_pais_init": "Norfolk Island",
              "nome_pais_es": "Isla Norfolk",
              "nome_pais_ch": "諾福克島",
              "nome_pais_ar": "جزيرة نورفولك",
              "nome_pais_ru": "Остров Норфолк",
              "nome_pais_fr": "Île Norfolk"
            },
            {
              "nome_pais": "Ilhas Åland",
              "nome_pais_init": "Åland Islands",
              "nome_pais_es": "Islas Åland",
              "nome_pais_ch": "奧蘭群島",
              "nome_pais_ar": "جزر أولاند",
              "nome_pais_ru": "Аландские Острова",
              "nome_pais_fr": "Îles d'Åland"
            },
            {
              "nome_pais": "Ilhas Cayman",
              "nome_pais_init": "Cayman Islands",
              "nome_pais_es": "Islas Caimán",
              "nome_pais_ch": "開曼群島",
              "nome_pais_ar": "جزر كايمان",
              "nome_pais_ru": "Каймановы Острова",
              "nome_pais_fr": "Îles Caïmans"
            },
            {
              "nome_pais": "Ilhas Cocos (Keeling)",
              "nome_pais_init": "Cocos (Keeling) Islands",
              "nome_pais_es": "Islas Cocos (Keeling)",
              "nome_pais_ch": "科科斯 （基林） 群島",
              "nome_pais_ar": "جزر كوكوس (كيلينغ)",
              "nome_pais_ru": "Кокосовые (Килинг) Острова",
              "nome_pais_fr": "Îles Cocos (Keeling)"
            },
            {
              "nome_pais": "Ilhas Cook",
              "nome_pais_init": "Cook Islands",
              "nome_pais_es": "Islas Cook",
              "nome_pais_ch": "科克群島",
              "nome_pais_ar": "جزر كوك",
              "nome_pais_ru": "Острова Кука",
              "nome_pais_fr": "Îles Cook"
            },
            {
              "nome_pais": "Ilhas Faroe",
              "nome_pais_init": "Faroe Islands",
              "nome_pais_es": "Islas Faroe",
              "nome_pais_ch": "法羅群島",
              "nome_pais_ar": "جزر فارو",
              "nome_pais_ru": "Фарерские острова",
              "nome_pais_fr": "Îles Féroé"
            },
            {
              "nome_pais": "Ilhas Geórgia do Sul e Sandwich do Sul",
              "nome_pais_init": "South Georgia and South Sandwich Islands",
              "nome_pais_es": "Islas Georgia del Sur y Sándwich del Sur",
              "nome_pais_ch": "南喬治亞島和南桑威奇群島",
              "nome_pais_ar": "جورجيا الجنوبية وجزر ساندويتش الجنوبية",
              "nome_pais_ru": "Южная Георгия и Южные Сандвичевы Острова",
              "nome_pais_fr": "Îles Géorgie du Sud et îles Sandwich du Sud"
            },
            {
              "nome_pais": "Ilhas Heard e McDonald",
              "nome_pais_init": "Heard and McDonald Islands",
              "nome_pais_es": "Islas Heard y McDonald",
              "nome_pais_ch": "赫德和麥克唐納群島",
              "nome_pais_ar": "جزيرة هيرد وجزر ماكدونالد",
              "nome_pais_ru": "Остров Херд и острова Макдональд",
              "nome_pais_fr": "Îles Heard et McDonald"
            },
            {
              "nome_pais": "Ilhas Malvinas",
              "nome_pais_init": "Falkland Islands",
              "nome_pais_es": "Islas Malvinas",
              "nome_pais_ch": "福克蘭群島",
              "nome_pais_ar": "جزر فوكلاند",
              "nome_pais_ru": "Фолклендские Острова",
              "nome_pais_fr": "Îles Malouines"
            },
            {
              "nome_pais": "Ilhas Marianas do Norte",
              "nome_pais_init": "Northern Mariana Islands",
              "nome_pais_es": "Islas Marianas del Norte",
              "nome_pais_ch": "北馬里安納群島",
              "nome_pais_ar": "جزر ماريانا الشمالية",
              "nome_pais_ru": "Северные Марианские Острова",
              "nome_pais_fr": "Îles Mariannes du Nord"
            },
            {
              "nome_pais": "Ilhas Marshall",
              "nome_pais_init": "Marshall Islands",
              "nome_pais_es": "Islas Marshall",
              "nome_pais_ch": "馬紹爾群島",
              "nome_pais_ar": "جزر مارشال",
              "nome_pais_ru": "Маршалловы Острова",
              "nome_pais_fr": "Îles Marshall"
            },
            {
              "nome_pais": "Ilhas Menores Distantes dos EUA",
              "nome_pais_init": "United States Minor Outlying Islands",
              "nome_pais_es": "Islas Ultramarinas de los Estados Unidos",
              "nome_pais_ch": "美國本土以外的小島嶼",
              "nome_pais_ar": "جزر الولايات المتحدة الصغيرة النائية",
              "nome_pais_ru": "Малые Тихоокеанские Отдаленные Острова США",
              "nome_pais_fr": "Îles mineures éloignées des États-Unis"
            },
            {
              "nome_pais": "Ilhas Pitcairn",
              "nome_pais_init": "Pitcairn Islands",
              "nome_pais_es": "Islas Pitcairn",
              "nome_pais_ch": "皮特凱恩群島",
              "nome_pais_ar": "جزر بيتكيرن",
              "nome_pais_ru": "Острова Питкэрн",
              "nome_pais_fr": "Îles Pitcairn"
            },
            {
              "nome_pais": "Ilhas Salomão",
              "nome_pais_init": "Solomon Islands",
              "nome_pais_es": "Islas Salomón",
              "nome_pais_ch": "索羅門群島",
              "nome_pais_ar": "جزر سليمان",
              "nome_pais_ru": "Соломоновы Острова",
              "nome_pais_fr": "Îles Salomon"
            },
            {
              "nome_pais": "Ilhas Turks e Caicos",
              "nome_pais_init": "Turks and Caicos Islands",
              "nome_pais_es": "Islas Turcas y Caicos",
              "nome_pais_ch": "土克斯及開科斯群島",
              "nome_pais_ar": "جزر توركس وكايكوس",
              "nome_pais_ru": "Острова Теркс и Кайкос",
              "nome_pais_fr": "Îles Turques et Caïques"
            },
            {
              "nome_pais": "Ilhas Virgens Britânicas",
              "nome_pais_init": "British Virgin Islands",
              "nome_pais_es": "Islas Vírgenes Británicas",
              "nome_pais_ch": "英屬維爾京群島",
              "nome_pais_ar": "الجزر العذراء البريطانية",
              "nome_pais_ru": "Британские Виргинские Острова",
              "nome_pais_fr": "Îles Vierges britanniques"
            },
            {
              "nome_pais": "Ilhas Virgens dos EUA",
              "nome_pais_init": "United States Virgin Islands",
              "nome_pais_es": "Islas Vírgenes de los EE. UU.",
              "nome_pais_ch": "美屬維爾京群島",
              "nome_pais_ar": "الجزر العذراء الأمريكية",
              "nome_pais_ru": "Американские Виргинские Острова",
              "nome_pais_fr": "Îles Vierges des États-Unis"
            },
            {
              "nome_pais": "Índia",
              "nome_pais_init": "India",
              "nome_pais_es": "India",
              "nome_pais_ch": "印度",
              "nome_pais_ar": "الهند",
              "nome_pais_ru": "Индия",
              "nome_pais_fr": "Inde"
            },
            {
              "nome_pais": "Indonésia",
              "nome_pais_init": "Indonesia",
              "nome_pais_es": "Indonesia",
              "nome_pais_ch": "印尼",
              "nome_pais_ar": "أندونيسيا",
              "nome_pais_ru": "Индонезия",
              "nome_pais_fr": "Indonésie"
            },
            {
              "nome_pais": "Irã",
              "nome_pais_init": "Iran",
              "nome_pais_es": "Irán",
              "nome_pais_ch": "伊朗",
              "nome_pais_ar": "إيران",
              "nome_pais_ru": "Иран",
              "nome_pais_fr": "Iran"
            },
            {
              "nome_pais": "Iraque",
              "nome_pais_init": "Iraq",
              "nome_pais_es": "Irak",
              "nome_pais_ch": "伊拉克",
              "nome_pais_ar": "العراق",
              "nome_pais_ru": "Ирак",
              "nome_pais_fr": "Irak"
            },
            {
              "nome_pais": "Irlanda",
              "nome_pais_init": "Ireland",
              "nome_pais_es": "Irlanda",
              "nome_pais_ch": "愛爾蘭",
              "nome_pais_ar": "أيرلندا",
              "nome_pais_ru": "Ирландия",
              "nome_pais_fr": "Irlande"
            },
            {
              "nome_pais": "Islândia",
              "nome_pais_init": "Iceland",
              "nome_pais_es": "Islandia",
              "nome_pais_ch": "冰島",
              "nome_pais_ar": "أيسلندا",
              "nome_pais_ru": "Исландия",
              "nome_pais_fr": "Islande"
            },
            {
              "nome_pais": "Israel",
              "nome_pais_init": "Israel",
              "nome_pais_es": "Israel",
              "nome_pais_ch": "以色列",
              "nome_pais_ar": "إسرائيل",
              "nome_pais_ru": "Израиль",
              "nome_pais_fr": "Israël"
            },
            {
              "nome_pais": "Itália",
              "nome_pais_init": "Italy",
              "nome_pais_es": "Italia",
              "nome_pais_ch": "義大利",
              "nome_pais_ar": "إيطاليا",
              "nome_pais_ru": "Италия",
              "nome_pais_fr": "Italie"
            },
            {
              "nome_pais": "Jamaica",
              "nome_pais_init": "Jamaica",
              "nome_pais_es": "Jamaica",
              "nome_pais_ch": "牙買加",
              "nome_pais_ar": "جامايكا",
              "nome_pais_ru": "Ямайка",
              "nome_pais_fr": "Jamaïque"
            },
            {
              "nome_pais": "Japão",
              "nome_pais_init": "Japan",
              "nome_pais_es": "Japón",
              "nome_pais_ch": "日本",
              "nome_pais_ar": "اليابان",
              "nome_pais_ru": "Япония",
              "nome_pais_fr": "Japon"
            },
            {
              "nome_pais": "Jersey",
              "nome_pais_init": "Jersey",
              "nome_pais_es": "Jersey",
              "nome_pais_ch": "澤西島",
              "nome_pais_ar": "جيرسي",
              "nome_pais_ru": "Джерси",
              "nome_pais_fr": "Jersey"
            },
            {
              "nome_pais": "Jordânia",
              "nome_pais_init": "Jordan",
              "nome_pais_es": "Jordania",
              "nome_pais_ch": "約旦",
              "nome_pais_ar": "الأردن",
              "nome_pais_ru": "Иордания",
              "nome_pais_fr": "Jordanie"
            },
            {
              "nome_pais": "Kuwait",
              "nome_pais_init": "Kuwait",
              "nome_pais_es": "Kuwait",
              "nome_pais_ch": "科威特",
              "nome_pais_ar": "الكويت",
              "nome_pais_ru": "Кувейт",
              "nome_pais_fr": "Koweït"
            },
            {
              "nome_pais": "Laos",
              "nome_pais_init": "Laos",
              "nome_pais_es": "Laos",
              "nome_pais_ch": "老撾",
              "nome_pais_ar": "لاوس",
              "nome_pais_ru": "Лаос",
              "nome_pais_fr": "Laos"
            },
            {
              "nome_pais": "Lesoto",
              "nome_pais_init": "Lesotho",
              "nome_pais_es": "Lesoto",
              "nome_pais_ch": "賴索托",
              "nome_pais_ar": "ليسوتو",
              "nome_pais_ru": "Лесото",
              "nome_pais_fr": "Lesotho"
            },
            {
              "nome_pais": "Letônia",
              "nome_pais_init": "Latvia",
              "nome_pais_es": "Letonia",
              "nome_pais_ch": "拉托維亞",
              "nome_pais_ar": "لاتفيا",
              "nome_pais_ru": "Латвия",
              "nome_pais_fr": "Lettonie"
            },
            {
              "nome_pais": "Líbano",
              "nome_pais_init": "Lebanon",
              "nome_pais_es": "Líbano",
              "nome_pais_ch": "黎巴嫩",
              "nome_pais_ar": "لبنان",
              "nome_pais_ru": "Ливан",
              "nome_pais_fr": "Liban"
            },
            {
              "nome_pais": "Libéria",
              "nome_pais_init": "Liberia",
              "nome_pais_es": "Liberia",
              "nome_pais_ch": "賴比瑞亞",
              "nome_pais_ar": "ليبريا",
              "nome_pais_ru": "Либерия",
              "nome_pais_fr": "Libéria"
            },
            {
              "nome_pais": "Líbia",
              "nome_pais_init": "Libya",
              "nome_pais_es": "Libia",
              "nome_pais_ch": "利比亞",
              "nome_pais_ar": "ليبيا",
              "nome_pais_ru": "Ливия",
              "nome_pais_fr": "Libye"
            },
            {
              "nome_pais": "Liechtenstein",
              "nome_pais_init": "Liechtenstein",
              "nome_pais_es": "Liechtenstein",
              "nome_pais_ch": "列支敦斯登",
              "nome_pais_ar": "ليختنشتاين",
              "nome_pais_ru": "Лихтенштейн",
              "nome_pais_fr": "Liechtenstein"
            },
            {
              "nome_pais": "Lituânia",
              "nome_pais_init": "Lithuania",
              "nome_pais_es": "Lituania",
              "nome_pais_ch": "立陶宛",
              "nome_pais_ar": "ليتوانيا",
              "nome_pais_ru": "Литва",
              "nome_pais_fr": "Lituanie"
            },
            {
              "nome_pais": "Luxemburgo",
              "nome_pais_init": "Luxembourg",
              "nome_pais_es": "Luxemburgo",
              "nome_pais_ch": "盧森堡",
              "nome_pais_ar": "لوكسمبورج",
              "nome_pais_ru": "Люксембург",
              "nome_pais_fr": "Luxembourg"
            },
            {
              "nome_pais": "Macau, RAE da China",
              "nome_pais_init": "Macao, SAR of China",
              "nome_pais_es": "Macao, RAE de China",
              "nome_pais_ch": "中國澳門特別行政區",
              "nome_pais_ar": "ماكاو، جمهورية الصين الشعبية",
              "nome_pais_ru": "Макао, САР Китая ",
              "nome_pais_fr": "Macao, RAS de Chine"
            },
            {
              "nome_pais": "Macedônia",
              "nome_pais_init": "Macedonia",
              "nome_pais_es": "Macedonia",
              "nome_pais_ch": "馬其頓",
              "nome_pais_ar": "مقدونيا",
              "nome_pais_ru": "Македония",
              "nome_pais_fr": "Macédoine"
            },
            {
              "nome_pais": "Madagascar",
              "nome_pais_init": "Madagascar",
              "nome_pais_es": "Madagascar",
              "nome_pais_ch": "馬達加斯加",
              "nome_pais_ar": "مدغشقر",
              "nome_pais_ru": "Мадагаскар",
              "nome_pais_fr": "Madagascar"
            },
            {
              "nome_pais": "Malásia",
              "nome_pais_init": "Malaysia",
              "nome_pais_es": "Malasia",
              "nome_pais_ch": "馬來西亞",
              "nome_pais_ar": "ماليزيا",
              "nome_pais_ru": "Малайзия",
              "nome_pais_fr": "Malaisie"
            },
            {
              "nome_pais": "Malawi",
              "nome_pais_init": "Malawi",
              "nome_pais_es": "Malawi",
              "nome_pais_ch": "馬拉威",
              "nome_pais_ar": "ملاوي",
              "nome_pais_ru": "Малави",
              "nome_pais_fr": "Malawi"
            },
            {
              "nome_pais": "Maldivas",
              "nome_pais_init": "Maldives",
              "nome_pais_es": "Maldivas",
              "nome_pais_ch": "馬爾地夫",
              "nome_pais_ar": "جزر المالديف",
              "nome_pais_ru": "Мальдивы",
              "nome_pais_fr": "Maldives"
            },
            {
              "nome_pais": "Mali",
              "nome_pais_init": "Mali",
              "nome_pais_es": "Malí",
              "nome_pais_ch": "馬里",
              "nome_pais_ar": "مالي",
              "nome_pais_ru": "Мали",
              "nome_pais_fr": "Mali"
            },
            {
              "nome_pais": "Malta",
              "nome_pais_init": "Malta",
              "nome_pais_es": "Malta",
              "nome_pais_ch": "馬爾他",
              "nome_pais_ar": "مالطا",
              "nome_pais_ru": "Мальта",
              "nome_pais_fr": "Malte"
            },
            {
              "nome_pais": "Marrocos",
              "nome_pais_init": "Morocco",
              "nome_pais_es": "Marruecos",
              "nome_pais_ch": "摩洛哥",
              "nome_pais_ar": "المغرب",
              "nome_pais_ru": "Марокко",
              "nome_pais_fr": "Maroc"
            },
            {
              "nome_pais": "Martinica",
              "nome_pais_init": "Martinique",
              "nome_pais_es": "Martinica",
              "nome_pais_ch": "馬丁尼克島",
              "nome_pais_ar": "مارتينيك",
              "nome_pais_ru": "Мартиника",
              "nome_pais_fr": "Martinique"
            },
            {
              "nome_pais": "Maurício",
              "nome_pais_init": "Mauritius",
              "nome_pais_es": "Mauricio",
              "nome_pais_ch": "模里西斯",
              "nome_pais_ar": "موريشيوس",
              "nome_pais_ru": "Маврикий",
              "nome_pais_fr": "Île Maurice"
            },
            {
              "nome_pais": "Mauritânia",
              "nome_pais_init": "Mauritania",
              "nome_pais_es": "Mauritania",
              "nome_pais_ch": "茅利塔尼亞",
              "nome_pais_ar": "موريتانيا",
              "nome_pais_ru": "Мавритания",
              "nome_pais_fr": "Mauritanie"
            },
            {
              "nome_pais": "Mayotte",
              "nome_pais_init": "Mayotte",
              "nome_pais_es": "Mayotte",
              "nome_pais_ch": "馬約特",
              "nome_pais_ar": "جزيرة مايوت",
              "nome_pais_ru": "Майотта",
              "nome_pais_fr": "Mayotte"
            },
            {
              "nome_pais": "México",
              "nome_pais_init": "Mexico",
              "nome_pais_es": "México",
              "nome_pais_ch": "墨西哥",
              "nome_pais_ar": "المكسيك",
              "nome_pais_ru": "Мексика",
              "nome_pais_fr": "Mexique"
            },
            {
              "nome_pais": "Mianmar (Birmânia)",
              "nome_pais_init": "Myanmar (Burma)",
              "nome_pais_es": "Myanmar (Birmania)",
              "nome_pais_ch": "緬甸",
              "nome_pais_ar": "ميانمار (بورما)",
              "nome_pais_ru": "Мьянма (Бирма)",
              "nome_pais_fr": "Myanmar (Birmanie)"
            },
            {
              "nome_pais": "Micronésia",
              "nome_pais_init": "Micronesia",
              "nome_pais_es": "Micronesia",
              "nome_pais_ch": "密克羅尼西亞",
              "nome_pais_ar": "ولايات ميكرونيسيا المتحدة",
              "nome_pais_ru": "Микронезия",
              "nome_pais_fr": "Micronésie"
            },
            {
              "nome_pais": "Moçambique",
              "nome_pais_init": "Mozambique",
              "nome_pais_es": "Mozambique",
              "nome_pais_ch": "莫三比克",
              "nome_pais_ar": "موزامبيق",
              "nome_pais_ru": "Мозамбик",
              "nome_pais_fr": "Mozambique"
            },
            {
              "nome_pais": "Moldávia",
              "nome_pais_init": "Moldova",
              "nome_pais_es": "Moldava",
              "nome_pais_ch": "摩爾多瓦",
              "nome_pais_ar": "مولدافيا",
              "nome_pais_ru": "Молдавия",
              "nome_pais_fr": "Moldavie"
            },
            {
              "nome_pais": "Mônaco",
              "nome_pais_init": "Monaco",
              "nome_pais_es": "Mónaco",
              "nome_pais_ch": "摩納哥",
              "nome_pais_ar": "موناكو",
              "nome_pais_ru": "Монако",
              "nome_pais_fr": "Monaco"
            },
            {
              "nome_pais": "Mongólia",
              "nome_pais_init": "Mongolia",
              "nome_pais_es": "Mongolia",
              "nome_pais_ch": "蒙古",
              "nome_pais_ar": "منغوليا",
              "nome_pais_ru": "Монголия",
              "nome_pais_fr": "Mongolie"
            },
            {
              "nome_pais": "Montenegro",
              "nome_pais_init": "Montenegro",
              "nome_pais_es": "Montenegro",
              "nome_pais_ch": "黑山",
              "nome_pais_ar": "الجبل الأسود",
              "nome_pais_ru": "Черногория",
              "nome_pais_fr": "Monténégro"
            },
            {
              "nome_pais": "Montserrat",
              "nome_pais_init": "Montserrat",
              "nome_pais_es": "Montserrat",
              "nome_pais_ch": "蒙特塞拉特",
              "nome_pais_ar": "مونتسرات",
              "nome_pais_ru": "Монсеррат",
              "nome_pais_fr": "Montserrat"
            },
            {
              "nome_pais": "Namíbia",
              "nome_pais_init": "Namibia",
              "nome_pais_es": "Namibia",
              "nome_pais_ch": "納米比亞",
              "nome_pais_ar": "ناميبيا",
              "nome_pais_ru": "Намибия",
              "nome_pais_fr": "Namibie"
            },
            {
              "nome_pais": "Nauru",
              "nome_pais_init": "Nauru",
              "nome_pais_es": "Nauru",
              "nome_pais_ch": "瑙魯",
              "nome_pais_ar": "جزيرة ناورو",
              "nome_pais_ru": "Науру",
              "nome_pais_fr": "Nauru"
            },
            {
              "nome_pais": "Nepal",
              "nome_pais_init": "Nepal",
              "nome_pais_es": "Nepal",
              "nome_pais_ch": "尼泊爾",
              "nome_pais_ar": "نيبال",
              "nome_pais_ru": "Непал",
              "nome_pais_fr": "Népal"
            },
            {
              "nome_pais": "Nicarágua",
              "nome_pais_init": "Nicaragua",
              "nome_pais_es": "Nicaragua",
              "nome_pais_ch": "尼加拉瓜",
              "nome_pais_ar": "نيكارجوا",
              "nome_pais_ru": "Никарагуа",
              "nome_pais_fr": "Nicaragua"
            },
            {
              "nome_pais": "Níger",
              "nome_pais_init": "Niger",
              "nome_pais_es": "Níger",
              "nome_pais_ch": "尼日爾",
              "nome_pais_ar": "النيجر",
              "nome_pais_ru": "Нигер",
              "nome_pais_fr": "Niger"
            },
            {
              "nome_pais": "Nigéria",
              "nome_pais_init": "Nigeria",
              "nome_pais_es": "Nigeria",
              "nome_pais_ch": "奈及利亞",
              "nome_pais_ar": "نيجيريا",
              "nome_pais_ru": "Нигерия",
              "nome_pais_fr": "Nigeria"
            },
            {
              "nome_pais": "Niue",
              "nome_pais_init": "Niue",
              "nome_pais_es": "Niue",
              "nome_pais_ch": "紐埃",
              "nome_pais_ar": "نييوي",
              "nome_pais_ru": "Ниуэ",
              "nome_pais_fr": "Niue"
            },
            {
              "nome_pais": "Noruega",
              "nome_pais_init": "Norway",
              "nome_pais_es": "Noruega",
              "nome_pais_ch": "挪威",
              "nome_pais_ar": "النرويج",
              "nome_pais_ru": "Норвегия",
              "nome_pais_fr": "Norvège"
            },
            {
              "nome_pais": "Nova Caledônia",
              "nome_pais_init": "New Caledonia",
              "nome_pais_es": "Nueva Caledonia",
              "nome_pais_ch": "新赫里多尼亞",
              "nome_pais_ar": "كاليدونيا الجديدة",
              "nome_pais_ru": "Новая Каледония",
              "nome_pais_fr": "Nouvelle Calédonie"
            },
            {
              "nome_pais": "Nova Zelândia",
              "nome_pais_init": "New Zealand",
              "nome_pais_es": "Nueva Zelanda",
              "nome_pais_ch": "紐西蘭",
              "nome_pais_ar": "نيوزيلندا",
              "nome_pais_ru": "Новая Зеландия",
              "nome_pais_fr": "Nouvelle-Zélande"
            },
            {
              "nome_pais": "Omã",
              "nome_pais_init": "Oman",
              "nome_pais_es": "Omán",
              "nome_pais_ch": "阿曼",
              "nome_pais_ar": "عُمان",
              "nome_pais_ru": "Оман",
              "nome_pais_fr": "Oman"
            },
            {
              "nome_pais": "Países Baixos Caribenhos",
              "nome_pais_init": "Caribbean Netherlands",
              "nome_pais_es": "Países Bajos Caribeños",
              "nome_pais_ch": "荷蘭加勒比區",
              "nome_pais_ar": "الجزر الكاريبية الهولندية",
              "nome_pais_ru": "Карибские Нидерланды",
              "nome_pais_fr": "Antilles néerlandaises"
            },
            {
              "nome_pais": "Palau",
              "nome_pais_init": "Palau",
              "nome_pais_es": "Palau",
              "nome_pais_ch": "帕勞",
              "nome_pais_ar": "باﻻو",
              "nome_pais_ru": "Палау",
              "nome_pais_fr": "Palaos"
            },
            {
              "nome_pais": "Panamá",
              "nome_pais_init": "Panama",
              "nome_pais_es": "Panamá",
              "nome_pais_ch": "巴拿馬",
              "nome_pais_ar": "بنما",
              "nome_pais_ru": "Панама",
              "nome_pais_fr": "Panama"
            },
            {
              "nome_pais": "Papua-Nova Guiné",
              "nome_pais_init": "Papua New Guinea",
              "nome_pais_es": "Papua Nueva Guinea",
              "nome_pais_ch": "巴布亞紐幾內亞",
              "nome_pais_ar": "بابوا غينيا الجديدة",
              "nome_pais_ru": "Папуа-Новая Гвинея",
              "nome_pais_fr": "Papouasie-Nouvelle Guinée"
            },
            {
              "nome_pais": "Paquistão",
              "nome_pais_init": "Pakistan",
              "nome_pais_es": "Pakistán",
              "nome_pais_ch": "巴基斯坦",
              "nome_pais_ar": "باكستان",
              "nome_pais_ru": "Пакистан",
              "nome_pais_fr": "Pakistan"
            },
            {
              "nome_pais": "Paraguai",
              "nome_pais_init": "Paraguay",
              "nome_pais_es": "Paraguay",
              "nome_pais_ch": "巴拉圭",
              "nome_pais_ar": "باراجواي",
              "nome_pais_ru": "Парагвай",
              "nome_pais_fr": "Paraguay"
            },
            {
              "nome_pais": "Peru",
              "nome_pais_init": "Peru",
              "nome_pais_es": "Perú",
              "nome_pais_ch": "秘魯",
              "nome_pais_ar": "بيرو",
              "nome_pais_ru": "Перу",
              "nome_pais_fr": "Pérou"
            },
            {
              "nome_pais": "Polinésia Francesa",
              "nome_pais_init": "French Polynesia",
              "nome_pais_es": "Polinesia Francesa",
              "nome_pais_ch": "法屬玻里尼西亞",
              "nome_pais_ar": "بولينزيا الفرنسية",
              "nome_pais_ru": "Французская Полинезия",
              "nome_pais_fr": "Polynésie française"
            },
            {
              "nome_pais": "Polônia",
              "nome_pais_init": "Poland",
              "nome_pais_es": "Polonia",
              "nome_pais_ch": "波蘭",
              "nome_pais_ar": "بولندا",
              "nome_pais_ru": "Польша",
              "nome_pais_fr": "Pologne"
            },
            {
              "nome_pais": "Porto Rico",
              "nome_pais_init": "Puerto Rico",
              "nome_pais_es": "Puerto Rico",
              "nome_pais_ch": "波多黎各",
              "nome_pais_ar": "بورتوريكو",
              "nome_pais_ru": "Пуэрто-Рико",
              "nome_pais_fr": "Porto Rico"
            },
            {
              "nome_pais": "Portugal",
              "nome_pais_init": "Portugal",
              "nome_pais_es": "Portugal",
              "nome_pais_ch": "葡萄牙",
              "nome_pais_ar": "البرتغال",
              "nome_pais_ru": "Португалия",
              "nome_pais_fr": "Portugal"
            },
            {
              "nome_pais": "Quênia",
              "nome_pais_init": "Kenya",
              "nome_pais_es": "Kenia",
              "nome_pais_ch": "肯尼雅",
              "nome_pais_ar": "كينيا",
              "nome_pais_ru": "Кения",
              "nome_pais_fr": "Kenya"
            },
            {
              "nome_pais": "Quirguistão",
              "nome_pais_init": "Kyrgyzstan",
              "nome_pais_es": "Kirguizistán",
              "nome_pais_ch": "吉爾吉斯斯坦",
              "nome_pais_ar": "قرجستان",
              "nome_pais_ru": "Киргизия",
              "nome_pais_fr": "Kirghizistan"
            },
            {
              "nome_pais": "Quiribati",
              "nome_pais_init": "Kiribati",
              "nome_pais_es": "Kiribati",
              "nome_pais_ch": "吉里巴斯",
              "nome_pais_ar": "كريباتي",
              "nome_pais_ru": "Кирибати",
              "nome_pais_fr": "Kiribati"
            },
            {
              "nome_pais": "Reino Unido",
              "nome_pais_init": "United Kingdom",
              "nome_pais_es": "Reino Unido",
              "nome_pais_ch": "英國",
              "nome_pais_ar": "المملكة المتحدة",
              "nome_pais_ru": "Великобритания",
              "nome_pais_fr": "Royaume-Uni"
            },
            {
              "nome_pais": "República Centro-Africana",
              "nome_pais_init": "Central African Republic",
              "nome_pais_es": "República Centroafricana.",
              "nome_pais_ch": "中非共和國",
              "nome_pais_ar": "جمهورية أفريقيا الوسطى",
              "nome_pais_ru": "Центрально-Африканская Республика",
              "nome_pais_fr": "République centrafricaine."
            },
            {
              "nome_pais": "República Dominicana",
              "nome_pais_init": "Dominican Republic",
              "nome_pais_es": "República Dominicana",
              "nome_pais_ch": "多明尼加共和國",
              "nome_pais_ar": "جمهورية الدومينيكان",
              "nome_pais_ru": "Доминиканская Республика",
              "nome_pais_fr": "République dominicaine"
            },
            {
              "nome_pais": "República dos Camarões",
              "nome_pais_init": "Republic of Cameroon",
              "nome_pais_es": "República de Camerún",
              "nome_pais_ch": "喀麥隆共和國",
              "nome_pais_ar": "جمهورية الكاميرون",
              "nome_pais_ru": "Камерун",
              "nome_pais_fr": "République du Cameroun"
            },
            {
              "nome_pais": "República Tcheca",
              "nome_pais_init": "Czech Republic",
              "nome_pais_es": "República Checa",
              "nome_pais_ch": "捷克共和國",
              "nome_pais_ar": "جمهورية التشيك",
              "nome_pais_ru": "Чехия",
              "nome_pais_fr": "République tchèque"
            },
            {
              "nome_pais": "Reunião",
              "nome_pais_init": "Meeting",
              "nome_pais_es": "Reunión",
              "nome_pais_ch": "會議",
              "nome_pais_ar": "الاجتماع",
              "nome_pais_ru": "Встреча",
              "nome_pais_fr": "Réunion"
            },
            {
              "nome_pais": "Romênia",
              "nome_pais_init": "Romania",
              "nome_pais_es": "Rumania",
              "nome_pais_ch": "羅馬尼亞",
              "nome_pais_ar": "رومانيا",
              "nome_pais_ru": "Румыния",
              "nome_pais_fr": "Roumanie"
            },
            {
              "nome_pais": "Ruanda",
              "nome_pais_init": "Rwanda",
              "nome_pais_es": "Ruanda",
              "nome_pais_ch": "盧安達",
              "nome_pais_ar": "رواندا",
              "nome_pais_ru": "Руанда",
              "nome_pais_fr": "Rwanda"
            },
            {
              "nome_pais": "Rússia",
              "nome_pais_init": "Russia",
              "nome_pais_es": "Rusia",
              "nome_pais_ch": "俄羅斯",
              "nome_pais_ar": "روسيا",
              "nome_pais_ru": "Россия",
              "nome_pais_fr": "Russie"
            },
            {
              "nome_pais": "Saara Ocidental",
              "nome_pais_init": "Western Sahara",
              "nome_pais_es": "Sáhara Occidental",
              "nome_pais_ch": "西撒哈拉",
              "nome_pais_ar": "الصحراء الغربية",
              "nome_pais_ru": "Западная Сахара",
              "nome_pais_fr": "Sahara occidental"
            },
            {
              "nome_pais": "Saint Pierre e Miquelon",
              "nome_pais_init": "Saint Pierre and Miquelon",
              "nome_pais_es": "Saint Pierre y Miquelon",
              "nome_pais_ch": "聖皮爾和密克隆",
              "nome_pais_ar": "سان بيير وميكلون",
              "nome_pais_ru": "Сен-Пьер и Микелон",
              "nome_pais_fr": "Saint Pierre et Miquelon"
            },
            {
              "nome_pais": "Saint-Martin",
              "nome_pais_init": "Saint-Martin",
              "nome_pais_es": "Saint-Martin",
              "nome_pais_ch": "聖馬丁島",
              "nome_pais_ar": "سان مارتن",
              "nome_pais_ru": "Сен Мартен",
              "nome_pais_fr": "Saint-Martin"
            },
            {
              "nome_pais": "Samoa",
              "nome_pais_init": "Samoa",
              "nome_pais_es": "Samoa",
              "nome_pais_ch": "薩摩亞",
              "nome_pais_ar": "ساموا",
              "nome_pais_ru": "Самоа",
              "nome_pais_fr": "Samoa"
            },
            {
              "nome_pais": "Samoa Americana",
              "nome_pais_init": "American Samoa",
              "nome_pais_es": "Samoa Americana",
              "nome_pais_ch": "美屬薩摩亞",
              "nome_pais_ar": "ساموا الأمريكية",
              "nome_pais_ru": "Американское Самоа",
              "nome_pais_fr": "Samoa américaines"
            },
            {
              "nome_pais": "San Marino",
              "nome_pais_init": "San Marino",
              "nome_pais_es": "San Marino",
              "nome_pais_ch": "聖馬利諾",
              "nome_pais_ar": "سان مارينو",
              "nome_pais_ru": "Сан - Марино",
              "nome_pais_fr": "Saint-Marin"
            },
            {
              "nome_pais": "Santa Helena",
              "nome_pais_init": "Saint Helena",
              "nome_pais_es": "Santa Helena",
              "nome_pais_ch": "聖海倫娜",
              "nome_pais_ar": "سانت هيلينا",
              "nome_pais_ru": "Святой Елены",
              "nome_pais_fr": "Sainte-Hélène"
            },
            {
              "nome_pais": "Santa Lúcia",
              "nome_pais_init": "Saint Lucia",
              "nome_pais_es": "Santa Lucía",
              "nome_pais_ch": "聖露西亞",
              "nome_pais_ar": "سانت لوسيا",
              "nome_pais_ru": "Сент-Люсия",
              "nome_pais_fr": "Sainte-Lucie"
            },
            {
              "nome_pais": "São Bartolomeu",
              "nome_pais_init": "São Bartolomeu",
              "nome_pais_es": "San Bartolomé",
              "nome_pais_ch": "聖巴托洛梅烏",
              "nome_pais_ar": "سانت بارثولوميو",
              "nome_pais_ru": "Святого Варфоломея",
              "nome_pais_fr": "São Bartolomeu"
            },
            {
              "nome_pais": "São Cristóvão e Nevis",
              "nome_pais_init": "Saint Kitts and Nevis",
              "nome_pais_es": "Saint Kitts y Nevis",
              "nome_pais_ch": "聖基茨和尼維斯",
              "nome_pais_ar": "سانت كيتس ونيفيس",
              "nome_pais_ru": "Сент-Китс и Невис",
              "nome_pais_fr": "Saint-Kitts-et-Nevis"
            },
            {
              "nome_pais": "São Tomé e Príncipe",
              "nome_pais_init": "São Tomé and Príncipe",
              "nome_pais_es": "Santo Tomé y Príncipe",
              "nome_pais_ch": "聖多美及普林西比島",
              "nome_pais_ar": "ساو تومي وبرينسيب",
              "nome_pais_ru": "Демократическая Республика Сан-Томе и Принсипи",
              "nome_pais_fr": "São Tomé et Príncipe"
            },
            {
              "nome_pais": "São Vicente e Granadinas",
              "nome_pais_init": "Saint Vincent and the Grenadines",
              "nome_pais_es": "San Vicente y Granadinas",
              "nome_pais_ch": "聖文森特和格林納丁斯群島",
              "nome_pais_ar": "سانت فينسنت والغرينادين",
              "nome_pais_ru": "Сент-Винсент и Гренадины",
              "nome_pais_fr": "Saint Vincent et les Grenadines"
            },
            {
              "nome_pais": "Senegal",
              "nome_pais_init": "Senegal",
              "nome_pais_es": "Senegal",
              "nome_pais_ch": "塞內加爾",
              "nome_pais_ar": "السنغال",
              "nome_pais_ru": "Сенегал",
              "nome_pais_fr": "Sénégal"
            },
            {
              "nome_pais": "Serra Leoa",
              "nome_pais_init": "Sierra Leone",
              "nome_pais_es": "Sierra Leona",
              "nome_pais_ch": "塞拉里昂",
              "nome_pais_ar": "سيراليون",
              "nome_pais_ru": "Сьерра-Леоне",
              "nome_pais_fr": "Sierra Leone"
            },
            {
              "nome_pais": "Sérvia",
              "nome_pais_init": "Serbia",
              "nome_pais_es": "Serbia",
              "nome_pais_ch": "塞爾維亞",
              "nome_pais_ar": "صربيا",
              "nome_pais_ru": "Сербия",
              "nome_pais_fr": "Serbie"
            },
            {
              "nome_pais": "Seychelles",
              "nome_pais_init": "Seychelles",
              "nome_pais_es": "Seychelles",
              "nome_pais_ch": "塞席爾",
              "nome_pais_ar": "سيشل",
              "nome_pais_ru": "Сейшельские Острова",
              "nome_pais_fr": "Seychelles"
            },
            {
              "nome_pais": "Sint Maarten",
              "nome_pais_init": "Sint Maarten",
              "nome_pais_es": "Saint Maarten",
              "nome_pais_ch": "聖馬丁",
              "nome_pais_ar": "سانت مارتن",
              "nome_pais_ru": "Синт-Маартен",
              "nome_pais_fr": "Sint Maarten"
            },
            {
              "nome_pais": "Síria",
              "nome_pais_init": "Syria",
              "nome_pais_es": "Siria",
              "nome_pais_ch": "敘利亞",
              "nome_pais_ar": "سوريا",
              "nome_pais_ru": "Сирия",
              "nome_pais_fr": "Syrie"
            },
            {
              "nome_pais": "Somália",
              "nome_pais_init": "Somalia",
              "nome_pais_es": "Somalia",
              "nome_pais_ch": "索馬里",
              "nome_pais_ar": "الصومال",
              "nome_pais_ru": "Сомали",
              "nome_pais_fr": "Somalie"
            },
            {
              "nome_pais": "Sri Lanka",
              "nome_pais_init": "Sri Lanka",
              "nome_pais_es": "Sri Lanka",
              "nome_pais_ch": "斯里蘭卡",
              "nome_pais_ar": "سريلانكا",
              "nome_pais_ru": "Шри Ланка",
              "nome_pais_fr": "Sri Lanka"
            },
            {
              "nome_pais": "Suazilândia",
              "nome_pais_init": "Swaziland",
              "nome_pais_es": "Suazilandia",
              "nome_pais_ch": "史瓦濟蘭",
              "nome_pais_ar": "سوازيلاند",
              "nome_pais_ru": "Свазиленд",
              "nome_pais_fr": "Swaziland"
            },
            {
              "nome_pais": "Sudão",
              "nome_pais_init": "Sudan",
              "nome_pais_es": "Sudán",
              "nome_pais_ch": "蘇丹",
              "nome_pais_ar": "السودان",
              "nome_pais_ru": "Судан",
              "nome_pais_fr": "Soudan"
            },
            {
              "nome_pais": "Sudão do Sul",
              "nome_pais_init": "South Sudan",
              "nome_pais_es": "Sudán del Sur",
              "nome_pais_ch": "南蘇丹",
              "nome_pais_ar": "جنوب السودان",
              "nome_pais_ru": "Южный Судан",
              "nome_pais_fr": "Soudan du Sud"
            },
            {
              "nome_pais": "Suécia",
              "nome_pais_init": "Sweden",
              "nome_pais_es": "Suecia",
              "nome_pais_ch": "瑞典",
              "nome_pais_ar": "السويد",
              "nome_pais_ru": "Швеция",
              "nome_pais_fr": "Suède"
            },
            {
              "nome_pais": "Suíça",
              "nome_pais_init": "Switzerland",
              "nome_pais_es": "Suiza",
              "nome_pais_ch": "瑞士",
              "nome_pais_ar": "سويسرا",
              "nome_pais_ru": "Швейцария",
              "nome_pais_fr": "Suisse"
            },
            {
              "nome_pais": "Suriname",
              "nome_pais_init": "Suriname",
              "nome_pais_es": "Surinam",
              "nome_pais_ch": "蘇利南",
              "nome_pais_ar": "سورينام",
              "nome_pais_ru": "Суринам",
              "nome_pais_fr": "Suriname"
            },
            {
              "nome_pais": "Svalbard e Jan Mayen",
              "nome_pais_init": "Svalbard and Jan Mayen",
              "nome_pais_es": "Svalbard y Jan Mayen",
              "nome_pais_ch": "斯瓦爾巴和揚馬延島",
              "nome_pais_ar": "سفالبارد ويان ماين",
              "nome_pais_ru": "Шпицберген и Ян-Майен",
              "nome_pais_fr": "Svalbard et Jan Mayen"
            },
            {
              "nome_pais": "Tailândia",
              "nome_pais_init": "Thailand",
              "nome_pais_es": "Tailandia",
              "nome_pais_ch": "泰國",
              "nome_pais_ar": "تايلاند",
              "nome_pais_ru": "Королевство Таиланд",
              "nome_pais_fr": "Thaïlande"
            },
            {
              "nome_pais": "Taiwan",
              "nome_pais_init": "Taiwan",
              "nome_pais_es": "Taiwán",
              "nome_pais_ch": "臺灣",
              "nome_pais_ar": "تايوان",
              "nome_pais_ru": "Тайвань",
              "nome_pais_fr": "Taiwan"
            },
            {
              "nome_pais": "Tajiquistão",
              "nome_pais_init": "Tajikistan",
              "nome_pais_es": "Tayikistán",
              "nome_pais_ch": "塔吉克斯坦",
              "nome_pais_ar": "طاجيكستان",
              "nome_pais_ru": "Таджикистан",
              "nome_pais_fr": "Tadjikistan"
            },
            {
              "nome_pais": "Tanzânia",
              "nome_pais_init": "Tanzania",
              "nome_pais_es": "Tanzania",
              "nome_pais_ch": "坦尚尼亞",
              "nome_pais_ar": "تنزانيا",
              "nome_pais_ru": "Танзания",
              "nome_pais_fr": "Tanzanie"
            },
            {
              "nome_pais": "Território Britânico do Oceano Índico",
              "nome_pais_init": "British Indian Ocean Territory",
              "nome_pais_es": "Territorio Británico del Océano Índico",
              "nome_pais_ch": "英屬印度洋領地",
              "nome_pais_ar": "إقليم المحيط الهندي البريطاني",
              "nome_pais_ru": "Британская Территория в Индийском Океане",
              "nome_pais_fr": "Territoire britannique de l’Océan Indien"
            },
            {
              "nome_pais": "Territórios Franceses do Sul",
              "nome_pais_init": "French Southern and Antarctic Lands",
              "nome_pais_es": "Territorios Franceses del Sur",
              "nome_pais_ch": "法屬南半球和南極領地",
              "nome_pais_ar": "أراض فرنسية جنوبية وأنتارتيكية",
              "nome_pais_ru": "Французские Южные Территории",
              "nome_pais_fr": "Territoires français du Sud"
            },
            {
              "nome_pais": "Territórios palestinos",
              "nome_pais_init": "Palestinian territories",
              "nome_pais_es": "Territorios Palestinos",
              "nome_pais_ch": "巴勒斯坦領地",
              "nome_pais_ar": "الأراضي الفلسطينية",
              "nome_pais_ru": "Палестинские территории",
              "nome_pais_fr": "Territoires palestiniens"
            },
            {
              "nome_pais": "Timor-Leste",
              "nome_pais_init": "East Timor",
              "nome_pais_es": "Timor Este",
              "nome_pais_ch": "東帝汶",
              "nome_pais_ar": "تيمور الشرقية",
              "nome_pais_ru": "Восточный Тимор",
              "nome_pais_fr": "Timor oriental"
            },
            {
              "nome_pais": "Togo",
              "nome_pais_init": "Togo",
              "nome_pais_es": "Togo",
              "nome_pais_ch": "多哥",
              "nome_pais_ar": "توغو",
              "nome_pais_ru": "Того",
              "nome_pais_fr": "Togo"
            },
            {
              "nome_pais": "Tokelau",
              "nome_pais_init": "Tokelau",
              "nome_pais_es": "Tokelau",
              "nome_pais_ch": "托克勞",
              "nome_pais_ar": "توكيلاو",
              "nome_pais_ru": "Токелау",
              "nome_pais_fr": "Tokelau"
            },
            {
              "nome_pais": "Tonga",
              "nome_pais_init": "Tonga",
              "nome_pais_es": "Tonga",
              "nome_pais_ch": "湯加",
              "nome_pais_ar": "تونغا",
              "nome_pais_ru": "Тонга",
              "nome_pais_fr": "Tonga"
            },
            {
              "nome_pais": "Trinidad e Tobago",
              "nome_pais_init": "Trinidad and Tobago",
              "nome_pais_es": "Trinidad y Tobago",
              "nome_pais_ch": "特立尼達和多巴哥",
              "nome_pais_ar": "ترينيداد وتوباغو",
              "nome_pais_ru": "Тринидад и Тобаго",
              "nome_pais_fr": "Trinité-et-Tobago"
            },
            {
              "nome_pais": "Tunísia",
              "nome_pais_init": "Tunisia",
              "nome_pais_es": "Túnez",
              "nome_pais_ch": "突尼斯",
              "nome_pais_ar": "تونس",
              "nome_pais_ru": "Тунис",
              "nome_pais_fr": "Tunisie"
            },
            {
              "nome_pais": "Turcomenistão",
              "nome_pais_init": "Turkmenistan",
              "nome_pais_es": "Turkmenistán",
              "nome_pais_ch": "土庫曼斯坦",
              "nome_pais_ar": "تركمانستان",
              "nome_pais_ru": "Туркменистан",
              "nome_pais_fr": "Turkménistan"
            },
            {
              "nome_pais": "Turquia",
              "nome_pais_init": "Turkey",
              "nome_pais_es": "Turquía",
              "nome_pais_ch": "土耳其",
              "nome_pais_ar": "تركيا",
              "nome_pais_ru": "Турция",
              "nome_pais_fr": "Turquie"
            },
            {
              "nome_pais": "Tuvalu",
              "nome_pais_init": "Tuvalu",
              "nome_pais_es": "Tuvalu",
              "nome_pais_ch": "吐瓦魯",
              "nome_pais_ar": "توفالو",
              "nome_pais_ru": "Тувалу",
              "nome_pais_fr": "Tuvalu"
            },
            {
              "nome_pais": "Ucrânia",
              "nome_pais_init": "Ukraine",
              "nome_pais_es": "Ucrania",
              "nome_pais_ch": "烏克蘭",
              "nome_pais_ar": "أوكرانيا",
              "nome_pais_ru": "Украина",
              "nome_pais_fr": "Ukraine"
            },
            {
              "nome_pais": "Uganda",
              "nome_pais_init": "Uganda",
              "nome_pais_es": "Uganda",
              "nome_pais_ch": "烏干達",
              "nome_pais_ar": "أوغندا",
              "nome_pais_ru": "Уганда",
              "nome_pais_fr": "Ouganda"
            },
            {
              "nome_pais": "Uruguai",
              "nome_pais_init": "Uruguay",
              "nome_pais_es": "Uruguay",
              "nome_pais_ch": "烏拉圭",
              "nome_pais_ar": "أوروغواي",
              "nome_pais_ru": "Уругвай",
              "nome_pais_fr": "Uruguay"
            },
            {
              "nome_pais": "Uzbequistão",
              "nome_pais_init": "Uzbekistan",
              "nome_pais_es": "Uzbekistán",
              "nome_pais_ch": "烏茲別克斯坦",
              "nome_pais_ar": "أوزبكستان",
              "nome_pais_ru": "Узбекистан",
              "nome_pais_fr": "Ouzbékistan"
            },
            {
              "nome_pais": "Vanuatu",
              "nome_pais_init": "Vanuatu",
              "nome_pais_es": "Vanuatu",
              "nome_pais_ch": "瓦努阿圖",
              "nome_pais_ar": "فانواتو",
              "nome_pais_ru": "Вануату",
              "nome_pais_fr": "Vanuatu"
            },
            {
              "nome_pais": "Venezuela",
              "nome_pais_init": "Venezuela",
              "nome_pais_es": "Venezuela",
              "nome_pais_ch": "委內瑞拉",
              "nome_pais_ar": "فنزويلا",
              "nome_pais_ru": "Венесуэла",
              "nome_pais_fr": "Venezuela"
            },
            {
              "nome_pais": "Vietnã",
              "nome_pais_init": "Vietnam",
              "nome_pais_es": "Vietnam",
              "nome_pais_ch": "越南",
              "nome_pais_ar": "فيتنام",
              "nome_pais_ru": "Вьетнам",
              "nome_pais_fr": "Vietnam"
            },
            {
              "nome_pais": "Wallis e Futuna",
              "nome_pais_init": "Wallis and Futuna Islands",
              "nome_pais_es": "Wallis y Futuna",
              "nome_pais_ch": "瓦利斯群島和富圖納群島",
              "nome_pais_ar": "جزر والس وفوتونا",
              "nome_pais_ru": "острова Уоллис и Футуна",
              "nome_pais_fr": "Wallis et Futuna"
            },
            {
              "nome_pais": "Zâmbia",
              "nome_pais_init": "Zambia",
              "nome_pais_es": "Zambia",
              "nome_pais_ch": "尚比亞",
              "nome_pais_ar": "زامبيا",
              "nome_pais_ru": "Замбия",
              "nome_pais_fr": "Zambie"
            },
            {
              "nome_pais": "Zimbábue",
              "nome_pais_init": "Zimbabwe",
              "nome_pais_es": "Zimbabue",
              "nome_pais_ch": "辛巴威",
              "nome_pais_ar": "زيمبابوي",
              "nome_pais_ru": "Зимбабве",
              "nome_pais_fr": "Zimbabwe"
            }
        ]; 

        $scope.states = [{
            "sigla": "AC",
            "nome": "Acre"
        }, {
            "sigla": "AL",
            "nome": "Alagoas"
        }, {
            "sigla": "AM",
            "nome": "Amazonas"
        }, {
            "sigla": "AP",
            "nome": "Amapá"
        }, {
            "sigla": "BA",
            "nome": "Bahia"
        }, {
            "sigla": "CE",
            "nome": "Ceará"
        }, {
            "sigla": "DF",
            "nome": "Distrito Federal"
        }, {
            "sigla": "ES",
            "nome": "Espírito Santo"
        }, {
            "sigla": "GO",
            "nome": "Goiás"
        }, {
            "sigla": "MA",
            "nome": "Maranhão"
        }, {
            "sigla": "MG",
            "nome": "Minas Gerais"
        }, {
            "sigla": "MS",
            "nome": "Mato Grosso do Sul"
        }, {
            "sigla": "MT",
            "nome": "Mato Grosso"
        }, {
            "sigla": "PA",
            "nome": "Pará"
        }, {
            "sigla": "PB",
            "nome": "Paraíba"
        }, {
            "sigla": "PE",
            "nome": "Pernambuco"
        }, {
            "sigla": "PI",
            "nome": "Piauí"
        }, {
            "sigla": "PR",
            "nome": "Paraná"
        }, {
            "sigla": "RJ",
            "nome": "Rio de Janeiro"
        }, {
            "sigla": "RN",
            "nome": "Rio Grande do Norte"
        }, {
            "sigla": "RO",
            "nome": "Rondônia"
        }, {
            "sigla": "RR",
            "nome": "Roraima"
        }, {
            "sigla": "RS",
            "nome": "Rio Grande do Sul"
        }, {
            "sigla": "SC",
            "nome": "Santa Catarina"
        }, {
            "sigla": "SE",
            "nome": "Sergipe"
        }, {
            "sigla": "SP",
            "nome": "São Paulo"
        }, {
            "sigla": "TO",
            "nome": "Tocantins"
        }];
    }
]);
