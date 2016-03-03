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

    var obj = {};

    obj.show = function(status,title, message) {
      console.warn(status, title, message);

        var params = {
          title: title,
          message: message,
          icon: '../images/'+status+'-notficon.png'
        };

        // console.log(params);

        function getStatus () {
          if (!window.Notification) {
            return "unsupported";
          }
          return window.Notification.permission;
        }

        function getPermission () {
          return new Promise((resolve, reject) => {
            Notification.requestPermission(status => {
              if (status == 'granted') {
                resolve();
              }else{
                reject(status);
              }
            });
          });
        }

        getPermission()
        .then(function(){
          var n = new Notification(params.title, {
            body: params.message,
            icon: params.icon
          });
        }).catch(function(status){
          console.log('Had no permission!');
        });
    };

    return obj;
  });
