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
        var year = d2.getYear() - d1.getYear();
        if (year===1){
            var m1 = 12 - d1.getMonth() + d2.getMonth()-1;

            return m1;
        }
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
          var retorno = monthDiff(k, new Date());
          retorno += (retorno>1)? ' meses' : ' mês';
        return retorno;
      }
       age += (age>1)? ' anos' : ' ano';
      return age;
    };
  });
