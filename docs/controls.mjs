let gAnimationFrameRequest; // Handle to requestAnimationFrame
let gStartTime
let gCurrentTime;
let gElapsed = 0;            // elapsed runtime in ms

const gOptions = [
    { "value": 5, "text": "-- Duration --", "first": true},
    { "value": 1, "text": "1 second" },
    { "value": 5, "text": "5 seconds" },
    { "value": 10, "text": "10 seconds", "default": true },
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
    this.populateDuration();
    this.attachControls();
}


Controls.prototype.populateDuration = function () {
    this._elDuration.innerHTML = '';      // remove ALL child nodes of <select>
    this._options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.innerHTML = option.text;
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
                gCurrentTime = performance.now();
                gStartTime = gCurrentTime - gElapsed;
                this._startAnimation(this._pie);
                e.target.text = "Pause";
            } else if ("Pause" === element) {
                this._pauseAnimation();
                e.target.text = "Start";
            } else if ("Reset" === element) {
                gElapsed = 0;
                gStartTime = gCurrentTime = performance.now();
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
        gCurrentTime = performance.now();
        gElapsed = gCurrentTime - gStartTime;
        const percentage = this._pie.percentage = gElapsed / this._duration;  // percent is 0 - 1
        this._pie.draw();
        if (percentage >= 1) {
            gStartTime = gCurrentTime;
        }
        gAnimationFrameRequest = requestAnimationFrame(animate);
    };
    animate();

}

Controls.prototype._pauseAnimation = function () {
    cancelAnimationFrame(gAnimationFrameRequest);
    gAnimationFrameRequest = null;
}

Controls.prototype._setDurationFromSeconds = function (seconds) {
    this._duration = seconds * 1000;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}