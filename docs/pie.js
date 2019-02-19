export function Pie (elSvg, percentage = 1) {
  this._elSvg = elSvg;
  this._percentage = percentage;
  this._startPercentage = 0;

  Object.defineProperty(this, "percentage", {
    get() {
      return this._percentage;
    },
    set(value) {
      value = value < 0 ? 0 : (value > 1 ? 1 : value);
      this._percentage = value;
    }
  })
}

Pie.prototype.draw = function () {
  const pathData = getPath(this._startPercentage, this._percentage);
  this._elSvg.setAttribute('d', pathData);
}


function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
}

function getPath(startP, endP) {
  const [startX, startY] = getCoordinatesForPercent(startP);
  const [endX, endY] = getCoordinatesForPercent(endP);
  const largeArcFlag = (endP - startP) > .5 ? 1 : 0;
  return [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      `L 0 0`, // Line
  ].join(' ');
}

