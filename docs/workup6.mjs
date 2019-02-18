
export function animatePie(elSvg) {
    let startTime = performance.now();
    const duration = 10 * 1000;
    let request;
    const animate = () => {
        const currentTime = performance.now();
        const percentage = (currentTime - startTime) / duration;
        const pathData = getPath(0, percentage);
        elSvg.setAttribute('d', pathData);
        if (percentage >= 1) {
            startTime = currentTime;
        }
        request = requestAnimationFrame(animate);
    };
    animate();
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

