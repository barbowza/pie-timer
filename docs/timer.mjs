"use strict";
export function Timer () {
    this._debug = 1;

    this._elapsed = 0;
    this._duration = null;
    this._currentTime = null;
    this._startTime = null;

    Object.defineProperty(this, 'milliseconds', {
        get: function () {
            return 1000;
        }
    })

    Object.defineProperty(this, 'percentElapsed', {
        get: function () {
            return this._elapsed / this._duration;  // percent is 0 - 1
        }
    })
    Object.defineProperty(this, 'duration', {
        set: function (seconds) {
            this._duration = this.milliseconds * seconds;
        }
    })
}

Timer.MINUTE = 60;
Timer.HOUR = Timer.MINUTE * 60;


Timer.prototype.start = function () {
    this._currentTime = performance.now();
    this._startTime = this._currentTime - this._elapsed;
}

Timer.prototype.lap = function () {
    this._startTime = this._currentTime;
}

Timer.prototype.tick = function () {
    this._currentTime = performance.now();
    this._elapsed = this._currentTime - this._startTime;
}

Timer.prototype.reset = function () {
    this._elapsed = 0;
    this._startTime = this._currentTime = performance.now();
}

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

