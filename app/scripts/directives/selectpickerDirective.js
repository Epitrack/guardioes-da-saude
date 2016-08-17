/*
*	Selectpicker Directive
*/

// 'use strict';



angular.module('gdsApp').directive('selectpicker', function(){
	return {
		restrict : 'A',
		link : function(scope, elem, attr){
			
			setTimeout(function(){
				elem.selectpicker('destroy');
				elem.selectpicker();
				$('.drop-register').removeClass('form-control');
			}, 2500);
		}
	}
}); 
