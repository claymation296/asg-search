/**
 * `search-type-card`
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
import htmlString from './search-type-card.html';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import './filter-card.js';


class SpritefulSearchTypeCard extends SpritefulElement {
  static get is() { return 'search-type-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _value: {
        type: String,
        value: 'name'
      }

    };
  }


  static get observers() {
    return [
      '__valueChanged(_value)'
    ];
  }


  __radioSelectedChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._value = event.detail.value;
  }


  __valueChanged(value) {
    if (!value) { return; }
    this.fire('search-type-card-value-changed', {value});
  }


  reset() {
    this._value = 'name';
  }

}

window.customElements.define(SpritefulSearchTypeCard.is, SpritefulSearchTypeCard);
