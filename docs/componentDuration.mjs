const tagName = 'duration-select'; // web components MUST have at least one dash in their tag name

const template = document.createElement('template');

template.innerHTML = `
<style>
</style>
<span id="outermost">
<select id="hours" aria-label="hours">
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>
:
<select id="minutes" aria-label="minutes">
    <option value="0">XX</option>
</select>
:
<select id="seconds" aria-label="seconds">
    <option value="0">XX</option>
</select>
</span>`;

class ComponentDuration extends HTMLElement {
    set value(value) {
        this._value = value;
    }

    // The value of this component is the number of seconds duration selected
    get value() {
        return (+this._hours * 60 * 60) + (+this._minutes * 60) + (+this._seconds);
    }
    
    constructor() {
        super();
        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;
        this.populatedTemplate = template.content.cloneNode(true);
        this.shadowOutermost = this.populatedTemplate.getElementById('outermost');
        this.shadowHours = this.populatedTemplate.getElementById('hours');
        this.shadowMinutes = this.populatedTemplate.getElementById('minutes');
        this.shadowSeconds = this.populatedTemplate.getElementById('seconds');
        appendOptions(this.shadowHours, 12);
        appendOptions(this.shadowMinutes, 60);
        appendOptions(this.shadowSeconds, 60);
        this.shadowOutermost.addEventListener('change', (e) => {
            const id = e.target.id;
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
            console.log(`${this._hours} : ${this._minutes} : ${this._seconds}`)
        })
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
        const opt = document.createElement("option");
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