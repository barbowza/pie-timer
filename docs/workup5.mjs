
export function drawCircle() {
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
        if (Math.abs(angle) < 180 && angle != 0)
            d= 'M ' + p1.x + ',' + p1.y + ' A' + radius+ ',' + radius+ (Math.abs(angle)==180?' 0 1 0 ':' 0 0 0 ')+x+' '+y;
        else
            d= 'M ' + p1.x + ',' + p1.y + ' A' + radius+ ',' + radius+ ' 0 1 0 '+p2.x+' '+p2.y +
        ' M ' + p2.x + ',' + p2.y + ' A' + radius+ ',' + radius+ (Math.abs(angle)==0?' 0 1 0 ':' 0 0 0 ')+x+' '+y;
        
        circle.setAttribute("d", d);

        if (Math.abs(angle) == 0)
            window.clearInterval(window.timer);
    } 
  , 8);
}
