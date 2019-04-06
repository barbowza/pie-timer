"use strict";

// const template = document.createElement('template');
const template = `
<style>
.btn-start-pause {
    width: 5em;
}
</style>
<a data-js="btn-start-pause" class="button is-success btn-start-pause evt-start-pause">Start</a>
`;

class ComponentStartPause extends HTMLElement {
  static get Start() {
    return "Start";
  }
  static get Pause() {
    return "Pause";
  }
  static get state() {
    return gStartPause;
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template;
  }

  static toggle() {
    gStartPause = gStartPause === ComponentStartPause.Start
      ? ComponentStartPause.Pause
      : ComponentStartPause.Start;
    const all = document.querySelectorAll('a[data-js="btn-start-pause"]');
    all.forEach(button => {
      button.text = gStartPause;
    });
  }

  
}
let gStartPause = ComponentStartPause.Start;

customElements.define("btn-start-pause", ComponentStartPause);
