//
// Upas and Drugstore
//

'use strict';

var app = angular.module('gdsApp');
app.directive('gdsMaps', function() {
    return {
     restict: 'E',
     template: '<div id="gdsMap"></div>',
     scope:{location:"=", marks:"=", size:"="},
     link:function(scope){
        console.log("scope gsd maps", scope);
        console.log("location",location, scope.location)
         var mapOptions = {
           center: new google.maps.LatLng(scope.location.lat, scope.location.lng),
           zoom: scope.location.zoom,
           scrollwheel: false,
           streetViewControl: false,
           mapTypeControl: true,
           mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_TOP
          }
          // panControl: false,
          // scaleControl:false,
         };
         console.log("mapOptions", mapOptions);
         document.getElementById('gdsMap').style.width = scope.size.width;
         document.getElementById('gdsMap').style.height = scope.size.height;
         var mMap;
         if(mMap) { mMap = null; }
         mMap = new google.maps.Map(document.getElementById('gdsMap'), mapOptions);
         google.maps.event.addListenerOnce(mMap, 'tilesloaded', function(){
           console.log("mapLoaded emit")
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
        };

//        console.log("my marks", scope.marks)
        for (var i = 0; i < scope.marks.length; i++){
            createMarker(scope.marks[i]);
        }
       createMarker({'lat':scope.location.lat, 'lng':scope.location.lng, 'title':'Você está aqui!'}, '/images/icon-user-location.png' );
     }
   };
});
