/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 */

/*
 * Cross-browser event and position routines
 */

import * as Log from './logging.js';

function getPosition (obj) {
    "use strict";
    // NB(sross): the Mozilla developer reference seems to indicate that
    // getBoundingClientRect includes border and padding, so the canvas
    // style should NOT include either.
    var objPosition = obj.getBoundingClientRect();
    return {'x': objPosition.left + window.pageXOffset, 'y': objPosition.top + window.pageYOffset,
            'width': objPosition.width, 'height': objPosition.height};
};

export function getPointerEvent (e) {
    var evt;
    evt = (e ? e : window.event);
    evt = (evt.changedTouches ? evt.changedTouches[0] : evt.touches ? evt.touches[0] : evt);
    return evt;
};

// Get mouse event position in DOM element
export function getEventPosition (e, obj, scale) {
    "use strict";
    var evt, docX, docY, pos;
    evt = getPointerEvent(e);
    if (evt.pageX || evt.pageY) {
        docX = evt.pageX;
        docY = evt.pageY;
    } else if (evt.clientX || evt.clientY) {
        docX = evt.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        docY = evt.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    pos = getPosition(obj);
    if (typeof scale === "undefined") {
        scale = 1;
    }
    var realx = docX - pos.x;
    var realy = docY - pos.y;
    var x = Math.max(Math.min(realx, pos.width - 1), 0);
    var y = Math.max(Math.min(realy, pos.height - 1), 0);
    return {'x': x / scale, 'y': y / scale, 'realx': realx / scale, 'realy': realy / scale};
};

export function stopEvent (e) {
    e.stopPropagation();
    e.preventDefault();
};
