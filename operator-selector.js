
/**
	*
	*	operator-selector
	*
	*	dropdown selector for scryfall search operators
	*
	*
	**/

import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './operator-selector.html';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './app-dropdown-menu.js';


class SpritefulOperatorSelector extends SpritefulElement {
  static get is() { return 'operator-selector'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
  	return {

  		operators: {
  			type: Array,
  			value: ['>=', '>', '=', '<', '<=']
  		},

  		selected: String,

  	};
  }


  __menuValueChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {value} = event.detail;
    this.selected = value;
    this.fire('operator-selector-selected-changed', {selected: value});
  }

}

window.customElements.define(SpritefulOperatorSelector.is, SpritefulOperatorSelector);
