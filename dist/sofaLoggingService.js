/**
 * sofa-logging-service - v0.3.0 - Tue Feb 17 2015 12:58:47 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (sofa, document, undefined) {
'use strict';
/* global sofa */
/* global console */
/**
 * @sofadoc class
 * @name sofa.LoggingService
 * @requires sofa.ConfigService
 * @package sofa-logging-service
 * @requiresPackage sofa-core
 * @distFile dist/sofa.loggingService.js
 *
 * @description
 * This service abstracts the concrete console interface away. It provides the same
 * methods for logging like `.log()`, `.info()` etc..
 *
 * Use this service to log within your application.
 */
sofa.define('sofa.LoggingService', function (configService) {
    var self = {};

    var enabled = configService.get('loggingEnabled', false);

    var doIfEnabled = function (fn) {
        if (!enabled) {
            return;
        }
        fn();
    };

    var dump = function (data) {
        var output = '\n'; //allways start with a new line for better alignment

        data.forEach(function (line) {
            //for a cleaner output we convert objects to beautified JSON
            output += sofa.Util.isString(line) ? line : JSON.stringify(line, null, 4);
            output += '\n';
        });

        return output;
    };

    /**
     * @sofadoc method
     * @name sofa.LoggingService#info
     * @memberof sofa.LoggingService
     *
     * @description
     * A `console.info()` wrapper to log some info in the console.
     *
     * @param {(array|string)} str String or array to log.
     */
    self.info = function (str) {
        doIfEnabled(function () {
            if (sofa.Util.isArray(str)) {
                console.info(dump(str));
            } else {
                console.info(str);
            }
        });
    };

    /**
     * @sofadoc method
     * @name sofa.LoggingService#log
     * @memberof sofa.LoggingService
     *
     * @description
     * A `console.log()` wrapper to log to console.
     *
     * @param {(string|array)} str String or array to log.
     */
    self.log = function (str) {
        doIfEnabled(function () {
            if (sofa.Util.isArray(str)) {
                console.log(dump(str));
            } else {
                console.log(str);
            }
        });
    };

    /**
     * @sofadoc method
     * @name sofa.LoggingService#warn
     * @memberof sofa.LoggingService
     *
     * @description
     * A `console.warn()` wrapper to log warnings to console.
     *
     * @param {(string|array)} str String or array to log.
     */
    self.warn = function (str) {
        doIfEnabled(function () {
            if (sofa.Util.isArray(str)) {
                console.warn(dump(str));
            } else {
                console.warn(str);
            }
        });
    };

    /**
     * @sofadoc method
     * @name sofa.LoggingService#error
     * @memberof sofa.LoggingService
     *
     * @description
     * A `console.error()` wrapper to log errors to console.
     *
     * @param {(string|array)} str String or array to log.
     */
    self.error = function (str) {
        doIfEnabled(function () {
            if (sofa.Util.isArray(str)) {
                console.error(dump(str));
            } else {
                console.error(str);
            }
        });
    };

    return self;
});
}(sofa, document));
