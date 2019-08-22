/**
 * `filter-number-card`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './filter-number-card.html';
import './filter-card.js';
import './chain-selector.js';
import './keyword-number-input.js';


class SpritefulFilterNumberCard extends SpritefulElement {
  static get is() { return 'filter-number-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      keyword: String,

      name: String,

      title: String,

      _chain: String,

      _operator: String,

      _selected: Number

    };
  }


  static get observers() {
    return [
      '__chainAndSelectedChanged(_chain, _selected)'
    ];
  }


  __chainSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._chain = event.detail.selected;
  }


  __numberChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._selected = event.detail.value;
  }


  __chainAndSelectedChanged(chain, selected) {
    if (typeof chain !== 'string' || !selected) { return; }
    this.fire('filter-number-card-value-changed', {
      value: {
        chain,
        ...selected
      }
    });
  }


  reset() {
    this.$.selector.reset();
    this.$.input.reset();
  }

}

window.customElements.define(SpritefulFilterNumberCard.is, SpritefulFilterNumberCard);
