/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        view: 'home',
        locals: {
            'page': 'home'
        }
    },

    '/upload-file': {
        view: 'uploadfile'  // view 'uploadfile' in views directory will loaded automatically
    },

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    'GET /logout': 'AuthController.logout',

    'GET /admin/get': 'AdminController.read',
    'GET /admin/get/:admin_id': 'AdminController.read',
    'GET /admin/login': 'AdminController.login',
    'GET /admin/list': 'AdminController.list',
    'GET /admin/edit/:admin_id': 'AdminController.edit',
    'GET /admin/delete/:admin_id': 'AdminController.delete',

    'GET /admin': 'AdminController.index',
    'GET /admin/apps': 'AppController.index',
    'GET /admin/users': 'UserController.index',
    'GET /admin/symptoms': 'SymptomsController.index',
    'GET /admin/diseases': 'DiseasesController.index',
    'GET /admin/surveys': 'SurveyController.index',
    'GET /admin/translations': 'TranslationsController.index',
    'GET /admin/content': 'ContentController.index',

    'POST /admin/login': 'AuthController.loginAdmin',
    'POST /admin/create': 'AdminController.create',
    'POST /admin/update': 'AdminController.update',
    'POST /app/create': 'AppController.create',
    'POST /app/update': 'AppController.update',

    'GET /app/default/:app_id': 'AppController.default',
    'GET /app/edit/:app_id': 'AppController.edit',
    'GET /app/delete/:app_id': 'AppController.delete',
    'GET /app/delete': 'AppController.delete',
    'GET /app/get': 'AppController.read',
    'GET /app/list': 'AppController.list',
    'GET /app/:app_id': 'AppController.read',

    'POST /email/log': 'EmailController.logError',
    'POST /email/contact': 'EmailController.contact',

    'GET /search/cities': 'SearchController.mostSearched',

    'POST /diseases/create': 'DiseasesController.create',
    'POST /diseases/update': 'DiseasesController.update',
    'POST /diseases/symptoms': 'DiseasesController.symptoms',
    'POST /diseases/symptoms/add': 'DiseasesController.symptoms_add',
    'POST /diseases/symptoms/remove': 'DiseasesController.symptoms_remove',

    'GET /diseases/get': 'DiseasesController.get',
    'GET /diseases/list': 'DiseasesController.list',
    'GET /diseases/edit/:disease_id': 'DiseasesController.edit',
    'GET /diseases/delete/:disease_id': 'DiseasesController.delete',

    'GET /news/get': 'NewsController.get',
    'GET /hashtags/get': 'NewsController.listHashtags',
    'POST /hashtags/create': 'NewsController.createHashtags',

    'POST /symptoms/create': 'SymptomsController.create',
    'POST /symptoms/update': 'SymptomsController.update',

    'GET /symptoms/get': 'SymptomsController.read',
    'GET /symptom/:symptom_id': 'SymptomsController.read',
    'GET /symptoms': 'SymptomsController.list',
    'GET /symptoms/delete/:symptom_id': 'SymptomsController.delete',
    'GET /symptoms/edit/:symptom_id': 'SymptomsController.edit',

    'POST /user/create': 'UserController.create',
    'POST /user/update': 'UserController.update',
    'POST /user/subscription/change': 'UserController.setSubscription',
    'POST /user/upload-photo': 'UserController.upload',
    'POST /user/hashtags/add': 'UserController.hashtag_add',
    'POST /user/hashtags/remove': 'UserController.hashtag_remove',
    'POST /user/forgot-password': 'UserController.forgot_password',
    'GET /user/validate/hash': 'UserController.validate_hash',
    'POST /user/update/password': 'UserController.update_password',

    'GET /users': 'UserController.list',
    'GET /user/login': 'UserController.login',
    'GET /user/profile': 'UserController.profile',
    'GET /user/lookup': 'UserController.lookup',
    'GET /user': 'UserController.profile',
    'GET /user/report': 'UserController.report',
    'GET /user/get': 'UserController.read',
    'GET /user/get/:user_id': 'UserController.read',
    'DELETE /user/delete/': 'UserController.delete',
    'POST /user/reactivate/': 'UserController.reactivate',
    'GET /user/edit/:user_id': 'UserController.edit',
    'GET /user/household/:user_id': 'HouseholdController.read',
    'GET /user/surveys/:user_id': 'SurveyController.read',
    'GET /user/platform/summary': 'UserController.getUsersByPlatform',
    'GET /user/survey/summary': 'UserController.getUserSurveySummary',
    'GET /user/profile/summary': 'UserController.getUserProfileSummary',
    'GET /user/geopraphic/summary': 'UserController.getUserGeographicSummary',
    'GET /user/calendar/day': 'UserController.getUserSurveyDay',
    'GET /user/calendar/month': 'UserController.getUserSurveyMonth',
    'GET /user/calendar/year': 'UserController.getUserSurveyYear',
    'GET /user/chart/month': 'UserController.getAllUserSurveyMonth',
    'GET /user/subscription/week': 'UserController.getSubscriptionByWeekOf',
    'GET /user/subscription/weeks': 'UserController.getSubscriptionByWeeks',
    'GET /user/subscription/monthly': 'UserController.getMonthlySubscription',
    'POST /user/login': 'AuthController.loginUser',
    'POST /user/changepass': 'UserController.changePasswd',

    'POST /household/create': 'HouseholdController.create',
    'POST /household/update': 'HouseholdController.update',
    'POST /household/upload-photo': 'HouseholdController.upload',



    'GET /user/facebook/login': 'AuthController.loginFacebook',
    'GET /auth/facebook/callback': 'AuthController.facebookCallback',
    'GET /auth/twitter/callback': 'AuthController.twitterCallback',
    'GET /auth/google/callback': 'AuthController.googleCallback',


    'GET /household': 'HouseholdController.list',
    'GET /household/get': 'HouseholdController.read',
    'GET /household/get/:household_id': 'HouseholdController.read',
    'GET /household/delete/:household_id': 'HouseholdController.delete',
    'GET /household/delete': 'HouseholdController.delete',
    'GET /household/edit/:household_id': 'HouseholdController.edit',
    'GET /household/survey/summary': 'HouseholdController.getHouseholdSurveySummary',
    'GET /household/calendar/day': 'HouseholdController.getHouseholdSurveyDay',
    'GET /household/calendar/month': 'HouseholdController.getHouseholdSurveyMonth',
    'GET /household/calendar/year': 'HouseholdController.getHouseholdSurveyYear',

    'POST /survey/create': 'SurveyController.create',
    'POST /survey/batch': 'SurveyController.batch',

    'GET /surveys/get': 'SurveyController.read',
    'GET /surveys/summary': 'SurveyController.getSummary',
    'GET /survey/get/:survey_id': 'SurveyController.read',
    'GET /surveys/s': 'SurveyController.getBySymptom',
    'GET /surveys/d': 'SurveyController.getByDisease',
    'GET /surveys/l': 'SurveyController.getByLocation',
    'GET /surveys/w': 'SurveyController.getByWeekOf',
    'GET /surveys/u': 'SurveyController.updateSyndrome',

    'GET /translations/edit/:translation_id': 'TranslationsController.edit',
    'GET /translations/key/:key': 'TranslationsController.read',
    'GET /translations/:translation_id': 'TranslationsController.read',
    'GET /translations/delete/:translation_id': 'TranslationsController.delete',

    'POST /translations/create': 'TranslationsController.create',
    'POST /translations/update': 'TranslationsController.update',

    // 'GET /docs': 'DocsController.index',
    // 'GET /docs/config': 'DocsController.config',
    // 'GET /docs/admin': 'DocsController.admin',
    // 'GET /docs/user': 'DocsController.user',
    // 'GET /docs/diseases': 'DocsController.diseases',
    // 'GET /docs/surveys': 'DocsController.surveys',
    // 'GET /docs/map': 'DocsController.map',
    // 'GET /docs/other': 'DocsController.other',

    'GET /content/get': 'ContentController.read',
    'GET /content/places': 'ContentController.places',
    'GET /content/app/:app_token': 'ContentController.getContentByApp',
    'GET /content/edit/:id': 'ContentController.edit',
    'GET /content/delete/:id': 'ContentController.delete',
    'POST /content/create': 'ContentController.create',
    'POST /content/update': 'ContentController.update',

    'GET /upas/get': 'UpaController.read',

    //push
    'POST /push/send': 'PushController.sendPush',

    //charts
    'GET /charts/home': 'ChartsController.home',
    'GET /charts/summary': 'ChartsController.summary',
    'GET /charts/pins': 'ChartsController.getPins',
    'GET /charts/cluster': 'ChartsController.kmeans',
    'GET /charts/clusters': 'ChartsController.kmeans',

    //game olympics
    'GET /game/questions/': 'GameController.getQuestions',
    'GET /game/ranking/': 'GameController.ranking',
    'POST /game/': 'GameController.answer',


    //EI Epidemics Inteligence
    'GET /ei/symptoms/': 'EiController.getSymptons',
    'GET /ei/syndrome/': 'EiController.getSyndrome',
    'GET /ei/alerts/': 'EiController.getWarnings',
    'GET /ei/users/': 'EiController.getUserRoles',

};
