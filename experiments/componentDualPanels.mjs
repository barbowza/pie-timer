'use strict';

const TAG = 'dual-panels'; // <dual-panels>
const EVENT_OPEN = 'evt-action-open';
const EVENT_CLOSE = 'evt-action-close';

const gTemplate = `

<style>
    .dp-grid-closed {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
    }
    .dp-grid-opened {
        display: grid;
        grid-template-columns: 0fr 3fr 2fr;
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
        <button data-js="${EVENT_OPEN}">i</button>
    </div>

    <div data-js="dp-panel-second-opened" class="dp-panel-second dp-panel-hide">
        <button data-js="${EVENT_CLOSE}">x</button>

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
        this._elMainContent = this.querySelector('[data-js="dp-panel-main-content"]');
        this._elSecondContent = this.querySelector('[data-js="dp-panel-second-content"]');

        this._elDualPanels = this.querySelector('[data-js="dual-panels"]');
        this._elPanelClosed = this.querySelector('[data-js="dp-panel-second-closed"]');
        this._elPanelOpened = this.querySelector('[data-js="dp-panel-second-opened"]');
        this.addEventListener('click', this.clickOpenClose);
    }

    clickOpenClose(e) {
        console.log(e.target);
        if (this.nodeIsChild(e.target, `[data-js="${EVENT_OPEN}"]`)) {
            this.swapClass(this._elDualPanels, 'dp-grid-opened', 'dp-grid-closed');
            this.swapClass(this._elPanelClosed, 'dp-panel-hide', 'dp-panel-show');
            this.swapClass(this._elPanelOpened, 'dp-panel-show', 'dp-panel-hide');
        } else if (this.nodeIsChild(e.target, `[data-js="${EVENT_CLOSE}"]`)) {
            this.swapClass(this._elDualPanels, 'dp-grid-closed', 'dp-grid-opened');
            this.swapClass(this._elPanelOpened, 'dp-panel-hide', 'dp-panel-show');
            this.swapClass(this._elPanelClosed, 'dp-panel-show', 'dp-panel-hide');
        }
    }

    nodeIsChild(obj, parentSelector) {
        while (obj !== undefined && obj !== null && obj.tagName.toUpperCase() !== 'BODY') {
            if (obj.matches(parentSelector)) {
                return true;
            }
            obj = obj.parentNode;
        }
        return false;
    }

    swapClass(el, classIn, classOut) {
        el.classList.remove(classOut);
        el.classList.add(classIn);
    }
}

customElements.define(TAG, ComponentDualPanels);
