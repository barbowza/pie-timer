let gAnimationFrameRequest; // Handle to requestAnimationFrame
let gStartTime
let gCurrentTime;
let gElapsed = 0;            // elapsed runtime in ms
let gDuration = 10 * 1000;   // final runtime in ms

export function populateDuration(document, elDuration) {
    elDuration.innerHTML = ''; // remove ALL child nodes
    const options = [
        { "value": 5, "text": "-- Duration --" },
        { "value": 1, "text": "1 second" },
        { "value": 5, "text": "5 seconds" },
        { "value": 10, "text": "10 seconds", "default": true  },
        { "value": 15, "text": "15 seconds" },
        { "value": 30, "text": "30 seconds" },
        { "value": 60, "text": "1 minute" },
        { "value": 2*60, "text": "2 minutes" },
        { "value": 3*60, "text": "3 minutes" },
        { "value": 5*60, "text": "5 minutes" },
        { "value": 10*60, "text": "10 minutes" },
    ];
    let defaultValue = 5;
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.innerHTML = option.text;
        // then append it to the select element
        elDuration.appendChild(opt);
        if (option.default) {
            elDuration.value = option.value;
            setDuration(option.value);
        }
    });
}


export function attachControls(pie, document) {
    document.addEventListener('click', (e) => {
        const element = e.target.text;
        if (["Start", "Pause", "Reset"].includes(element)) {
            if ("Start" === element) {
                gCurrentTime = performance.now();
                gStartTime = gCurrentTime - gElapsed;
                startAnimation(pie);
                e.target.text = "Pause";
            } else if ("Pause" === element) {
                pauseAnimation();
                e.target.text = "Start";
            } else if ("Reset" === element) {
                gElapsed = 0;
                gStartTime = gCurrentTime = performance.now();
                pie.percentage = 0;
                pie.draw();
            }
        }
    });

    document.addEventListener('change', (e) => {
        if ("duration" === e.target.id) {
            setDuration(e.target.value);
        }
    });
}

function startAnimation(pie) {
    const animate = () => {
        gCurrentTime = performance.now();
        gElapsed = gCurrentTime - gStartTime;
        const percentage = pie.percentage = gElapsed / gDuration;  // percent is 0 - 1
        pie.draw();
        if (percentage >= 1) {
            gStartTime = gCurrentTime;
        }
        gAnimationFrameRequest = requestAnimationFrame(animate);
    };
    animate();

}

function pauseAnimation() {
    cancelAnimationFrame(gAnimationFrameRequest);
    gAnimationFrameRequest = null;
}

function setDuration(seconds) {
    gDuration = seconds * 1000;
}