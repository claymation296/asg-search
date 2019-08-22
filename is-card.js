/**
 * `is-card`
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
import htmlString from './is-card.html';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './filter-card.js';
import './chain-selector.js';


class SpritefulIsCard extends SpritefulElement {
  static get is() { return 'is-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _chain: String,

      _keyword: {
        type: String,
        value: 'is'
      },

      _selected: {
        type: Object,
        value: () => ({})
      }

    };
  }


  static get observers() {
    return [
      '__valuesChanged(_selected.*, _keyword, _chain)'
    ];
  }


  __chainSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._chain = event.detail.selected;
  }


  __setSelected(bool, key) {
    this.set(`_selected.${key}`, bool);
  }


  __foilCheckedChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {value} = event.detail;
    this.__setSelected(value, 'foil');
  }


  __standardCheckedChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {value} = event.detail;
    this.__setSelected(value, 'nonfoil');
  }


  __commanderCheckedChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {value} = event.detail;
    this.__setSelected(value, 'commander');
  }


  __valuesChanged(itemsObj, keyword, chain) {
    if (
      !itemsObj      || 
      !itemsObj.base || 
      !keyword       || 
      !chain
    ) { return; }
      
    const {base: items} = itemsObj;

    const values = Object.keys(items).filter(key => 
                     items[key] === true);

    this.fire('is-card-value-changed', {
      value: {
        chain,
        keyword,
        values
      }
    });
  }


  reset() {
    const boxes = this.selectAll('paper-checkbox');
    boxes.forEach(box => {
      box.checked = false;
    });    
    this.$.selector.reset();
  }

}

window.customElements.define(SpritefulIsCard.is, SpritefulIsCard);
