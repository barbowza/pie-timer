"use strict";
export function InfoPanel (node) {
    this._debug = 1;

    this._node = node;
    this._info = {
        counter: 0
    };

    this._template = (props) => {
        return `
        <table class="table is-fullwidth">
            <tbody>
                <tr>
                    <td>Loop</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Time</td>
                    <td>00:31</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>05:31</td>
                </tr>
                <tr>
                    <td>counter</td>
                    <td>${props.counter}</td>
                </tr>
            </tbody>
        </table>
    `;
    }
}

// Attach updated html to the DOM
InfoPanel.prototype.render = function() {
    // Get the template
    const template = (typeof this._template === 'function' ? this._template(this._info) : this._template);
    if (['string', 'number'].indexOf(typeof template) === -1) return;

    // Render the template into the element
    if (this._node.innerHTML === template) return;
    this._node.innerHTML = template;

    // Dispatch a render event. When content is updated you may want to take additional actions elsewhere in the code.
    if (typeof window.CustomEvent === 'function') {
        const event = new CustomEvent('render', {
            bubbles: true
        });
        this._node.dispatchEvent(event);
    }

    // Return the elem for use elsewhere
    return this._node;
};

// Update the attached info elements
InfoPanel.prototype.update = function () {
    ++this._info.counter;
}