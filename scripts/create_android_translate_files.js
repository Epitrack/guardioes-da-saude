var fs = require('fs');
var trad = require('./strings_android.json');
console.log(trad.length);
var line = '<string name="%key%">%value%</string>'

var portugues = [];
var ingles = [];
var espanhol = [];
var chines = [];
var arabe = [];
var russo = [];
var frances = [];
trad.forEach(function(value, index) {
    var pt = line;
    pt = pt.replace("%key%", value['ANDROID_KEY'].trim());
    pt = pt.replace("%value%", value['Português']);
    portugues.push(pt);
    /**/
    var en = line;
    en = en.replace("%key%", value['ANDROID_KEY'].trim());
    en = en.replace("%value%", value['Espanhol']);
    ingles.push(en);
    /**/
    var es = line;
    es = es.replace("%key%", value['ANDROID_KEY'].trim());
    es = es.replace("%value%", value['Espanhol']);
    espanhol.push(es);
    /**/
    var zh = line;
    zh = zh.replace("%key%", value['ANDROID_KEY'].trim());
    zh = zh.replace("%value%", value['Chinês']);
    chines.push(zh);
    /**/
    var ar = line;
    ar = ar.replace("%key%", value['ANDROID_KEY'].trim());
    ar = ar.replace("%value%", value['Árabe']);
    arabe.push(ar);
    /**/
    var ru = line;
    ru = ru.replace("%key%", value['ANDROID_KEY'].trim());
    ru = ru.replace("%value%", value['Russo']);
    russo.push(ru);
    /**/
    var fr = line;
    fr = fr.replace("%key%", value['ANDROID_KEY'].trim());
    fr = fr.replace("%value%", value['Francês']);
    frances.push(fr);

});

portugues.push('<string-array name="language_array"><item>English</item><item>Español</item><item>Fraçais</item><item>Português (Brasil)</item><item>Pycknñ</item><item>简体中文</item><item>العربية</item></string-array><string-array name="image_array"><item>Camera</item><item>Galeria</item></string-array><string-array name="gender_array"><item>Masculino</item><item>Feminino</item></string-array><string-array name="race_array"><item>Branco</item><item>Preto</item><item>Pardo</item><item>Amarelo</item><item>Indígena</item></string-array><string-array name="relationship_array"><item>Pai</item><item>Mãe</item><item>Filho</item><item>Irmão</item><item>Avô</item><item>Neto</item><item>Tio</item><item>Sobrinho</item><item>Bisavô</item><item>Bisneto</item><item>Primo</item><item>Sogro</item><item>Genro</item><item>Nora</item><item>Padrasto</item><item>Madrasta</item><item>Enteado</item><item>Cônjuge</item><item>Outros</item></string-array><string-array name="array_state"><item>Acre</item><item>Alagoas</item><item>Amazonas</item><item>Amapá</item><item>Bahia</item><item>Ceará</item><item>Distrito Federal</item><item>Espírito Santo</item><item>Goiás</item><item>Maranhão</item><item>Minas Gerais</item><item>Mato Grosso do Sul</item><item>Mato Grosso</item><item>Pará</item><item>Paraíba</item><item>Pernambuco</item><item>Piauí</item><item>Paraná</item><item>Rio de Janeiro</item><item>Rio Grande do Norte</item><item>Rondônia</item><item>Roraima</item><item>Rio Grande do Sul</item><item>Santa Catarina</item><item>Sergipe</item><item>São Paulo</item><item>Tocantins</item></string-array><string-array name="array_profile"><item>Atleta / Delegação</item><item>Trabalhador / Voluntário</item><item>Fã / Espectador</item></string-array>');
arabe.push(' <string-array name="language_array"><item>English</item><item>Español</item><item>Fraçais</item><item>Português (Brasil)</item><item>Pycknñ</item><item>简体中文</item><item>العربية</item></string-array><string-array name="image_array"><item>Camera</item><item>Gallery</item></string-array><string-array name="gender_array"><item>المغرب</item><item>صيدليات</item></string-array><string-array name="race_array"><item>أبيض</item><item>الممارسة الجنسية الآمنة</item><item>نشكرك على مواجهة هذا التحدي.</item><item>أصفر</item><item>للشعوب الأصلية</item></string-array><string-array name="relationship_array"><item>أخرى</item><item>مدغشقر</item><item>فيجي</item><item>أيرلندا</item><item>جد</item><item>نيبال</item><item>أراض فرنسية جنوبية وأنتارتيكية</item><item>سوريا</item><item>أم الجد</item><item>ابن الحفيد</item><item>هل أنت مستعد لتصبح مديرًا للصحة؟</item><item>حول</item><item>غامبيا</item><item>نيجيريا</item><item>أكتوبر</item><item>مقدونيا</item><item>ابن الزوج</item><item>الزوج</item><item>أو سجل الاشتراك باستخدام بريدك الإلكتروني</item></string-array><string-array name="array_profile"><item>رياضي / وفد</item><item>عامل / متطوع</item><item>مروحة / المشاهد</item></string-array>');
ingles.push('<string-array name="image_array"><item>Camera</item><item>Gallery</item></string-array><string-array name="gender_array"><item>Male</item><item>Female</item></string-array><string-array name="race_array"><item>White</item><item>Black</item><item>Mixed</item><item>Yellow</item><item>Indigenous</item></string-array><string-array name="relationship_array"><item>Father</item><item>Mother</item><item>Son</item><item>Brother</item><item>Grandfather</item><item>Grandson</item><item>Uncle</item><item>Nephew</item><item>Great-grandfather</item><item>Great-grandson</item><item>Cousin</item><item>Father-in-law</item><item>Son-in-law</item><item>Daughter-in-law</item><item>Stepfather</item><item>Stepmother</item><item>Stepson</item><item>Spouse</item><item>Others</item></string-array><string-array name="array_profile"><item>Athlete / Delegation</item><item>Trabalhador / Voluntário</item><item>Fan / Spectator</item></string-array>');
espanhol.push('<string-array name="language_array"><item>English</item><item>Español</item><item>Fraçais</item><item>Português (Brasil)</item><item>Pycknñ</item><item>简体中文</item><item>العربية</item></string-array><string-array name="image_array"><item>Cámara</item><item>Galería</item></string-array><string-array name="gender_array"><item>Masculino</item><item>Femenino</item></string-array><string-array name="race_array"><item>Blanco</item><item>Negro</item><item>Pardo</item><item>Amarillo</item><item>Indígena</item></string-array><string-array name="relationship_array"><item>Padre</item><item>Madre</item><item>Hijo</item><item>Hermano</item><item>Abuelo</item><item>Nieto</item><item>Tío</item><item>Sobrino</item><item>Bisabuelo</item><item>Bisnieto</item><item>Primo</item><item>Suegro</item><item>Yerno</item><item>Nuera</item><item>Padrastro</item><item>Madrastra</item><item>Hijastro</item><item>Conyugue</item><item>Otros</item></string-array><string-array name="array_profile"><item>Atleta / Delegación</item><item>Trabajador / Voluntario</item><item>Fan / Espectador</item></string-array>');
chines.push('<string-array name="image_array"><item>相機</item><item>畫廊</item></string-array><string-array name="gender_array"><item>摩洛哥</item><item>藥店</item></string-array><string-array name="race_array"><item>白色</item><item>進行安全性行為</item><item>謝謝您面對挑戰。</item><item>黃色</item><item>土著</item></string-array><string-array name="relationship_array"><item>其他</item><item>馬達加斯加</item><item>斐濟</item><item>愛爾蘭</item><item>祖父</item><item>尼泊爾</item><item>法屬南半球和南極領地</item><item>敘利亞</item><item>曾祖父</item><item>大孫子</item><item>您是否準備好了成為一個健康衛士？</item><item>關於</item><item>岡比亞</item><item>奈及利亞</item><item>10 月</item><item>馬其頓</item><item>繼子</item><item>配偶</item><item>或使用您的電子郵件註冊</item></string-array><string-array name="array_profile"><item>運動員 / 代表團</item><item>工人 / 志願者</item><item>愛好者 / 觀眾</item></string-array>');
russo.push('<string-array name="image_array"><item>Тем не менее камера</item><item>галерея</item></string-array><string-array name="gender_array"><item>Мужского пола</item><item>Женского Пола</item></string-array><string-array name="race_array"><item>Белый</item><item>Черный</item><item>Пардо</item><item>Жёлтый</item><item>Индейская</item></string-array><string-array name="relationship_array"><item>Отец</item><item>Мать</item><item>Сын</item><item>Брат</item><item>Дедушка</item><item>Внук</item><item>Дядя</item><item>Племянник</item><item>Прадед</item><item>Правнук</item><item>Двоюродный Брат</item><item>Свёкор</item><item>Зять</item><item>Невестка</item><item>Отчим</item><item>Мачеха</item><item>Пасынок</item><item>Супруг</item><item>Другие </item></string-array><string-array name="array_profile"><item>Спортсмен / Делегация</item><item>Работающий / Доброволец</item><item>Болельщик / Зритель</item></string-array>');
frances.push('<string-array name="image_array"><item>Appareil photographique</item><item>Galerie</item></string-array><string-array name="gender_array"><item>Masculin</item><item>Féminin</item></string-array><string-array name="race_array"><item>Blanc</item><item>Noir</item><item>Brun</item><item>Jaune</item><item>Indigène</item></string-array><string-array name="relationship_array"><item>Père</item><item>Mère</item><item>Fils</item><item>Frère</item><item>Grand-père</item><item>Petit-fils</item><item>Oncle</item><item>Neveu</item><item>Arrière-grand-père</item><item>Arrière petite-fils</item><item>Cousin</item><item>Beau-père</item><item>Gendre</item><item>Belle-fille</item><item>Beau-père</item><item>Belle-mère</item><item>Beau-fils</item><item>Conjoint</item><item>Autres</item></string-array><string-array name="array_profile"><item>Athlète/Délégation</item><item>Travailleur/bénévole</item><item>Fan/Spectateur</item></string-array>');


var objs = [{
    file: "xml_pt.txt",
    data: portugues
}, {
    file: "xml_es.txt",
    data: espanhol
}, {
    file: "xml_zh.txt",
    data: chines
}, {
    file: "xml_ar.txt",
    data: arabe
}, {
    file: "xml_ru.txt",
    data: russo
}, {
    file: "xml_en.txt",
    data: ingles
}, {
    file: "xml_fr.txt",
    data: frances
}];


objs.forEach(function(value, index) {
    for (var i = 0; i < value.data.length; i++) {
        fs.appendFile(value.file, value.data[i]+"\n", function(err) {
            if (err)
                console.error(err);
        });
    }
});
