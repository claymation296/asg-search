
/**
  *
  * chain-selector
  *
  * scryfall search query chaining words (and, or, not)
  *
  *
  **/

import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './chain-selector.html';
import './operator-selector'


class SpritefulChainSelector extends SpritefulElement {
  static get is() { return 'chain-selector'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _selected: {
        type: String,
        value: 'and'
      },

      _chains: {
        type: Array,
        value: ['and', 'or', 'not']
      }

    };
  }


  __menuValueChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {selected} = event.detail;
    this._selected   = selected;
    this.fire('chain-selector-selected-changed', {selected});
  }


  reset() {
    this.$.selector.reset();
  }

}

window.customElements.define(SpritefulChainSelector.is, SpritefulChainSelector);
