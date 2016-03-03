'use strict';

/**
 * @ngdoc service
 * @name gdsApp.Notification
 * @description
 * # Notification
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('Notification', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function getStatus () {
      if (!window.Notification) {
        return "unsupported";
      }

      return window.Notification.permission;
    }

    function getPermission(params) {
      if (Notification.permission === 'granted') {
        spawnNotification(params);
      }

      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
          if (permission === 'granted') {
            spawnNotification(params);
          }
        });
      }
    }

    function spawnNotification(params) {
      var options = {
        body: params.message,
        icon: params.icon
      }

      var n = new Notification(params.title, options);
    }

    var obj = {};

    obj.show = function(status,title, message) {
      var params = {
        title: title,
        message: message,
        icon: '../images/'+status+'-notficon.png'
      };

      getStatus();
      getPermission(params);
    };

    return obj;
  });
