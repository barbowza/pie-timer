'use strict';

const TAG = 'btn-start-pause'; // <'btn-start-pause'>
const EVENT = 'evt-start-pause';
const DATA_ID = 'button-start-pause';
// const template = document.createElement('template');
const template = `
<style>
.btn-start-pause {
    width: 5em;
}
</style>
<a data-js="${DATA_ID}" class="button is-success btn-start-pause ${EVENT}">Start</a>
`;

class ComponentStartPause extends HTMLElement {
    static get Start() {
        return 'Start';
    }
    static get Pause() {
        return 'Pause';
    }
    static get State() {
        return gStartPause;
    }
    static get Event() {
        return EVENT;
    }
    static get DataId() {
        return DATA_ID;
    }
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = template;
    }

    static toggle() {
        gStartPause = gStartPause === ComponentStartPause.Start ? ComponentStartPause.Pause : ComponentStartPause.Start;
        const all = document.querySelectorAll(`a[data-js="${DATA_ID}"]`);
        all.forEach(button => {
            button.text = gStartPause;
        });
    }

    static click() {
        const el = document.querySelector(`a[data-js="${DATA_ID}"]`);
        el.click();
    }
}
let gStartPause = ComponentStartPause.Start;

customElements.define(TAG, ComponentStartPause);
