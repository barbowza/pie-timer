'use strict';

class ComponentPie extends HTMLElement {
    template = `
    
    <svg width="100" height="100" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)" preserveAspectRatio="xMidYMid">
        <path data-js="pie-path" d="M 1 0 A 1 1 0 1 1 1 -2.4492935982947064e-16 L 0 0" fill="Coral" stroke="transparent" stroke-opacity="0" class="evt-start-pause"></path>
    </svg>

    `;

    static get TAG() {
        return 'pie-cmpt';
    }

    constructor() {
        super();
        this._percentage = this._startPercentage = 0;
        this._colour = 'SteelBlue';
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this._elPath = this.querySelector('[data-js="pie-path"]');
        this._percentage = 1;
        this.draw();
    }

    // Percentage is clamped 0 to 1
    get percentage() {
        return this._percentage;
    }
    set percentage(value) {
        value = value < 0 ? 0 : value > 1 ? 1 : value;
        this._percentage = value;
    }
    draw() {
        this._elPath.setAttribute('fill', this._colour);
        this._elPath.setAttribute('d', generatePath(this._startPercentage, this._percentage));
    }
}

customElements.define(ComponentPie.TAG, ComponentPie);

function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}

function generatePath(startP, endP) {
    const [startX, startY] = getCoordinatesForPercent(startP);
    const [endX, endY] = getCoordinatesForPercent(endP);
    const largeArcFlag = endP - startP > 0.5 ? 1 : 0;
    return [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        `L 0 0`, // Line
    ].join(' ');
}
