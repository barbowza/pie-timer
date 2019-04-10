'use strict';

const TAG = 'dual-panel'; // <dual-panel>

const gTemplate = `
    <span>componentDualPanel</span>
`;

class ComponentDualPanel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = gTemplate;
    }
}

customElements.define(TAG, ComponentDualPanel);