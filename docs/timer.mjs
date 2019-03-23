"use strict";
export function Timer () {
    this._debug = 1;

    this._duration = null;
    this._elapsed = 0;
    this._currentTime = null;
    this._startTime = null;

    Object.defineProperty(this, 'minute', { // These getters are now redundant but I leave them to record syntax of getters
        get: function () {
            return 60;
        }
    })
    Object.defineProperty(this, 'hour', {
        get: function () {
            return this.minute * 60;
        }
    })
}

Timer.MINUTE = 60;
Timer.HOUR = Timer.MINUTE * 60;

Timer.prototype.getDurationAsText = function (duration) {
    const h = Math.floor(duration / Timer.HOUR);
    const m = Math.floor((duration - (h * Timer.HOUR)) / Timer.MINUTE);
    const s = duration % Timer.MINUTE;
    const hText = h === 1 ? 'hour' : 'hours';
    const mText = m === 1 ? 'minute' : 'minutes';
    const sText = s === 1 ? 'second' : 'seconds';
    const text = (h ? `${h} ${hText} ` : '') + (m ? `${m} ${mText} ` : '') + (s ? `${s} ${sText}` : '');
    return text;
}