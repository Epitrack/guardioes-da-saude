'use strict';

/**
 * @ngdoc filter
 * @name gdsApp.filter:getMonth
 * @function
 * @description
 * # getMonth
 * Filter in the gdsApp.
 */
angular.module('gdsApp')
    .filter('getMonth', function() {
        var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        // var keys = [00322, 00234, 00361, 00009, 00350, 00330, 00328, 00018, 00565, 00438, 00412, 00157];
        
        return function(index) {
            return months[index - 1];
        };
    });
