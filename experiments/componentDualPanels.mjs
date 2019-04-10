'use strict';

const TAG = 'dual-panels'; // <dual-panels>

const gTemplate = `

<style>
    .dp-grid-closed {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
    }
    .dp-grid-open {
        display: grid;
        grid-template-columns: 0px auto auto;
    }
    .dp-panel-main {
        grid-column: 2;
    }
    .dp-panel-second {
        grid-column: 3;
    }
    .dp-panel-hide {
        display: none;
    }
    .dp-panel-show {
        display: inline;
    }
</style>

<div data-js="dual-panels" class="dp-grid-closed">
    <!-- Main Panel always visible -->
    <div data-js="dp-panel-main-content" class="dp-panel-main">
        <!-- Main External Content -->
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, molestiae exercitationem! Nostrum voluptate est enim eveniet repellat officiis ratione dolorum.
    </div>

    <!-- Second Panel Closed contains Opener -->
    <div data-js="dp-panel-second-closed" class="dp-panel-second dp-panel-show">
        <button data-js="action-open" >i</button>
    </div>

    <div data-js="dp-panel-second-opened" class="dp-panel-second dp-panel-hide">
        <button data-js="action-open" >x</button>

        <div data-js="dp-panel-second-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
    </div>
</div>

`;

class ComponentDualPanels extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = gTemplate;
    }
}

customElements.define(TAG, ComponentDualPanels);