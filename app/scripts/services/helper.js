'use strict';

/**
 * @ngdoc service
 * @name gdsApp.helper
 * @description
 * # helper
 * Service in the gdsApp.
 */
angular.module('gdsApp')
  .service('helper', function ($q, $timeout, ApiConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var obj = {};

    obj.getId = function() {
      var deferred = $q.defer();

      // console.log('getting id');
      // $scope.analytics_id = ApiConfig.ANALYTICS_ID;

      $timeout(function() {
        // deferred.resolve('UA-XXX-X');
        deferred.resolve(ApiConfig.ANALYTICS_ID);
      }, 2000);

      return deferred.promise;
    };

    return obj;
  });
