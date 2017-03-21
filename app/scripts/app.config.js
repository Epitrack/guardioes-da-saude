'use strict';

angular.module("gdsApp")
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }])
    .constant('ApiConfig', {
        'API_URL': 'http://0.0.0.0:1337',
        'API_KERNEL': './kernel',
        'APP_TOKEN': 'd41d8cd98f00b204e9800998ecf8427e',
        'PLATFORM': 'web',
        'CLIENT': 'api',
        'ANALYTICS_ID': 'UA-71659608-4'
    });