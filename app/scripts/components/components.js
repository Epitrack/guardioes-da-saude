//
// Upas and Drugstore
//

'use strict';

var app = angular.module('gdsApp');
app.directive('gdsMaps', function() {
    return {
     restict: 'E',
     template: '<div id="gdsMap"></div>',
    scope:{location:"=", marks:"=", size:"=",zoom:"=",doubleclick:"="},
     link:function(scope){
         var mapOptions = {
           center: new google.maps.LatLng(scope.location.lat, scope.location.lng),
           zoom: 11,
           scrollwheel: false,
           disableDoubleClickZoom: scope.doubleclick||true,
           streetViewControl: false,
           zoomControl: scope.zoom||false,
           mapTypeControl: true,
           mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_TOP
          }
          // panControl: false,
          // scaleControl:false,
};
         document.getElementById('gdsMap').style.width = scope.size.width;
         document.getElementById('gdsMap').style.height = scope.size.height;
         var mMap;
         if(mMap) { mMap = null; }
         mMap = new google.maps.Map(document.getElementById('gdsMap'), mapOptions);
         google.maps.event.addListenerOnce(mMap, 'tilesloaded', function(){
           scope.$emit('mapLoaded', mMap);
         });
         var markers = [];
         var createMarker = function (info, img){
            if(img === undefined) {
                img = {
                 url: info.icon.iconUrl,
                 size: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0]),
                 scaledSize: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0])
                 // origin: new google.maps.Point(0, 0),
                 // anchor: new google.maps.Point(0, info.icon.iconSize[1])
               };
            }
            console.log(info,img);
            var marker = new google.maps.Marker({
                map: mMap,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                icon:img
            });
            marker.content = info.message;

            google.maps.event.addListener(marker, 'click', function(){
                scope.$emit('clickMarker.click', {"title":marker.title, "message":marker.content});
            });
            markers.push(marker);
            scope.$emit('getMarkers', markers);
            if(info.index) { marker.setZIndex(info.index); }
        };

        scope.$on('createMarker', function(event, data) {
          createMarker({'lat':data.location.lat, 'lng':data.location.lng, 'title':data.title}, data.img);
        });

        if (scope.marks.length === 0) { return; }
        for (var i = 0; i < scope.marks.length; i++){
            createMarker(scope.marks[i]);
        }

       createMarker({'lat':scope.location.lat, 'lng':scope.location.lng, 'title':'Você está aqui!'}, '/images/icon-user-location.png' );
     }
   };
});

app.directive('googlePlusSignin', ['$window', function ($window) {
    var ending = /\.apps\.googleusercontent\.com$/;

    return {
      restrict: 'E',
      transclude: true,
      template: '<span></span>',
      replace: true,
      link: function (scope, element, attrs, ctrl, linker) {
        attrs.clientid += (ending.test(attrs.clientid) ? '' : '.apps.googleusercontent.com');

        attrs.$set('data-clientid', attrs.clientid);
        attrs.$set('theme', attrs.theme);

        // Some default values, based on prior versions of this directive
        var defaults = {
          callback: 'signinCallback',
          cookiepolicy: 'single_host_origin',
          requestvisibleactions: 'http://schemas.google.com/AddActivity',
          scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
          height: 'standard',
          width: 'wide',
          state: ''
        };

        defaults.clientid = attrs.clientid;
        defaults.theme = attrs.theme;

        // Overwrite default values if explicitly set
        angular.forEach(Object.getOwnPropertyNames(defaults), function(propName) {
          if (attrs.hasOwnProperty(propName)) {
            defaults[propName] = attrs[propName];
          }
        });

        // Default language
        // Supported languages: https://developers.google.com/+/web/api/supported-languages
        attrs.$observe('language', function(value){
          $window.___gcfg = {
            lang: value ? value : 'en'
          };
        });

        // Asynchronously load the G+ SDK.
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

        linker(function(el, tScope){
          po.onload = function() {
            if (el.length) {
              element.append(el);
            }
            gapi.signin.render(element[0], defaults);
          };
        });
      }
    }
}]).
  run(['$window','$rootScope',function($window, $rootScope) {
    $window.signinCallback = function (authResult) {
      if (authResult && authResult.access_token){
        $rootScope.$broadcast('event:google-plus-signin-success', authResult);
      } else {
        $rootScope.$broadcast('event:google-plus-signin-failure', authResult);
      }
    };
}]);
