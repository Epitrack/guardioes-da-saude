'use strict';

/**
 * @ngdoc filter
 * @name gdsApp.filter:ageFilter
 * @function
 * @description
 * # ageFilter
 * Filter in the gdsApp.
 */
angular.module('gdsApp')
  .filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date
         var ageDifMs = Date.now() - birthday.getTime();
         var ageDate = new Date(ageDifMs); // miliseconds from epoch
         return Math.abs(ageDate.getUTCFullYear() - 1970);
     }

     function monthDiff(d1, d2) {
       if (d1 < d2){
        var months = d2.getMonth() - d1.getMonth();
        return months <= 0 ? 0 : months;
       }
       return 0;
     }

     return function(birthdate) {
          var k = new Date(birthdate);
          var age = calculateAge(k);

      if (age === 0) {
        return monthDiff(k, new Date()) + ' months';
      }

      return age;
    };
  });
