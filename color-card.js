/**
 * `color-card`
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
import htmlString from './color-card.html';
import manaIcons  from '@spriteful/asg-shop-card-shared-elements/asg-mana-icons.json';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './filter-card.js';
import './chain-selector.js';


class SpritefulColorCard extends SpritefulElement {
  static get is() { return 'color-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _chain: String,

      _items: {
        type: Array,
        value: [{
          icon: 'W',
          name: 'White',
          value: 'white'
        }, {
          icon: 'U',
          name: 'Blue',
          value: 'blue'
        }, {
          icon: 'R',
          name: 'Red',
          value: 'red'
        }, {
          icon: 'B',
          name: 'Black',
          value: 'black'
        }, {
          icon: 'G',
          name: 'Green',
          value: 'green'
        }, {
          icon: 'C',
          name: 'Colorless',
          value: 'colorless'
        }, {
          icon: '',
          name: 'Multicolor',
          value: 'multicolor'
        }]
      },

      _keyword: {
        type: String,
        value: 'color'
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


  __computeIconHidden(icon) {
    return !Boolean(icon);
  }


  __computeIcon(icon) {
    if (!icon) { return; }
    return manaIcons[icon];
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

    this.fire('color-card-value-changed', {
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

window.customElements.define(SpritefulColorCard.is, SpritefulColorCard);
