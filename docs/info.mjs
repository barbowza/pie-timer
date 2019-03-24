"use strict";
export function Info (node) {
    this._debug = 1;

    this._node = node;
    this._info = {
        counter: 0
    };

    this._template = (props) => {
        return `<span id="info">${props.counter}</span>`;
    }
}

Info.prototype.render = function() {
    // Get the template
    const template = (typeof this._template === 'function' ? this._template(this._info) : this._template);
    if (['string', 'number'].indexOf(typeof template) === -1) return;

    // Render the template into the element
    if (this._node.innerHTML === template) return;
    this._node.innerHTML = template;

    // Dispatch a render event
    if (typeof window.CustomEvent === 'function') {
        const event = new CustomEvent('render', {
            bubbles: true
        });
        this._node.dispatchEvent(event);
    }

    // Return the elem for use elsewhere
    return this._node;
};

Info.prototype.update = function () {
    ++this._info.counter;
}