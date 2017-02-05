/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 */

/*
 * Logging/debug routines
 */

var _log_level = 'warn';

var Debug = function (msg) {};
var Info = function (msg) {};
var Warn = function (msg) {};
var Error = function (msg) {};

export function init_logging (level) {
    if (typeof level === 'undefined') {
        level = _log_level;
    } else {
        _log_level = level;
    }

    Debug = Info = Warn = Error = function (msg) {};
    if (typeof window.console !== "undefined") {
        /* jshint -W086 */
        switch (level) {
            case 'debug':
                Debug = function (msg) { console.log(msg); };
            case 'info':
                Info  = function (msg) { console.info(msg); };
            case 'warn':
                Warn  = function (msg) { console.warn(msg); };
            case 'error':
                Error = function (msg) { console.error(msg); };
            case 'none':
                break;
            default:
                throw new Error("invalid logging type '" + level + "'");
        }
        /* jshint +W086 */
    }
};
export function get_logging () {
    return _log_level;
};
export { Debug, Info, Warn, Error };

// Initialize logging level
init_logging();
