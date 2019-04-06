"use strict";
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
    { "value": 60 * 60, "text": "60 minutes" }
];
const gOptionCustom = { "value": "custom", "text": "Custom Duration", "last": true };
const MAX_DURATION = 12 * 60*60 - 1;

export function Controls (rootNode, animator, pie, timer, elSelectDuration, modalDuration = null) {
    this._debug = 0;
    this._rootNode = rootNode;

    this._options = gOptions;

    this._animator = animator;
    this._pie = pie;
    this._timer = timer;
    this._elSelectDuration = elSelectDuration;
    if (modalDuration) {
        // when we have a custom duration control add an option to activate it
        this._modalDuration = modalDuration;
        this._options.push(gOptionCustom);
    }

    this._populateDuration();
    this._attachControls();
}

// Add a custom duration to options and set selected option to custom duration
Controls.prototype.SetCustomDuration = function (customDuration) {
    if (isNumeric(customDuration) && customDuration > 0 && customDuration <= MAX_DURATION) {
        const exists = this._options.find((o) => {
            return o.value === customDuration;
        });
        if (exists) {
            this._setDurationSelectToOptionByValue(exists.value);
            this._setDurationFromSeconds(exists.value);
        } else {
            const text = this._timer.getDurationAsText(customDuration);
            this._options.push({ "value": customDuration, "text": text });
            this._options.sort((a, b) => {
                if (a.first || b.last) {
                    return -1;
                } else if (a.last || b.first) {
                    return 1;
                } else {
                    return a.value - b.value;
                }
            });
            this._populateDuration();
            this._setDurationSelectToOptionByValue(customDuration);
            this._setDurationFromSeconds(customDuration);
        }
        this._debug && console.log(`${customDuration} exists: ${!!exists}`);
    }
}


// Populate the Duration <select>
Controls.prototype._populateDuration = function () {
    this._elSelectDuration.innerHTML = '';      // remove ALL child nodes of <select>
    this._options.forEach(option => {
        const opt = this._rootNode.createElement("option");
        opt.value = option.value;
        opt.innerHTML = option.text;
        if (option.disabled) {
            opt.disabled = true;
        }
        // append it to the <select> element
        this._elSelectDuration.appendChild(opt);
        // Set <select> to the (last) option flagged default
        if (option.default) {
            this._setDurationSelectToOptionByValue(option.value);
            this._setDurationFromSeconds(option.value);
        }
    });
}

Controls.prototype._setDurationSelectToOptionByValue = function (value) {
    if (this._options.find(o => o.value === value)) {
        this._elSelectDuration.value = value;
    }
}

Controls.prototype._attachControls = function() {
    this._rootNode.addEventListener('click', (e) => {
        const el = e.target;
        if (el.classList.contains('evt-start-pause')) {
            if (ComponentStartPause.state === ComponentStartPause.Start) {
                this._timer.start();
                this._animator.start();
            } else {
                this._animator.pause();
            }
            ComponentStartPause.toggle();
        } else if (el.classList.contains('evt-reset')) {
            this._timer.reset();
            this._pie.percentage = 0;
            this._pie.draw();
        }
    });

    // Keyboard shortcuts
    // TODO Refactor into index.html. 
    this._rootNode.body.onkeyup = (() => {
        const SPACE_KEYCODE = 32;
        const R_KEYCODE = 82;
        const elReset = this._getButtonByText('Reset');
        return (e) => {
            // Spacebar toggle Start / Pause 
            if(e.keyCode === SPACE_KEYCODE) {
                ComponentStartPause.click();
            } else if (e.keyCode === R_KEYCODE) {
                elReset.click();
            }
        }
    })();

    this._rootNode.addEventListener('change', (e) => {
        if (this._elSelectDuration === e.target) {
            const val = e.target.value;
            if (isNumeric(val)) {
                this._setDurationFromSeconds(val);
            }
            if (val === 'custom') {
                this._modalDuration.open();
            }
        }
    });
}

Controls.prototype._setDurationFromSeconds = function (seconds) {
    this._timer.duration = seconds;
}

Controls.prototype._getButtonByText = function (text)
{
    // https://stackoverflow.com/a/29289196
    const xpath = `//a[text()='${text}']`;
    return this._rootNode.evaluate(xpath, this._rootNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;    
}


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

