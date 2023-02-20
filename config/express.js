var passport = require('passport');

var FacebookTokenStrategy = require('passport-facebook-token');
var TwitterTokenStrategy = require('passport-twitter-token');
var GooglePlusTokenStrategy = require('passport-google-plus-token');


var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
        var params = {};
        if (profile.provider == 'facebook') {
            params.fb = String(profile.id);
        } else if (profile.provider == 'google-plus') {
            params.gl = String(profile.id);
        } else if (profile.provider == 'twitter') {
            params.tw = String(profile.id);
        }
        console.log('profile', profile);
        User.findOne(params, function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, null);
                // var data = {
                //   provider: profile.provider,
                //   uid: profile.id,
                //   name: profile.displayName
                // };

                // if (profile.emails && profile.emails[0] && profile.emails[0].value) {
                //   data.email = profile.emails[0].value;
                // }
                // if (profile.name && profile.name.givenName) {
                //   data.firstname = profile.name.givenName;
                // }
                // if (profile.name && profile.name.familyName) {
                //   data.lastname = profile.name.familyName;
                // }

                // User.create(data, function(err, user) {
                //   return done(err, user);
                // });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}, function (err, user) {
        done(err, user);
    });
});

/**
 * Configure advanced options for the Express server inside of Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#documentation
 */
module.exports.http = {

    customMiddleware: function (app) {

        passport.use(new FacebookTokenStrategy({
            clientID: "1488956654743239",
            clientSecret: "3e015de3b3aaf73dc306550615ab50f9"
            // clientID: "336643803065778",
            // clientSecret: "4aa4c63233fa41a75c96c89bd84ff883"
        }, verifyHandler));

        passport.use(new TwitterTokenStrategy({
            consumerKey: 'UYU0yBlU7wj3b3tyPT9ArKMhq',
            consumerSecret: 'zWD5LuitsN1FJCMdNwz1dk2w3yoCiCtAjDIVSb0wmghUG3vQHs',
            // callbackURL: 'http://localhost:1337/auth/twitter/callback'
        }, verifyHandler));

        passport.use(new GooglePlusTokenStrategy({
            clientID: '222496114832-5g4835hl11r3go8nltakppui0ccp33cg.apps.googleusercontent.com',
            clientSecret: 'U5iZMQHPsiE9tpeoCzP9TH21',
            // callbackURL: 'http://localhost:1337/auth/google/callback'
        }, verifyHandler));

        app.use(passport.initialize());
        app.use(passport.session());
    }

};