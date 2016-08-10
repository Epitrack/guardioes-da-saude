'use strict';

angular.module('gdsApp').directive('removeFirstOption', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            setTimeout(function(){
                element.find('option').eq(0).remove();
                $('.dropdown-menu ul').find('li').eq(0).remove();
            }, 2000);
        }
    };
});
