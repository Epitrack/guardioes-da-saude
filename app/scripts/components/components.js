'use strict';

var app = angular.module('gdsApp');
app.directive('gdsMaps', function() {
    return {
     scope: {},
     restict: 'E',
     template: '<div id="myMap"></div>', 
     scope:{location:"=", marks:"=", size:"=", mid:"="},
     link:function($scope){
         
         var mapOptions = {
                 center: new google.maps.LatLng($scope.location.lat, $scope.location.lng), 
                 zoom:$scope.location.zoom
         };
         
         document.getElementById('myMap').style.width = $scope.size.width;
         document.getElementById('myMap').style.height = $scope.size.height;
         if(map) map = null;
         var map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
         var markers = [];
         var infoWindow = new google.maps.InfoWindow();
         var createMarker = function (info){
             var img = {
                 url: info.icon.iconUrl, 
                 size: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0]), 
                 scaledSize: new google.maps.Size(info.icon.iconSize[0], info.icon.iconSize[0]),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(0, info.icon.iconSize[1])
             }
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                icon:img
            });
//            marker.content = '<div class="infoWindowContent">' + info.message + '</div>';
//
//            google.maps.event.addListener(marker, 'click', function(){
//                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
//                infoWindow.open($scope.map, marker);
//            });

            markers.push(marker);

        }  
    
        for (var i = 0; i < $scope.marks.length; i++){
            createMarker($scope.marks[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
        $scope.$destroy();
     }
   };
});