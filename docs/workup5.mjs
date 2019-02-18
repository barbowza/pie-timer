
export function drawCircleEx() {
    // center point
    var cX = 300,
        cY = 300,
        radius = 300,
        p1 = {x: cX+radius, y: cY},
        p2 = {x: cX-radius, y: cY},
        circle = document.getElementById("arc"),
        angle = 0;

    window.timer = window.setInterval(
        function() {
        angle -= 1;  
        angle %= 360;
        var radians= (angle/180) * Math.PI;
        var x = cX + Math.cos(radians) * radius;
        var y = cY + Math.sin(radians) * radius;

        let d;
        if (Math.abs(angle) < 180 && angle != 0) {
            d= 'M ' + p1.x + ',' + p1.y + ' A' + radius+ ',' + radius+ (Math.abs(angle)==180?' 0 1 0 ':' 0 0 0 ')+x+' '+y;
        }
        else {
            d= 'M ' + p1.x + ',' + p1.y + ' A' + radius+ ',' + radius+ ' 0 1 0 '+p2.x+' '+p2.y +
        ' M ' + p2.x + ',' + p2.y + ' A' + radius+ ',' + radius+ (Math.abs(angle)==0?' 0 1 0 ':' 0 0 0 ')+x+' '+y;
        }
        
        circle.setAttribute("d", d);

        if (Math.abs(angle) == 0)
            window.clearInterval(window.timer);
    } 
  , 8);
}

export function drawPie(elSvg) {
    const pathData = getPath(0, 0.45);
    elSvg.setAttribute('d', pathData)
}

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
