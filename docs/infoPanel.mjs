"use strict";
export function InfoPanel (node, dataSource) {
    this._debug = 0;

    this._node = node;
    this._dataSource = dataSource;
    this._info = {};
    for(var key in dataSource) {    // Initialise an object to mirror the dataSource values
        this._info[key] = 0;
    }

    this._template = (props) => {
        return `
        <table class="table is-fullwidth">
            <tbody>
                <tr>
                    <td>Loop</td>
                    <td>${props.loops}</td>
                </tr>
                <tr>
                    <td>Time</td>
                    <td>${props.time}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>${props.total}</td>
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
    this._debug && console.log('info contains:');
    Object.keys(this._info).forEach((key) => {
        this._debug && console.log(key);
        if (this._dataSource.hasOwnProperty(key)) {
            this._info[key] = this._dataSource[key]();
        }
     });
}