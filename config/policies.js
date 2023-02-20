/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *w
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {
    '*': 'flash',
    AdminController: {
        'login': 'flash',
        '*': ['flash', 'sessionAuth', 'hasValidAppToken', 'isAdmin']
    },
    AppController: {
        '*': ['flash', 'sessionAuth', 'hasValidAppToken', 'isAdmin'],
        'read': ['flash', 'hasValidAppToken']
    },
    DiseasesController: {
        '*': ['flash', 'sessionAuth', 'isAdmin'],
        'list': ['flash', 'hasValidAppToken'],
        'get': ['flash', 'hasValidAppToken']
    },
    UserController: {
        'login': 'flash',
        '*': ['flash', 'sessionAuth'],
        'create': ['flash', 'hasValidAppToken'],
        'read': ['flash', 'hasValidAppToken'],
        'list': ['flash', 'hasValidAppToken', 'isAdmin'],
        'update': ['flash', 'hasValidAppToken', 'sessionAuth'],
        'profile': ['flash', 'sessionAuth', 'isUser'],
        'report': ['flash', 'sessionAuth', 'isUser'],
        'edit': ['flash', 'sessionAuth', 'isOwnerOrAdmin'],
        'index': ['flash', 'sessionAuth', 'isAdmin'],
        'setSubscription': ['flash', 'sessionAuth', 'isOwnerOrAdmin'],
        'getUserSurveySummary': ['flash', 'sessionAuth'],
        'forgot_password': ['flash'],
        'validate_hash': ['flash'],
        'update_password': ['flash'],
        'reactivate': 'hasValidAppToken'

    },
    HouseholdController: {
        'delete': ['flash', 'sessionAuth'],
        '*': ['flash', 'hasValidAppToken', 'sessionAuth', 'sessionAuth'],
    },
    NewsController: {
        '*': ['flash'],
    },
    EmailController: {
        '*': ['flash'],
    },
    SymptomsController: {
        'create': ['flash', 'sessionAuth', 'isAdmin'],
        'read': ['flash', 'hasValidAppToken'],
        'list': ['flash', 'hasValidAppToken'],
        'edit': ['flash', 'sessionAuth', 'isAdmin'],
        'update': ['flash', 'sessionAuth', 'isAdmin'],
        'delete': ['flash', 'sessionAuth', 'isAdmin']
    },
    DocsController: {
        '*': true
    },
    SurveyController: {
        '*': ['flash', 'hasValidAppToken'],
        'index': ['flash', 'sessionAuth', 'isAdmin'],
        'updateSyndrome' : true
    },
    TranslationsController: {
        '*': ['flash', 'sessionAuth', 'isAdmin'],
        'read': ['flash', 'hasValidAppToken'],
        'list': ['flash', 'hasValidAppToken']
    },
    ContentController: {
        '*': ['flash', 'sessionAuth', 'isAdmin'],
        'read': ['flash'],
        'places': ['flash'],
        'getContentByApp': ['flash']
    }
    /***************************************************************************
     *                                                                       *
     * Default policy for all controllers and actions (`true` allows public     *
     * access)                                                                  *
     *                                                                          *
     ***************************************************************************/

    // '*': true,

    /***************************************************************************
     *                                                                          *
     * Here's an example of mapping some policies to run before a controller    *
     * and its actions                                                          *
     *                                                                          *
     ***************************************************************************/
    // RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    // '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    // nurture	: 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    // feed : ['isNiceToAnimals', 'hasRabbitFood']
    // }
};
