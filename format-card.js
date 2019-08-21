/**
 * `format-card`
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
import htmlString from './format-card.html';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import './filter-card.js';
import './chain-selector.js';
import './keyword-items-selector.js';


class SpritefulFormatCard extends SpritefulElement {
  static get is() { return 'format-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _chain: String,

    	_keyword: {
    		type: String,
    		value: 'format' // or 'banned'
    	},

    	// from keyword-items-selector
    	_selected: Object,

      _items: {
        type: Array,
        value: [{
          name: 'All', 
          value: 'all'
        }, {
          name: 'Standard', 
          value: 'standard'
        }, {
          name: 'Modern', 
          value: 'modern'
        }, {
          name: 'Commander', 
          value: 'commander'
        }, {
          name: 'Legacy', 
          value: 'legacy'
        }, {
          name: 'Vintage', 
          value: 'vintage' 
        }, {
          name: 'Future Standard', 
          value: 'future'
        }, {
          name: 'Pauper', 
          value: 'pauper'       
        }, {
          name: 'Brawl', 
          value: 'brawl'
        }, {
          name: 'Frontier', 
          value: 'frontier'
        }, {
          name: 'Penny Dreadful', 
          value: 'penny'
        }, {
          name: 'Duel Commander', 
          value: 'duel'
        }, {
          name: 'Old School 93/94', 
          value: 'oldschool'
        }]
      }

    };
  }


  static get observers() {
  	return [
  		'__valuesChanged(_selected, _keyword, _chain)'
  	];
  }


  __chainSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._chain = event.detail.selected;
  }


  __selected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
  	this._selected = event.detail.selected;
  }


  __checked(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
  	this._keyword = event.detail.value ? 'banned' : 'format';
  }


  __valuesChanged(item, keyword, chain) {
  	if (!item || !keyword || !chain) { return; }
  	this.fire('format-card-value-changed', {
  		value: {
  			...item,
        chain,
  			keyword
  		}
  	});
  }

}

window.customElements.define(SpritefulFormatCard.is, SpritefulFormatCard);
