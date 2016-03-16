'use strict';

/**
 * @ngdoc service
 * @name gdsApp.LocalStorage
 * @description
 * # LocalStorage
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('LocalStorage', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var obj = {};

    var userStorage = {};

    // quando o usuário entra no site
    obj.saveLocation = function (lat, lon) {
      userStorage.lat = lat;
      userStorage.lon = lon;

      localStorage.setItem('userStorage', JSON.stringify(userStorage));
      localStorage.setItem('userLocation', JSON.stringify(userStorage));
    };

    // quando cria o usuário
    obj.userCreateData = function (obj, params) {
      userStorage.active = obj.active;
      userStorage.app = obj.app;
      userStorage.city = obj.city;
      userStorage.createdAt = obj.createdAt;
      userStorage.dob = obj.dob;
      userStorage.email = obj.email;
      userStorage.formattedAddress = obj.formattedAddress;
      userStorage.gender = obj.gender;
      userStorage.nick = obj.nick;
      userStorage.race = obj.race;
      userStorage.id = obj.id;
      userStorage.user = obj.id;
      userStorage.platform = obj.platform;
      userStorage.state = obj.state;
      userStorage.updatedAt = obj.updatedAt;
      userStorage.week_of = obj.week_of;
      userStorage.zip = obj.zip;

      if (obj.picture) {
        userStorage.picture = obj.picture;
      }

      if (params) {
        userStorage.user_token = params;
      } else {
        userStorage.user_token = obj.token;
      }

      // to login with social network
      if (obj.household) {
        userStorage.household = obj.household;
      }

      if (obj.active) {
        userStorage.active = obj.active;
      }

      if (obj.categories) {
        userStorage.categories = obj.categories;
      }

      if (obj.hashtags) {
        userStorage.hashtags = obj.hashtags;
      }

      if (obj.surveys) {
        userStorage.surveys = obj.surveys;
      }
      // ====

      // adiciona no storage as informações do usuário
      $rootScope.user = userStorage;

      localStorage.setItem('userStorage', JSON.stringify(userStorage));
    };

    obj.getItem = function (key) {
      return JSON.parse(localStorage.getItem(key));
    };

    // quando o usuário se loga
    obj.userLogin = function (obj, token) {
      userStorage.active = obj.active;
      userStorage.app = obj.app;
      userStorage.categories = obj.categories;
      userStorage.city = obj.city;
      userStorage.createdAt = obj.createdAt;
      userStorage.dob = obj.dob;
      userStorage.email = obj.email;
      userStorage.formattedAddress = obj.formattedAddress;
      userStorage.gender = obj.gender;
      userStorage.hashtags = obj.hashtags;
      userStorage.household = obj.household;
      userStorage.id = obj.id;
      userStorage.nick = obj.nick;
      userStorage.platform = obj.platform;
      userStorage.race = obj.race;
      userStorage.state = obj.state;
      userStorage.surveys = obj.surveys;
      userStorage.updatedAt = obj.updatedAt;
      userStorage.week_of = obj.week_of;
      userStorage.zip = obj.zip;
      userStorage.user_token = token;

      if (obj.picture) {
        userStorage.picture = obj.picture;
      }

      $rootScope.user = userStorage;

      localStorage.setItem('userStorage', JSON.stringify(userStorage));
    };

    // atualiza o usuário sempre que acontece um post
    obj.updateUser = function (user) {
      // adds into storage user info/data
      var currentUser;
      if (user.data.data.length > 0) {
        var newUser = user.data.data[0];
        currentUser = obj.getItem("userStorage");

        angular.forEach(newUser, function (v, key) {
          currentUser[key] = v;
        });

        $rootScope.user = currentUser;
      }

      localStorage.setItem('userStorage', JSON.stringify(currentUser));
    };

    // atualiza a foto do usuário
    obj.updateAvatar = function (img) {
      $rootScope.user.picture = img;

      localStorage.setItem('userStorage', JSON.stringify($rootScope.user));
    };

    return obj;
  });
