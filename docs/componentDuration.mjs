"use strict";
// Our tag <duration-select>
const tagName = 'duration-select'; // web components MUST have at least one dash in their tag name

const gMarkup = `
<style>
    @import "bulma_darkTheme.css";
</style>
<div data-js="outermost" class="container">
    <div class="field is-grouped is-grouped-centered">
        <span class="control">hours</span>
        <span class="control"> : </span>
        <span class="control">minutes</span>
        <span class="control"> : </span>
        <span class="control">seconds</span>
    </div>
    <div class="field is-grouped is-grouped-centered">
        <div class="control">
            <div class="select" aria-label="hours">
                <select data-js="select-hours">
                    <option value="0">00</option>
                </select>
            </div>
        </div>
        <p class="control"> : </p>
        <div class="control">
            <div class="select" aria-label="minutes">
                <select data-js="select-minutes">
                    <option value="0">00</option>
                </select>
            </div>
        </div>
        <p class="control"> : </p>
        <div class="control">
            <div class="select">
                <select data-js="select-seconds" aria-label="seconds">
                    <option value="0">00</option>
                </select>
            </div>
        </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
        <div>
            <button data-js="button-ok" class="button is-success">OK</button>
        </div>
    </div>
`;

class ComponentDuration extends HTMLElement {

    static get eventSuccessName() {
        return 'event-custom-duration-success';
    } 

    set duration(value) {
        this._someValue = value;    // TODO if ever need to pre set the controls to something other than 0 : 0 : 0
    }

    // The value of this component is the number of seconds duration selected
    get duration() {
        return (+this._hours * 60 * 60) + (+this._minutes * 60) + (+this._seconds); // REFACTOR should return three individual values
    }
    
    constructor() {
        super();
        this._debug = 0;

        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;

        this._template = CreateElement('template');
        this._template.innerHTML = gMarkup;

        this.populatedTemplate = this._template.content.cloneNode(true);
        this.shadowOutermost = this.populatedTemplate.querySelector('[data-js="outermost"]');
        this.shadowHours = this.populatedTemplate.querySelector('[data-js="select-hours"]');
        this.shadowMinutes = this.populatedTemplate.querySelector('[data-js="select-minutes"]');
        this.shadowSeconds = this.populatedTemplate.querySelector('[data-js="select-seconds"]');
        this.shadowOk = this.populatedTemplate.querySelector('[data-js="button-ok"]')
        appendOptions(this.shadowHours, 12);
        appendOptions(this.shadowMinutes, 60);
        appendOptions(this.shadowSeconds, 60);
        this.shadowOutermost.addEventListener('change', (e) => {
            const dataJs = e.target.dataset.js;
            const prefix = "select-";
            let id = dataJs.indexOf(prefix) !== -1 ? dataJs.substring(prefix.length) : dataJs;
            const val = e.target.value;
            switch (id) {
                case 'hours':
                    this._hours = val;
                    break;
                case 'minutes':
                    this._minutes = val;
                    break;
                case 'seconds':
                    this._seconds = val;
                    break;
            
                default:
                    console.error('Unknown change target ', e.target);
                    break;
            }
            this._debug && console.log(`${this._hours} : ${this._minutes} : ${this._seconds}`)
        });

        this.shadowOk.addEventListener('click', (e) => {
            const event = new CustomEvent(ComponentDuration.eventSuccessName, { 
                bubbles: true,
                detail: {duration: this.duration} 
            });
            DispatchEvent(event);
        });
    }

    // Fires every time this element connects to the DOM.
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(this.populatedTemplate);
        }
    }
}

 
// Register our Component with the DOM
const register = () => customElements.define(tagName, ComponentDuration);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
  


function appendOptions(element, count, offset = 0) {
    element.innerHTML = '';      // remove ALL child nodes of <select>
    for (let index = offset; index < count; ++index) {
        const opt = CreateElement("option");
        opt.value = `${index}`;
        opt.innerHTML = pad(index, 2);
        element.appendChild(opt);
    }
}

function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function CreateElement(elementName) {
    return getDocument().createElement(elementName);
}

function DispatchEvent(event) {
    return getDocument().dispatchEvent(event);
}

function getDocument() {
    return document;
}
