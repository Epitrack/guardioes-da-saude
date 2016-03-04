'use strict';

/**
 * @ngdoc service
 * @name gdsApp.UserApi
 * @description
 * # UserApi
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('UserApi', function ($http, $location, LocalStorage, ApiConfig, $rootScope, $facebook) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;
    var platform = ApiConfig.PLATFORM;
    var client = ApiConfig.CLIENT;

    // register
    obj.createUser = function (data, callback) {

      data.app_token = app_token;
      data.platform = platform;
      data.client = client;

      data.lat = LocalStorage.getItem('userLocation').lat;
      data.lon = LocalStorage.getItem('userLocation').lon;

      // return console.warn('createUser -> ', data);

      $http.post(apiUrl + '/user/create', data, {headers: {'app_token': app_token}})
        .then(function (data) {
         // console.log('Success createUser ', data);
          callback(data);
          LocalStorage.userCreateData(data.data.user);
        }, function (error) {
          console.warn('Error createUser: ', error);
        });
    };

    // login
    obj.loginUser = function (data, callback) {
      $http.post(apiUrl + '/user/login', data, {headers: {'app_token': app_token}})
        .then(function (data) {
         // console.log('Success loginUser: ', data);
          callback(data);
        }, function (error) {
          console.warn('Error loginUser: ', error);
        });
    };

    // get recent user info
    obj.updateUser = function (id, callback) {
      $http.get(apiUrl + '/user/get/' + id, {headers: {'app_token': app_token}})
        .then(function (result) {
//          console.log('Success updateUser: ', result);
          LocalStorage.updateUser(result);
          if (callback) {
            callback(result);
          }
        }, function (error) {
          console.warn('Error updateUser: ', error);
        });
    };

    obj.changeAvatar = function (avatar, callback) {
      avatar.id = LocalStorage.getItem('userStorage').id;
      $http.post(apiUrl + '/user/update', avatar, {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
         // console.log('Success changeAvatar: ', result);
          callback(result);
          obj.updateUser(LocalStorage.getItem('userStorage').id);
        }, function (error) {
          console.warn('Error changeAvatar: ', error);
        });
    };

    // update user profile
    obj.updateProfile = function (params, callback) {

      // console.warn('params 1 -> ', params);

      // Adds in params obj some data to validate request
      params.client = client;
      params.id = LocalStorage.getItem('userStorage').id;
      params.user_token = LocalStorage.getItem('userStorage').user_token;
      // ====

      // console.warn('params 2 -> ', params);

      $http.post(apiUrl + '/user/update', params, {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
         // console.log('Success updateProfile: ', result);
          callback(result);
          obj.updateUser(params.id);
        }, function (error) {
          console.warn('Error updateProfile: ', error);
        });
    };

    // get user surveys
    obj.getUserSurvey = function (callback) {
       // console.log('user_token', LocalStorage.getItem('userStorage').user_token)
      $http.get(apiUrl + '/user/survey/summary', {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
         // console.log('Success getUserSurvey: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error getUserSurvey: ', error);
        });
    };

    // get calendar data
    obj.getUserCalendar = function (params, callback) {
       // console.log("getUserCalendar ++++ ",params.month, params.year)
      $http.get(apiUrl + '/user/calendar/month?month=' + params.month + '&year=' + params.year, {
          headers: {
            'app_token': app_token,
            'user_token': LocalStorage.getItem('userStorage').user_token
          }
        })
        .then(function (result) {
//          console.log('Success getUserCalendar: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error getUserCalendar: ', error);
        });
    };

    // forgot password
    obj.forgotPassword = function (email, callback) {
      $http.post(apiUrl + '/user/forgot-password', email, {headers: {'app_token': app_token}})
        .then(function (result) {
         // console.log('Success forgotPassword: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error forgotPassword: ', error);
        });
    };

    // check hash validation
    obj.validateHash = function (hash, callback) {
      $http.get(apiUrl + '/user/validate/hash?hash=' + hash, {headers: {'app_token': app_token}})
        .then(function (result) {
         // console.log('Success validateHash: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error validateHash: ', error);
        });
    };

    // register
    obj.updateUserPassword = function (params, callback) {
      $http.post(apiUrl + '/user/update/password', params, {headers: {'app_token': app_token}})
        .then(function (data) {
         // console.log('Success updateUserPassword ', data);
          // LocalStorage.userCreateData(data.data.user);
          callback(data);
        }, function (error) {
          console.warn('Error updateUserPassword: ', error);
        });
    };

    obj.getSavedCalendar = function () {
      return $rootScope.userCalendar;
    };

    function fbLogin(facebook_id, callback) {
        $http.get(apiUrl+'/user/get?fb='+facebook_id, {headers:{'app_token':app_token}})
        .then(function(result){callback(result);},
              function(error){console.warn('Error fbLogin: ', error);});
    };
    obj.facebookLogin = function($scope, toaster){

        var userFbData = {}
        $facebook.getLoginStatus().then(function(response){
          // console.log("getting facebook data")
        });

        $facebook.login().then(function(data){
            if(data.status === 'connected'){
//                console.log("fb data", data)
                $facebook.api('me', {fields:'name,email,gender,ids_for_business'})
                .then(function(response) {
                    userFbData.fb_token = data.authResponse.accessToken;
                    userFbData.nick = response.name;
                    userFbData.email = response.email;
                    userFbData.gender = response.gender[0].toUpperCase();
                    userFbData.fb = response.ids_for_business.data[0].id;//response.id;
                    $scope.userData = userFbData;
//                    console.warn("response.ids_for_business",response.ids_for_business)
//                    console.warn("userFbData.fb",userFbData)
                    fbLogin(userFbData.fb, function (dataLg) {
//                        console.warn("dataLg",dataLg)
                      if (dataLg.data.error === false && dataLg.data.data.length>0) {
                          var loginPass = {email: dataLg.data.data[0].email, password: dataLg.data.data[0].email}
                          obj.loginUser(loginPass, function(resultMail){
                              if(resultMail.data.error === true)
                              {
                                toaster.pop('error', resultMail.data.message);
                              }else{
                                  toaster.pop('success', resultMail.data.message);
                                  LocalStorage.userCreateData(resultMail.data.user, resultMail.data.token);
                                  $location.path('health-daily');
                              }

                          });

                      } else {
//                        console.warn('Error -> ', dataLg.data.message);
                        $('#modal-complete-login').modal('show');
                      }
                    });
                });
            }else{
                console.warn("Error ->", data);
            }
        });
    }

    function twLogin(twitter_id, callback) {
        $http.get(apiUrl+'/user/get?tw='+twitter_id, {headers:{'app_token':app_token}})
        .then(function(result){callback(result);},
              function(error){console.warn('Error twLogin: ', error);});
    };

    obj.twitterLogin = function ($scope, toaster) {
      OAuth.initialize('PipsrkWTsVTTgA_JmxlldSqEQTA');
      var userTwData = {};
      OAuth.popup('twitter', function(err, res){ if(err)console.warn('error tw',err); })
        .done(function(result) {
          result.me().done(function(data) {
           // console.log("me",data)
            userTwData.tw = data.id;
            userTwData.nick = data.name;
            $scope.userData = userTwData;
            twLogin(userTwData.tw, function(dataTw){
             // console.log("dataTw", dataTw);
              if (dataTw.data.error === false && dataTw.data.data.length>0) {
                  var loginPass = {email: dataTw.data.data[0].email, password: dataTw.data.data[0].email}
                  obj.loginUser(loginPass, function(resultMail){
                      if(resultMail.data.error === true)
                      {
                        toaster.pop('error', resultMail.data.message);
                      }else{
                        toaster.pop('success', resultMail.data.message);
                        LocalStorage.userCreateData(resultMail.data.user, resultMail.data.token);
                        $location.path('health-daily');
                      }
                  });
              } else {
//              console.warn('Error -> ', dataLg.data.message);
               // console.log("$scope.userData",$scope.userData)
                $('#modal-complete-login').modal('show');
              }
            });
          })
      })
    };

    function glLogin (google_id, callback) {
        $http.get(apiUrl+'/user/get?gl='+google_id, {headers:{'app_token':app_token}})
        .then(function(result){callback(result);},
              function(error){console.warn('Error glLogin: ', error);});
    };

    obj.googleLogin  = function ($scope, toaster) {
      OAuth.initialize('PipsrkWTsVTTgA_JmxlldSqEQTA');
      var userGlData = {};
      OAuth.popup('google', function(err, res){ if(err)console.warn('error google',err); })
        .done(function(result) {
          result.me().done(function(data) {
           // console.log("me",data)
            userGlData.gl = data.id;
            userGlData.nick = data.name;
            userGlData.gender = (data.gender===0)? 'M' : 'F';
            userGlData.email = data.email;
            $scope.userData = userGlData;
            glLogin(userGlData.gl, function(dataGl){
             // console.log("dataGl", dataGl);
              if (dataGl.data.error === false && dataGl.data.data.length>0) {
                  var loginPass = {email: dataGl.data.data[0].email, password: dataGl.data.data[0].email}
                  obj.loginUser(loginPass, function(resultMail){
                      if(resultMail.data.error === true)
                      {
                        toaster.pop('error', resultMail.data.message);
                      }else{
                        toaster.pop('success', resultMail.data.message);
                        LocalStorage.userCreateData(resultMail.data.user, resultMail.data.token);
                        $location.path('health-daily');
                      }
                  });
              } else {
//              console.warn('Error -> ', dataLg.data.message);
               // console.log("$scope.userData",$scope.userData)
                $('#modal-complete-login').modal('show');
              }
            });
          })
      })
    };

    obj.getUserSurveyByMonth = function (params, callback) {
      $http.get(apiUrl + '/user/chart/month?month=' + params.month + '&year=' + params.year, {
          headers: {
            'app_token': app_token,
            'user_token': params.user_token
          }
        })
        .then(function (result) {
         // console.log('Success getUserSurveyByMonth: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error getUserSurveyByMonth: ', error);
        });
    };

    obj.getUserSurveyByYear = function (params, callback) {

      $http.get(apiUrl + '/user/calendar/year?year=' + params.year, {
          headers: {
            'app_token': app_token,
            'user_token': params.user_token
          }
        })
        .then(function (result) {
         // console.log('Success getUserSurveyByYear: ', result);
          callback(result);
        }, function (error) {
          console.warn('Error getUserSurveyByYear: ', error);
        });
    };

    return obj;
  });
