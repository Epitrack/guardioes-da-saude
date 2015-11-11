'use strict';

/**
 * @ngdoc service
 * @name gdsApp.LocalStorage
 * @description
 * # LocalStorage
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('LocalStorage', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var obj = {};

    var userStorage = {};

    // quando o usuário entra no site
    obj.saveLocation = function(lat, lon) {
      userStorage.lat = lat;
      userStorage.lon = lon;

      localStorage.setItem('userStorage', JSON.stringify(userStorage));
    };

    // quando cria o usuário
    obj.userCreateData = function(obj) {
      userStorage.nick = obj.nick;
      userStorage.email = obj.email;
      userStorage.dob = obj.dob;
      userStorage.race = obj.race;
      userStorage.gender = obj.gender;
      userStorage.active = obj.active;
      userStorage.app = obj.app;
      userStorage.city = obj.city;
      userStorage.createdAt = obj.createdAt;
      userStorage.formattedAddress = obj.formattedAddress;
      userStorage.id = obj.id;
      userStorage.user = obj.id;
      userStorage.platform = obj.platform;
      userStorage.state = obj.state;
      userStorage.updatedAt = obj.updatedAt;
      userStorage.week_of = obj.week_of;
      userStorage.zip = obj.zip;
      userStorage.user_token = obj.token;

      // adiciona no storage as informações do usuário
      localStorage.setItem('userStorage', JSON.stringify(userStorage));
    };

    obj.getItem = function(key) {
      return JSON.parse(localStorage.getItem(key));
    };

    // quando o usuário se loga
    obj.userLogin = function(obj, token) {
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

      localStorage.setItem('userStorage', JSON.stringify(userStorage));
    };

    obj.updateUser = function(data) {
      // adiciona no storage as informações do usuário
      localStorage.setItem('userStorageUpdate', JSON.stringify(data.data.data[0]));
    };

    return obj;
  });
