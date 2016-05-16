'use strict';

/**
 * @ngdoc function
 * @name gdsApp.controller:FaleConoscoCtrl
 * @description
 * # FaleConoscoCtrl
 * Controller of the gdsApp
 */
angular.module('gdsApp')
    .controller('GameCtrl', ['$scope', 'Notification', function($scope, Notification) {

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.slide_active = 0;
        $scope.current = 0;
        $scope.slides = [{
            index: 0,
            image: '../../images/game/tutorial-step-1.svg',
            text: 'Bem-vindo à nossa pista de corrida! Arraste para saber mais sobre como jogar.'
        }, {
            index: 1,
            image: '../../images/game/tutorial-step-2.svg',
            text: 'Para jogar, é preciso ter pontos de energia. Participe diariamente do Guardiões da Saúde para ganhá-los!'
        }, {
            index: 2,
            image: '../../images/game/tutorial-step-3.svg',
            text: 'Nossa pista de corrida é formada por fases. Conclua cada fase para chegar mais longe na corrida!'
        }, {
            index: 3,
            image: '../../images/game/tutorial-step-4.svg',
            text: 'Cada fase contém um quebra-cabeça. Complete-o para passar de fase.'
        }, {
            index: 4,
            image: '../../images/game/tutorial-step-5.svg',
            text: 'Responda corretamente as perguntas sobre saúde para revelar peças.'
        }, {
            index: 5,
            image: '../../images/game/tutorial-step-6.svg',
            text: 'Colecione figurinhas dos esportes olímpicos após concluir cada fase!'
        }];

        $scope.next = function() {
            if ($scope.current < 6) {
                $(".carousel").carousel('next');
            } else {
                alert("próxima tela");
            }
        }

        $scope.setcurrent = function(index) {
            $scope.current = index;
            console.log($scope.current);
        }
    }]);
