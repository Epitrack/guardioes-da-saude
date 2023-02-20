/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
    var max_boostraps = 6;
    var current_boostrap = 0;

    function single_callback(err) {
        current_boostrap++;
        bostrap_callback();
    }

    function bostrap_callback() {
        if (current_boostrap == max_boostraps) {
            // It's very important to trigger this callback method when you are finished
            // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
            cb();
        }
    }

    Translation.find({}).limit(2).exec(function (err, translations) {
        if (translations.length == 0) {
            console.log("adding bootstrap translations");
            Translation.create([
                {key: 'fever', value: 'Febre', group: 'symptoms', locale: 'pt-BR'},
                {key: 'headache', value: 'Dor de cabeça', group: 'symptoms', locale: 'pt-BR'},
                {key: 'cough', value: 'Tosse', group: 'symptoms', locale: 'pt-BR'},
                {key: 'fatigue', value: 'Cansaço', group: 'symptoms', locale: 'pt-BR'},
                {key: 'flu', value: 'Gripe', group: 'diseases', locale: 'pt-BR'},
                {key: 'dengue', value: 'Dengue', group: 'diseases', locale: 'pt-BR'}
            ], single_callback);
        } else {
            console.log("the system already has translations. skipping bootstrap");
            single_callback(null);
        }
    });
    Symptom.find({}).limit(2).exec(function (err, symptoms) {
        if (symptoms.length == 0) {
            console.log("adding bootstrap symptoms");
            Symptom.create([
                {name: "Fever", code: 'fever'},
                {name: "Headache", code: 'headache'},
                {name: "Cough", code: 'cough'},
                {name: "Fatigue", code: 'fatigue'}
            ], single_callback);
        } else {
            console.log("the system already has symptoms. skipping bootstrap");
            single_callback(null);
        }
    });
    Disease.find({}).limit(2).exec(function (err, diseases) {
        if (diseases.length == 0) {
            console.log("adding bootstrap diseases");
            Disease.create([
                {name: 'Flu', code: 'flu'},
                {name: 'Dengue', code: 'dengue'}
            ], single_callback);
        } else {
            console.log("the system already has diseases. skipping bootstrap");
            single_callback(null);
        }
    });
    App.find({}).limit(2).exec(function (err, apps) {
        if (apps.length == 0) {
            console.log("adding boostrap app");
            App.create({
                name: 'Guardiões da saúde',
                locale: 'en-US',
                url: 'http://dominio.com',
                location: 'Brazil',
                latitude: -15.171681611519844,
                longitude: -49.81804656982422,
                default: true,
                token: 'd41d8cd98f00b204e9800998ecf8427e',
                secret: '215d4c9dc97f1facb9d7eaa9facb3dcc'
            }, single_callback);
        } else {
            console.log("the system already has apps. skipping bootstrap");
            single_callback(null);
        }
    });
    Admin.find({}).limit(2).exec(function (err, admins) {
        if (admins.length == 0) {
            console.log("adding boostrap admin");
            Admin.create({
                    'name': 'guardioes',
                    'email': 'admin@dominio.com',
                    'role': 'Default Admin',
                    'password': 'gds4tw'
                },
                single_callback);
        } else {
            console.log("the system already has admins  x. skipping bootstrap");
            single_callback(null);
        }
    });
    Survey.native(function (err, collection) {
        collection.ensureIndex({coordinates: '2dsphere'}, function () {
            single_callback(null);
        });
    });
    //cb();
};
