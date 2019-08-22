/**
 * `sort-card`
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
import htmlString from './sort-card.html';
import './filter-card.js';
import './keyword-items-selector.js';
import './direction-button.js';


class SpritefulSortCard extends SpritefulElement {
  static get is() { return 'sort-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _direction: {
        type: String,
        value: 'asc'
      },
      // from keyword-items-selector
      _selectedItem: Object,

      _items: {
        type: Array,
        value: [{
          icon: 'label',
          name: 'Name', 
          value: 'name'
        }, {
          icon: 'buylist',
          name: 'Set', 
          value: 'set'
        }, {
          icon: 'diamond',
          name: 'Rarity', 
          value: 'rarity'
        }, {
          icon: 'invert-colors',
          name: 'Color', 
          value: 'color'
        }, {
          icon: 'whatshot',
          name: 'Mana Cost', 
          value: 'cmc'
        }, {
          icon: 'flash-on',
          name: 'Power', 
          value: 'power'
        }, {
          icon: 'security',
          name: 'Toughness', 
          value: 'toughness'
        }, {
          icon: 'event',
          name: 'Release', 
          value: 'released'
        }, {
          icon: 'brush',
          name: 'Artist', 
          value: 'artist'
        }, {
          icon: 'star',
          name: 'EDHREC', 
          value: 'edhrec'
        }, {
          icon: 'attach-money',
          name: 'Price', 
          value: 'usd'
        }]
      }

    };
  }


  static get observers() {
    return [
      '__selectedItemAndDirectionChanged(_selectedItem, _direction)'
    ];
  }


  __sortItemSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._selectedItem = event.detail;
  }


  __directionChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._direction = event.detail.value;
  }


  __selectedItemAndDirectionChanged(item, direction) {
    if (!item || !direction) { return; }
    const {keyword, selected} = item;
    this.fire('sort-card-value-changed', {
      value: {
        ...selected,
        keyword,
        direction
      }
    });
  }


  reset() {
    this._direction = 'asc';
    this.$.selector.reset();
  }

}

window.customElements.define(SpritefulSortCard.is, SpritefulSortCard);
