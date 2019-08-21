/**
 * `rarity-card`
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
import htmlString from './rarity-card.html';
import '@spriteful/asg-icons/asg-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './filter-card.js';
import './chain-selector.js';


class SpritefulRarityCard extends SpritefulElement {
  static get is() { return 'rarity-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _chain: String,

      _items: {
        type: Array,
        value: [{
          name: 'Common',
          value: 'common'
        }, {
          name: 'Uncommon',
          value: 'uncommon'
        }, {
          name: 'Rare',
          value: 'rare'
        }, {
          name: 'Mythic',
          value: 'mythic'        
        }]
      },

      _keyword: {
        type: String,
        value: 'rarity'
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


  __checkboxCheckedChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {detail, model} = event;
    const {value}         = detail;
    const {item}          = model;
    this.set(`_selected.${item.value}`, value);
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

    this.fire('rarity-card-value-changed', {
      value: {
        chain,
        keyword,
        values
      }
    });
  }

}

window.customElements.define(SpritefulRarityCard.is, SpritefulRarityCard);
