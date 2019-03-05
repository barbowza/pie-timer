const gOptions = [
    { "value": 0, "text": "-- Duration --", "first": true, disabled: true},
    { "value": 1, "text": "1 second" },
    { "value": 5, "text": "5 seconds", "default": true },
    { "value": 10, "text": "10 seconds" },
    { "value": 15, "text": "15 seconds" },
    { "value": 30, "text": "30 seconds" },
    { "value": 60, "text": "1 minute" },
    { "value": 2 * 60, "text": "2 minutes" },
    { "value": 3 * 60, "text": "3 minutes" },
    { "value": 5 * 60, "text": "5 minutes" },
    { "value": 10 * 60, "text": "10 minutes" },
    { "value": 15 * 60, "text": "15 minutes" },
    { "value": 30 * 60, "text": "30 minutes" },
    { "value": 60 * 60, "text": "60 minutes" },
    { "value": "custom", "text": "Custom Duration", "last": true },
];

export function Controls (pie, document, durationId) {
    this._pie = pie;
    this._document = document;
    this._elDuration = document.getElementById(durationId);
    this._options = gOptions;
    this._duration = null;
    this._elapsed = 0;
    this._currentTime = null;
    this._startTime = null;
    this._animationFrameRequest = null; // Handle to requestAnimationFrame
    this.populateDuration();
    this.attachControls();
}

// Populate the Duration <select>
Controls.prototype.populateDuration = function () {
    this._elDuration.innerHTML = '';      // remove ALL child nodes of <select>
    this._options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.innerHTML = option.text;
        if (option.disabled) {
            opt.disabled = true;
        }
        // append it to the <select> element
        this._elDuration.appendChild(opt);
        if (option.default) {
            this._elDuration.value = option.value;
            this._setDurationFromSeconds(option.value);
        }
    });
}


Controls.prototype.attachControls = function() {
    this._document.addEventListener('click', (e) => {
        const element = e.target.text;
        if (["Start", "Pause", "Reset"].includes(element)) {
            if ("Start" === element) {
                this._currentTime = performance.now();
                this._startTime = this._currentTime - this._elapsed;
                this._startAnimation(this._pie);
                e.target.text = "Pause";
            } else if ("Pause" === element) {
                this._pauseAnimation();
                e.target.text = "Start";
            } else if ("Reset" === element) {
                this._elapsed = 0;
                this._startTime = this._currentTime = performance.now();
                this._pie.percentage = 0;
                this._pie.draw();
            }
        }
    });

    this._document.addEventListener('change', (e) => {
        if ("duration" === e.target.id) {
            const val = e.target.value;
            if (isNumeric(val)) {
                this._setDurationFromSeconds(e.target.value);
            }
            // if (val === 'custom') {
            //     const customValue = 75; // TODO get from number range dialog
            //     const customOption = { "value": customValue, "text": `${customValue} seconds` };
            //     this._Options.push(customOption).sort((a, b) => {
            //         if (a.first) {
            //             return -1;
            //         } else if (b.last) {
            //             return 1;
            //         } else {
            //             return b.value - a.value;
            //         }
            //     });
            //     this._setDurationFromSeconds(customValue);
            // }
        }
    });
}

Controls.prototype._startAnimation = function () {
    const animate = () => {
        this._currentTime = performance.now();
        this._elapsed = this._currentTime - this._startTime;
        const percentage = this._pie.percentage = this._elapsed / this._duration;  // percent is 0 - 1
        this._pie.draw();
        if (percentage >= 1) {
            this._startTime = this._currentTime;
        }
        this._animationFrameRequest = requestAnimationFrame(animate);
    };
    animate();

}

Controls.prototype._pauseAnimation = function () {
    cancelAnimationFrame(this._animationFrameRequest);
    this._animationFrameRequest = null;
}

Controls.prototype._setDurationFromSeconds = function (seconds) {
    this._duration = seconds * 1000;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}