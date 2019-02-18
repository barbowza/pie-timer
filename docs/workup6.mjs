
export function animatePie(elSvg) {
    let percentage = 0;
    const duration = 4 * 1000;
    const interval = 10;
    const increment = 1 / (duration / interval);
    window.pietimer = window.setInterval(
        () => {
            percentage += increment;
            const pathData = getPath(0, percentage);
            elSvg.setAttribute('d', pathData);
            if (percentage >= 1) {
                percentage = 0;
            }
        }, interval);
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
