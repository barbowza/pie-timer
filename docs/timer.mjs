"use strict";
export function Timer () {
    this._debug = 1;

    this._duration = null;
    this._elapsed = 0;
    this._currentTime = null;
    this._startTime = null;

    Object.defineProperty(this, 'MINUTE', {
        get: function () {
            return 60;
        }
    })
    Object.defineProperty(this, 'HOUR', {
        get: function () {
            return this.MINUTE * 60;
        }
    })
}