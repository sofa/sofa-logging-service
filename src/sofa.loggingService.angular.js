angular.module('sofa.loggingService', ['sofa.core'])

.factory('loggingService', ['configService', function (configService) {
    'use strict';
    return new sofa.LoggingService(configService);
}]);


