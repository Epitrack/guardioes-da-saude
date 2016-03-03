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

    var obj = {};

    obj.show = function(status,title, message) {
      // console.warn(status, title, message);
      // getStatus();

        var params = {
          title: title,
          message: message,
          icon: '../images/'+status+'-notficon.png'
        };

      Notification.requestPermission().then(function(result) {
        // return console.warn(result);

        if (result === 'denied') {
          // console.log('Permission wasn\'t granted. Allow a retry.');
          return;
        }

        if (result === 'default') {
          // console.log('The permission request was dismissed.');
          return;
        }

        if (result === 'granted') {
           var n = new Notification(params.title, {
            body: params.message,
            icon: params.icon
          });
        }
        // Do something with the granted permission.
      });

        // console.log(params);

        // getPermission()
        // .then(function(){
        //   var n = new Notification(params.title, {
        //     body: params.message,
        //     icon: params.icon
        //   });
        // }).catch(function(status){
        //   console.log('Had no permission!');
        // });
    };

    return obj;
  });
