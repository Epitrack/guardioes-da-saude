/*
*	Selectpicker Directive
*/

'use strict';

angular.module('gdsApp').directive('selectpickerUpdate', function(){
	return {
		restrict: 'A',
        link: function(scope, element, attrs) {
        	setTimeout(function(){
        		element.find('option:eq(0)').remove();
        		element.selectpicker('refresh');
        	},500);
        }
	}
});