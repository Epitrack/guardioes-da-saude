'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:LoginEmailCtrl
 * @description
 * # LoginEmailCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp').controller('LoginEmailCtrl', ['$scope', 'UserApi', '$translate', '$location', '$rootScope', 'LocalStorage', 'Notification', 
    function($scope, UserApi, $translate, $location, $rootScope, LocalStorage, Notification) {

        $scope.pageClass = 'login-email-page';


        // login with email
        $scope.loginEmail = {};

        $scope.loginUserEmail = function() {
            // console.log("$scope.loginEmail", $scope.loginEmail)

            UserApi.loginUser($scope.loginEmail, function(data) {
                if (data.data.error === true) {
                    $translate('00391').then(function(translation) {
                        $scope.loginError = translation;
                    });

                } else {
                    $rootScope.user = data.data.user;
                    Notification.show('success', 'Login', data.data.message);
                    LocalStorage.userLogin(data.data.user, data.data.token);
                    if (LocalStorage.isFirstAccess()) {
                        $location.path('survey');
                    } else {
                        $location.path('health-daily');
                    }
                }
            });
        };

    }]);
