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
  .filter('getMonth', function () {
    var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return function(index) {
      return months[index - 1]
    }
  });
