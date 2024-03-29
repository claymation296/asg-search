import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `asg-search`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AsgSearch extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'asg-search',
      },
    };
  }
}

window.customElements.define('asg-search', AsgSearch);
