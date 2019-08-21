/**
 * `set-card`
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
import htmlString from './set-card.html';
import './filter-card.js';
import './chain-selector.js';
import './set-item.js';


class SpritefulSetCard extends SpritefulElement {
  static get is() { return 'set-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {
    	
    	selected: Object,

      _chain: String,

    };
  }


  static get observers() {
    return [
      '__valuesChanged(selected, _chain)'
    ];
  }


  connectedCallback() {
  	super.connectedCallback();

  	this.selected = {name: 'All'};
  }


  __chainSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._chain = event.detail.selected;
  }


  __valuesChanged(selected, chain) {
    if (!selected || !chain) { return; }
    this.fire('set-card-value-changed', {
      value: {
        ...selected,
        chain
      }
    });
  }

  // hit db only after user interacts with dropdown
  async __itemClicked() {
  	try {
	  	await this.clicked();
	  	this.fire('set-card-open-sets-overlay');
  	}
  	catch (error) {
  		if (error === 'click debounced') { return; }
  		console.error(error);
  	}
  }

}

window.customElements.define(SpritefulSetCard.is, SpritefulSetCard);
