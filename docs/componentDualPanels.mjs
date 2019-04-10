'use strict';

class ComponentDualPanels extends HTMLElement {
    gTemplate = `

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
        .dp-icon-right {
            float: right;
        }
    </style>
    
    <div data-js="dual-panels" class="dp-grid-closed">
        <!-- Main Panel always visible -->
        <div data-js="dp-panel-main-content" class="dp-panel-main">
            <!-- Main External Content -->
        </div>
    
        <!-- Second Panel Closed contains Opener -->
        <div data-js="dp-panel-second-closed" class="dp-panel-second dp-panel-show">
            <div data-evt="${ComponentDualPanels.EVENT_OPEN}" data-js="dp-open-icon" class="dp-icon-right"><button>i</button></div>
        </div>
    
        <div data-js="dp-panel-second-opened" class="dp-panel-second dp-panel-hide">
            <div data-evt="${ComponentDualPanels.EVENT_CLOSE}" data-js="dp-close-icon" class="dp-icon-right"><button>x</button></div>
    
            <div data-js="dp-panel-second-content" style="clear: both;">
                <!-- Second External Content -->
            </div>
        </div>
    </div>
    
    `;
    
    
    static get TAG() {
        return 'dual-panels'; // <dual-panels>
    }
    static get EVENT_OPEN() {
        return 'evt-action-open';
    }
    static get EVENT_CLOSE()  {
        return 'evt-action-close';
    }
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.gTemplate;
        this._elDualPanels = this.querySelector('[data-js="dual-panels"]');
        
        this._elMainContent = this.querySelector('[data-js="dp-panel-main-content"]');
        this._elSecondContent = this.querySelector('[data-js="dp-panel-second-content"]');

        this._elPanelClosed = this.querySelector('[data-js="dp-panel-second-closed"]');
        this._elPanelOpened = this.querySelector('[data-js="dp-panel-second-opened"]');
        this.addEventListener('click', this.clickOpenClose);
    }

    clickOpenClose(e) {
        if (this.nodeIsChild(e.target, `[data-evt="${ComponentDualPanels.EVENT_OPEN}"]`)) {
            console.log('open');
            this.swapClass(this._elDualPanels, 'dp-grid-opened', 'dp-grid-closed');
            this.swapClass(this._elPanelClosed, 'dp-panel-hide', 'dp-panel-show');
            this.swapClass(this._elPanelOpened, 'dp-panel-show', 'dp-panel-hide');
        } else if (this.nodeIsChild(e.target, `[data-evt="${ComponentDualPanels.EVENT_CLOSE}"]`)) {
            console.log('close');
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

    populateMain(content) {
        this._elMainContent.innerHTML = '';
        this._elMainContent.appendChild(content);
    }

    populateSecond(content) {
        this._elSecondContent.innerHTML = '';
        this._elSecondContent.appendChild(content);
    }

    replaceOpenIcon(content) {
        const el = this.querySelector('[data-js="dp-open-icon"]');
        el.innerHTML = '';
        el.appendChild(content);
    }

    replaceCloseIcon(content) {
        const el = this.querySelector('[data-js="dp-close-icon"]');
        el.innerHTML = '';
        el.appendChild(content);
    }
}

customElements.define(ComponentDualPanels.TAG, ComponentDualPanels);
