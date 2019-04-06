"use strict";

class XCounter extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <p>Hello From Web Component</p>
      `;
    }
  }
  
  customElements.define('x-counter', XCounter);