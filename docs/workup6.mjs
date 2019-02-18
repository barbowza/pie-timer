
let elSvg;
let request;

let startTime
let currentTime;
let elapsed = 0;
let duration = 10 * 1000;

export function init(_elSvg) {
    elSvg = _elSvg;
    draw(elSvg, 1);
    
    document.addEventListener('click', (e) => {
        const element = e.target.text;
        if (["Start", "Pause", "Reset"].includes(element)) {
            if ("Start" === element) {
                currentTime = performance.now();
                startTime = currentTime - elapsed;
                animatePie(elSvg);
                e.target.text = "Pause";
            } else if ("Pause" === element) {
                pausePie();
                e.target.text = "Start";
            } else if ("Reset" === element) {
                elapsed = 0;
                startTime = currentTime = performance.now();
                draw(elSvg, 0);
            }
        }
    });

    document.addEventListener('change', (e) => {
        console.log(e.target.id, e.target.value);
        if ("duration" === e.target.id) {
            duration = +e.target.value * 1000;
        }
    });
}

function animatePie(elSvg) {
    const animate = () => {
        currentTime = performance.now();
        elapsed = currentTime - startTime;
        const percentage = elapsed / duration;
        // const pathData = getPath(0, percentage);
        // elSvg.setAttribute('d', pathData);
        draw(elSvg, percentage);
        if (percentage >= 1) {
            startTime = currentTime;
        }
        request = requestAnimationFrame(animate);
    };
    animate();
}

function draw(elSvg, percentage) {
    const pathData = getPath(0, percentage);
    elSvg.setAttribute('d', pathData);
}

function pausePie() {
    cancelAnimationFrame(request);
}

// Percentages in 0.0 - 1.0 range
function getPath(startP, endP) {
    const [startX, startY] = getCoordinatesForPercent(startP);
    const [endX, endY] = getCoordinatesForPercent(endP);
    const largeArcFlag = (endP - startP) > .5 ? 1 : 0;

    const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        `L 0 0`, // Line
    ].join(' ');
    return pathData;
}

function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}
